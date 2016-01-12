//API请求cache，key为API url
//数据同步,key为API url + 数据路径
const storage = window.localStorage;
let store = {
    // ENV, USER
    get(k) {
        return JSON.parse(this.getString(k));
    },
    getString(k) {
        return storage.getItem(k);
    },
    set(k, v) {
        if(v !== undefined && v !== null) {
            if(typeof v === 'object') {
                v = JSON.stringify(v);
            }
            return storage.setItem(k, v);
        }
    },
    remove(k) {
        return storage.removeItem(k);
    }
}

export default {
    install(Vue, options) {
        Vue.prototype.$store = store;
    }
}