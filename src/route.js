export default {
    '/': {
        component: require('./components/IndexView.vue')
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
        title: '话题详情',
        component: require('./components/StoryView.vue')
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
    '/profile/coin': {
        name: 'user-coin',
        title: '我的金币',
        component: require('./components/UserCoinView.vue')
    },
    '/profile/coin/rule': {
        name: 'coin-rule',
        title: '金币规则',
        component: require('./components/CoinRuleView.vue')
    },
    '/profile/coin/use': {
        name: 'coin-use',
        title: '金币的用处',
        component: require('./components/CoinUsageView.vue')
    },
    "/profile/coin/redeem": {
        name: 'coin-redeem',
        title: '兑换列表',
        component: require('./components/CoinRedeemView.vue')
    },
    '/profile/coin/:id/detail': {
        name: 'coin-redeem-detail',
        title: '兑换详情',
        component: require('./components/CoinRedeemDetailView.vue')
    },
    '/profile/coin/:id/success': {
        name: 'coin-redeem-success',
        title: '兑换成功',
        component: require('./components/CoinRedeemSuccessView.vue')
    },
    '/profile/:id/invite': {
        name: 'user-invite',
        title: '邀请有奖',
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
        title: '页面不存在',
        name: '404',
        component: require('./components/NotFoundView.vue')
    },
    '/nocontent': {
        title: '内容不存在',
        name: 'nocontent',
        component: require('./components/NoContentView.vue')
    },
    '*': {
        title: '找不到北',
        component: require('./components/NotFoundView.vue')
    }
}
