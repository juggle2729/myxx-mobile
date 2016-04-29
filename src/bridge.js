import Q from 'q';

const adapter = {
    callHandler(handler, params, cb) {
        switch(handler) {
            case 'login':
                localStorage.removeItem('MYXX_USER'); // 清楚本地用户缓存
                if(this.env.isWechat) {
                    location.href = 'http://activity.meiyuxiuxiu.com/?wechat_auth=true';
                } else if(this.env.isBrowser) {
                    this.$root.popup = _.merge({}, params, {handler, cb});
                }
                break;
            case 'user':
                if(localStorage.getItem('MYXX_USER')) {
                    cb(localStorage.getItem('MYXX_USER'));
                } else if(this.$route.query.code) {
                    this.$http.post('users/login/wx', {code: this.$route.query.code, device_type: 0, wx_type: 'web'})
                        .then((resp) => {
                            const user = JSON.stringify(resp.data.data);
                            localStorage.setItem('MYXX_USER', user);
                            cb(user);
                        });
                } else {
                    cb();
                }
                break;
            case 'playCourses':
                this.$root.popup = {
                        handler: 'play', 
                        params: {
                            id: params.courseVideoId,
                            ads: [params.portraitId, params.productVideoId],
                            cb: fn => fn()
                        }
                    };
                break;
            case 'coverflow':
                if(window.WeixinJSBridge) {
                    let urls = params.ids.map((id) => {return this.config.img + id;});
                    WeixinJSBridge.invoke('imagePreview', {
                        urls,
                        current: urls[+params.index]
                    });
                } else {
                    this.$root.popup = _.merge({}, params, {handler, cb});
                }
                break;
            case 'play':
            case 'keyboard':
            case 'share':
            case 'toast':
            case 'delete':
                this.$root.popup = _.merge({}, params, {handler, cb});
                break;
            case 'shareable':
            case 'toggleTopRefresh':
            case 'version':
                break;
            default:
                console.debug(handler);
        }
    }
};

let defer = Q.defer();
if(/myxx/i.test(navigator.userAgent)) {
    //"MYXX/iOS/1.2;..."
    // iOS v1.2后采用新的 WebviewBridge 注入方式
    if(/ios/i.test(navigator.userAgent) && (+navigator.userAgent.split(';')[0].split('/').pop() > 1.1)) {
        ((callback) => {
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => { document.documentElement.removeChild(WVJBIframe) }, 0);
        })((bridge) => {
            defer.resolve(bridge);
        });
    } else {
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
                bridge.init(_.noop);
            }
        });
    }
} else {
    defer.resolve(adapter);
}

export default defer.promise;
