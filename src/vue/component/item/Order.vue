<style lang="stylus">
@import '~style/partials/mixin'
.order-item
    .total
        justify-content flex-end
    .btns
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
.order-item.bg-white.pdl-32.pdt-32.fz-26
    .flex.pdr-32
        .light {{ item.update_at | date 'yyyy-mm-dd HH:MM:ss' }}
        .flex-1
        .status(:class="statusClass") {{ item.status_title }}
    .order-items.pdv-32.bdb
        order-item-item(v-for="orderItem in item.order_items", :item="orderItem", :index="$index")
    .pdv-20.flex.total.pdr-32
        .black.fz-22.mgr-4 {{ countText }}
        template(v-if="lodash.isNumber(priceText)")
            .red(:class="isNegotiable ? 'fz-22' : 'fz-30'") {{ priceText | price }}
        template(v-else)
            .red(:class="isNegotiable ? 'fz-22' : 'fz-30'") {{ priceText }}
        .black.fz-22.mgl-4(v-if="discountAmount > 0") (已优惠{{ discountAmount | price }})
    .btns.flex.pdr-32(v-if="btns.length")
        .btn.pdh-28.fz-26(v-for="btn in btns", :class="btn.class", @click="onBtnClick(btn.key)") {{ btn.name }}
</template>
<script>
import OrderItemItem from './OrderItem.vue'
export default {
    name: 'order-item',
    components: [ OrderItemItem ],

    props: {
        item: Object,
        index: Number
    },

    methods: {
        onBtnClick(button) {
            switch (button) {
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
                case 'reason':
                    this.$router.go({
                        name: 'order-reject',
                        params: {
                            id: this.item.order_no
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

        statusClass() {
            switch (this.item.status) {
                case this.orderStatus.unpaid_cancelled:
                case this.orderStatus.unpaid_timeout:
                case this.orderStatus.refund_completed:
                case this.orderStatus.back_completed:
                    return 'gray'
                    break
                case this.orderStatus.success:
                case this.orderStatus.back_failed:
                    return 'green-2e'
                    break
                default:
                    return 'red'
                    break
            }
        },

        isNegotiable() {
            if (!this.item.order_items) {
                return false
            }
            return this.item.order_items.some(item => !item.trans_amount)
        },

        countText() {
            const isRefundAmount = (_.includes(this.item.status, this.orderStatus.refund) ||
                _.includes(this.item.status, this.orderStatus.back)) && this.item.status !== this.orderStatus.back_failed
            if (isRefundAmount) {
                return `共${this.item.order_items ? this.item.order_items.length : 0}件商品, 退款金额: `
            } else {
                return `共${this.item.order_items ? this.item.order_items.length : 0}件商品, 合计: `
            }
        },

        priceText() {
            if (!this.item.pays) {
                return ''
            }
            let cashAmount = 0
            this.item.pays.forEach(pay => {
                if (pay.pay_type === 'cs') {
                    cashAmount += pay.amount
                }
            })
            if (this.isNegotiable) {
                return '等待商家改价'
            } else {
                return cashAmount
            }
        },

        discountAmount() {
            if (!this.item.pays) {
                return ''
            }
            let disAmount = 0
            this.item.pays.forEach(pay => {
                if (pay.pay_type !== 'cs') {
                    disAmount += pay.amount
                }
            })
            return disAmount
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
                    return [ this.reasonBtn, this.applyRefundBtn, this.cancelRefundBtn ]
                    break
                case this.orderStatus.wait_goods:
                    return [ this.logisticsBtn, this.applyBackBtn, this.confirmReceiveBtn ]
                    break
                case this.orderStatus.confirm_goods:
                    return [ this.logisticsBtn, this.applyBackBtn ]
                    break
                case this.orderStatus.back_rejected:
                    return [ this.reasonBtn, this.applyBackBtn, this.cancelBackBtn ]
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

        reasonBtn() {
            return { key: 'reason', name: '查看原因' }
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