require('fastclick').attach(document.body)
import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import routes from './route'
import directive from './directive'
import mixin from './mixin/global'
import component from './mixin/component'
import filter from './filter'
import partial from './partial'
import store from './store'

// Vue configurations
Vue.config.debug = process.env.NODE_ENV !== 'production'
Vue.use(Resource)
Vue.use(Router)
Vue.use(filter)
Vue.use(directive)
Vue.mixin(mixin)
Vue.mixin(component)
Vue.use(partial)
Vue.use(store)

Vue.http.interceptors.push({
    request(req) {
        // 如果url是全路径,忽略root
        /\/\//.test(req.url) && (req.root = '')
        return req
    },
    response(resp) {
        return resp
    }
})

let router = new Router({history: true})

/**
 * 修改vue-router源码，增加的一个回调。
 * 和beforeEach不同，该回调在history改变之前被调用，
 * 而且初次加载时，并不会触发该回调，意味着，from参数一定不为空。
 * @param  {vue.transition} from    vue-router transition
 * @param  {Object} to    通过_recognizer解析出来的对象，和from有区别
 * @return {boolean|string}      返回布尔值，决定history.go是否执行,或者一个新的路径
 */
router.beforeGo((from, to, app) => {
    debugger
    let interrupted = false
    if(app.env.version) { // 客户端环境
        let action = to.native && to.native(app.env.version)
        if(action) {
            action = _.isObject(action) ? _.merge(to, action) : to
            app.action(action.name, action.params)
            interrupted = true
        } else if(from.name === to.name
            && ['tab', ''].indexOf(_.reduce(from.params, (result, v, k) => v === to.params[k] ? result: result.concat(k), []).join(''))!==-1) {
            // 同一route内，做tab切换
        } else if(to.name === '404') {// 404切换
        } else {
            app.action('go', {url: to.path})
            interrupted = true
        }
    } else if(app.env.isShare) {
        // 保持分享参数
        to.query = _.merge(_.pick(from.query, ['user','time','channel']), to.query)
        return app.$router.stringifyPath(to)
    }
    return !interrupted
})
router.beforeEach(({from, to, next}) => {
    // to.router.app.$el.classList.add('loading')

    // 同一路由内，仅切换tab时，不调整滚动位置
    if (from.name !== to.name || 'tab' !== _.reduce(from.params, (result, v, k) => v === to.params[k] ? result: result.concat(k), []).join('')) {
        window.scroll(0, 0)
    }
    document.title = to.title || '美玉秀秀'
    to.router.app.action('updateTitle', {text: to.title || '美玉秀秀'})
    next()
})

router.alias({
    '/order/confirm/:product': '/update',
    '/order/:id': '/update',
    '/order/:id/received': '/update',
    '/order/:id/sent': '/update',
    '/evaluations/:tab': '/update',
    '/stories/:tab': '/update',
    '/lessons': '/update',
    '/:id/apply/shop': '/update',
    '/:id/apply/site': '/update',
    '/auctions/:id': 'user/:id/auctions',
    '/jade/:id': '/jade/:id/none',
    '/instructions': '/help/mall',
    '/instruction/:category': '/help/mall/:category',
    '/recommend/follower': 'follow-suggestion',
    '/ranking/weekly': '/top-master',
    '/evaluation/:id': '/question/:id',
    '/result/:id/:result': '/answer/:id'
})
router.map(routes)
router.start(require('App.vue'), '#app');

// 一些初始化工作
(() => {
    const doc = window.document
    let first = true
    const adjustBase = () => {
        let clientWidth = doc.body.clientWidth
        if(first && !/mobile/i.test(navigator.userAgent)) {
            // 如果页面有纵向滚动条，会占去clientWidth的空间，极端情况下会导致页面布局混乱，故减去滚动条宽度 15
            clientWidth = clientWidth - 15
            first = false
        }
        doc.querySelector('html').style['font-size'] = Math.min(75, clientWidth / 10) + 'px'
    }
    adjustBase()
    window.onresize = _.debounce(adjustBase, 150)
    // 1px检测
    if (window.devicePixelRatio && devicePixelRatio >= 2) {
        var testElem = doc.createElement('div')
        testElem.style.border = '.5px solid transparent'
        doc.body.appendChild(testElem)
        if (testElem.offsetHeight == 1) {
            doc.querySelector('html').classList.add('hairline')
        }
        doc.body.removeChild(testElem)
    }
    // 处理微信viewport异常
    if(window.innerWidth < doc.body.clientWidth) {
        const viewport = document.getElementsByName('viewport')[0]
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1')
    }
})()