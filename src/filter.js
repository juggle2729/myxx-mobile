import config from './config';
function moment(time) {
    let m = '神秘时间';
    if(typeof time !== 'number') {
        return m;
    }
    const [d, now] = [new Date(time), new Date()];
    const diff = now - d;
    const MINUTE = 1000 * 60;
    const HOUR = 60 * MINUTE;
    const DAY = HOUR * 24;
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    const YESTERDAY = now.getTime();

    if(d.getTime() >= YESTERDAY) { //今天
        if (diff <= MINUTE) {
            m = '刚刚';
        } else if (diff <= HOUR) {
            m = Math.ceil(diff / MINUTE) + '分钟前';
        } else {
            m = Math.floor(diff / HOUR) + '小时前';
        }
    } else if(d.getTime() >= (YESTERDAY - DAY)) { // 昨天
        m = `昨天${d.getHours()}:${d.getMinutes() < 10 ? '0' :''}${d.getMinutes()}`;
    } else { // N天前
        m = Math.ceil((now - d) / DAY) + '天前';  // 这里需要用now - d，而不是diff
    }

    return m;
}

function truncate(str, len) {
    if (!str) {
        return '';
    }
    return str.length > len ? str.substr(0, len) + '...' : str;
}

function profile(user) {
    const [id, tab] = [user.id, user.shop_status ? 'jade' : 'story'];
    return {name: 'user', params: {id, tab}};
}

function price(num, unit = '￥') {
    num = Number(num);
    if (num === 0) {
        return '面议';
    } else if (Number.isNaN(num)) {
        num = 0;
    }

    return unit + num.toFixed(2);
}

function role(id) {
    return config.roles[id];
}

function type(id) {
    return config.types[id];
}

function qn(path) {
    return config.www + path;
}

function tree(tr) {
    return tr ? (tr.parent ? `${tr.parent.name}—${tr.name}` : `${tr.name}`) : '无';
}

export default {
    install(Vue, options) {
        Vue.filter('moment', moment);
        Vue.filter('role', role);
        Vue.filter('type', type);
        Vue.filter('profile', profile);
        Vue.filter('price', price);
        Vue.filter('truncate', truncate);
        Vue.filter('qn', qn);
        Vue.filter('tree', tree);
    }
}
