import Q from 'q'
import emitter from './util/emitter'

const adapter = {
    callHandler(handler, params, cb) {
        switch(handler) {
            case 'login':
                this.$store.remove('user') // 清除本地用户缓存
                this.$store.remove('bindPhone') // 清除本地用户绑定手机号意愿
                if(this.env.isWechat) {
                    location.href = 'http://www.meiyuxiuxiu.com/wechat?redirect_uri=' + encodeURIComponent(location.href)
                } else if(this.env.isBrowser && this.env.isTest) {
                    this.$root.popup = _.merge({}, params, {handler, cb})
                } else {
                    location.href = this.config.download
                }
                break
            case 'user': {
                let user = this.$store.get('user')
                if(user) {
                    cb(user)
                } else if(this.$route.query.wxuser) {
                    const user = JSON.parse(decodeURIComponent(this.$route.query.wxuser))
                    this.$store.set('user', user)
                    cb(user)
                    this.$router.replace(_.merge(_.pick(this.$route, 'name', 'params'), {query: _.omit(this.$route.query, 'wxuser')}))
                } else {
                    cb()
                }
                break
            }
            case 'coverflow':
                if(window.WeixinJSBridge) {
                    let urls = params.ids.split(',').map(id => {
                        if (/^http/.test(id)) return id
                        return this.config.img + id + (_.includes(id, '_') ? '' : '_750')
                    })
                    window.WeixinJSBridge.invoke('imagePreview', {
                        urls,
                        current: urls[+params.index]
                    })
                }
                break
            case 'updateTitle':
                document.title = params.text
                if(this.env.isWechat && this.env.isIOS) {
                    // hack在微信等webview中无法修改document.title的情况
                    const iframe = document.createElement('iframe')
                    iframe.style.display = 'none'
                    iframe.src = '//o0w8taeuo.qnssl.com/static/logo.png'
                    iframe.onload = () => {
                       _.delay(() => {
                           iframe.onload = _.noop
                           iframe.parentNode.removeChild(iframe)
                       }, 0)
                    }
                    document.body.appendChild(iframe)
                }
                break
            case 'open':
                window.open(params.url)
                break
            case 'back':
                window.history.go(-params.step)
                break
            case 'play':
            case 'keyboard':
            case 'datetime':
            case 'share':
            case 'toast':
            case 'delete':
            case 'confirm':
            case 'bindPhone':
                this.$root.popup = _.merge({}, params, {handler, cb})
                break
            case 'shareable':
            case 'toggleTopRefresh':
            case 'version':
                break
            case 'newPurchase':
            case 'newJade':
            case 'newBid':
                if(this.env.version < 2.0) {
                    location.href = this.config.download
                }
                break
            case 'newSale':
            case 'newDemand':
                if(this.env.version < 2.1) {
                    location.href = this.config.download
                }
                break
            default:
                console.debug(handler)
        }
    }
}

let defer = Q.defer()
if(/myxx/i.test(navigator.userAgent)) {
    //"MYXX/iOS/1.2;..."
    // iOS v1.2后采用新的 WebviewBridge 注入方式[忽略1.2以下版本]
    if(/ios/i.test(navigator.userAgent)) {
        ((callback) => {
            if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
            window.WVJBCallbacks = [callback]
            var WVJBIframe = document.createElement('iframe')
            WVJBIframe.style.display = 'none'
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
            document.documentElement.appendChild(WVJBIframe)
            setTimeout(() => { document.documentElement.removeChild(WVJBIframe) }, 0)
        })((bridge) => {
            bridge.registerHandler('back', () => emitter.emit('back'))
            bridge.registerHandler('replySuccess', () => emitter.emit('reply_success'))
            defer.resolve(bridge)
        })
    } else {
        ((w, cb) => {
            if (w.WebViewJavascriptBridge) {
                cb(w.WebViewJavascriptBridge)
            } else {
                w.document.addEventListener('WebViewJavascriptBridgeReady', () => {
                    cb(w.WebViewJavascriptBridge)
                }, false)
            }
        })(window, (bridge) => {
            defer.resolve(bridge)
            if(!bridge.initalized) {
                bridge.initalized = true // 防止bridge多次初始化报错
                bridge.init(_.noop)
            }
        })
    }
} else {
    defer.resolve(adapter)
}

// TOOPTIMIZE:  安卓使用loadURL方式通知页面回复成功
window.replySuccess = () => emitter.emit('reply_success')

export default defer.promise
