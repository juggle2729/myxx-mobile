import config from './config';

const prefix = 'myxx-' + (config.api.match(/^\/\/(\d)/) ? 'docker' : (config.api.match(/\/\/(\w+)?.?api/).pop() || 'prod')) + '-';

/**
 * 对localStorage进行封装，更易用
 * 注意：所有key默认都为string类型
 */
const store = {

    set(k, v='', exp=100*24*60*60*1000) {
        document.cookie = [
                `${prefix + k}=${JSON.stringify(v)}`,
                `expires=${new Date(Date.now()+exp).toUTCString()}`,
                'path=/'
            ].join('; ');
    },

    get(k, v=null) {
        // const item = db.getItem(prefix + k);
        // return item !== null ? JSON.parse(item) : v;
        const cookie = document.cookie ? _.chain(document.cookie).split('; ').map(c => [c.substr(0, c.indexOf('=')), c.substr(c.indexOf('=')+1)]).fromPairs().value() : {};
        return JSON.parse(_.get(cookie, prefix + k, null));
    },

    remove(k) {
        this.set(k, undefined, -1);
    }
};

export default {
    install(Vue) {
        Vue.prototype.$store = store;
    }
};
