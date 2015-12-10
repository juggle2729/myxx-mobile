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
    },
    '/profile': {
        component: require('./components/ProfileView.vue')
    },
    // not found handler
    '*': {
      component: require('./components/NotFoundView.vue')
    }
}