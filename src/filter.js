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
        } else {
            const diffDays = Math.ceil((now - d) / DAY) // 这里需要用now - d，而不是diff
            if (diffDays < 8) {
                m = diffDays + '天前'
            } else {
                m = dateformat(d, 'yyyy-mm-dd')
            }
        }
        return m
    },

    truncate(str='', length) {
        return _.truncate(str, {length})
    },

    price(cents, zero='面议') {
        if (_.isNumber(cents) && cents >= 0) {
            return ('￥' + (cents/100).toFixed(2)).replace(/\.00$/, '')
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
            let evt = (/myxx/i.test(window.navigator.userAgent)) ?
                `onclick="WebViewJavascriptBridge.callHandler('profile', {id:''+${id}})"` :
                `onclick="{event.preventDefault();location.href='/user/${id}'}"`

            return `<a style="color: #527fb0" ${evt}>@${name}</a>`
        }
        return content ? content.replace(/\n/g, '<br>').replace(/\[\:(\d+)_([^\]]+?)\]/g, at) : ''
    },

    content(desc) {
        let content = desc ? desc.replace(/</g, '&lt').replace(/>/g, '&gt') : ''
        if(/\[.{1,3}?\]/.test(content)) {
            content = content.replace(/\[(.{1,3}?)\]/g, alt => {
                const i = this.config.emoji.indexOf(alt.replace(/\[|\]/g, ''))
                return i === -1 ? alt : `<img src="${this.config.www}/emoji/${i}.png" alt="${alt}" />`
            })
        }
        return content
    },

    duration(duration) {
        const padZero = val => _.padStart(val, 2, '0')
        return `${padZero(parseInt(duration/60))}:${padZero(duration%60)}`
    },

    diffNowTime(targetTime) {
        const nowMills = new Date().getTime()
        if (!targetTime || nowMills >= targetTime) {
            return
        }
        let least = targetTime - nowMills

        const SECOND_IN_MILLIS = 1000
        const MINUTE_IN_MILLIS = SECOND_IN_MILLIS * 60
        const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60
        const DAY_IN_MILLIS = HOUR_IN_MILLIS * 24

        const res = []
        if (least > DAY_IN_MILLIS) {
            const day = Number.parseInt(least/DAY_IN_MILLIS)
            res.push(day + '天')
            least -= day * DAY_IN_MILLIS
        }
        if (least > HOUR_IN_MILLIS) {
            const hour = Number.parseInt(least/HOUR_IN_MILLIS)
            res.push(hour + '时')
            least -= hour * HOUR_IN_MILLIS
        }
        if (least > MINUTE_IN_MILLIS) {
            const minutes = Number.parseInt(least/MINUTE_IN_MILLIS)
            res.push(minutes + '分')
            least -= minutes * MINUTE_IN_MILLIS
        }
        if (least > SECOND_IN_MILLIS) {
            const seconds = Number.parseInt(least/SECOND_IN_MILLIS)
            res.push(seconds + '秒')
            least -= seconds * SECOND_IN_MILLIS
        }
        return res.join(' ')
    }
}
export default {
    install(Vue) {
        _.each(filters, (fn, name) => {
           Vue.filter(name, fn)
        })
    }
}
