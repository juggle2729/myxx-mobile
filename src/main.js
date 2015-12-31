require('./utils/resize');
import config from './config';
import emitter from './utils/emitter';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import routes from './route';
import mixins from './mixin';
import { bg } from './directive';
import { moment, money, role, type, profile, qn, truncate } from './filter';
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
Vue.filter('truncate', truncate);

// Vue configurations
Vue.config.debug = true;
Vue.http.options.emulateJSON = true;
Vue.http.options.root = config.api;
Vue.http.options.beforeSend = function(xhr, req) {
    if(this.$route.query.share && req.method !== 'GET') {
        emitter.emit('get-app');
    }
};
Vue.http.options.error = function(resp, status, req) {
    console.error(status, req.responseURL);
    this.toast('💔出错了');
};

// routing
var router = new Router({hashbang: false, suppressTransitionError: false});
//设置页面title
router.beforeEach(({from, to, abort, next}) => {
    if(/myxx/i.test(navigator.userAgent)) {
        if(from.fullPath && from.fullPath !== to.fullPath) {
            console.debug(history.length, 'go', to.path);
            window.WebViewJavascriptBridge.callHandler('go', {url: to.path});
        } else {
            console.debug(history.length, 'load', to.path);
            next();
        }
    } else {
        if(from.query && from.query.share) {
            abort();
        } else {
            next();
        }
    }
});
//设置页面title
router.afterEach(function ({ to }) {
    document.title = (to.title || to.query.title || '美玉秀秀');
});
router.map(routes);

router.beforeEach(function() {
    window.scrollTo(0, 0);
});

router.redirect({

});

router.start(App, '#app');
