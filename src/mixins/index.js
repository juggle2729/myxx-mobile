import bridge from '../utils/jsbridge';
export default {
    computed: {
        self() {
            return bridge.user;
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
        bridge(action, params = {}, callback = false) {
            if (window.WebViewJavascriptBridge) {
                if(callback) {
                    window.WebViewJavascriptBridge.callHandler(action, params, callback);
                } else {
                    window.WebViewJavascriptBridge.callHandler(action, params);
                }
            } else {
                this.toast('😁请在APP里玩！');
            }
        },
        $get(url, callback) {
            const req = this.$http.get(url);
            req.success((resp, status) => {
                if(status === 200 & resp.status === 200) {
                    callback(resp.data);
                }
            });
            return req;
        },
        $post(url, callback) {
            const req = this.$http.post(url);
            req.success((resp, status) => {
                if(status === 200 & resp.status === 200) {
                    callback(resp.data);
                }
            });
            return req;
        },
        $delete(url, callback) {
            const req = this.$http.delete(url);
            req.success((resp, status) => {
                if(status === 200 & resp.status === 200) {
                    callback(resp.data);
                }
            });
            return req;
        }
    }
}
