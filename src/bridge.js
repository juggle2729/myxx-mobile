import Q from 'q';

const isMobile = /android|iphone|ipod|ipad/i.test(navigator.userAgent);

let adapter = {
    callHandler(handler, params, cb) {
        if(handler === 'user') {
            let user = {};
            cb(JSON.stringify(user));
        }
        else if(handler === 'delete') {
            cb.call(this, window.confirm('删除评论？') ? '1' : '0');
        }
        else if(handler === 'play') {
            let playlist = [params.id];
            // targetType 可选值 topic,jianbao,jianbaoresult
            if(params.targetType === 'result' && _.get(this.evaluation.ad_video)) {
                playlist.splice(1, 0, this.evaluation.ad_picture, this.evaluation.ad_video);
            } 
            // TEST
            // else {
            //     playlist.splice(1, 0, '6bb0eeb4-8b16-4e34-b504-4424883988a8', '422e4af4-70e1-401f-9287-97438022fbb1');
            // }
            this.$root.playlist = playlist;
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
} else {
    defer.resolve(adapter);
}

export default defer.promise;
