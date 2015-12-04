// Vue configurations
Vue.config.debug = true;
Vue.http.options.root = 'http://120.26.113.13';
Vue.http.options.success = function(resp) {
    // if(resp.status !== 200) {
    this.toast('global resp hanlder', resp.message);
    // }
};
let appCookie = {
    token: 'edb85165-b4b6-46f0-89db-3067e5c51742'
};
if(document.cookie) {
    try {
        document.cookie.split(/;\s+/).forEach((pair) => {
            let [k, v] = pair.split('='); 
            appCookie[k] = v;
        });
    } catch(e) {
        console.log('no user token found!');
    }
}
Vue.http.headers.common['X-Auth-Token'] = appCookie.token;
Vue.http.options.error = function() {
    this.toast('后台出错了~');
};

Vue.filter('moment', (dateStr) => {
    const MINUTE = 1000 * 60;
    const HOUR = 60 * MINUTE;
    const DAY = HOUR * 24;
    const date = new Date(dateStr);
    const diff = new Date() - new Date(dateStr);
    let m = '';
    if (!isNaN(date.valueOf())) {
        if (diff <= MINUTE) {
            m = '刚刚';
        } else if (diff <= HOUR) {
            m = Math.floor(diff / MINUTE) + '分钟前';
        } else if (diff <= DAY) {
            m = Math.floor(diff / HOUR) + '小时前';
        } else {
            m = Math.floor(diff / DAY) + '天前';
        }
    }
    return m;
});
Vue.filter('img', (id) => {
    let src;
    if (id) {
        src = /^https?/.test(id)
            ? id
            : _.IMG + id;
    } else {
        src = '/images/avatar--defaut.jpg';
    }
    return src;
});
Vue.filter('money', (number) => {
    return number / 10000 + '万';
});
Vue.mixin({
    created() {
        const result = this.init();
        if(typeof result === 'object' && result.then) {
            result.then(() => {
                this.$el.classList.remove('loading');
            });
        }
    },
    methods: {
        init() {
            console.warn('init not implemented!');
        },
        action(action, params = '', callback = x => console.log(x)) {
            if (window.WebViewJavascriptBridge) {
                window.WebViewJavascriptBridge.callHandler(action, params, callback);
            } else {
                this.toast('😁请在APP里玩！');
            }
        },
        toast(msg, delay = 2000) {
            console.log('resp message', msg);
            const span = document.createElement('span');
            span.innerText = msg;
            span.className = 'toast visible';
            document.body.appendChild(span);
            setTimeout(() => span.parentNode.removeChild(span), delay);
        },
        // 页面跳转
        go(path) {
            if(window.WebViewJavascriptBridge) {
                window.WebViewJavascriptBridge.callHandler('go', {url: _getUrl(path)});
            } else {
                location.href = path;
            }

            function _getUrl(href) {
                if (href.split('#').shift().indexOf('://') !== -1) {
                    return href;
                } else if (href.indexOf('/') === 0) {
                    return location.origin + href;
                }
                let uri = location.href.split('#').shift().split('/'),
                    h = href.split('/');
                uri.pop();
                for (let i = 0, l = h.length; i < l; i++) {
                    if (h[i] === '..') {
                        uri.pop();
                    } else if (h[i] !== '.') {
                        uri.push(h[i]);
                    }
                }
                return uri.join('/');
            }

        }
    }
});
// helper functions
(function(w) {
    w._ = {};
    //  获取地址栏参数
    _.query = function(key) {
        const query = {};
        const pairs = (location.search
            ? decodeURI(location.search).substr(1).split('&')
            : []);
        pairs.forEach(pair => {
            const [k,
                v] = pair.split('=');
            query[k] = v;
        });
        return key
            ? query[key]
            : query;
    };
})(window);

const scrollHandler = window.document.body.dataset.scroll;
if (scrollHandler) {
    // 处理滚动
    const scrollListener = (function(w) {
        let lastPos = w.scrollY;
        let timer;
        return function() {
            timer && clearTimeout(timer);
            timer = setTimeout(function() {
                // 滚动方向检测
                const delta = w.scrollY - lastPos;
                if (delta > 0) {
                    w[scrollHandler].$emit('scroll', 'down', w.scrollY);
                } else if (delta < 0) {
                    w[scrollHandler].$emit('scroll', 'up', w.scrollY);
                }
                // 滚动触底检测
                function getDocHeight() {
                    const doc = w.document;
                    return Math.max(
                        doc.body.scrollHeight, doc.documentElement.scrollHeight,
                        doc.body.offsetHeight, doc.documentElement.offsetHeight,
                        doc.body.clientHeight, doc.documentElement.clientHeight
                    );
                }
                const bottom = getDocHeight() - w.scrollY - w.document.body.clientHeight;
                if(delta > 0 && bottom <= 50) {
                    w[scrollHandler].$emit('scroll', 'down', w.scrollY);
                }
                lastPos = window.scrollY;
            }, 50);
        };
    })(window);
    window.document.addEventListener('scroll', scrollListener, false);
}