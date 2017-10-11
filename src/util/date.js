export default {
    diffNowTime(targetTime, showSeconds = true, nowMills = Date.now()) {
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
        if (showSeconds && (res.length > 0 || least > SECOND_IN_MILLIS)) {
            const seconds = Number.parseInt(least/SECOND_IN_MILLIS)
            res.push(seconds + '秒')
            least -= seconds * SECOND_IN_MILLIS
        }
        return res.join('')
    }
}