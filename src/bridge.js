import Q from 'q';

const isMobile = /android|iphone|ipod|ipad/i.test(navigator.userAgent);

let adapter = {
    callHandler(handler, params, cb) {
        if(handler === 'user') {
            let user = {
            //   "id" : "2",
            //   "token" : "cb111493-2fe1-4eda-a6d3-40ea5e475f40"
            // ,
            //   "gender" : "1",
            //   "phone" : "15871705303",
            //   "nickname" : "余长春",
            //   "role" : "8",
            //   "delete_flag" : "0",
            //   "create_at" : "1448249072000",
            //   "photo" : "47a31e63-bb96-4e05-8d4e-dae351ab0515",
            //   "locale_id" : "269"
            };
            cb(JSON.stringify(user));
        }
        // else if(handler === 'keyboard') {
        //     if(!isMobile) {
        //         let comment = prompt("少年，来鉴宝吧！");
        //         comment && cb(comment);
        //     }
        // }
        else if(handler === 'delete') {
            cb.call(this, window.confirm('删除评论？') ? '1' : '0');
        }
        else if(handler === 'play') {
            this.$root.video = params.id;
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
        } else if(['shareable', 'toggleTopRefresh'].indexOf(handler) === -1) {
            const toast = document.querySelector('.toast');
            if(toast) {
                toast.parentNode.removeChild(toast);
            }
            const span = document.createElement('span');
            span.className = 'toast white visible font-30';
            if(isMobile) {
                span.innerText = '请在【美玉秀秀】里使用该功能';
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
            bridge.init(() => {});
        }
    });
} else {
    defer.resolve(adapter);
}

export default defer.promise;
