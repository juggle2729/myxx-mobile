require('./utils/resize');
import config from './config';
import Q from 'q';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import routes from './route';
import mixins from './mixin';
import { bg } from './directive';
import { moment, money, role, type, profile, qn } from './filter';
import App from './components/App.vue';

Vue.use(Router);
Vue.use(Resource);

// mixins
Vue.mixin(mixins);
// directives
Vue.directive('bg', bg);
// filters
Vue.filter('moment', moment);
Vue.filter('money', money);
Vue.filter('role', role);
Vue.filter('type', type);
Vue.filter('profile', profile);
Vue.filter('qn', qn);

// Vue configurations
Vue.config.debug = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.root = config.api.dev;
Vue.http.options.error = function(resp, status, req) {
    console.error(status, req.responseURL);
    this.toast('💔出错了');
};

// routing
var router = new Router({hashbang: false, suppressTransitionError: false});
//设置页面title
router.beforeEach(({from, to, abort, next}) => {
    if(window.WebViewJavascriptBridge) {
        if(from.fullPath !== to.fullPath) {
            abort();
            console.debug('go =>', to.path);
            window.WebViewJavascriptBridge.callHandler('go', {url: to.path});
        } else {
            next();
        }
    } else {
        if(from.fullPath && from.fullPath !== to.fullPath) {
            console.debug('go =>', to.path);
        }
        next();
    }
});
//设置页面title
router.afterEach(function ({ to }) {
    document.title = (to.title || '美玉秀秀');
});
router.map(routes);

router.beforeEach(function() {
    window.scrollTo(0, 0);
});

router.redirect({
    '*': '/profile'
});

router.start(App, '#app');
