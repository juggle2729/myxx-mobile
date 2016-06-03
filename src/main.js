require('fastclick').attach(document.body);
import _ from 'lodash';
import Q from 'q';
import config from './config';
import emitter from './utils/emitter';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import routes from './route';
import mixin from './mixins/global';
import directive from './directive';
import filter from './filter';
import partial from './partial';

// Vue configurations
Vue.config.debug = process.env.NODE_ENV !== 'production';
Vue.mixin(mixin);
Vue.use(filter);
Vue.use(directive);
Vue.use(partial);

Vue.use(Resource);
Vue.http.interceptors.push({
    request(req) {
        // 如果url是全路径,忽略root
        /\/\//.test(req.url) && (req.root = '');
        return req;
    },
    response(resp) {
        return resp;
    }
});
Vue.use(Router);

let router = new Router({history: true});

/**
 * 修改vue-router源码，增加的一个回调。
 * 和beforeEach不同，该回调在history改变之前被调用，
 * 而且初次加载时，并不会触发该回调，意味着，from参数一定不为空。
 * @param  {vue.transition} from    vue-router transition
 * @param  {Object} to    通过_recognizer解析出来的对象，和from有区别
 * @return {boolean|string}      返回布尔值，决定history.go是否执行,或者一个新的路径
 */
router.beforeGo((from, to, app) => {
    let interrupted = false;
    if(app.env.version) { // 客户端环境
        let action = to.native && to.native(app.env.version);
        if(action) {
            action = _.isObject(action) ? _.merge(to, action) : to;
            app.action(action.name, action.params);
            interrupted = true;
        } else if(from.name === to.name) { // 同一route内，做tab切换
        } else if(to.name === '404') {// 404切换
        } else {
            app.action('go', {url: to.path});
            interrupted = true;
        }
    } else if(app.env.isShare) {
        // 保持分享参数
        to.query = _.merge(_.pick(from.query, ['user','time','channel']), to.query);
        return app.$router.stringifyPath(to);
    }
    return !interrupted;
});
router.beforeEach(({from, to, abort, next}) => {
    // to.router.app.$el.classList.add('loading');
    if (from.name === to.name) {
        window.scroll(0, 0);
    }
    document.title = (to.title || '美玉秀秀');
    next();
});

router.afterEach(({to}) => {});
router.alias({
    '/user/:id': '/user/:id/home',
    '/evaluations/:tab': '/evaluations',
    '/stories/:tab': '/stories',
    '/auctions/:id': 'user/:id/auctions',
    '/order/affirm/:productId': '/order/affirm/:productId/0',
    '/order/address': '/order/address/0',
    '/tag/:type/:id/:name': '/tag/:id/:name'
});
router.map(routes);
router.start(require('./components/App.vue'), '#app');

(() => {
    let first = true;
    const adjustBase = () => {
        let clientWidth = document.body.clientWidth;
        if(first && !/mobile/i.test(navigator.userAgent)) {
            // 如果页面有纵向滚动条，会占去clientWidth的空间，极端情况下会导致页面布局混乱，故减去滚动条宽度 15
            clientWidth = clientWidth - 15;
            first = false;
        }
        document.querySelector('html').style['font-size'] = Math.min(75, clientWidth / 10) + 'px';
    };
    adjustBase();
    window.onresize = _.debounce(adjustBase, 150);
})();
