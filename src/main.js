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
            this.toast('请在【美玉秀秀】里使用该功能');
        }
    },
    catch(resp, status, req) {
        console.error(status, req.responseURL);
        this.toggleLoading(false);
        this.toast('获取数据失败，请稍后再试！');
    }
});

Vue.use(Router);
const appContainer = document.querySelector('#app');
let router = new Router({history: true});
router.beforeGo((from, to) => {
    let stopAppRoute = (to.name === '404') || to.raw && (to.query.replace === 'true');
    let stop = /myxx/i.test(navigator.userAgent)
                 && !stopAppRoute
                 && from.fullPath !== to.fullPath;
    if(stop) {
        window.WebViewJavascriptBridge.callHandler('go', {url: to.path});
    } else if(from.query && from.query.user && (to.name !== 'user-profile')) {//   禁止分享页面导航
            from.router.app.toast('请在【美玉秀秀】里查看');
            stop = true;
    }
    return !stop;
});
router.beforeEach(({from, to, abort, next}) => {
    appContainer.classList.add('loading');
    document.title = (to.title || '美玉秀秀');
    next();
});
router.afterEach(({to}) => {
    //if(!_.get(to, 'query.position')) {
    //    window.scrollTo(0, 0);
    //}
});
router.map(routes);
router.start(require('./components/App.vue'), '#app');
