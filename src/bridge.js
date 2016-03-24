import Q from 'q';

const isMobile = /android|iphone|ipod|ipad/i.test(navigator.userAgent);

let adapter = {
    callHandler(handler, params, cb) {
        if(handler === 'user') {
            let user = {
  //           "gender" : "0",
  // "phone" : "15871705303",
  // "nickname" : "余长春",
  // "delete_flag" : "0",
  // "role" : "4",
  // "id" : "1023",
  // "create_at" : "1451999342000",
  // "photo" : "9c7af84f-4dbd-43bc-b3b7-c3de865f1d36",
  // "token" : "a13c66d6-5bca-4add-95b9-784ce1042977"
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
