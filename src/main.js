require('./scripts/resize');
import config from './config';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import routes from './routes';
import mixins from './mixins';
import { bg } from './directives';
import { moment, money, role, type, profile } from './filters';
import bridge from './utils/jsbridge';
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

// Vue configurations
Vue.config.debug = true;
Vue.http.options.root = config.api.dev;
Vue.http.options.xxx = '123';
Vue.http.yyy = '123';
Vue.http.options.error = function(response, status, request) {
    console.error(status, request.responseURL);
    this.toast('💔出错了');
};
Vue.http.options.success = function(response, status, request) {
    if(response.status !== 200) {
        // TODO 取消第二个success callback
        console.error(response.status, request.responseURL, response.message);
        this.toast(response.message);
    }
};

Vue.http.headers.common['X-Auth-Token'] = bridge.user.token;

// routing
var router = new Router({hashbang: false, suppressTransitionError: true});
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
    if(to.title) {
        document.title = to.title;
    }
});
router.map(routes);

router.beforeEach(function() {
    window.scrollTo(0, 0);
});

router.redirect({
    '*': '/profile'
});

router.start(App, '#app');
