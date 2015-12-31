import Q from 'q';

const isMobile = /android|iphone|ipod|ipad/i.test(navigator.userAgent);

let adapter = {
    callHandler(handler, params, cb) {
        if(handler === 'user') {
            let user = {
                id: "2",
                //id: "1007",
                nickname: "chchyu",
                phone: "15871705303",
                photo: "1287933.jpeg",
                role: "4",
                token: "f87e7796-9896-4a6f-997e-11b48aebd347"
                //token: "ea8f2d2a-0db7-4109-851b-93f7e47cb937"
            };
            cb(JSON.stringify(user));
        } else if(handler === 'keyboard') {
            if(!isMobile) {
                let comment = prompt("少年，来鉴宝吧！");
                comment && cb(comment);
            }
        } else {
            if(!isMobile) {
                const span = document.createElement('span');
                span.innerText = handler;
                span.className = 'toast white visible';
                document.body.appendChild(span);
                setTimeout(() => span.parentNode.removeChild(span), 2000);
            }
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
