import Q from 'q';
import _ from 'lodash';
import bridge from '../bridge';
import config from '../config';
const mixin = {
    data() {
        return {
            config,
            uid: _.concat(this.$route.name, _.values(this.$route.params)).join('_')
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
    http: {
        root: config.api,
        emulateJSON: true,
        xxx: 1,
        headers: {}
    },
    route: {
        waitForData: false
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
    ready() {
        if(localStorage.getItem(this.uid)) {
            const {url, method, data} = JSON.parse(localStorage.getItem(this.uid));
            localStorage.removeItem(this.uid); //立刻去掉缓存数据，防止重复提交
            this.$req(url, method, data)
                .then(() => {
                    this.action('toast', {success: 1, text: '操作成功'});
                });
        }
    },
    methods: {
        toggleLoading(show) {
            const appContainer = document.querySelector('#app');
            show = (show === undefined ? !appContainer.classList.contains('loading') : show);
            document.querySelector('#app').classList[show ? 'add' : 'remove']('loading');
        },

        /**
         * 调用接口，返回 promise
         * @param  {String} handler         接口名称，参考 wiki 文档
         * @param  {String|Object} params   接口参数
         * @return {Promise}                Q的promise
         */
        action(handler, params = '') {
            // 所有参数采用字符串形式传递
            if(_.isObject(params)) {
                Object.keys(params).forEach(k => params[k] = _.isObjectLike(params[k]) ? params[k] : _.toString(params[k]));
            } else {
                params = _.toString(params);
            }
            let defer = Q.defer();
            let callback = undefined;
            bridge.then((bridge) => {
                switch(handler) {
                    case 'login':
                        callback = console.debug.bind(console);
                        break;
                    case 'user':
                        callback = resp => {
                                console.debug('user cb', resp);
                                if(resp) {
                                    const user = JSON.parse(resp);
                                    this.$root.user = user; // 更新this.self
                                    defer.resolve(user);
                                } else {
                                    defer.resolve();
                                }
                            }
                        break;
                    case 'keyboard':
                        callback = resp => resp.trim() ? defer.resolve(resp) : defer.reject();
                        break;
                    case 'confirm':
                    case 'delete':
                    case 'version':
                        callback = resp => defer.resolve(resp);
                        break;
                }
                bridge.callHandler.apply(this, [handler, params, callback].filter(arg => arg !== undefined));
            });
            return defer.promise;
        },

        /**
         * 封装 vue-resource，对业务错误进行统一处理
         * @param  {String} url     api path,无需前缀
         * @param  {String} method  可选值为 get|post|delete 等
         * @param  {Object} data    请求数据
         * @return {Promise}        Q的promise
         */
        $req(url, method, data = {}) {
            let defer = Q.defer();
            this.action('user')
                .then(user => { // user可能为 undefined 或 object
                    if(user || method === 'get') {
                        const [path, version] = url.split('|');
                        let headers = _.fromPairs([ // 处理请求头
                                ['X-Auth-Token', _.get(user, 'token')], 
                                ['X-Api-Version', version]
                            ].filter(header => header[1]));

                        this.$http[method](path, data, {headers})
                            .then(({data: resp}) => {
                                if(resp.status === 200) {
                                    defer.resolve(resp.data);
                                } else {    // 业务异常处理
                                    defer.reject(resp.message);
                                    if([605, 608].indexOf(resp.status) !== -1) {
                                        // 暂存请求数据
                                        localStorage.setItem(this.uid, JSON.stringify({url, method, data}));
                                        this.action('login');
                                    } else if([3002, 5004, 2001, 2000].indexOf(resp.status) !== -1) {
                                        console.debug('404', location.href);
                                        this.$route.router.replace({'name': '404'});
                                    } else {
                                        console.debug(`[${resp.status}]${path}\n${resp.message}`);
                                    }
                                }
                            });
                    } else { // token缺失，无法进行数据请求
                        // 暂存请求数据
                        localStorage.setItem(this.uid, JSON.stringify({url, method, data}));
                        this.action('login');
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

        play(id, targetType, targetId) {
            if(!targetId) {
                targetId = (this.$route.params.id || -1);
            }
            if(!targetType) {
                targetType = this.config.shareables[this.$route.name] || this.$route.name;
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
export default mixin;