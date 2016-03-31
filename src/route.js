export default {
    '/': {
        component: require('./components/IndexView.vue')
    },
    '/msg': {
        component: require('./components/MsgTempView.vue')
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
    // '/result/:id/comment': {
    //     name: 'result-comment',
    //     title: '给大师的评论',
    //     component: require('./components/ResultCommentView.vue')
    // },
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
        title: '晒宝详情',
        component: require('./components/StoryView.vue')
    },
    '/jade/:id': {
        name: 'jade',
        title: '宝贝详情',
        component: require('./components/JadeView.vue')
    },
    '/master/:id/evaluations': {
        name: 'master-evaluations',
        title: '在线鉴定',
        component: require('./components/MasterEvaluationsView.vue')
    },
    '/masters': {
        name: 'masters',
        title: '人物志',
        component: require('./components/MastersView.vue')
    },
    '/master/:id': {
        name: 'master',
        title: '大师官网',
        component: require('./components/Master.vue')
    },
    '/profile': {   // 个人中心
        name: 'profile',
        title: '我的',
        component: require('./components/ProfileView.vue')
    },
    '/profile/:id/evaluation': {
        name: 'user-evaluation',
        title: '鉴宝',
        component: require('./components/UserEvaluationView.vue')
    },
    '/profile/:id/story': {
        name: 'user-story',
        title: '晒宝',
        component: require('./components/UserStoryView.vue')
    },
    '/user/:id/like': {
        name: 'user-like',
        title: '赞',
        component: require('./components/UserLikeView.vue')
    },
    '/user/:id/following': {
        name: 'user-following',
        title: '关注的人',
        component: require('./components/UserFollowingView.vue')
    },
    '/user/:id/follower': {
        name: 'user-follower',
        title: '粉丝',
        component: require('./components/UserFollowerView.vue')
    },
    '/user/:id/:tab': { // 个人主页
        name: 'user',
        title: '个人主页',
        component: require('./components/UserView.vue')
    },
    '/:id/apply/shop': {
        name: 'apply-shop',
        title: '申请店铺',
        component: require('./components/ApplyShopView.vue')
    },
    '/:id/apply/site': {
        name: 'apply-site',
        title: '申请官网',
        component: require('./components/ApplySiteView.vue')
    },
    '/:id/apply/master': {
        name: 'apply-master',
        title: '申请大师鉴定权限',
        component: require('./components/ApplyMasterView.vue')
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
    '/404': {
        title: '页面不存在',
        name: '404',
        component: require('./components/NotFoundView.vue')
    },
    '*': {
        title: '找不到北',
        component: require('./components/NotFoundView.vue')
    }
}
