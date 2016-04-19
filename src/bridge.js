import Q from 'q';

const isMobile = /android|iphone|ipod|ipad/i.test(navigator.userAgent);

let adapter = {
    callHandler(handler, params, cb) {
        if(handler === 'user') {
            let user = {
              // "supportCount" : 31,
              // "id" : "5011",
              // "fansCount" : 4,
              // "phone" : "15871705303",
              // "followCount" : 4,
              // "followStatus" : false,
              // "wxNickname" : "余长春",
              // "avatarId" : "bd28a8d4-020f-4cb7-948f-80aecd09f336",
              // "shaibaCount" : 1,
              // "hasWebsite" : false,
              // "userId" : "5011",
              // "hasShop" : false,
              // "token" : "3dbcf04d-4e89-443a-a9d4-11c923030e8e",
              // "jianbaoCount" : 0,
              // "role" : "0",
              // "nickname" : "余小二",
              // "gender" : "0"
            };
            cb(JSON.stringify(user));
        }
        else if(handler === 'delete') {
            cb.call(this, window.confirm('删除评论？') ? '1' : '0');
        }
        else if(handler === 'play') {
            let playlist = [params.id];
            if(params.targetType === 'result') {
                const result = _.get(this, 'evaluation.results')
                    .filter((result) => result.video === params.id)
                    .pop();
                if(result.ad_picture && result.ad_video) {
                    playlist.splice(1, 0, result.ad_picture, result.ad_video);
                }
            } 
            this.$root.playlist = playlist;
            if(this.env.isShare) {
                _.delay(() => { // 播放统计                
                    this.$get('log/video_play', {
                            id: this.$route.params.id, 
                            type: this.config.shareables[this.$route.name],
                            percentage: -1
                        }).then(_.noop);
                }, 3000);
            }
        } else if(handler === 'coverflow') {
            if(window.WeixinJSBridge) {
                let urls = params.ids.split(',').map((id) => {return this.config.img + id;});
                WeixinJSBridge.invoke('imagePreview', {
                    urls,
                    current: urls[+params.index]
                });
            } else {
                this.$root.img = {
                    ids: params.ids.split(','),
                    i: +params.index
                }
            }
        } else if(handler === 'share') {
            const backdrop = document.querySelector('#hint-with-backdrop');
            backdrop.classList.add('share');
            backdrop.classList.add('show');
        } else if(['shareable', 'toggleTopRefresh', 'version'].indexOf(handler) === -1) {
            const toast = document.querySelector('.toast');
            if(toast) {
                toast.parentNode.removeChild(toast);
            }
            const span = document.createElement('span');
            span.className = 'toast white visible font-30';
            if(isMobile) {
                location.href = this.config.download;
            } else {
                span.innerText = handler;
            }
            document.body.appendChild(span);
            setTimeout(() => span.parentNode.removeChild(span), 2000);
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
