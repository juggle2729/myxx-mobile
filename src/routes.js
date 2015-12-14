export default {
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
        component: require('./components/EvaluationDetailView.vue'),
        xxx: 123
    },
    '/stories': {
        name: 'stories',
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
    '/discover/treasure': {
        name: 'treasure',
        component: require('./components/TreasureView.vue')
    },
    '/discover/treasure/:id': {
        name: 'treasure-detail',
        component: require('./components/TreasureDetailView.vue')
    },
    '/discover/site': {
        name: 'site',
        component: require('./components/SiteView.vue')
    },
    '/masters': {
        name: 'masterList',
        component: require('./components/MasterListView.vue')
    },
    '/message': {
        name: 'message',
        component: require('./components/MessageView.vue')
    },
    '/self': {
        component: require('./components/SelfView.vue')
    },
    '/profile': {
        component: require('./components/ProfileView.vue')
    },
    // '/*user/evaluation': {
    //     component: require('./components/EvaluationListView.vue')
    // },
    '/self/following': {
        name: 'following',
        component: require('./components/FollowingView.vue')
    },
    '/self/follower': {
        name: 'follower',
        component: require('./components/FollowerView.vue')
    },
    '/self/topic': {
        name: 'topic',
        component: require('./components/SelfTopicView.vue')
    },
    '/self/thumb': {
        name: 'thumb',
        component: require('./components/SelfThumbView.vue')
    },
    '/self/openshop': {
        name: 'openshop',
        component: require('./components/OpenShopView.vue')
    },
    '/self/opensite': {
        name: 'opensite',
        component: require('./components/OpenSiteView.vue')
    },
    '/self/homepage/:id': {
        name: 'homepage',
        component: require('./components/HomePageView.vue')
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
