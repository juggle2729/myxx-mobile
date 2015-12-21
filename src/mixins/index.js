// import bridge from '../utils/jsbridge';
import Q from 'q';
export default {
    computed: {
        self() {
            return this.$root.user;
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
        // 检测WebViewJavascriptBridge,传回当前用户信息
        connect() {
            let defer = Q.defer();
            if(/mobile/i.test(navigator.userAgent)) {
                // 初始化jsbridge
                ((w, cb) => {
                    if (w.WebViewJavascriptBridge) {
                        cb(WebViewJavascriptBridge);
                    } else {
                        w.document.addEventListener('WebViewJavascriptBridgeReady', () => {
                            cb(WebViewJavascriptBridge);
                        }, false);
                    }
                })(window, (bridge) => {
                    bridge.init((user) => {
                        console.debug('bridge init with user:', user);
                    });
                    bridge.callHandler('user', '', (user) => {
                        defer.resolve(JSON.parse(user));
                    })
                });
            } else {
                defer.resolve(this.self);
            }
            return defer.promise;
        },
        action(action, params = {}, callback = false) {
            if (window.WebViewJavascriptBridge) {
                if(callback) {
                    console.debug(action, params, callback);
                    window.WebViewJavascriptBridge.callHandler(action, params, callback);
                } else {
                    window.WebViewJavascriptBridge.callHandler(action, params);
                }
            } else {
                this.toast('😁请在APP里玩！');
            }
        },
        $req(url, method, data = {}) {
            const defer = Q.defer();
            this.connect()
                .then((user) => {
                    console.debug('user', user);
                    if(method !== 'get' && !user.token) {
                        this.action('login', '', () => {});
                    } else {
                        this.$http.headers.common['X-Auth-Token'] = user.token;
                        this.$http[method](url, data).success((resp, status) => {
                        if(status === 200 & resp.status === 200) {
                                defer.resolve(resp.data);
                            }
                        });
                    }
                });
            return defer.promise;
        },
        $get(url) {
            return this.$req(url, 'get');
        },
        $post(url, data = {}) {
            return this.$req(url, 'post', data);
        },
        $delete(url, callback) {
            return this.$req(url, 'delete');
        }
    }
}
