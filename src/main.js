require('./utils/resize');
import config from './config';
import emitter from './utils/emitter';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import routes from './route';
import mixins from './mixin';
import { bg } from './directive';
import { moment, role, type, profile, truncate } from './filter';
import App from './components/App.vue';

Vue.use(Router);
Vue.use(Resource);

// mixins
Vue.mixin(mixins);
// directives
Vue.directive('bg', bg);
// filters
Vue.filter('moment', moment);
Vue.filter('role', role);
Vue.filter('type', type);
Vue.filter('profile', profile);
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
let router = new Router({history: true});
router.beforeEach(({from, to, abort, next}) => {
    if(/myxx/i.test(navigator.userAgent)) {
        if(from.fullPath && from.fullPath !== to.fullPath) {
            window.WebViewJavascriptBridge.callHandler('go', {url: to.path});
            abort();
            skip = true;
        } else if(!skip) {
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
    document.title = (to.title || '美玉秀秀');
});
router.map(routes);

router.redirect({

});

router.start(App, '#app');
