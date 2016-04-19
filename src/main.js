require('fastclick').attach(document.body);
import _ from 'lodash';
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
_.merge(Vue.http.options, {
    root: config.api,
    emulateJSON: true,
    // beforeSend(xhr, req) {
    //     if(this.$route.query.user && req.method !== 'GET') {
    //         this.toast('请在【美玉秀秀】里使用该功能');
    //     }
    // },
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
    let canGo = !/myxx/i.test(navigator.userAgent) || from.name === to.name || to.name === '404';
    if(!canGo) {
        window.WebViewJavascriptBridge.callHandler('go', {url: to.path});
    } 
    // else if(_.get(from, 'query.user')) {
    //     if(to.name === 'user' && from.name !== 'user') {//  禁止分享页面导航
    //         canGo = false;
    //     }
    // }
    return canGo;
});
router.beforeEach(({from, to, abort, next}) => {
    appContainer.classList.add('loading');
    document.title = (to.title || '美玉秀秀');
    next();
});
router.afterEach(({to}) => {});
router.alias({
  '/user/:id': '/user/:id/home'
});
router.map(routes);
router.start(require('./components/App.vue'), appContainer);

window.onerror = (error) => {
    console.debug(error);
};
(() => {
    let first = true;
    const adjustBase = () => {
        let clientWidth = document.body.clientWidth;
        if(first && !/mobile/i.test(navigator.userAgent)) {
            // 如果页面有纵向滚动条，会占去clientWidth的空间，极端情况下会导致页面布局混乱，故减去滚动条宽度 15
            clientWidth = clientWidth - 15;
            first = false;
        }
        document.querySelector('html').style['font-size'] = (clientWidth / 10) + 'px';
    }
    adjustBase();
    window.onresize = _.debounce(adjustBase, 150);
})();