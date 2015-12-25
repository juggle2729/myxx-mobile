import Q from 'q';

let adapter = {
    callHandler(handler, params, cb) {
        console.log(handler, params, cb);
        if(handler === 'user') {
            let user = {
                id: "2",
                nickname: "chchyu",
                phone: "15871705303",
                photo: "1287933.jpeg",
                role: "4",
                token: "984bbe6e-191f-44f6-88b0-ee6ee349e85b"
            };
            cb(JSON.stringify(user));
        } else if(handler === 'keyboard') {
            let comment = prompt("少年，来鉴宝吧！");
            comment && cb(comment);
        } else {
            const span = document.createElement('span');
            span.innerText = handler;
            span.className = 'toast white visible';
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