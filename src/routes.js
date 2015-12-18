export default {
    '/comment': {
        component: require('./components/CommentView.vue')
    },
    '/media': {
        component: require('./components/MediaView.vue')
    },
    // '/': {
    //     component: require('./components/IndexView.vue')
    // },
    '/featured': {
        name: 'featured',
        component: require('./components/FeaturedView.vue')
    },
    '/evaluations/:tab': {
        name: 'evaluations',
        component: require('./components/EvaluationsView.vue')
    },
    '/evaluation/:id': {
        name: 'evaluation',
        component: require('./components/EvaluationView.vue')
    },
    '/evaluation/:id/likes': {
        name: 'evaluation-likes',
        component: require('./components/EvaluationLikesView.vue')
    },
    '/likes/:type/:id': {
        name: 'likes',
        component: require('./components/LikesView.vue')
    },
    '/stories/:tab': {
        name: 'stories',
        component: require('./components/StoriesView.vue')
    },
    '/story/:id': {
        name: 'story',
        component: require('./components/StoryView.vue')
    },
    '/jades': {
        name: 'jades',
        component: require('./components/JadesView.vue')
    },
    '/jade/:id': {
        name: 'jade',
        component: require('./components/JadeView.vue')
    },
    '/masters': {
        name: 'masters',
        component: require('./components/MastersView.vue')
    },
    '/master/:id': {
        name: 'master',
        component: {
            template: '大师官网'
        }
    },
    '/message': {
        name: 'message',
        component: require('./components/MessageView.vue')
    },
    '/profile': {   // 个人中心
        name: 'profile',
        component: require('./components/ProfileView.vue')
    },
    '/profile/:id': { // 个人主页
        name: 'user-profile',
        component: require('./components/HomePageView.vue')
    },
    '/profile/:id/story': {
        name: 'user-story',
        component: require('./components/UserStoryView.vue')
    },
    '/profile/:id/following': {
        name: 'following',
        component: require('./components/FollowingView.vue')
    },
    '/profile/:id/follower': {
        name: 'follower',
        component: require('./components/FollowerView.vue')
    },
    '/profile/:id/like': {
        name: 'user-like',
        component: require('./components/UserLikeView.vue')
    },
    '/profile/:id/shop/request': {
        name: 'shop-request',
        component: require('./components/ShopRequestView.vue')
    },
    '/profile/:id/site/request': {
        name: 'site-request',
        component: require('./components/SiteRequestView.vue')
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
