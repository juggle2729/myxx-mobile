require('./scripts/resize');
import config from './config';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import routes from './routes';
import mixins from './mixins';
import { bg } from './directives';
import { moment, money } from './filters';
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

// Vue configurations
Vue.config.debug = true;
Vue.http.options.root = config.api.dev;
Vue.http.options.error = function() {
    console.error('后台出错了~');
};

Vue.http.headers.common['X-Auth-Token'] = bridge.user.token;

// routing
var router = new Router();
router.alias({
    // 匹配 /a 时就像是匹配 /a/b/c
    // '/home': '/home/featured'
});

//设置页面title
router.beforeEach((transition) => {
    console.debug('goto', transition.to.path);
    if(window.WebViewJavascriptBridge) {
        transition.abort();
        window.WebViewJavascriptBridge.callHandler('go', {url: location.href});
    } else {
        transition.next();
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
    '*': '/profile/2'
});

router.start(App, '#app');
