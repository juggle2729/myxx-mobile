const SECOND_IN_MILLIS = 1000
const MINUTE_IN_MILLIS = SECOND_IN_MILLIS * 60
const HOUR_IN_MILLIS = MINUTE_IN_MILLIS * 60
const DAY_IN_MILLIS = HOUR_IN_MILLIS * 24
const MOUTH_IN_MILLIS = DAY_IN_MILLIS * 30

const _diffTime = (diff = 0, showSeconds = true) => {
    if (!Number.isInteger(diff)) return []
    const res = []
    if (diff > DAY_IN_MILLIS) {
        const day = Number.parseInt(diff/DAY_IN_MILLIS)
        res.push(day + '天')
        diff -= day * DAY_IN_MILLIS
    }
    if (diff > HOUR_IN_MILLIS) {
        const hour = Number.parseInt(diff/HOUR_IN_MILLIS)
        res.push(hour + '时')
        diff -= hour * HOUR_IN_MILLIS
    }
    if (diff > MINUTE_IN_MILLIS) {
        const minutes = Number.parseInt(diff/MINUTE_IN_MILLIS)
        res.push(minutes + '分')
        diff -= minutes * MINUTE_IN_MILLIS
    }
    if (showSeconds && (res.length > 0 || diff > SECOND_IN_MILLIS)) {
        const seconds = Number.parseInt(diff/SECOND_IN_MILLIS)
        res.push(seconds + '秒')
        diff -= seconds * SECOND_IN_MILLIS
    }
    return res
}

export default {
    /**
     * @returns {string} X天X时X分X秒
     */
    diffNowTime(targetTime, showSeconds = true, nowMills = Date.now()) {
        if (!targetTime || nowMills >= targetTime) return
        return _diffTime(targetTime - nowMills, showSeconds).join('')
    },
    diffTime(targetTime, len = 2) {
        const res = _diffTime(targetTime)
        if (len && Number.isInteger(len)) return res.slice(0, len).join('')
        return res.join('')
    },
    historyDate(targetTime) {
        if (!targetTime) {
            return
        }
        const nowMills = Date.now()
        let diff = nowMills - targetTime
        if (diff >= MOUTH_IN_MILLIS) {
            return '一个月前'
        } else if (diff >= DAY_IN_MILLIS) {
            return Number.parseInt(diff/DAY_IN_MILLIS) + '天前'
        } else if (diff >= HOUR_IN_MILLIS) {
            return Number.parseInt(diff/HOUR_IN_MILLIS) + '小时前'
        } else if (diff >= MINUTE_IN_MILLIS) {
            return Number.parseInt(diff/MINUTE_IN_MILLIS) + '分钟前'
        } else if (diff >= SECOND_IN_MILLIS) {
            return Number.parseInt(diff/SECOND_IN_MILLIS) + '秒前'
        } else {
            return '刚刚'
        }
    }
}