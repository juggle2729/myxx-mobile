import Q from 'q';
import bridge from './bridge';
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
        action(handler, params = '') {
            let defer = Q.defer();
            bridge.then((bridge) => {
                if(handler === 'user') {
                    bridge.callHandler(handler, params, (resp) => {
                        let user;
                        if(resp) {
                            user = JSON.parse(resp);
                        }
                        defer.resolve(user);
                        this.$root.user = user;
                    });
                } else if(handler === 'keyboard') {
                    bridge.callHandler(handler, params, (resp) => {
                        // FIXME针对输入，做一些安全转码处理
                        defer.resolve(resp);
                    });
                } else if(handler === 'login') {
                    bridge.callHandler(handler, params, (resp) => {});
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
                        } else if(resp.status === 605){
                            this.action('login');
                        } else {
                            this.toast(resp.status);
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
