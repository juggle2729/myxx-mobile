export default {
    '/': {
        component: require('./components/IndexView.vue')
    },
    '/comment': {
        component: require('./components/CommentView.vue')
    },
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
        name: 'stories',
        component: require('./components/StoryView.vue')
    },
    '/story/:id': {
        name: 'story-detail',
        component: require('./components/StoryDetailView.vue')
    },
    '/treasure': {
        name: 'treasure',
        component: require('./components/TreasureView.vue')
    },
    '/treasure/:id': {
        name: 'treasure-detail',
        component: require('./components/TreasureDetailView.vue')
    },
    '/site': {
        name: 'site',
        component: require('./components/SiteView.vue')
    },
    '/message': {
        name: 'message',
        component: require('./components/MessageView.vue')
    },
    '/profile': {   // 个人中心
        component: require('./components/ProfileView.vue')
    },
    '/profile/:id': { // 个人主页
        name: 'homepage',
        component: require('./components/HomePageView.vue')
    },
    '/profile/:id/story': {
        name: 'story',
        component: require('./components/SelfStoryView.vue')
    },
    '/profile/:id/following': {
        name: 'following',
        component: require('./components/FollowingView.vue')
    },
    '/profile/:id/follower': {
        name: 'follower',
        component: require('./components/FollowerView.vue')
    },
    // '/profile/:id/evaluation': {
    //     component: require('./components/EvaluationListView.vue')
    // },
    '/profile/:id/favor': {
        name: 'favor',
        component: require('./components/SelfThumbView.vue')
    },
    '/profile/:id/openshop': {
        name: 'openshop',
        component: require('./components/OpenShopView.vue')
    },
    '/profile/:id/opensite': {
        name: 'opensite',
        component: require('./components/OpenSiteView.vue')
    },
    '/css': {
        name: 'cssview',
        component: require('./components/CssView.vue')
    },
    // not found handler
    '*': {
      component: require('./components/NotFoundView.vue')
    }
}
