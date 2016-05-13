import _ from 'lodash';
import dateformat from 'dateformat';
import config from './config';
const filters = {
    moment(msec) {
        msec = +msec;
        let m = '···';
        if(_.isNumber(msec)) {
            return m;
        }
        const [d, now] = [new Date(msec), new Date()];
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
    },

    truncate(str='', length) {
        return _.truncate(str, {length});
    },

    price(cents, unit = '￥') {
        cents = +cents;
        if (_.isNumber(cents) && cents > 0) {
            let arr = _.padStart(cents, 3, 0).split('');
            arr.splice(-2, 0, '.');
            return unit + arr.join('');
        } else {
            return '面议';
        }
    },

    role(id) {
        return config.roles[id];
    },

    qn(path) {
        return config.www + path;
    },

    tree(tr) {
        return tr ? (tr.parent ? `${tr.parent.name}—${tr.name}` : `${tr.name}`) : '无';
    },

    date(msec, format='yyyy年m月dd日 H:MM') {
        return dateformat(new Date(msec), format);
    }

};
export default {
    install(Vue, options) {
        _.each(filters, (fn, name) => {
           Vue.filter(name, fn);
        });
    }
};
