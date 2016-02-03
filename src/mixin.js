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
                    if(params.desc.length > 20) {
                        params.desc = params.desc.substr(0, 20) + '...';
                    }
                    params.url += `&user=${_.get(this, 'self.id', -1)}&time=${Date.now()}`;
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
                        if(resp.status === 200) {
                            defer.resolve(resp.data);
                        } else if(resp.status === 605 || resp.status === 608){//token问题
                            this.action('login');
                        } else if(resp.status === 5004){
                            defer.reject();
                            this.$route.router.replace({name: '404'});
                        } else if(resp.status === 601) {// 统计接口缺少参数
                            defer.reject();
                            console.log(resp.message);
                        } else if(resp.status === 3002) {// 商品话题个人页面缺少内容
                            defer.reject();
                            console.log(resp.message);
                            this.$route.router.replace({'name': 'nocontent'});
                        } else {
                            defer.reject();
                            console.log('resp.status:'+resp.status);
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
        }
    }
};
export default {
    install(Vue, options) {
        Vue.mixin(mixin);
    }
}
