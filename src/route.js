// FIXME require.ensure within loop won't work
export default {
    '/': {
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('IndexView.vue'));
                }, 'other');
            }
    },
    '/evaluations': {
        name: 'evaluations',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('EvaluationsView.vue'));
                }, 'evaluation');
            }
    },
    '/evaluation/:id': {
        name: 'evaluation',
        title: '鉴宝详情',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('EvaluationView.vue'));
                }, 'evaluation');
            }
    },
    '/result/:evaluationId/:id': {
        name: 'result',
        title: '鉴宝结果',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('EvaluationView.vue'));
                }, 'evaluation');
            }
    },
    '/stories': {
        name: 'stories',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('StoriesView.vue'));
                }, 'story');
            }
    },
    '/story/:id': {
        name: 'story',
        title: '晒宝详情',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('StoryView.vue'));
                }, 'story');
            }
    },
    '/jade/:id': {
        name: 'jade',
        title: '宝贝详情',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('JadeView.vue'));
                }, 'jade');
            }
    },
    '/masters': {
        name: 'masters',
        title: '人物志',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('MastersView.vue'));
                }, 'master');
            }
    },
    '/master/:id': {
        name: 'master',
        title: '人物志',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('MasterView.vue'));
                }, 'master');
            }
    },
    '/profile': {   // 个人中心
        name: 'profile',
        title: '我的',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('ProfileView.vue'));
                }, 'profile');
            }
    },
    '/profile/:id/evaluation': {
        name: 'user-evaluation',
        title: '鉴宝',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('UserEvaluationView.vue'));
                }, 'profile');
            }
    },
    '/profile/:id/story': {
        name: 'user-story',
        title: '晒宝',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('UserStoryView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/like': {
        name: 'user-like',
        title: '赞',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('UserLikeView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/following': {
        name: 'user-following',
        title: '关注的人',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('UserFollowingView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/follower': {
        name: 'user-follower',
        title: '粉丝',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('UserFollowerView.vue'));
                }, 'profile');
            }
    },
    '/user/:id/:tab': { // 个人主页
        name: 'user',
        title: '个人主页',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('UserView.vue'));
                }, 'profile');
            }
    },
    '/:id/apply/shop': {
        name: 'apply-shop',
        title: '申请店铺',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('ApplyShopView.vue'));
                }, 'other');
            }
    },
    '/:id/apply/site': {
        name: 'apply-site',
        title: '申请官网',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('ApplySiteView.vue'));
                }, 'other');
            }
    },
    '/:id/apply/master': {
        name: 'apply-master',
        title: '申请鉴定师权限',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('ApplyMasterView.vue'));
                }, 'other');
            }
    },
    '/likes/:type/:id': {
        name: 'likes',
        title: '赞过的人',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('LikesView.vue'));
                }, 'other');
            }
    },
    '/feedback': {
        name: 'feedback',
        title: '意见反馈',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('FeedbackView.vue'));
                }, 'other');
            }
    },
    '/about': {
        name: 'about',
        title: '关于美玉秀秀',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('AboutView.vue'));
                }, 'other');
            }
    },
    '/css': {
        name: 'cssview',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('CssView.vue'));
                }, 'other');
            }
    },
    '/404': {
        title: '页面不存在',
        name: '404',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('NotFoundView.vue'));
                }, 'other');
            }
    },
    '*': {
        title: '找不到北',
        component: (resolve) => {
                require.ensure([], (require) => {
                    resolve(require('NotFoundView.vue'));
                }, 'other');
            }
    }
}
