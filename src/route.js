const UA = navigator.userAgent;

let routes = {
    '/evaluations': {
        name: 'evaluations',
        title: '鉴宝列表',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('EvaluationsView.vue'));
            }, 'evaluation');
        }
    },
    '/evaluation/:id/:result': {
        name: 'evaluation',
        title: '鉴宝详情',
        native: v => v >= 1.1,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('EvaluationView.vue'));
            }, 'evaluation');
        }
    },
// 晒宝
    '/stories': {
        name: 'stories',
        title: '晒宝列表',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('StoriesView.vue'));
            }, 'story');
        }
    },
    '/story/:id': {
        name: 'story',
        title: ' ', //标题为空，减缓数据加载后，标题变化的差体验
        native: v => v == 1.3,
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('StoryView.vue'));
            }, 'story');
        }
    },

    '/lessons': {
        name: 'lessons',
        title: '美玉公开课',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('LessonsView.vue'));
            }, 'lesson');
        }
    },
    '/lesson/:id': {
        name: 'lesson',
        title: '课堂详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('LessonView.vue'));
            }, 'lesson');
        }
    },
    '/lecturer/:id': {
        name: 'lecturer',
        title: '大师课堂',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('LecturerView.vue'));
            }, 'lesson');
        }
    },


    '/jade/:id': {
        name: 'jade',
        title: '商品详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('JadeView.vue'));
            }, 'mall');
        }
    },

    '/auction/:id': {
        name: 'auction',
        title: '拍卖预览',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AuctionView.vue'));
            }, 'auction');
        }
    },
    '/auction/add/:id': {
        name: 'addAuction',
        title: '添加拍卖信息',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AddAuctionView.vue'));
            }, 'auction');
        }
    },
    '/auction/:id/share': {
        name: 'auctionShare',
        title: '拍卖生成',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AuctionShareView.vue'))
            }, 'auction')
        }
    },
    '/auction/:id/bidding': {
        name: 'bidding',
        title: '我要出价',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AuctionsBiddingView.vue'));
            }, 'auction');
        }
    },
    '/auction/:id/record': {
        name: 'actionRecord',
        title: '拍卖记录',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AuctionRecordView.vue'));
            }, 'auction');
        }
    },

    '/masters': {
        name: 'masters',
        title: '人物志',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MastersView.vue'));
            }, 'master');
        }
    },
    '/master/:id': {
        name: 'master',
        title: '人物志',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('MasterView.vue'));
            }, 'master');
        }
    },

    '/profile': {   // 个人中心
        name: 'profile',
        title: '我的',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ProfileView.vue'));
            }, 'profile');
        }
    },
    '/profile/:id/evaluation': {
        name: 'user-evaluation',
        title: '鉴宝',
        native: v => v >= 1.1 && {name: 'myEvaluations'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserEvaluationView.vue'));
            }, 'profile');
        }
    },
    '/profile/:id/story': {
        name: 'user-story',
        title: '晒宝',
        native: v => v >= 1.1 && {name: 'myStories'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserStoryView.vue'));
            }, 'profile');
        }
    },

    '/user/:id/like': {
        name: 'user-like',
        title: '赞',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserLikeView.vue'));
            }, 'profile');
        }
    },
    '/user/:id/following': {
        name: 'user-following',
        title: '关注的人',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserFollowingView.vue'));
            }, 'profile');
        }
    },
    '/user/:id/follower': {
        name: 'user-follower',
        title: '粉丝',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserFollowerView.vue'));
            }, 'profile');
        }
    },
    '/user/:id/auctions': {
        name: 'auctions',
        title: '全部拍卖',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AuctionsView.vue'));
            }, 'profile');
        }
    },

    '/user/:id/:tab': { // 个人主页
        name: 'user',
        title: '个人主页',
        native: v => v >= 1.3 && {name: 'profile'},
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('UserView.vue'));
            }, 'profile');
        }
    },

    '/:id/apply/shop': {
        name: 'apply-shop',
        title: '申请店铺',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ApplyShopView.vue'));
            }, 'apply');
        }
    },
    '/:id/apply/site': {
        name: 'apply-site',
        title: '申请官网',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ApplySiteView.vue'));
            }, 'apply');
        }
    },
    '/:id/apply/master': {
        name: 'apply-master',
        title: '申请鉴定师权限',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('ApplyMasterView.vue'));
            }, 'apply');
        }
    },

    '/order/affirm/:productId/:addressId': {
        name: 'order-affirm',
        title: '订单详情',
        component(resolve) {
        require.ensure([], (require) => {
            resolve(require('OrderAffirmView.vue'));
            }, 'mall');
        }
    },
    '/order/:id': {
        name: 'order',
        title: '订单详情',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderInfoView.vue'));
            }, 'mall');
        }
    },
    '/order/receive/:id': {
        name: 'receive',
        title: '确认收货成功',
        component(resolve) {
            require.ensure([], (require) => {
                    resolve(require('OrderReceiveView.vue'));
            }, 'mall');
        }
    },
    'order/send/:id': {
        name: 'send',
        title: '发货确认',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderSendView.vue'));
            }, 'mall');
        }
    },
    'order/trace/:id': {
        name: 'trace',
        title: '物流追踪',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderTraceView.vue'));
            }, 'mall');
        }
    },
    '/order/:id/price': {
        name: 'order-price',
        title: '修改订单价格',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('OrderPriceView.vue'));
            }, 'mall');
        }
    },
    '/address/list': { // 商品id，可选
        name: 'address-list',
        title: '收货地址管理',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AddressView.vue'));
            }, 'address');
        }
    },
    '/address/:id/update': {
        name: 'address-update',
        title: '收货地址管理',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AddressUpdateView.vue'));
            }, 'address');
        }
    },
    '/wallet': {
        name: 'wallet',
        title: '我的钱包',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WalletView.vue'));
            }, 'wallet');
        }
    },
    '/wallet/withdraw': {
        name: 'withdraw',
        title: '提现',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WithdrawView.vue'));
            }, 'wallet');
        }
    },
    '/wallet/:id/withdraw/result': {
        name: 'withdraw-result',
        title: '提现',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WithdrawResultView.vue'));
            }, 'wallet');
        }
    },
    '/wallet/:tab': {
        name: 'detail',
        title: '明细',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('WalletDetailView.vue'));
            }, 'wallet');
        }
    },
    '/instructions': {
        name: 'instructions',
        title: '帮助',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('InstructionsView.vue'));
            }, 'other');
        }
    },
    '/instruction/:id': {
        name: 'instruction',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('InstructionView.vue'));
            }, 'other');
        }
    },

    '/tag/:id/:name': {
        name: 'tag',
        native: v => v >= 1.4 && {name: 'tag'},
        title: '标签信息流',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('TagView.vue'));
            }, 'tag');
        }
    },

    '/recommend/follower': {
        name: 'recommend-follower',
        title: '推荐关注',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('RecommendFollowerView.vue'));
            }, 'recommend');
        }
    },

    '/feedback': {
        name: 'feedback',
        title: '意见反馈',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('FeedbackView.vue'));
            }, 'other');
        }
    },
    '/about': {
        name: 'about',
        title: '关于美玉秀秀',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('AboutView.vue'));
            }, 'other');
        }
    },

    '/404': {
        title: '页面不存在',
        name: '404',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('NotFoundView.vue'));
            }, 'other');
        }
    },

    '/': {
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('IndexView.vue'));
            }, 'browser');
        }
    },

    '/css': {
        name: 'cssview',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('CssView.vue'));
            }, 'browser');
        }
    },

    '*': {
        title: '找不到北',
        component(resolve) {
            require.ensure([], (require) => {
                resolve(require('NotFoundView.vue'));
            }, 'other');
        }
    }
}

export default routes;
