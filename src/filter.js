import config from './config';
export function moment(time) {
    const [d, now] = [new Date(time), new Date()];
    const diff = now - d;
    const MINUTE = 1000 * 60;
    const HOUR = 60 * MINUTE;
    const DAY = HOUR * 24;
    const MONTH = DAY * 30; // FIXME
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    const YESTERDAY = now.getTime();
    let m = '';
    if (!isNaN(d.valueOf())) {
        if (diff <= MINUTE) {
            m = '刚刚';
        } else if (diff <= HOUR) {
            m = Math.floor(diff / MINUTE) + '分钟前';
        } else if (d >= YESTERDAY) {
            m = Math.floor(diff / HOUR) + '小时前';
        } else if (d >= (YESTERDAY - DAY )) {
            m = '昨天';
        } else if(diff <= MONTH){
            m = Math.floor(diff / DAY) + '天前';
        } else {
            m = Math.floor(diff / MONTH) + '月前';
        }
    }
    return m;
}

export function money(number) {
    return number / 10000 + '万';
}

export function truncate(str, len) {
    if (!str) {
        return '';
    }
    return str.length > len ? str.substr(0, len) + '...' : str;
}

export function profile(user) {
    const route = {name: 'user-profile', params: {id: user.id}};
    if(+user.role === 3) {
        route.name = 'master';
    }
    return route;
}

export function role(id) {
    return config.roles[id];
}

export function type(id) {
    return config.types[id];
}

export function qn(id) {
    debugger;
    return id;
}
