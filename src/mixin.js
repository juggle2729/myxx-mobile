import Q from 'q';
import bridge from './bridge';
export default {
    computed: {
        platform() {
            const ua = navigator.userAgent;
            return {
                isApp: /myxx/i.test(ua),
                isMobile: /android|iphone|ipod|ipad/i.test(ua),
                isIOS: /iphone|ipod|ipad/i.test(ua),
                isAndroid: /android/i.test(ua),
                isWechat: /micromessenger/i.test(ua)
            };
        },
        self() {
            return this.$root.user;
        }
    },
    route: {
        waitForData: true
    },
    created() {
        if(this.$options.route.data) {
            this.$watch('$loadingRouteData', (loading) => {
                if(!loading) {
                    this.$root.$el.classList.remove('loading');
                }
            });
        } else {
            document.querySelector('#app').classList.remove('loading');
        }
        
    },
    methods: {
        toast(msg, delay = 2000) {
            const span = document.createElement('span');
            span.innerText = msg;
            span.className = 'toast white visible';
            document.body.appendChild(span);
            setTimeout(() => span.parentNode.removeChild(span), delay);
        },
        action(handler, params = '') {
            Object.keys(params).forEach((k) => {
                params[k] = '' + params[k];
            });
            let defer = Q.defer();
            bridge.then((bridge) => {
                if(handler === 'user') {
                    bridge.callHandler(handler, params, (resp) => {
                        let user;
                        if(resp) {
                            user = JSON.parse(resp);
                        }
                        this.$root.user = user;
                        defer.resolve(user);
                    });
                } else if(handler === 'keyboard') {
                    if(!this.self) {
                        this.action('login');
                        defer.reject();
                    } else {
                        bridge.callHandler(handler, params, (resp) => {
                            // FIXME针对输入，做一些安全转码处理
                            defer.resolve(resp);
                        });
                    }
                    
                } else if(handler === 'login') {
                    bridge.callHandler(handler, params, (resp) => {});
                } else if('delete,confirm'.indexOf(handler) !== -1) {
                    bridge.callHandler(handler, params, (resp) => {
                        defer.resolve(resp);
                    });
                } else if(handler === 'share') {
                    params.url = params.url + '?share=' + (new Date()).getTime();
                    bridge.callHandler(handler, params);
                } else { // 无回调的接口
                    bridge.callHandler(handler, params);
                    defer.resolve();
                }
            });
            return defer.promise;
        },
        $req(url, method, data = {}) {
            let defer = Q.defer();
            this.action('user').then((user) => {
                if(method !== 'get' && !user) {
                    this.action('login');
                } else {
                    this.$http.options.emulateJSON = true;
                    if(user && user.token) {
                        this.$http.headers.common['X-Auth-Token'] = user.token;
                    }
                    this.$http[method](url, data).success((resp) => {
                        if(resp.status === 200) {
                            defer.resolve(resp.data);
                        } else if(resp.status === 605 || resp.status === 608){
                        // } else if(resp.status === 605){
                            this.action('login');
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
}
