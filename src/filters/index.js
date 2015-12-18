import config from '../config';
export function moment(dateStr) {
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
}

export function money(number) {
    return number / 10000 + '万';
}

export function role(id) {
    return config.roles[id];
}

export function type(id) {
    return config.types[id];
}
