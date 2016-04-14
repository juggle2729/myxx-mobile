export default {
    '/': {
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/IndexView.vue'));
                }, 'other');
            }
    },
    '/evaluations/:tab': {
        name: 'evaluations',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/EvaluationsView.vue'));
                }, 'evaluation');
            }
    },
    '/evaluation/:id': {
        name: 'evaluation',
        title: '鉴宝详情',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/EvaluationView.vue'));
                }, 'evaluation');
            }
    },
    '/result/:evaluationId/:id': {
        name: 'result',
        title: '鉴宝结果',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/ResultView.vue'));
                }, 'evaluation');
            }
    },
    '/stories/:tab': {
        name: 'stories',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/StoriesView.vue'));
                }, 'story');
            }
    },
    '/story/:id': {
        name: 'story',
        title: '晒宝详情',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/StoryView.vue'));
                }, 'story');
            }
    },
    '/jade/:id': {
        name: 'jade',
        title: '宝贝详情',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/JadeView.vue'));
                }, 'jade');
            }
    },
    '/masters': {
        name: 'masters',
        title: '官网秀',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/MastersView.vue'));
                }, 'master');
            }
    },
    '/master/:id': {
        name: 'master',
        title: '大师官网',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/Master.vue'));
                }, 'master');
            }
    },
    '/profile': {   // 个人中心
        name: 'profile',
        title: '我的',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/ProfileView.vue'));
                }, 'profile');
            }
    },
    '/profile/:id/evaluation': {
        name: 'user-evaluation',
        title: '鉴宝',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/UserEvaluationView.vue'));
                }, 'profile');
            }
    },
    '/profile/:id/story': {
        name: 'user-story',
        title: '晒宝',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/UserStoryView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/like': {
        name: 'user-like',
        title: '赞',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/UserLikeView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/following': {
        name: 'user-following',
        title: '关注的人',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/UserFollowingView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/follower': {
        name: 'user-follower',
        title: '粉丝',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/UserFollowerView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/:tab': { // 个人主页
        name: 'user',
        title: '个人主页',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/UserView.vue'));
                }, 'profile');
            }
    },
    '/:id/apply/shop': {
        name: 'apply-shop',
        title: '申请店铺',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/ApplyShopView.vue'));
                }, 'other');
            }
    },
    '/:id/apply/site': {
        name: 'apply-site',
        title: '申请官网',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/ApplySiteView.vue'));
                }, 'other');
            }
    },
    '/:id/apply/master': {
        name: 'apply-master',
        title: '申请鉴定师权限',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/ApplyMasterView.vue'));
                }, 'other');
            }
    },
    '/feedback': {
        name: 'feedback',
        title: '意见反馈',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/FeedbackView.vue'));
                }, 'other');
            }
    },
    '/about': {
        name: 'about',
        title: '关于美玉秀秀',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/AboutView.vue'));
                }, 'other');
            }
    },
    '/css': {
        name: 'cssview',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/CssView.vue'));
                }, 'other');
            }
    },
    '/404': {
        title: '页面不存在',
        name: '404',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/NotFoundView.vue'));
                }, 'other');
            }
    },
    '*': {
        title: '找不到北',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('./components/NotFoundView.vue'));
                }, 'other');
            }
    }
}
