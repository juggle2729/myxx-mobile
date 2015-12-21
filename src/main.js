require('./scripts/resize');
import config from './config';
import Q from 'q';
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
Vue.http.options.emulateJSON = true;
Vue.http.options.root = config.api.dev;
Vue.http.options.beforeSend = function(req, options) {
    // if(/mobile/i.test(navigator.userAgent)) {// 在APP里打开
    //     this.bridge('user', '', () => {

    //     });
    // } else {

    // }
    // options.headers['X-Auth-Token'] = 'f87e7796-9896-4a6f-997e-11b48aebd347';
};
Vue.http.options.error = function(resp, status, req) {
    console.error(status, req.responseURL);
    this.toast('💔出错了');
};
Vue.http.options.success = function(resp, status, req) {
    if(resp.status === 605) {
        this.action('login', '', (resp) => {
            console.log('login', resp);

        });
    } else if(resp.status !== 200) {
        console.error(resp.status, req.responseURL, resp.message);
        this.toast(resp.message);
    }
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
