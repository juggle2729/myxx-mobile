export default {
    '/': {
        component: require('./components/IndexView.vue')
    },
    '/featured': {
        name: 'featured',
        component: {
            template: '<p class="font-30 gray center" style="position:relative;top: 200px;">【即将下线】</p></div>'
        }
    },
    '/evaluations/:tab': {
        name: 'evaluations',
        component: require('./components/EvaluationsView.vue')
    },
    '/evaluation/:id': {
        name: 'evaluation',
        title: '鉴宝详情',
        component: require('./components/EvaluationView.vue')
    },
    '/likes/:type/:id': {
        name: 'likes',
        title: '赞过的人',
        component: require('./components/LikesView.vue')
    },
    '/stories/:tab': {
        name: 'stories',
        component: require('./components/StoriesView.vue')
    },
    '/story/:id': {
        name: 'story',
        title: '话题详情',
        component: require('./components/StoryView.vue')
    },
    '/jades': {
        name: 'jades',
        title: '宝贝秀',
        component: {
            template: '<p class="font-30 gray center" style="position:relative;top: 200px;">【即将下线】</p></div>'
        }
    },
    '/jade/:id': {
        name: 'jade',
        title: '宝贝详情',
        component: require('./components/JadeView.vue')
    },
    '/masters': {
        name: 'masters',
        title: '官网秀',
        component: require('./components/MastersView.vue')
    },
    '/master/:id': {
        name: 'master',
        title: '大师官网',
        raw: true,
        component: require('./components/Master.vue')
    },
    '/messages': {
        name: 'messages',
        title: '消息',
        component: require('./components/MessagesView.vue')
    },
    '/master/:id/request': {
        name: 'master-request',
        title: '申请大师鉴定权限',
        component: require('./components/MasterRequestView.vue')
    },
    '/profile': {   // 个人中心
        name: 'profile',
        title: '我的',
        component: require('./components/ProfileView.vue')
    },
    '/profile/:id': { // 个人主页
        name: 'user-profile',
        title: '个人主页',
        component: require('./components/HomePageView.vue')
    },
    '/profile/:id/story': {
        name: 'user-story',
        title: '话题',
        component: require('./components/UserStoryView.vue')
    },
    '/profile/:id/following': {
        name: 'following',
        title: '关注的人',
        component: require('./components/FollowingView.vue')
    },
    '/profile/:id/follower': {
        name: 'follower',
        title: '粉丝',
        component: require('./components/FollowerView.vue')
    },
    '/profile/:id/evaluation': {
        name: 'user-evaluation',
        title: '鉴宝',
        component: require('./components/UserEvaluationView.vue')
    },
    '/profile/:id/like': {
        name: 'user-like',
        title: '赞',
        component: require('./components/UserLikeView.vue')
    },
    '/profile/:id/shop/request': {
        name: 'shop-request',
        title: '申请店铺',
        component: require('./components/ShopRequestView.vue')
    },
    '/profile/:id/site/request': {
        name: 'site-request',
        title: '申请官网',
        component: require('./components/SiteRequestView.vue')
    },
    '/feedback': {
        name: 'feedback',
        title: '意见反馈',
        component: require('./components/FeedbackView.vue')
    },
    '/about': {
        name: 'about',
        title: '关于美玉秀秀',
        component: require('./components/AboutView.vue')
    },
    '/css': {
        name: 'cssview',
        component: require('./components/CssView.vue')
    },
    // not found handler
    '/404': {
        title: '数据不存在',
        name: '404',
        component: require('./components/NotFoundView.vue')
    },
    '*': {
        title: '找不到北',
        component: require('./components/NotFoundView.vue')
    }
}
