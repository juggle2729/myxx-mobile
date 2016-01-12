require('./utils/resize');
import _ from 'lodash';
import config from './config';
import emitter from './utils/emitter';
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import Touch from 'vue-touch';
import Store from './store';
import routes from './route';
import mixin from './mixin';
import { bg } from './directive';
import { moment, role, type, profile, truncate } from './filter';

// Vue configurations
Vue.config.debug = true;
Vue.use(Store);
Vue.use(Touch);
Vue.use(Resource);
_.merge(Vue.http.options, {
    root: config.api,
    emulateJSON: true,
    beforeSend(xhr, req) {
        if(this.$route.query.share && req.method !== 'GET') {
            emitter.emit('get-app');
        }
    },
    catch(resp, status, req) {
        console.error(status, req.responseURL);
        this.toast('💔出错了');
    }
});

// mixins
Vue.mixin(mixin);
// directives
Vue.directive('bg', bg);
// filters
Vue.filter('moment', moment);
Vue.filter('role', role);
Vue.filter('type', type);
Vue.filter('profile', profile);
Vue.filter('truncate', truncate);



Vue.use(Router);
const appContainer = document.querySelector('#app');
let router = new Router({history: true});
router.beforeEach(({from, to, abort, next}) => {
    document.title = (to.title || '美玉秀秀');
    appContainer.classList.add('loading');
    if(/myxx/i.test(navigator.userAgent)) {
        if(from.fullPath && from.fullPath !== to.fullPath) {
            window.WebViewJavascriptBridge.callHandler('go', {url: to.path});
            abort();
        } else {
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
router.map(routes);
router.start(require('./components/App.vue'), '#app');
