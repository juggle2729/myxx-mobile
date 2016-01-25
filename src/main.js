require('./utils/resize');
require('./utils/scroll');

require('fastclick').attach(document.body);
import _ from 'lodash';
import config from './config';
import emitter from './utils/emitter';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import Store from './store';
import routes from './route';
import mixin from './mixin';
import directive from './directive';
import filter from './filter';
import partial from './partial';

// Vue configurations
Vue.config.debug = true;
Vue.use(mixin);
Vue.use(filter);
Vue.use(directive);
Vue.use(partial);

Vue.use(Resource);
_.merge(Vue.http.options, {
    root: config.api,
    emulateJSON: true,
    beforeSend(xhr, req) {
        if(this.$route.query.user && req.method !== 'GET') {
            emitter.emit('open-app');
        }
    },
    error(resp, status, req) {
        console.error(status, req.responseURL);
        this.toggleLoading(false);
        console.log('获取数据失败，请稍后再试！');
    }
});

Vue.use(Router);
const appContainer = document.querySelector('#app');
let router = new Router({history: true});
router.beforeEach(({from, to, abort, next}) => {
    if (to.query.tab && to.query.tab.toLowerCase() === 'store') {
        document.title = '店铺详情';
    } else if (to.query.tab && to.query.tab.toLowerCase() === 'craftdetail') {
        document.title = '工艺详情';
    } else {
        document.title = (to.title || '美玉秀秀');
    }
    appContainer.classList.add('loading');

    let stopAppRoute = to.raw && (to.query.replace === 'true');

    if(/myxx/i.test(navigator.userAgent) && !stopAppRoute) {
        if(from.fullPath && from.fullPath !== to.fullPath) {
            window.WebViewJavascriptBridge.callHandler('go', {url: to.path});
            abort();
        } else {
            next();
        }
    } else {
        if(from.query && from.query.user && (to.name !== 'master' ||
            to.query.tab === 'store')) {//   禁止分享页面导航
            abort();
        } else {
            next();
        }
    }
});
router.afterEach(({to}) => {
    //if(!_.get(to, 'query.position')) {
    //    window.scrollTo(0, 0);
    //}
});
router.map(routes);
router.start(require('./components/App.vue'), '#app');
