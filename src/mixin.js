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
            const ua = navigator.userAgent;
            let env = {
                isApp: /myxx/i.test(ua),
                isMobile: /android|iphone|ipod|ipad/i.test(ua),
                isIOS: /iphone|ipod|ipad/i.test(ua),
                isAndroid: /android/i.test(ua),
                isWechat: /micromessenger/i.test(ua),
                isQQ: /qq\//i.test(ua),
                isWeibo: /weibo/i.test(ua)
            };
            env.isBrowser = !(env.isWechat || env.isQQ || env.isWeibo);
            return env;
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
                        let user = (resp ? JSON.parse(resp) : undefined);
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
                } else if('share,shareable'.indexOf(handler) !== -1) {
                    
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
                if(method !== 'get' && !token) {
                    this.action('login');
                } else {
                    if(token) {
                        this.$http.headers.common['X-Auth-Token'] = token;
                    }
                    this.$http[method](url, data).then(({data: resp}) => {
                        // http://wiki.jimhuang.cn/dokuwiki/doku.php?id=dev_team:dev_sub_team_server:myxx_console_api:errorcode&#
                        if(resp.status === 200) {
                            defer.resolve(resp.data);
                        } else {
                            defer.reject(resp.message);
                            if([605, 608].indexOf(resp.status) !== -1) {
                                this.action('login');
                            } else if([3002, 5004, 2001, 2000].indexOf(resp.status) !== -1) {
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
        setShareData(type, entry, shareable) {
            let data = {hasDownloadLink: true};
            if(type === 'jianbao') {
                data.title = entry.unidentified ? '快帮我鉴定一下这个宝贝！' : '快来看看我的鉴定吧！';
                data.desc = entry.description;
                data.icon = entry.pictures[0];
                data.text = '我也要鉴宝';
            } else if(type === 'topic') {
                const titles = {
                    '晒宝': '快来帮我看看这个宝贝怎么样！', 
                    '工艺展示': '快来围观这个精湛的工艺！', 
                    '淘玉故事': '好玉原来是这么淘来的！',
                    '其它': '分享[美玉秀秀]晒宝！'
                };
                data.title = titles[entry.topic_type];
                data.desc = entry.content;
                data.icon = entry.medias[0].id;
                if(entry.medias[0].type === 'video') {
                    data.icon = this.config.video + icon + '?vframe/jpg/offset/0/rotate/auto|imageView2/1/w/100';
                }
                data.text = '我也要晒宝';
            } else if(type === 'product') {
                data.title = '我在 [美玉秀秀] 发现一个宝贝！';
                data.desc = entry.name;
                data.icon = entry.imgs[0];
                data.text = '我也要逛逛';
            } else if(type === 'website') {
                data.title = _.get(this, 'self.id') == entry.id ? '快来逛逛我的个人官网!' : entry.name + '的官网，快来一睹大师风采';
                data.desc = entry.name + _.get(entry.titles[0], name, '');
                data.icon = entry.photo;
                data.hasDownloadLink = false;
            } else if(type === 'profile') {
                data.title = `这是${entry.name}在【美玉秀秀】的主页，一起开启玉石生活吧！`;
                data.desc = entry.name;
                data.icon = entry.photo;
                data.text = '我也要逛逛';
            }
            // 截取描述
            if(/([\uD800-\uDBFF])/.test(data.desc.charAt(19))){
                data.desc = data.desc.substr(0, 19) + '...';
            } else if(data.desc.length > 20) {
                data.desc = data.desc.substr(0, 20) + '...';
            }
            let query = _.merge({}, this.$route.query, {
                type, 
                id: (entry.post_id || entry.id),
                user: _.get(this, 'self.id', -1),
                time: Date.now()
            });
            data.url = location.origin + location.pathname + '?' + Object.keys(query).map((k) => `${k}=${query[k]}`).join('&');

            this.$root.shareData = data;
            document.title = data.title;
            let shareIconSrc = data.icon;
            if(!/^http/.test(shareIconSrc)) {
                shareIconSrc = this.config.img + shareIconSrc + '?imageView2/1/w/310';
            }
            document.querySelector("#share-icon").src = shareIconSrc;
            if(shareable) {
                let {title, desc, icon, url} = data;
                this.action('shareable', {title, desc, icon, url});
            }
        },
        share() {
            let {title, desc, icon, url} = this.$root.shareData;
            this.action('share', {title, desc, icon, url});
        }
    }
};
export default {
    install(Vue, options) {
        Vue.mixin(mixin);
    }
}
