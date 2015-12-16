require('./scripts/resize');
import config from './config';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import routes from './routes';
import mixins from './mixins';
import { bg } from './directives';
import { moment, img, money } from './filters';
import App from './components/App.vue';

Vue.use(Router);
Vue.use(Resource);

// mixins
Vue.mixin(mixins);
// directives
Vue.directive('bg', bg);
// filters
Vue.filter('moment', moment);
Vue.filter('img', img);
Vue.filter('money', money);

// Vue configurations
Vue.config.debug = true;
Vue.http.options.root = config.api.dev;
Vue.http.options.success = function(resp) {
    if (resp.status !== 200) {
        console.error(resp.message);
    }
};
Vue.http.options.error = function() {
    console.error('后台出错了~');
};
Vue.http.headers.common['X-Auth-Token'] = 'edb85165-b4b6-46f0-89db-3067e5c51742';//uid为1
//Vue.http.headers.common['X-Auth-Token'] = '57331162-00b8-4df7-987e-17ed9a4e99a4';
//Vue.http.headers.common['X-Auth-Token'] = 'f87e7796-9896-4a6f-997e-11b48aebd347';//zl
//Vue.http.headers.common['X-Auth-Token'] = '4220fab2-6021-4cbe-a7df-7f7abd33c65f';
//Vue.http.headers.common['X-Auth-Token'] = '8ef96ac4-bd70-48ff-98eb-b0bcbb122c2a';//uid为3

// routing
var router = new Router();
router.alias({
    // 匹配 /a 时就像是匹配 /a/b/c
    // '/home': '/home/featured'
});

//设置页面title
router.beforeEach(function (transition) {
    // console.debug('go to', location.href);
    // if(Math.random() > .5) {
    //     console.debug('abort!!!');
    //     transition.abort();
    // } else {
    transition.next();
    // }
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
    //'*': '/evaluation'
    //'*': '/discover/treasure/3'
    '*': '/discover/treasure'
    //'*': '/profile'
});

router.start(App, '#app');
