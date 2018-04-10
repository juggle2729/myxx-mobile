<style lang="stylus">
.order-item
    .total
        justify-content flex-end
</style>
<template lang="pug">
.order-item.bg-white.pdl-32.pdt-32.fz-26.bdb.bdt(v-link="{name: 'order', params: {id: item.order_no}}")
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
    order-operation(:order.sync="item", :index="index")
</template>
<script>
import OrderItemItem from './OrderItem.vue'
import OrderOperation from '../OrderOperation.vue'
export default {
    name: 'order-item',
    components: [ OrderItemItem, OrderOperation ],

    props: {
        item: Object,
        index: Number
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
        }
    }
}
</script>