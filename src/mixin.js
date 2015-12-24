import Q from 'q';
export default {
    methods: {
        toast(msg, delay = 2000) {
            const span = document.createElement('span');
            span.innerText = msg;
            span.className = 'toast white visible';
            document.body.appendChild(span);
            setTimeout(() => span.parentNode.removeChild(span), delay);
        },
        // 检测WebViewJavascriptBridge
        bridge() {
            let defer = Q.defer();
            ((w, cb) => {
                if (w.WebViewJavascriptBridge) {
                    cb(WebViewJavascriptBridge);
                } else {
                    w.document.addEventListener('WebViewJavascriptBridgeReady', () => {
                        cb(WebViewJavascriptBridge);
                    }, false);
                }
            })(window, (bridge) => {
                defer.resolve(bridge);
                if(!bridge.initalized) {
                    bridge.initalized = true; // 防止bridge多次初始化报错
                    bridge.init((user) => {
                        console.debug('bridge.initalized', user);
                    });
                }
            });
            return defer.promise;
        },
        action(handler, params = '') {
            let defer = Q.defer();
            if(/myxx/i.test(navigator.userAgent)) {
                //参数转换为字符串类型
                Object.keys(params).forEach((key) => {
                    params[key] = '' + params[key];
                });
                this.bridge()
                    .then((bridge) => {
                        if('user,keyboard,login'.indexOf(handler) !== -1) {
                            bridge.callHandler(handler, params, (resp) => {
                                defer.resolve(resp);
                            });
                        } else {
                            bridge.callHandler(handler, params);
                            defer.resolve();
                        }
                    });
            } else {
                defer.resolve();
                this.toast(handler);
            }
            return defer.promise;
        },
        $req(url, method, data = {}) {
            let defer = Q.defer();
            let userDefer = Q.defer();
            if(/myxx/i.test(navigator.userAgent)) {
                this.action('user').then((user) => {
                    if(user) {
                        user = JSON.parse(user);
                        this.$root.user = user;
                    }
                    userDefer.resolve(user);
                });
            } else if(/^[\d|.]+$/.test(location.host)){ // 使用IP访问时采用默认用户信息
                userDefer.resolve({
                    id: 2,
                    token: 'f87e7796-9896-4a6f-997e-11b48aebd347',
                    photo: "avatar2.jpg",
                    role: 0
                });
            } else {
                userDefer.resolve();
            }
            userDefer.promise.then((user) => {
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
                        } else if(resp.status === 605){
                            this.action('login');
                        } else {
                            this.toast(resp.message);
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
