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
        action(action, params = '') {
            if (window.WebViewJavascriptBridge) {
                window.WebViewJavascriptBridge.callHandler(action, params);
            } else {
                this.toast('😁请在APP里玩！');
            }
        },
    }
}
