import Q from 'q';

const isMobile = /android|iphone|ipod|ipad/i.test(navigator.userAgent);

let adapter = {
    callHandler(handler, params, cb) {
        if(handler === 'user') {
            let user = {
              // "id" : "2",
              // "token" : "e90a3655-bac2-478c-841f-a7f39f878f9d",
              // "gender" : "1",
              // "phone" : "15871705303",
              // "nickname" : "余长春",
              // "delete_flag" : "0",
              // "role" : "4",
              // "create_at" : "1448249072000",
              // "photo" : "1287933.jpeg"
            };
            cb(JSON.stringify(user));
        } 
        // else if(handler === 'keyboard') {
        //     if(!isMobile) {
        //         let comment = prompt("少年，来鉴宝吧！");
        //         comment && cb(comment);
        //     }
        // } 
        else if(handler === 'play') {
            this.$root.video = params.id;
        } else if(handler === 'coverflow') {
            this.$root.img = {
                ids: params.ids.split(','),
                i: +params.index
            }
        } else if(handler !== 'shareable'){
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
