<style lang="sass">
.order-view {
    padding: 20px 0 150px;
    .seperator {
        height: 200px;
    }
    [class^='icon-'] {
        width: 50px;
        & + span {
            padding-left: 0;
        }
        &.icon-clock {
            transform: scale(.9) translate3d(0, 4px, 0);
        }
        &.icon-location {
            transform: scale(1.2) translate3d(0, -2px, 0);
        }
    }
    .status {
        height: 86px;
        line-height: 86px;
        padding: 0 32px;
        &.detail {
            height: 146px;
            line-height: 60px;
            .tip {
                margin-left: 51px;
            }
            &.padding-top {
                padding-top: 24px;
             }
        }
        >.withdraw {
            height: 86px;
            line-height: 86px;
         }
    }
    .address {
        padding: 5px 32px 0;
        height: 200px;
        .user {
            height: 90px;
            line-height: 90px;
            margin: 0 10px 0 50px;
            & + div {
                width: 638px;
                -webkit-box-align: start;
                .icon-location {
                    padding-top: 3px;
                }
                .site {
                    line-height: 38px;
                }
            }
        }
    }
    .product {
        .seller {
            height: 86px;
            line-height: 86px;
            padding: 0 32px;
        }
        .merchant {
            height: 160px;
            padding: 0 32px;
            .img {
                height: 110px;
                width: 110px;
            }
            .title {
                margin-bottom: 12px;
                width: 556px;
                line-height: 38px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
            }
        }
        .comment {
            height: 320px;
            padding: 24px 32px;
            .icon-comment {
                transform: scale(1.1);
            }
            .note {
                margin: 16px 0 0 50px;
                height: 220px;
                line-height: 36px;
            }
        }
    }
    .order {
        height: 146px;
        padding: 32px 32px 30px;
        div:first-child {
            margin-bottom: 20px;
        }
    }
    .operation {
        padding: 0 32px;
        position: fixed;
        bottom: 0;
        justify-content: flex-end;
        width: 100%;
        height: 98px;
        & > div {
            border-radius: 5px;
            margin-left: 18px;
            text-align: center;
            background-color: white;
            width: 160px;
            height: 68px;
            line-height: 68px;
            &.highlight {
                background-color: #cc3f4f;
                border: 0;
                color: white;
             }
            &.disable {
                 background-color: #c6c6c6;
                 border: 0;
                 color: white;
             }
        }
    }
}
</style>
<template>
<div class="order-view bg-default" v-if="!$loadingRouteData">
    <div class="status bg-white border-vertical font-30 red padding-top" :class="{'detail': states[order.status].tip}" v-if="!isSeller">
        <span class="icon-clock"></span><span>{{states[order.status].txt}}</span>
        <div class="font-26 tip flex" v-if="states[order.status].tip" @click="rejectInfo">
            <div class="flex-1">{{states[order.status].tip}}</div>
            <div class="red" v-if="applyReject">
                <span>查看详情</span>
                <span class="icon-enter"></span>
            </div>
        </div>
    </div>
    <div class="status bg-white border-vertical font-30 red" :class="{'detail': states[order.status].tip}" v-else @click="refundInfo">
        <div class="flex withdraw">
            <div class="flex-1">
                <span class="icon-clock"></span><span>{{states[order.status].txt}}</span>
            </div>
            <div class="red" v-if="applyReturn">
                <span>查看详情</span>
                <span class="icon-enter"></span>
            </div>
        </div>
        <div class="font-26 tip flex" v-if="states[order.status].tip">
            <div class="flex-1">{{states[order.status].tip}}</div>
            <div class="red" v-if="applyRefund">
                <span>查看详情</span>
                <span class="icon-enter"></span>
            </div>
        </div>
    </div>
    <div class="separator"></div>
    <div class="address bg-white font-30">
        <div class="user flex">
            <div class="flex-1">收货人: {{order.receiver_name}}</div>
            <div>{{order.receiver_phone}}</div>
        </div>
        <div class="flex">
            <div class="icon-location gray font-30"></div><div class="font-26 site">收货地址: {{order.receiver_address}}</div>
        </div>
    </div>
    <div class="separator"></div>
    <div class="product bg-white font-30">
        <div class="seller flex" v-if="!isSeller">
            <avatar :user="order.seller" :size="50"></avatar>
            <span class="margin-left">{{order.seller.nickname}}</span>
        </div>
        <div class="merchant flex border-vertical">
            <img class="img margin-right" :src="config.img + order.product.first_picture + '?imageView2/2/h/450'">
            <div>
                <div class="title">{{order.product.title}}</div>
                <div class="red font-26">{{order.trans_amount | price}}</div>
            </div>
        </div>
        <div class="comment border-bottom" v-if="isNote">
            <div>
                <span class="icon-comment gray"></span><span>买家留言</span>
            </div>
            <div class="note font-26">{{order.buyer_note}}</div>
        </div>
    </div>
    <div class="separator"></div>
    <div class="order bg-white font-30 border-bottom">
        <div>订单编号: {{order.order_no}}</div>
        <div>订单创建时间: {{order.create_at | date}}</div>
    </div>
    <div class="operation font-30 bg-white flex border-top fixed" v-if="!isSeller">
        <div class="border-gray" @click="contactSeller">联系商家</div>
        <div class="border-gray" v-for="btn in states[order.status].btn"
             :class="{'highlight': btns[btn].color, 'disable': (order.status === 'np') && (btns[btn].txt === '付款')}"
             @click="btns[btn].fn">{{btns[btn].txt}}</div>
    </div>
    <div class="operation font-30 bg-white flex border-top fixed" v-else>
        <div class="border-gray" @click="contactBuyer">联系买家</div>
        <div class="border-gray" v-for="btn in states[order.status].btn" :class="{'highlight': btns[btn].color}"
          @click="btns[btn].fn">{{btns[btn].txt}}</div>
    </div>
</div>
</template>
<script>
const states = {
    np: [{
        txt: '等待商家修改价格',
        btn: ['cancel', 'pay_not']
    }, {
        txt: '请修改商品价格',
        btn: ['price']
    }],
    wp: [{
        txt: '等待付款',
        tip: '2小时未付款订单自动取消',
        btn: ['cancel', 'pay']
    }, {
        txt: '等待买家付款',
        tip: '2小时未付款订单自动取消',
        btn: ['price']
    }],
    ws: [{
        txt: '已付款，等待商家发货',
        btn: ['refund']
    }, {
        txt: '买家已付款，请尽快安排发货',
        btn: ['send']
    }],
    rf_rq: [{
        txt: '等待商家处理退款申请',
        tip: '',
        btn: ['service']
    }, {
        txt: '买家申请退款，请处理',
        tip: '',
        btn: ['service', 'doRefund']
    }],
    rf_ac: [{
        txt: '退款中',
        tip: '退款将在1到2个工作日内完成'
    }, {
        btn: ['service'],
        txt: '订单已退款'
    }],
    rf_ap: [{
        txt: '退款中',
        tip: '退款将在1到2个工作日内完成'
    }, {
        btn: ['service'],
        txt: '订单已退款'
    }],
    rf_pp: [{
        txt: '退款中',
        tip: '退款将在1到2个工作日内完成'
    }, {
        btn: ['service'],
        txt: '订单已退款'
    }],
    rf_cm: [{
        txt: '退款完成',
        btn: ['service']
    }, {
        txt: '订单已退款'
    }],
    rf_rj: [{
        txt: '商家拒绝了退款申请',
        tip: '请联系客服处理',
        btn: ['service', 'refund']
    }, {
        txt: '您拒绝了退款申请',
        tip: '请联系客服处理',
        btn: ['service']
    }],
    wg: [{
        txt: '已发货，请等待收货',
        tip: '',
        btn: ['trace', 'receive']
    }, {
        txt: '等待买家确认收货',
        tip: '',
        btn: ['service', 'updateTrace']
    }],
    ss: [{
        txt: '订单交易成功'
    }, {
        txt: '订单交易成功'
    }],
    rt_rq: [{
        txt: '已申请退货，等待商家处理',
        btn: ['service', 'trace']
    }, {
        txt: '买家已申请退货',
        btn: ['service', 'doWithdraw']
    }],
    rt_rj: [{
        txt: '商家拒绝了退货申请',
        tip: '请联系客服处理',
        btn: ['service', 'withdraw']
    }, {
        txt: '您拒绝了退货申请',
        tip: '请联系客服处理',
        btn: ['service']
    }],
    rt_gd: [{
        txt: '商家已同意退货',
        tip: '请尽快将商品寄回给商家'
    }, {
        txt: '等待买家退回商品',
        btn: ['service', 'receiveBack']
    }],
    rt_to: [{
        txt: '商家已同意退货',
        tip: '请尽快将商品寄回给商家'
    }, {
        txt: '等待买家退回商品',
        btn: ['service', 'receiveBack']
    }],
    rt_fa: [{
        txt: '订单交易成功'
    }, {
        txt: '订单交易成功'
    }],
    rt_rc: [{
        txt: '商家已收到商品',
        tip: '货款将在1到2个工作日退还到支付账户'
    }, {
        txt: '订单已退货',
        btn: ['service']
    }],
    rt_ap: [{
        txt: '商家已收到商品',
        tip: '货款将在1到2个工作日退还到支付账户'
    }, {
        txt: '订单已退货',
        btn: ['service']
    }],
    rt_pp: [{
        txt: '商家已收到商品',
        tip: '货款将在1到2个工作日退还到支付账户'
    }, {
        txt: '订单已退货',
        btn: ['service']
    }],
    rt_cm: [{
        txt: '退货完成',
        tip: '货款已退还至支付账户'
    }, {
        txt: '订单已退货',
        btn: ['service']
    }],
    up_cc: [{
        txt: '订单已取消',
        tip: '您已取消订单'
    }, {
        txt: '订单已取消',
        tip: '买家取消了订单'
    }],
    up_to: [{
        txt: '订单已取消',
        tip: '订单超时未付款，自动取消'
    }, {
        txt: '订单已取消',
        tip: '订单超时未付款，自动取消'
    }],
    cg: [{
        txt: '已确认收货',
        btn: ['trace', 'withdraw']
    }, {
        txt: '买家已确认收货'
    }]
};

export default {
    name: 'OrderInfoView',
    computed: {
        applyRefund() {
            return this.order.status === 'rf_rq';
        },
        applyReturn() {
            return this.order.status === 'rt_rq';
        },
        applyReject() {
            return (this.order.status === 'rf_rj' || this.order.status === 'rt_rj');
        }
    },
    data() {
        return {
            order: {
                seller: {}
            },
            btns: {
                cancel: {
                    txt: '取消订单',
                    fn: this.cancelOrder
                },
                pay: {
                    txt: '付款',
                    color: 'red',
                    fn: this.pay
                },
                pay_not: {
                    txt: '付款'
                },
                refund: {
                    txt: '申请退款',
                    fn: this.refund
                },
                service: {
                    txt: '联系客服',
                    fn: this.service
                },
                receive: {
                    txt: '确认收货',
                    color: 'red',
                    fn: this.receive
                },
                withdraw: {
                    txt: '申请退货',
                    fn: this.withdraw
                },
                price: {
                    txt: '修改价格',
                    color: 'red',
                    fn: this.setPrice
                },
                send: {
                    txt: '确认发货',
                    color: 'red',
                    fn: this.send
                },
                receiveBack: {
                    txt: '收到商品',
                    fn: this.receiveBack
                },
                trace: {
                    txt: '物流追踪',
                    fn: this.trace
                },
                updateTrace: {
                    txt: '更新物流',
                    fn: this.send
                },
                doWithdraw: {
                    txt: '处理退货',
                    fn: this.withdraw
                },
                doRefund: {
                    txt: '处理退款',
                    fn: this.refund
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/order/${to.params.id}`)
                .then((order) => {
                    this.order = order;
                    this.isSeller = _.get(this, 'self.id') == order.seller.id;
                    this.states = _.mapValues(states, state => state[_.toNumber(this.isSeller)]);
                    this.order.price = order.trans_amount;
                    this.isNote = order.buyer_note;

                    this.states.rf_rq.tip = '自动退款: ' + this.timer(2, 'rf_rq');
                    this.states.wg.tip = '自动确认收货: ' + this.timer(10, 'wg');
                });
        }
    },
    methods: {
        cancelOrder() {
            this.action('confirm', {text: '您确认取消该订单?'}).then((result) => {
                if(result === '1') {
                    this.$put(`mall/order/${this.order.order_no}/cancel_unpaid`).then(() => {
                        this.env.isIOS ? location.reload(true) : this.action('reloadUrl');
                    });
                }
            })
        },
        pay() {
            this.action('pay', {id: this.order.order_no, price: this.order.price});
        },
        refund() {
            this.isSeller ? this.action('refund', {id: this.order.order_no, type: 'money', seller: true}) : this.action('refund', {id: this.order.order_no, type: 'money', seller: false});
        },
        refundInfo() {
            if(this.applyReturn || this.applyRefund) {
                const params = this.applyReturn ? 'product' : 'money';
                this.isSeller ? this.action('refund', {id: this.order.order_no, type: params, seller: true}) : this.action('refund', {id: this.order.order_no, type: params, seller: false});
            }
        },
        receive() {
            this.action('confirm', { text: '确认收到购买的商品了吗？'}).then((result) => {
                if(result === '1') {
                    this.$put(`mall/order/${this.order.order_no}/receive_goods`).then(() => {
                        this.$router.go({name: 'received', params: {id: this.order.order_no}});
                    });
                }
            });
        },
        withdraw() {
            this.isSeller ? this.action('refund', {id: this.order.order_no, type: 'product', seller: true}) : this.action('refund', {id: this.order.order_no, type: 'product', seller: false});
        },
        setPrice() {
            this.$router.go({name: 'order-price', params: { id: this.order.order_no}})
        },
        send() {
            this.$router.go({name: 'sent', params: {id: this.order.order_no}});
        },
        receiveBack() {
            this.action('confirm', {text: '确认收到买家寄回的商品?'}).then((result) => {
                if(result === '1') {
                    this.$put(`mall/order/${this.order.order_no}/receive_return`).then(() => {
                        this.env.isIOS ? location.reload(true) : this.action('reloadUrl');
                    });
                }
            });
        },
        contactBuyer() {
            this.action('chat', {id: this.order.buyer.id, name: this.order.buyer.nickname, order: this.order.order_no});
        },
        contactSeller() {
            this.action('chat', {id: this.order.seller.id, name: this.order.seller.nickname, order: this.order.order_no});
        },
        service() {
            this.action('kf', {order: this.order.order_no});
        },
        trace() {
            this.$router.go({name: 'trace', params: {id: this.order.order_no}});
        },
        rejectInfo() {
            this.applyReject && (this.order.status === 'rf_rj' ? this.action('result', {id: this.order.order_no, type: 'money'}) : this.action('result', {id: this.order.order_no, type: 'product'}));
        },
        timer(day, status) {
            console.debug(status, _.find(this.order.status_history, {status}));
            const start = _.get(_.find(this.order.status_history, {status}), 'create_at', Date.now());
            const remainHours = (start + 86400000*day - Date.now())/(1000*60*60);
            const days = remainHours/24 < 1 ? '00' : Math.floor(remainHours/24);
            const hours = remainHours%24 < 1 ? '00' : Math.floor(remainHours%24);
            const minutes = (remainHours*60) % 60 < 1 ? '00' : Math.floor((remainHours*60) % 60);

            return  this.xxx = days + '天' + hours + '小时' + minutes + '分';
        }
    }
}
</script>
