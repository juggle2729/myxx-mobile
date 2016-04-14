import Q from 'q';
import bridge from './bridge';
import config from './config';
const mixin = {
    data() {
        return {
            config
        };
    },
    computed: {
        env() {
            return this.$root.env;
        },
        self() {
            return this.$root.user;
        }
    },
    route: {
        waitForData: true
    },
    created() {
        if(this.$root === this.$parent) {
            if(this.$options.route.data) {
                this.$watch('$loadingRouteData', (loading) => {
                    if(!loading) {
                        this.toggleLoading(false);
                    }
                });
            } else {
                this.toggleLoading(false);
            }
        }
    },
    methods: {
        toast(msg, delay = 2000) {
            const toast = document.querySelector('.toast');
            if(toast) {
                toast.parentNode.removeChild(toast);
            }
            const span = document.createElement('span');
            span.innerText = msg;
            span.className = 'toast white visible font-30';
            document.body.appendChild(span);
            setTimeout(() => span.parentNode && span.parentNode.removeChild(span), delay);
        },
        toggleLoading(show) {
            const appContainer = document.querySelector('#app');
            show = (show === undefined ? !appContainer.classList.contains('loading') : show);
            document.querySelector('#app').classList[show ? 'add' : 'remove']('loading');
        },
        action(handler, params = '') {
            if(_.isObject(params)) {
                Object.keys(params).forEach((k) => params[k] = '' + params[k]);
            }
            let defer = Q.defer();
            let resolver = undefined;   //可选值为undefined, false, function
            bridge.then((bridge) => {
                if('user' === handler) {
                    resolver = (resp) => {
                        let user = (resp ? JSON.parse(resp) : {});
                        this.$root.user = user;
                        defer.resolve(user);
                    };
                } else if('keyboard' === handler) {
                    if(_.get(this, 'self.token')) {
                        resolver = (resp) => defer.resolve(resp);
                    } else {
                        this.action('login');
                        resolver = false;
                    }
                } else if('login' === handler) {
                    resolver = _.noop;
                } else if('confirm,delete,version'.indexOf(handler) !== -1) {
                    resolver = (resp) => defer.resolve(resp);
                }
                if(resolver === undefined) {
                    bridge.callHandler.call(this, handler, params);
                } else if(typeof resolver === 'function') {
                    bridge.callHandler.call(this, handler, params, resolver);
                }
            });
            return defer.promise;
        },
        $req(url, method, data = {}) {
            let defer = Q.defer();
            this.action('user').then((user) => {
                let token = _.get(user, 'token');
                if(method !== 'get' && !token && !/^wx/.test(url)) {
                    this.action('login');
                } else {
                    const [path, version] = url.split('|');
                    this.$http.headers.common['X-Api-Version'] = version;
                    if(token) {
                        this.$http.headers.common['X-Auth-Token'] = token;
                    }
                    this.$http[method](path, data).then(({data: resp}) => {
                        // http://wiki.jimhuang.cn/dokuwiki/doku.php?id=dev_team:dev_sub_team_server:myxx_console_api:errorcode&#
                        if(resp.status === 200) {
                            defer.resolve(resp.data);
                        } else {
                            defer.reject(resp.message);
                            if([605, 608].indexOf(resp.status) !== -1) {
                                this.action('login');
                            } else if([3002, 5004, 2001, 2000].indexOf(resp.status) !== -1) {
                                console.debug('404', location.href);
                                this.$route.router.replace({'name': '404'});
                            } else {
                                console.log('resp.status:'+resp.status);
                            }
                        }
                    });
                }
            });
            return defer.promise;
        },
        $get(url, data) {
            return this.$req(url, 'get', data);
        },
        $post(url, data) {
            return this.$req(url, 'post', data);
        },
        $delete(url, data) {
            return this.$req(url, 'delete', data);
        },
        // 设置页面分享所需数据
        setShareData(entry, shareable) {
            if(!this.env.isShare) {
                return;
            }
            let data = {hasDownloadLink: true};
            const type = this.config.shareables[this.$route.name];
            if(type === 'jianbao') {
                data.title = entry.status ? entry.results[0].identifier.name+'的视频鉴宝' : '大师在线视频鉴宝';
                data.desc = entry.description;
                data.icon = entry.pictures[0];
                data.text = '免费找大师看看我的宝贝';
            } else if(type === 'result') {
                const result = entry.results[0];
                const identifier = result.identifier.name;
                if(result.identifier.id == this.$route.query.user) {
                    if(result.result === 'genuine') {
                        data.title = '我给出的鉴定结果为真，你看怎样';
                    } else if(result.result === 'fake') {
                        data.title = '我给出的鉴定结果为假，你看怎样';
                    } else {
                        data.title = '这块玉我拿不准，你来看看';
                    }
                } else {
                    if(result.result === 'genuine') {
                        data.title = identifier + '鉴定这块玉为真，你看怎样';
                    } else if(result.result === 'fake') {
                        data.title = identifier + '鉴定这块玉为真，你看怎样';
                    } else {
                        data.title = '这块玉我拿不准，你来看看';
                    }
                }
                data.desc = entry.description;
                data.icon = entry.pictures[0];
                data.text = '免费找大师看看我的宝贝';
            } else if(type === 'topic') {
                data.title = '我在美玉秀秀晒了个宝';
                data.desc = entry.content;
                data.icon = entry.cover;
                if(entry.cover_type !== 'picture') {
                    data.icon = this.config.video + data.icon + '?vframe/jpg/offset/0/rotate/auto|imageView2/1/w/100';
                }
                data.text = '秀出的我宝贝';
            } else if(type === 'product') {
                data.title = '我在 [美玉秀秀] 发现一个宝贝！';
                data.desc = entry.name;
                data.icon = entry.imgs[0];
                data.text = '我要去逛逛';
            } else if(type === 'website') {
                data.title = entry.interview.title;
                data.desc = entry.baseData.name + ' ' + _.get(entry.baseData.titles[0], 'name', '');
                data.icon = entry.baseData.photo;
                data.hasDownloadLink = false;
            } else if(type === 'profile') {
                data.title = `${entry.name}的美玉秀show`;
                data.desc = entry.name;
                data.icon = entry.photo;
            }
            // 截取描述
            if(/([\uD800-\uDBFF])/.test(data.desc.charAt(19))){
                data.desc = data.desc.substr(0, 19) + '...';
            } else if(data.desc.length > 20) {
                data.desc = data.desc.substr(0, 20) + '...';
            }
            let query = _.merge({}, this.$route.query, {
                user: _.get(this, 'self.id', -1),
                time: Date.now()
            });
            if(!data.url) {
                data.url = location.origin + location.pathname;
            }
            data.url = data.url + '?' + Object.keys(query).map((k) => `${k}=${query[k]}`).join('&');

            this.$root.shareData = data;
            document.title = data.title;

            if(this.env.isWechat) {
                const shareData = {
                    title: data.title,
                    desc: data.desc,
                    link: data.url,
                    imgUrl: this.config.img + data.icon + '?imageView2/1/w/310'
                };
                /^app/.test(location.hostname) && this.wechatShareInit(shareData);
            }

            if(shareable) {
                let {title, desc, icon, url} = data;
                this.action('shareable', {title, desc, icon, url});
            }
        },
        share() {
            let {title, desc, icon, url} = this.$root.shareData;
            this.action('share', {title, desc, icon, url});
        },
        wechatShareInit(shareData) {
            // load script
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', '//res.wx.qq.com/open/js/jweixin-1.0.0.js');
            document.getElementsByTagName('head')[0].appendChild(script);

            script.onload = () => {
                const timeStamp = ~~(+new Date() / 1000);
                const nonceStr = this.randomWord();
                const url = location.href.split('#')[0];

                const formData = new FormData();
                formData.append('noncestr', nonceStr);
                formData.append('timestamp', timeStamp);
                formData.append('url', url);

                this.$post('wx/jsapisignature', formData).then((result) => {
                    // config
                    wx.config({
                        debug: false,
                        appId: 'wxcc40bf300d6200a3',
                        timestamp: timeStamp,
                        nonceStr: nonceStr,
                        signature: result.signature,
                        jsApiList: [
                            'checkJsApi',
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
                    // share list
                    wx.ready(() => {
                        wx.onMenuShareAppMessage(shareData);
                        wx.onMenuShareTimeline(shareData);
                        wx.onMenuShareQQ(shareData);
                        wx.onMenuShareWeibo(shareData);
                        wx.onMenuShareQZone(shareData);
                    });
                });
            }
        },
        randomWord: function(len) {
            var str = '',
                range,
                i = 0,
                o,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            range = (len && typeof len === 'number') ? len : (Math.round(Math.random() * (32 - 8)) + 8);
            for (; i < range; i++) {
                o = Math.round(Math.random() * (arr.length - 1));
                str += arr[o];
            }
            return str;
        },
        play(id, targetType, targetId) {
            if(!targetId) {
                targetId = (this.$route.params.id || -1);
            }
            if(!targetType) {
                targetType = this.config.shareables[this.$route.name];
            }

            this.action('play', {id, targetType, targetId});
            if(!this.isApp) { // 分享页面，视频自动播放, FIXME...
                _.delay(() => {
                    const medias = this.$root.playlist;
                    if(medias.length === 1) {
                        const v = document.querySelector(`[src$='${medias[0]}']`);
                        v.classList.add('on');
                        v.play();
                        v.onended = (e) => {
                            if(_.isFunction(_.get(e, 'target.webkitExitFullscreen'))) {
                                e.target.webkitExitFullscreen();
                            }
                            this.$root.playlist = undefined;
                        }
                    } else {
                        const pic = document.querySelector(`[src$='${medias[1]}']`);
                        const v2 = document.querySelector(`[src$='${medias[2]}']`);
                        v2 && v2.play();
                        const v1 = document.querySelector(`[src$='${medias[0]}']`);
                        v1.play();
                        v1.classList.add('on');
                        v1.onended = (e) => {
                            if(_.isFunction(_.get(e, 'target.webkitExitFullscreen'))) {
                                e.target.webkitExitFullscreen();
                            }
                            v1.classList.remove('on');
                            pic.classList.add('on');
                            _.delay(() => {
                                pic.classList.remove('on');
                                v2.classList.add('on');
                                v2.play();
                                v2.onended = (e) => {
                                    if(_.isFunction(_.get(e, 'target.webkitExitFullscreen'))) {
                                        e.target.webkitExitFullscreen();
                                    }
                                    v2.classList.remove('on');
                                    this.$root.playlist = undefined;
                                }
                            }, 2000);
                        }
                    }
                }, 50);
            }
        },
    }
};
export default {
    install(Vue, options) {
        Vue.mixin(mixin);
    }
}
