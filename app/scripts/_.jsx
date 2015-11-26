// Vue configurations
Vue.config.debug = true;
Vue.http.options.root = 'http://120.26.113.13/';
Vue.http.headers.common['X-Auth-Token'] = 'f87e7796-9896-4a6f-997e-11b48aebd347';
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
        src = /^https?/.test(id) ? id : _.IMG + id;
    } else {
        src = '/images/avatar--defaut.jpg';
    }
    return src;
});
Vue.filter('money', (number) => {
    return number / 10000 + '万';
});

// helper functions
(function(w) {
    w._ = {};
    //  提示消息
    _.toast = function(msg, delay = 2000) {
        const span = document.createElement('span');
        span.innerText = msg;
        span.className = 'toast visible';
        document.body.appendChild(span);
        setTimeout(() => span.parentNode.removeChild(span), delay);
    };

    //  获取地址栏参数
    _.query = function(key) {
        const query = {};
        const pairs = (location.search ? decodeURI(location.search).substr(1).split('&') : []);
        pairs.forEach(pair => {
            const [k, v] = pair.split('=');
            query[k] = v;
        });
        return key ? query[key] : query;
    };
})(window);

const scrollHandler = window.document.body.dataset.scroll;
if(scrollHandler !== undefined) {
    // 处理滚动
    const scrollListener = (function(w) {
        let lastPos = w.scrollY;
        return function() {
            clearTimeout(timer);
            let timer = setTimeout(function() {
                const delta = w.scrollY - lastPos;
                if(delta > 0) {
                    w[scrollHandler].$emit('scroll', 'down', w.scrollY);
                } else if(delta < 0) {
                    w[scrollHandler].$emit('scroll', 'up', w.scrollY);
                }
                lastPos = window.scrollY;
            }, 50);
        };
    })(window);
    window.document.addEventListener('scroll', scrollListener, false);
}
