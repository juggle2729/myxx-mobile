import Q from 'q';
import emitter from './util/emitter';

let userPromise;  // 把wx用户接口缓存起来，防止多次请求报错

const adapter = {
    callHandler(handler, params, cb) {
        switch(handler) {
            case 'login':
                this.$store.remove('user'); // 清除本地用户缓存
                if(this.env.isWechat) {
                    location.href = 'http://activity.meiyuxiuxiu.com/?wechat_auth=true&redirect_uri='+encodeURIComponent(location.href);
                } else if(this.env.isBrowser && this.env.isTest) {
                    this.$root.popup = _.merge({}, params, {handler, cb});
                } else {
                    location.href = this.config.download;
                }
                break;
            case 'user': {
                let user = this.$store.get('user');
                if(user) {
                    cb(user);
                } else if(this.$route.query.code) {
                    if(!userPromise) {
                        userPromise = this.$http.post('users/login/wx', {code: this.$route.query.code, device_type: 0, wx_type: 'web'}).promise;
                    }
                    Q.when(userPromise, resp => {
                            console.debug('get user', resp);
                            user = resp.data.data;
                            this.$store.set('user', user);
                            cb(user);
                        }, () => {  // 获取用户失败
                            cb();
                        });
                } else {
                    cb();
                }
                break;
            }
            case 'coverflow':
                if(window.WeixinJSBridge) {
                    let urls = params.ids.split(',').map((id) => {return this.config.img + id;});
                    window.WeixinJSBridge.invoke('imagePreview', {
                        urls,
                        current: urls[+params.index]
                    });
                } else {
                    this.$root.popup = _.merge({}, params, {handler, cb});
                }
                break;
            case 'updateTitle':
                document.title = params.text;
                if(this.env.isWechat && this.env.isIOS) {
                    // hack在微信等webview中无法修改document.title的情况
                    var iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.src = '//o0x80w5li.qnssl.com/logo.png';
                    iframe.onload = () => {
                       _.delay(() => {
                           iframe.onload = _.noop;
                           iframe.parentNode.removeChild(iframe);
                       }, 0);
                    };
                    document.body.appendChild(iframe);
                }
                break;
            case 'open':
                window.open(params.url);
                break;
            case 'back':
                window.history.go(-params.step);
                break;
            case 'play':
            case 'keyboard':
            case 'datetime':
            case 'share':
            case 'toast':
            case 'delete':
            case 'confirm':
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
            if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => { document.documentElement.removeChild(WVJBIframe) }, 0);
        })((bridge) => {
            bridge.registerHandler('back', () => emitter.emit('back'));
            bridge.registerHandler('checkShare', (response) => emitter.emit('checkShare', response));
            defer.resolve(bridge);
        });
    } else {
        ((w, cb) => {
            if (w.WebViewJavascriptBridge) {
                cb(w.WebViewJavascriptBridge);
            } else {
                w.document.addEventListener('WebViewJavascriptBridgeReady', () => {
                    cb(w.WebViewJavascriptBridge);
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
