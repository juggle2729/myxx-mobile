<style lang="stylus">
@import '~style/partials/mixin'
.order-operation
    height 100px
    justify-content flex-end
    .btn
        border(a, #888)
        line-height 68px
        border-radius 8px
        color #393939
        &.red
            border(a, #cc3f4f)
            color white
            background-color #cc3f4f
        &.gray
            border(a, #d9d9d9)
            color white
            background-color #d9d9d9
        & + .btn
            margin-left 14px
</style>
<template lang="pug">
.order-operation.flex.pdr-32(v-if="btns.length")
    .btn.pdh-28.fz-26(v-for="btn in btns", :class="btn.class", @click.stop="onBtnClick(btn.key)") {{ btn.name }}
</template>
<script>
export default {
    name: 'order-operation',

    props: {
        item: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },

    methods: {
        onBtnClick(btnKey) {
            switch (btnKey) {
                case 'pay':
                    this.$router.go({
                        name: 'pay',
                        query: {
                            id: this.item.order_no,
                            t: 'order'
                        }
                    })
                    break
                case 'cancel_order':
                    this.action('confirm', {
                        text: '确认取消订单吗？',
                        labels: ['取消', '确认']
                    }).then(selection => {
                        if (+selection) {
                            this.$put(`mall/order/${this.item.order_no}/cancel_unpaid`).then(newOrder => {
                                this.action('toast', { success: 1, text: '订单已取消' })
                                this.item = newOrder
                            })
                        }
                    })
                    break
                case 'delete_order':
                    this.action('confirm', {
                        text: '确认删除该订单吗',
                        labels: ['取消', '确认']
                    }).then(selection => {
                        if (+selection) {
                            this.$put(`mall/order/${this.item.order_no}/delete_order`).then(() => {
                                this.action('toast', { success: 1, text: '删除成功' })
                                this.$dispatch('deleteOrder', this.index)
                            })
                        }
                    })
                    break
                case 'logistics':
                    this.$router.go({
                        name: 'trace',
                        params: {
                            id: this.item.order_no
                        }
                    })
                    break
                case 'apply_refund':
                case 'apply_back':
                    this.$dispatch('applyRefundOrBack')
                    break
                case 'cancel_refund':
                    this.action('confirm', {
                        text: '确认取消退款吗',
                        labels: ['取消', '确认']
                    }).then(selection => {
                        if (+selection) {
                            this.$put(`mall/order/${this.item.order_no}/cancel_refund`).then(newOrder => {
                                this.action('toast', { success: 1, text: '已取消退款' })
                                this.item = newOrder
                            })
                        }
                    })
                    break
                case 'confirm_receive':
                    this.action('confirm', {
                        text: '确认收到购买的商品了吗',
                        labels: ['取消', '确认']
                    }).then(selection => {
                        if (+selection) {
                            this.$put(`mall/order/${this.item.order_no}/receive_goods`).then(newOrder => this.item = newOrder)
                        }
                    })
                    break
                case 'cancel_back':
                    this.action('confirm', {
                        text: '确认取消退货吗',
                        labels: ['取消', '确认']
                    }).then(selection => {
                        if (+selection) {
                            this.$put(`mall/order/${this.item.order_no}/cancel_return`).then(newOrder => {
                                this.action('toast', { success: 1, text: '已取消退货' })
                                this.item = newOrder
                            })
                        }
                    })
                    break
                case 'refund-reason':
                    this.$router.go({
                        name: 'order-reject',
                        params: {
                            id: this.item.order_no,
                            type: 'refund'
                        }
                    })
                    break
                case 'back-reason':
                    this.$router.go({
                        name: 'order-reject',
                        params: {
                            id: this.item.order_no,
                            type: 'back'
                        }
                    })
                    break
            }
        }
    },

    computed: {
        orderStatus() {
            return this.config.orderStatus
        },
        btns() {
            switch (this.item.status) {
                case this.orderStatus.refund_approved:
                case this.orderStatus.refund_proposed:
                    break
                case this.orderStatus.back_received:
                case this.orderStatus.back_approved:
                case this.orderStatus.back_proposed:
                case this.orderStatus.back_timeout:
                    return [ this.logisticsBtn ]
                    break
                case this.orderStatus.back_failed:
                    return [ this.logisticsBtn, this.deleteOrderBtn ]
                    break
                case this.orderStatus.no_price:
                    return [ this.cancelOrderBtn, this.payDisabledBtn ]
                    break
                case this.orderStatus.wait_pay:
                    return [ this.cancelOrderBtn, this.payBtn]
                    break
                case this.orderStatus.wait_send:
                    return [ this.applyRefundBtn ]
                    break
                case this.orderStatus.refund_rejected:
                    return [ this.reasonRefundBtn, this.applyRefundBtn, this.cancelRefundBtn ]
                    break
                case this.orderStatus.wait_goods:
                    return [ this.logisticsBtn, this.applyBackBtn, this.confirmReceiveBtn ]
                    break
                case this.orderStatus.confirm_goods:
                    return [ this.logisticsBtn, this.applyBackBtn ]
                    break
                case this.orderStatus.back_rejected:
                    return [ this.reasonBackBtn, this.applyBackBtn, this.cancelBackBtn ]
                    break
                case this.orderStatus.back_accepted: // 缺少一个确认发货
                    return [ this.cancelBackBtn ]
                    break
                case this.orderStatus.back_goods: // 缺少一个更新物流
                    return [ this.logisticsBtn ]
                    break
                case this.orderStatus.back_requested:
                    return [ this.cancelBackBtn ]
                    break
                case this.orderStatus.refund_accepted:
                case this.orderStatus.refund_requested:
                    return [ this.cancelRefundBtn ]
                    break
                case this.orderStatus.unpaid_cancelled:
                case this.orderStatus.unpaid_timeout:
                case this.orderStatus.success:
                case this.orderStatus.refund_completed:
                case this.orderStatus.back_completed:
                    return [ this.deleteOrderBtn ]
                    break
                default:
                    break
            }
            return []
        },

        logisticsBtn() {
            return { key: 'logistics', name: '跟踪物流' }
        },

        deleteOrderBtn() {
            return { key: 'delete_order', name: '删除订单' }
        },

        applyRefundBtn() {
            return { key: 'apply_refund', name: '申请退款' }
        },

        cancelRefundBtn() {
            return { key: 'cancel_refund', name: '取消退款' }
        },

        cancelOrderBtn() {
            return { key: 'cancel_order', name: '取消订单' }
        },

        applyBackBtn() {
            return { key: 'apply_back', name: '申请退货' }
        },

        cancelBackBtn() {
            return { key: 'cancel_back', name: '取消退货' }
        },

        reasonRefundBtn() {
            return { key: 'refund-reason', name: '查看原因' }
        },

        reasonBackBtn() {
            return { key: 'back-reason', name: '查看原因' }
        },

        payBtn() {
            return { key: 'pay', name: '付款', class: 'red' }
        },

        payDisabledBtn() {
            return { key: 'pay_disabled', name: '付款', class: 'gray' }
        },

        confirmReceiveBtn() {
            return { key: 'confirm_receive', name: '确认签收', class: 'red' }
        }
    }
}
</script>