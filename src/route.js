export default {
    '/evaluation/:id': {
        name: 'evaluation',
        title: '鉴宝详情',
        native: v => v >= 1.1,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('EvaluationView.vue'))
            }, 'evaluation')
        }
    },
    '/top-master': {
        name: 'top-master',
        title: '鉴宝师排行',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('TopMasterView.vue'))
            })
        }
    },

    '/story/:id': {
        name: 'story',
        title: '帖子详情',
        native: v => v >= 1.6,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('StoryView.vue'))
            }, 'story')
        }
    },

    '/post/:id': {
        name: 'post',
        title: '图文详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PostView.vue'))
            }, 'Post')
        }
    },

    // 活动标签信息流
    '/activity/:id': { //该活动的id
        name: 'activity',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ActivityView.vue'))
            }, 'activity')
        }
    },

    '/jade/:id/:tab': {
        name: 'jade',
        title: '商品详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('JadeView.vue'))
            }, 'mall')
        }
    },

    '/purchases': {
        name: 'purchases',
        title: '求购竞标',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PurchasesView.vue'))
            }, 'purchase')
        }
    },

    '/purchase/:id': {
        name: 'purchase',
        title: '求购详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PurchaseView.vue'))
            }, 'purchase')
        }
    },

    '/bzone': {
        name: 'bzone',
        title: '商户专区',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('BZoneView.vue'))
            }, 'bzone')
        }
    },

    '/masters': {
        name: 'masters',
        title: '人物志',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MastersView.vue'))
            }, 'master')
        }
    },

    '/purchases': {
        name: 'purchases',
        title: '求购竞标',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PurchasesView.vue'))
            }, 'purchase')
        }
    },

    '/purchase/:id': {
        name: 'purchase',
        title: '求购详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PurchaseView.vue'))
            }, 'purchase')
        }
    },

    '/masters': {
        name: 'masters',
        title: '人物志',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MastersView.vue'))
            }, 'master')
        }
    },

    '/purchases': {
        name: 'purchases',
        title: '求购竞标',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PurchasesView.vue'))
            }, 'purchase')
        }
    },

    '/purchase/:id': {
        name: 'purchase',
        title: '求购详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PurchaseView.vue'))
            }, 'purchase')
        }
    },

    '/masters': {
        name: 'masters',
        title: '人物志',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MastersView.vue'))
            }, 'master')
        }
    },

    '/master/:id': {
        name: 'master',
        title: '人物志',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MasterView.vue'))
            }, 'master')
        }
    },

    '/user/:id/like': {
        name: 'user-like',
        title: '赞',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserLikeView.vue'))
            }, 'profile')
        }
    },
    '/user/:id/following': {
        name: 'user-following',
        title: '关注的人',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserFollowingView.vue'))
            }, 'profile')
        }
    },
    '/user/:id/follower': {
        name: 'user-follower',
        title: '粉丝',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserFollowerView.vue'))
            }, 'profile')
        }
    },

    '/user/:id/purchase': {
        name: 'user-purchase',
        title: '我的求购竞标',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserPurchaseView.vue'))
            }, 'profile')
        }
    },

    '/user/:id/:tab': { // 个人主页
        name: 'user',
        title: '',
        native: v => v >= 1.3 && {name: 'profile'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserView.vue'))
            }, 'profile')
        }
    },

    '/shop/:id': { // 工作室主页
        name: 'shop',
        native: v => v >= 1.7 && {name: 'shop'},
        title: '',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ShopView.vue'))
            }, 'shop')
        }
    },

    '/shop/:id/comment': {
        name: 'user-comment',
        title: '评价管理',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ShopCommentView.vue'))
            }, 'shop')
        }
    },

    '/:id/works': { // 仅分享
        name: 'works',
        title: '作品展示',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WorksView.vue'))
            }, 'profile')
        }
    },
    '/work/:id': {
        name: 'work',
        title: '作品详情',
        native: v => v >= 2.0 && {name: 'work'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WorkView.vue'))
            }, 'profile')
        }
    },

    '/:id/apply/master': {
        name: 'apply-master',
        title: '申请鉴定师权限',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ApplyMasterView.vue'))
            }, 'apply')
        }
    },

    'order/:id/trace': {
        name: 'trace',
        title: '物流追踪',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderTraceView.vue'))
            }, 'mall')
        }
    },

    '/order/:id/price': {
        name: 'order-price',
        title: '修改订单价格',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderPriceView.vue'))
            }, 'mall')
        }
    },

    '/pay-offline/:id': {
        name: 'pay-offline',
        title: '大额支付',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PayOfflineView.vue'))
            }, 'mall')
        }
    },

    '/wallet': {
        name: 'wallet',
        title: '我的钱包',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WalletView.vue'))
            }, 'wallet')
        }
    },
    '/wallet/withdraw': {
        name: 'withdraw',
        title: '提现',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WithdrawView.vue'))
            }, 'wallet')
        }
    },
    '/wallet/:id/withdraw/result': {
        name: 'withdraw-result',
        title: '提现',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WithdrawResultView.vue'))
            }, 'wallet')
        }
    },
    '/wallet/:tab': {
        name: 'detail',
        title: '明细',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WalletDetailView.vue'))
            }, 'wallet')
        }
    },

    '/help/mall': {
        name: 'mall-help',
        title: '帮助',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MallHelpView.vue'))
            }, 'help')
        }
    },
    '/help/mall/terms': {
        name: 'mall-terms',
        title: '美玉商城入驻协议',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MallHelpTermsView.vue'))
            }, 'help')
        }
    },
    '/help/mall/:category': {
        name: 'mall-help-category',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MallHelpCategoryView.vue'))
            }, 'help')
        }
    },

    '/help/purchase': {
        name: 'purchase-help',
        title: '求购竞标',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PurchaseHelpView.vue'))
            }, 'help')
        }
    },

    '/help/bzone': {
        name: 'bzone-help',
        title: '什么是商户专区',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('BZoneHelpView.vue'))
            }, 'help')
        }
    },

    '/help/level/:id': {
        name: 'level-help',
        title: '等级说明',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('LevelHelpView.vue'))
            }, 'help')
        }
    },

    '/help/comment': {
        name: 'level-comment',
        title: '商品评价说明',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CommentHelpView.vue'))
            }, 'help')
        }
    },

    '/comments/:id/:type': {
        name: 'comments',
        title: '全部评论',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CommentsView.vue'))
            }, 'comments')
        }
    },

    '/follow-suggestion': {
        title: '推荐关注',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('FollowSuggestionView.vue'))
            }, 'recommend')
        }
    },

    '/about': {
        name: 'about',
        title: '关于美玉秀秀',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AboutView.vue'))
            }, 'other')
        }
    },
    '/update': {
        name: 'update',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UpdateView.vue'))
            }, 'other')
        }
    },
    '/404': {
        title: '页面不存在',
        name: '404',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('NotFoundView.vue'))
            }, 'other')
        }
    },
    'api': {
        title: '客户端api测试',
        name: 'api',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ApiView.vue'))
            }, 'other')
        }
    },
    '/': {
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('IndexView.vue'))
            }, 'browser')
        }
    },
    '*': {
        title: '找不到北',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('NotFoundView.vue'))
            }, 'other')
        }
    }
}
