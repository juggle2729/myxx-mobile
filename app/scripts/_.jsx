/**
 * Created by gimm on 8/18/15.
 */

(function(w) {
    if (w._) {
        return console.warn('_ 已经存在!');
    }

    var helper = {
        clickOrTap: ('ontouchend' in w ? 'tap' : 'click')
    };
    if (/licaishi/.test(location.host)) {
        helper.API = /licaishi-dev/.test(location.host) ? 'http://api-dev.dahuo.la/api/v1/lcs/' : 'http://api.dahuo.la/api/v1/lcs/';
        helper.user = {
            id: '100919',
            token: '5f3b848f-5983-4485-a124-2e1265a6101a'
        };
    } else {  // 线下
        helper.API = 'http://10.11.255.106:9092/api/v1/lcs/'; // API root
        helper.user = {
            id: '128',
            token: '05bd3744-ee7f-4ce1-bb97-00092fe46f6a'
        };
    }
    if (w.lcs) {
        helper.user.id = lcs.getUserId();
        helper.user.token = lcs.getToken();
    }
    w._ = helper;
    //  数据请求
    helper.request = function(path, method) {
        const options = {
            url: /^https?/.test(path) ? path : this.API + path,
            dataType: 'json',
            cache: false,
            // application/x-www-form-urlencoded; charset=utf-8
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-User': this.user.id,
                'X-Auth-Token': this.user.token
            },
            type: (method || 'GET')
        };
        return $.ajax(options).done(function(res) {
            if (res.status !== 0 && !res.message) {
                if(w.lcs) {
                    w.lcs.onJsFailed('请检查网络后下拉刷新');
                } else {
                    helper.toast('请检查网络后下拉刷新');
                }
            }
        }).fail(function() {
            if(w.lcs) {
                w.lcs.onJsFailed('请检查网络后下拉刷新');
            } else {
                // helper.toast('💔请求失败！');
                helper.toast('请检查网络后下拉刷新');
            }
        });
    };

    //  事件发布和订阅
    helper._topics = {};
    helper.publish = function(topic, data, context) {
        const callbacks = (this._topics[topic] || []);
        if (callbacks.length === 0) {
            //  console.warn('no callback for topic', topic);
        }
        callbacks.forEach(cb => {
            cb.call(context, data);
        });
    };

    helper.subscribe = function(topic, fn) {
        this._topics[topic] = (this._topics[topic] || []);
        this._topics[topic].push(fn);
    };

    //  提示消息
    helper.toast = function(msg, delay = 2000) {
        const span = $('<span/>', {
            text: msg,
            class: 'toast visible'
        });
        span.appendTo(document.body);
        setTimeout(() => span.remove(), delay);
    };

    //  页面切换
    helper.go = function(href) {
        if (typeof href !== 'string') {
            const target = href.currentTarget;
            href = target.href || target.dataset.href;
        }

        href = /^http?/.test(href) ? href : _getUrl(href);

        if (w.lcs) {
            w.lcs.go(href);
        } else {
            location.href = href;
        }
        return false;
    };

    helper.action = function(action) {
        if (w.lcs) {
            const params = Array.prototype.slice.call(arguments, 1);
            lcs[action].apply(lcs, params);
        } else {
            this.toast('😁请在APP里玩！');
        }
    };

    //  获取地址栏参数
    helper.query = function(key) {
        const query = {};
        const pairs = (location.search ? decodeURI(location.search).substr(1).split('&') : []);
        pairs.forEach(pair => {
            const [k, v] = pair.split('=');
            query[k] = v;
        });
        return key ? query[key] : query;
    };

    //  拼接url地址
    function _getUrl(href) {
        if (href.split('#').shift().indexOf('://') !== -1) {
            return href;
        } else if (href.indexOf('/') === 0) {
            return location.origin + href;
        }
        const uri = location.href.split('#').shift().split('/');
        const h = href.split('/');

        uri.pop();
        for (let i = 0, l = h.length; i < l; i++) {
            if (h[i] === '..') {
                uri.pop();
            } else if (h[i] === '.') {
                continue;
            } else {
                uri.push(h[i]);
            }
        }
        return uri.join('/');
    }

    Handlebars.registerHelper({
        date: (milliseconds, fmt) => {
            const date = new Date(milliseconds);
            fmt = $.isPlainObject(fmt) ? 'MM月dd日' : fmt;
            const o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (const k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
            return fmt;
        }
    });
    // reset base font size
    (() => {
        let resizing = null;
        function adjustBase() {
            const clientWidth = document.body.clientWidth;
            document.querySelector('html').style['font-size'] = (clientWidth / 100) + 'px';
            resizing = null;
        }
        adjustBase();
        window.onresize = function() {
            if (resizing) {
                clearTimeout(resizing);
            }
            resizing = setTimeout(adjustBase, 100);
        };
    })();
})(window);
