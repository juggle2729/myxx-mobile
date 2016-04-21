import Q from 'q';
import bridge from '../bridge';
import config from '../config';
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
