<style lang="sass">
.order-view {
    min-height: 100%;
    padding: 20px 0 150px;
    .seperator {
        height: 200px;
    }
    .status {
        height: 86px;
        line-height: 86px;
        padding: 0 32px;
        .icon-clock {
            padding-right: 12px;
        }
        &.detail {
            height: 146px;
            line-height: 60px;
            padding-top: 28px;
            .tip {
                margin-left: 52px;
            }
        }
        >.withdraw {
            height: 86px;
            line-height: 86px;
         }
    }
    .address {
        padding: 0 32px;
        height: 200px;
        .user {
            height: 100px;
            line-height: 100px;
            margin: 0 44px 0 50px;
            & + div {
                width: 610px;
                -webkit-box-align: start;
                .icon-address {
                    padding-top: 3px;
                }
                .site {
                    padding-left: 10px;
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
            .note {
                margin-left: 48px;
                height: 220px;
                line-height: 36px;
            }
        }
    }
    .order {
        height: 146px;
        padding: 30px 32px;
        div:first-child {
            margin-bottom: 28px;
        }
    }
    .operation {
        padding: 0 32px;
        position: fixed;
        bottom: 0;
        justify-content: flex-end;
        width: 100%;
        height: 98px;
        line-height: 98px;
        &>div {
            padding-top: 19px;
            border-radius: 5px;
            margin-left: 18px;
            text-align: center;
            background-color: white;
            width: 160px;
            height: 68px;
            &.highlight {
                background-color: #cc3f4f;
                border: 0;
                color: white;
             }
            &.disable {
                 background-color: #c6c6c6;
                 color: white;
             }
        }
    }
}
</style>
<template>
<div class="order-view bg-default" v-if="!$loadingRouteData">
    <div class="status bg-white border-vertical font-30 red" :class="{'detail': order_status[order.status].tip_buyer}" v-if="!isSeller">
        <span class="icon-clock"></span>
        <span>{{order_status[order.status].text_buyer}}</span>
        <div class="font-26 tip flex" v-if="order_status[order.status].tip_buyer" @click="rejectInfo">
            <div class="flex-1">{{order_status[order.status].tip_buyer}}</div>
            <div class="red" v-if="applyReject">
                <span>查看详情</span>
                <span class="icon-enter"></span>
            </div>
        </div>
    </div>
    <div class="status bg-white border-vertical font-30 red" :class="{'detail': order_status[order.status].tip_seller}" v-else @click="refundInfo">
        <div class="flex withdraw">
            <div class="flex-1">
                <span class="icon-clock"></span>
                <span>{{order_status[order.status].text_seller}}</span>
            </div>
            <div class="red" v-if="applyReturn">
                <span>查看详情</span>
                <span class="icon-enter"></span>
            </div>
        </div>
        <div class="font-26 tip flex" v-if="order_status[order.status].tip_seller">
            <div class="flex-1">{{order_status[order.status].tip_seller}}</div>
            <div class="red" v-if="applyRefund">
                <span>查看详情</span>
                <span class="icon-enter"></span>
            </div>
        </div>
    </div>
    <div class="address bg-white font-30 margin-top border-vertical">
        <div class="user flex">
            <div class="flex-1">收货人: {{order.receiver_name}}</div>
            <div>{{order.receiver_phone}}</div>
        </div>
        <div class="flex">
            <div class="icon-address gray font-30"></div>
            <div class="font-26 site">收货地址: {{order.receiver_address}}</div>
        </div>
    </div>
    <div class="product bg-white font-30 margin-top">
        <div class="seller flex border-top" v-if="!isSeller">
            <avatar :user="order.seller" :size="50"></avatar>
            <span class="margin-left">{{order.seller.name}}</span>
        </div>
        <div class="merchant flex border-vertical">
            <img class="img margin-right" :src="config.img + order.product.picture + '?imageView2/2/h/450'">
            <div>
                <div class="title">{{order.product.title}}</div>
                <div class="red font-26">{{order.price | price}}</div>
            </div>
        </div>
        <div class="comment border-bottom" v-if="isNote">
            <div class="margin-bottom">
                <span class="icon-comment gray"></span>
                <span>买家留言</span>
            </div>
            <div class="note font-26">{{order.buyer_note}}</div>
        </div>
    </div>
    <div class="order margin-top bg-white border-vertical font-30">
        <div>订单编号: {{order.order_no}}</div>
        <div>订单创建时间: {{order.create_at | date}}</div>
    </div>
    <div class="operation font-30 bg-white right flex border-top" v-if="!isSeller">
        <div class="border-gray" @click="contactSeller">联系商家</div>
        <div class="border-gray" v-for="button in order_status[order.status].button_buyer" :class="{'highlight': button_status[button].color, 'disable': (order.status === 'np') && (button_status[button].text === '付款')}"
          @click="button_status[button].method">{{button_status[button].text}}</div>
    </div>
    <div class="operation font-30 bg-white right flex border-top" v-else>
        <div @click="contactBuyer">联系买家</div>
        <div v-for="button in order_status[order.status].button_seller" :class="{'highlight': button_status[button].color}"
          @click="button_status[button].method">{{button_status[button].text}}</div>
    </div>
</div>
</template>
<script>
import Avatar from './Avatar.vue';
export default {
    name: 'OrderInfoView',
    components: {
        Avatar
    },
    computed: {
        isSeller() {
            return (_.get(this, 'self.id') == this.order.seller.id);
        },
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
            order_status: {
                'np': {
                    text_buyer: '等待商家修改价格',
                    button_buyer: ['cancel', 'pay_not'],
                    text_seller: '请修改商品价格',
                    button_seller: ['price']
                },
                'wp': {
                    text_buyer: '等待买家付款',
                    tip_buyer: '20分钟未付款订单自动取消',
                    button_buyer: ['cancel', 'pay'],
                    text_seller: '等待买家付款',
                    tip_seller: '20分钟未付款订单自动取消',
                    button_seller: ['price']
                },
                'ws': {
                    text_buyer: '买家已付款,等待商家发货',
                    button_buyer: ['refund'],
                    text_seller: '买家已付款,请尽快安排发货',
                    button_seller: ['send']
                },
                'rf_rq': {
                    text_buyer: '等待商家处理退款申请',
                    tip_buyer: '',
                    text_seller: '买家申请退款,请处理',
                    tip_seller: ''
                },
                'rf_ac': {
                    text_buyer: '退款中',
                    tip_buyer: '退款将在1到2个工作日内完成',
                    button_buyer: ['service'],
                    text_seller: '订单已退款'
                },
                'rf_ap': {
                    text_buyer: '退款中',
                    tip_buyer: '退款将在1到2个工作日内完成',
                    button_buyer: ['service'],
                    text_seller: '订单已退款'
                },
                'rf_pp': {
                    text_buyer: '退款中',
                    tip_buyer: '退款将在1到2个工作日内完成',
                    button_buyer: ['service'],
                    text_seller: '订单已退款'
                },
                'rf_cm': {
                    text_buyer: '退款完成',
                    button_buyer: ['service'],
                    text_seller: '退款完成'
                },
                'rf_rj': {
                    text_buyer: '商家拒绝了退款申请',
                    tip_buyer: '请联系客服处理',
                    button_buyer: ['service', 'refund'],
                    text_seller: '您拒绝了退款申请',
                    tip_seller: '请联系客服处理',
                    button_seller: ['service', 'send']
                },
                'wg': {
                    text_buyer: '已发货,请等待收货',
                    tip_buyer: '',
                    button_buyer: ['trace', 'receive'],
                    text_seller: '等待买家确认收货',
                    tip_seller: '',
                    button_seller: ['trace', 'updateTrace']
                },
                'ss': {
                    text_buyer: '订单交易成功',
                    text_seller: '订单交易成功'
                },
                'rt_rq': {
                    text_buyer: '已申请退货,等待商家处理',
                    button_buyer: ['trace'],
                    text_seller: '买家已申请退货'
                },
                'rt_rj': {
                    text_buyer: '商家拒绝了退货申请',
                    tip_buyer: '请联系客服处理',
                    button_buyer: ['service', 'withdraw'],
                    text_seller: '您拒绝了退货申请',
                    tip_seller: '请联系客服处理',
                    button_seller: ['service']
                },
                'rt_gd': {
                    text_buyer: '商家已同意退货',
                    tip_buyer: '请尽快将商品寄回给商家',
                    text_seller: '等待买家退回商品',
                    button_seller: ['service', 'receiveBack']
                },
                'rt_to': {
                    text_buyer: '商家已同意退货',
                    tip_buyer: '请尽快将商品寄回给商家',
                    text_seller: '等待买家退回商品',
                    button_seller: ['service', 'receiveBack']
                },
                'rt_fa': {
                    text_buyer: '订单交易成功',
                    text_seller: '订单交易成功'
                },
                'rt_rc': {
                    text_buyer: '商家已收到商品',
                    tip_buyer: '货款将在1到2个工作日退还到支付账户',
                    text_seller: '订单已退货',
                    button_seller: ['service']
                },
                'rt_ap': {
                    text_buyer: '商家已收到商品',
                    tip_buyer: '货款将在1到2个工作日退还到支付账户',
                    text_seller: '订单已退货',
                    button_seller: ['service']
                },
                'rt_pp': {
                    text_buyer: '商家已收到商品',
                    tip_buyer: '货款将在1到2个工作日退还到支付账户',
                    text_seller: '订单已退货',
                    button_seller: ['service']
                },
                'rt_cm': {
                    text_buyer: '退货完成',
                    tip_buyer: '货款已退还至支付账户',
                    text_seller: '订单已退货',
                    button_seller: ['service']
                },
                'up_cc': {
                    text_buyer: '订单已取消',
                    tip_buyer: '您已取消订单',
                    text_seller: '订单已取消',
                    tip_seller: '买家取消了订单'
                },
                'up_to': {
                    text_buyer: '订单已取消',
                    tip_buyer: '订单超时未付款,自动取消',
                    text_seller: '订单已取消',
                    tip_seller: '订单超时未付款,自动取消'
                },
                'cg': {
                    text_buyer: '已确认收货',
                    button_buyer: ['trace', 'withdraw'],
                    text_seller: '买家已确认收货',
                    button_seller: ['trace']
                }
            },
            button_status: {
                'cancel': {
                    text: '取消订单',
                    method: this.cancelOrder
                },
                'pay': {
                    text: '付款',
                    color: 'red',
                    method: this.pay
                },
                'pay_not': {
                    text: '付款'
                },
                'refund': {
                    text: '申请退款',
                    method: this.refund
                },
                'service': {
                    text: '联系客服',
                    method: this.service
                },
                'receive': {
                    text: '确认收货',
                    color: 'red',
                    method: this.receive
                },
                'withdraw': {
                    text: '申请退货',
                    method: this.withdraw
                },
                'price': {
                    text: '修改价格',
                    color: 'red',
                    method: this.setPrice
                },
                'send': {
                    text: '确认发货',
                    color: 'red',
                    method: this.send
                },
                'receiveBack': {
                    text: '收到商品',
                    method: this.receiveBack
                },
                'trace': {
                    text: '物流追踪',
                    method: this.trace
                },
                'updateTrace': {
                    text: '更新物流',
                    method: this.send
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/order/${to.params.id}`).then((order) => {
                    this.order = order;
                    this.order.price = order.trans_amount;
                    this.isNote = order.buyer_note;
                    this.order_status.rf_rq.tip_buyer = '自动退款: ' + this.timer(2);
                    this.order_status.rf_rq.tip_seller = '自动退款: ' + this.timer(2);
                    this.order_status.wg.tip_buyer = '自动确认收货: ' + this.timer(13);
                    this.order_status.wg.tip_seller = '自动确认收货: ' + this.timer(13);
                });
        }
    },
    methods: {
        cancelOrder() {
            this.action('confirm', {text: '您确认取消该订单?'}).then((result) => {
                if(result === '1') {
                    this.$put(`mall/order/${this.order.order_no}/cancel_unpaid`).then(() => {
                        location.reload(true);
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
            this.action('confirm', { text: '确认收货后系统将付款给商家，确认收到购买的商品了？'}).then((result) => {
                if(result === '1') {
                    this.$put(`mall/order/${this.order.order_no}/receive_goods`).then(() => {
                        this.$router.go({name: 'receive'});
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
            this.$router.go({name: 'send', params: {id: this.order.order_no}});
        },
        receiveBack() {
            this.action('confirm', {text: '确认收到买家寄回的商品?'}).then((result) => {
                if(result === '1') {
                    this.$put(`mall/order/${this.order.order_no}/receive_return`).then(() => {
                        location.reload(true);
                    });
                }
            });
        },
        contactBuyer() {
            this.action('toast', {text: 'native --> contact to buyer'});
        },
        contactSeller() {
            this.action('toast', {text: 'native --> contact to seller'});
        },
        service() {
            this.action('toast', {text: 'native --> contact to 客服'});
        },
        trace() {
            this.$router.go({name: 'trace', params: {id: this.order.order_no}});
        },
        rejectInfo() {
            this.applyReject && (this.order.status === 'rf_rj' ? this.action('result', {id: this.order.order_no, type: 'money'}) : this.action('result', {id: this.order.order_no, type: 'product'}));
        },
        timer(day) {
            const currentTime = new Date();
            const displayTime = (this.order.create_at + 86400000*day - currentTime.getTime());
            const days = (displayTime / (1000 * 60 * 60 * 24)) < 1 ? '00' : Math.round((displayTime / (1000 * 60 * 60 * 24)));
            const hours = (displayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) < 1 ? '00' : Math.round((displayTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = (displayTime % (1000 * 60 * 60)) / (1000 * 60) < 1 ? '00' : Math.round((displayTime % (1000 * 60 * 60)) / (1000 * 60));

            return  days + '天' + hours + '小时' + minutes + '分';
        }
    }
}
</script>