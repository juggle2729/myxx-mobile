import dateformat from 'dateformat'
import config from './config'
const filters = {
    moment(msec) {
        msec = +msec
        let m = '···'
        if(!_.isNumber(msec)) {
            return m
        }
        const [d, now] = [new Date(msec), new Date()]
        const diff = now - d
        const MINUTE = 1000 * 60
        const HOUR = 60 * MINUTE
        const DAY = HOUR * 24
        now.setHours(0)
        now.setMinutes(0)
        now.setSeconds(0)
        now.setMilliseconds(0)
        const YESTERDAY = now.getTime()

        if(d.getTime() >= YESTERDAY) { //今天及以后
            if (diff > 0) {
                if (diff <= MINUTE) {
                    m = '刚刚'
                } else if (diff <= HOUR) {
                    m = Math.ceil(diff / MINUTE) + '分钟前'
                } else {
                    m = Math.floor(diff / HOUR) + '小时前'
                }
            } else {
                if (msec < YESTERDAY + DAY) {
                    m = dateformat(d, '今天 HH:MM')
                } else if (msec >= YESTERDAY + DAY && msec < YESTERDAY + 2 * DAY) {
                    m = dateformat(d, '明天 HH:MM')
                } else if (msec >= YESTERDAY + 2 * DAY && msec < YESTERDAY + 3 * DAY) {
                    m = dateformat(d, '后天 HH:MM')
                } else {
                    m = dateformat(d, 'm月dd日 HH:MM')
                }
            }
        } else if(d.getTime() >= (YESTERDAY - DAY)) { // 昨天
            m = `昨天${d.getHours()}:${d.getMinutes() < 10 ? '0' :''}${d.getMinutes()}`
        } else { // N天前
            m = Math.ceil((now - d) / DAY) + '天前'  // 这里需要用now - d，而不是diff
        }
        return m
    },

    truncate(str='', length) {
        return _.truncate(str, {length})
    },

    price(cents, zero='面议') {
        if (_.isNumber(cents) && cents >= 0) {
            return '￥' + Math.floor(cents/100)
        } else {
            return '￥' + zero
        }
    },

    qn(path) {
        return config.www + path
    },

    date(msec, format='yyyy年m月dd日 H:MM') {
        return dateformat(new Date(msec), format)
    },

    profile(user) {
        const [id, tab] = [user.id, user.shop_status ? 'jade' : 'story']
        return {name: 'user', params: {id, tab}}
    },

    input(content) {
        const at = (match, id, name) => {
            let evt = `href="/user/${id}"`
            if(/myxx/i.test(window.navigator.userAgent)) {
                evt = `onclick="WebViewJavascriptBridge.callHandler('profile', {id:''+${id}})"`
            }
            return `<a class="blue" ${evt}>@${name}</a>`
        }
        return content ? content.replace(/\n/g, '<br>').replace(/\[\:(\d+)_([^\]]+?)\]/g, at) : ''
    }
}
export default {
    install(Vue) {
        _.each(filters, (fn, name) => {
           Vue.filter(name, fn)
        })
    }
}
