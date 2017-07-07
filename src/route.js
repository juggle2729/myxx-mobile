export default {
    '/question/:id': {
        name: 'question',
        title: '问题详情',
        native: v => v >= 2.3,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('QuestionView.vue'))
            }, 'question')
        }
    },

    '/answer/:id': {
        name: 'answer',
        title: '回答详情',
        native: v => v >= 2.3,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AnswerView.vue'))
            }, 'question')
        }
    },

    '/top-master': {
        name: 'top-master',
        title: '鉴宝师排行',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('TopMasterView.vue'))
            }, 'top-list')
        }
    },

    '/top-product': {
        name: 'top-product',
        title: '上传商品排行',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('TopProductView.vue'))
            }, 'top-list')
        }
    },

    '/topic/:id': {
        name: 'topic',
        title: '帖子详情',
        native: v => v >= 1.6 && {name: 'story'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('TopicView.vue'))
            }, 'topic')
        }
    },

    '/post/:id': {
        name: 'post',
        title: '文章详情',
        native: v => v >= 2.3,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('PostView.vue'))
            }, 'post')
        }
    },

    '/collection/:id': {
        name: 'collection',
        title: '专辑详情',
        native: v => v >= 2.4,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CollectionView.vue'))
            }, 'collection')
        }
    },

    '/collection/:id/follower': {
        name: 'collection-follower',
        title: '专辑粉丝',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CollectionFollowerView.vue'))
            }, 'collection')
        }
    },

    '/collection/user/:uid': {
        name: 'collection-self',
        title: '专辑详情',
        native: v => v >= 2.4,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CollectionView.vue'))
            }, 'collection')
        }
    },

    '/tag/:id': {
        name: 'tag',
        native: v => v >= 2.4,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('TagView.vue'))
            }, 'tag')
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

    '/product/:id': {
        name: 'product',
        title: '商品详情',
        native: v => v >= 3.8 && {name: 'product'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ProductView.vue'))
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

    '/bid/:id': {
        name: 'bid',
        title: '竞标作品',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('BidView.vue'))
            }, 'purchase')
        }
    },

    '/bid/:id/support': {
        name: 'support-bid',
        title: '输入支持理由',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('SupportBidView.vue'))
            }, 'purchase')
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

    '/figure/:userId/:articleId': {
        name: 'figure',
        title: '人物志',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('FigureView.vue'))
            }, 'figure')
        }
    },

    '/user/:id': { // 个人主页
        name: 'user',
        title: '',
        native: v => v >= 1.3 && {name: 'profile'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserView.vue'))
            }, 'profile')
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
        title: '我的关注',
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

    '/shop/:id/comments': {
        name: 'shop-comments',
        title: '店铺评价',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ShopCommentsView.vue'))
            }, 'shop')
        }
    },

    '/shop/:id/introduce': {
        name: 'shop-introduce',
        title: '店铺介绍',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ShopIntroduceView.vue'))
            }, 'shop')
        }
    },

    '/shop/:id/violation': {
        name: 'violation-detail',
        title: '违规详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ViolationDetailView.vue'))
            }, 'shop')
        }
    },

    '/shop/:id/credit': {
        name: 'shop-credit',
        title: '积分明细',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ShopCreditView.vue'))
            }, 'shop')
        }
    },

    '/shop/violation': {
        name: 'shop-violation',
        title: '店铺违规记录',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ShopViolationView.vue'))
            }, 'shop')
        }
    },

    '/shop/:id/coupon': {
        name: 'shop-coupon',
        title: '送你N张优惠券，赶紧进店看看吧!',
        component: resolve => require.ensure([], require => resolve(require('ShopCouponView.vue')), 'share')
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

    '/order/:id/price': {
        name: 'order-price',
        title: '修改订单价格',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderPriceView.vue'))
            }, 'mall')
        }
    },

    '/order/:id/trace': {
        name: 'trace',
        title: '物流追踪',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderTraceView.vue'))
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

    '/complain/:type/:id': {
        name: 'complain',
        title: '举报',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ComplainView.vue'))
            }, 'complain')
        }
    },

    '/help/mall': {
        name: 'mall-help',
        title: '帮助',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpMallView.vue'))
            }, 'help')
        }
    },

    '/help/mall/terms': {
        name: 'mall-terms',
        title: '美玉秀秀商城入驻协议',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpMallTermsView.vue'))
            }, 'help')
        }
    },

    '/help/shop-guide': {
        name: 'shop-guide',
        title: '开店攻略',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpShopGuideView.vue'))
            }, 'help')
        }
    },

    '/help/shop-level/:id': {
        name: 'shop-level',
        title: '等级说明',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpShopLevelView.vue'))
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

    '/help/medal/:type': {
        name: 'medal',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MedalView.vue'));
            }, 'help')
        }
    },

    '/help/credit': {
        name: 'credit',
        title: '如何赚积分',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CreditView.vue'));
            }, 'help')
        }
    },

    '/help/best-practice': {
        name: 'best-practice',
        title: '玩转美玉秀秀',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpBestPracticeView.vue'));
            }, 'help')
        }
    },

    '/help/shop-promise': {
        name: 'help-shop-promise',
        title: '店铺服务承诺',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpShopPromiseView.vue'));
            }, 'help')
        }
    },

    '/help/promise-detail/:type': {
        name: 'promise-detail',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpPromiseDetailView.vue'));
            }, 'help')
        }
    },

    '/help/media/:type': {
        name: 'help-media', // 图片帮助页面模板
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpMediaView.vue'));
            }, 'help')
        }
    },

    '/help/desc/:type': { // 文本帮助页面模板
        name: 'help-desc',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpDescView.vue'));
            }, 'help')
        }
    },

    '/help/circle-size': {
        title: '圈口',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CircleSizeView.vue'));
            }, 'help')
        }
    },

    '/help/eco-system': {
        title: '打造和田玉良性生态的举措',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpEcoSystemView.vue'));
            }, 'help')
        }
    },

    '/help/answer/rules': {
        title: '鉴宝守则',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpAnswerRuleView.vue'));
            }, 'help')
        }
    },

    '/help/master/verified': {
        title: '美玉秀秀鉴宝师',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpMasterVerifiedView.vue'));
            }, 'help')
        }
    },

    '/help/master/first-answer': {
        title: '完成第一次回答',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpMasterFirstAnaswerView.vue'));
            }, 'help')
        }
    },

    '/help/master/title': {
        title: ' 鉴宝师称号',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpMasterTitleView.vue'));
            }, 'help')
        }
    },

    '/help/master/recognition': {
        title: ' 鉴宝认同度',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('HelpMasterRecognitionView.vue'));
            }, 'help')
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
