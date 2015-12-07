require('./styles/partials/myxx.scss');
require('./scripts/resize');
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import mixins from './mixins';
import { domain, fromNow, moment, img, money } from './filters';
import App from './components/App.vue';

// install router
Vue.use(Router);
Vue.use(Resource);

// filters
Vue.filter('moment', moment);
Vue.filter('img', img);
Vue.filter('moeny', money);
// mixins
Vue.mixin(mixins);
// Vue configurations
Vue.config.debug = true;
Vue.http.options.root = 'http://120.26.113.13';
Vue.http.options.success = function(resp) {
    if (resp.status !== 200) {
        console.error(resp.message);
    }
};
Vue.http.options.error = function() {
    console.error('后台出错了~');
};
Vue.http.headers.common['X-Auth-Token'] = 'edb85165-b4b6-46f0-89db-3067e5c51742';


// routing
var router = new Router();
router.alias({
    // 匹配 /a 时就像是匹配 /a/b/c
    // '/home': '/home/featured'
});

//设置页面title
router.beforeEach(function (transition) {
    console.debug('go to', location.href);
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
router.map({
    '/featured': {
        name: 'featured',
        component: require('./components/FeaturedView.vue')
    },
    '/evaluation': {
        name: 'evaluation',
        component: require('./components/EvaluationView.vue')
    },
    '/evaluation/:id': {
        name: 'evaluation-detail',
        component: require('./components/EvaluationDetailView.vue')
    },
    '/story': {
        name: 'story',
        component: require('./components/StoryView.vue')
    },
    '/story/:id': {
        name: 'story-detail',
        component: require('./components/StoryDetailView.vue')
    },
    '/discover': {
        name: 'discover',
        component: require('./components/DiscoverView.vue')
    },
    '/message': {
        name: 'message',
        component: require('./components/MessageView.vue')
    },
    '/self': {
        component: require('./components/SelfView.vue')
    }
})

router.beforeEach(function() {
    window.scrollTo(0, 0);
})

router.redirect({
    '*': '/featured'
})

router.start(App, '#app');