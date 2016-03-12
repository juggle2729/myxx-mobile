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
    '/result/:id/comment': {
        name: 'result-comment',
        title: '给大师的评论',
        component: require('./components/ResultCommentView.vue')
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
    '/profile/evaluation': {
        name: 'my-evaluation',
        title: '鉴宝',
        component: require('./components/MyEvaluationView.vue')
    },
    '/profile/story': {
        name: 'my-story',
        title: '晒宝',
        component: require('./components/MyStoryView.vue')
    },
    '/profile/like': {
        name: 'my-like',
        title: '赞',
        component: require('./components/MyLikeView.vue')
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
    '/profile/shop/request': {
        name: 'shop-request',
        title: '申请店铺',
        component: require('./components/ShopRequestView.vue')
    },
    '/profile/site/request': {
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
    '/share/evaluation/:id': {
        name: 'share-evaluation',
        title: '鉴宝详情',
        component: require('./components/ShareEvaluationView.vue')
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
