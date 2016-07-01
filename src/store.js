import config from './config';

const db = window.localStorage;
const prefix = 'myxx-' + (config.api.match(/^\/\/(\d)/) ? 'docker' : (config.api.match(/\/\/(\w+)?.?api/).pop() || 'prod')) + '-';

/**
 * 对localStorage进行封装，更易用
 * 注意：所有key默认都为string类型
 */
const store = {

    set(k, v='') {
        db.setItem(prefix + k, _.isObjectLike(v) ? JSON.stringify(v) : v);
    },

    get(k, v=null) {
        const item = db.getItem(prefix + k);
        return item !== null ? JSON.parse(item) : v;
    },

    remove(k) {
        db.removeItem(prefix + k);
    }
};

export default {
    install(Vue) {
        Vue.prototype.$store = store;
    }
};
