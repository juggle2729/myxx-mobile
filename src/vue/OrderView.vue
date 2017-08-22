<style lang="stylus">
@import '~style/partials/mixin'
$b = '//o0x80w5li.qnssl.com/'
$mgl = 80px
icon($name)
    width 80px
    height 30px
    background url($b + 'order/' + $name + '.png') center no-repeat
    background-size 30px 30px
.order-view
    .stage
        width 100%
        padding-top 26.667%
        background url($b + 'auction/order-stage.png') no-repeat
        background-size cover
    .column-flex
        flex-direction column
        align-items flex-start
    .status-icon
        icon(status)
    .logistics-icon
        icon(logistics)
    .desc
        margin-left $mgl
        line-height 1.3
    .icon-enter
        width 14px
        height 24px
    .logistics-enter
        width 120px
    .icon-location, .icon-shop
        width 80px
        margin-bottom 2px
    .operation
        border(a, #c6c6c6)
        line-height 40px
        border-radius 4px
    .full-width
        width 100%
    .order-items
        margin-left $mgl
    .amount
        margin-left $mgl
        margin-bottom 20px
        &.red
            margin-bottom 0
    .note
        border(a, #f4d3a9)
        background-color #faf3ea
        line-height 1.5
    .download
        p
            line-height 1.5
        div:last-child
            line-height 90px
            border-radius 8px
</style>
<template lang="pug">
.order-view(v-if="!$loadingRouteData")
    .stage
    .order-status.pdv-36.fz-26.flex.bdb(@click="seeReason")
        .flex.flex-1.mgr-32.column-flex
            .flex
                .status-icon
                .fz-30(:class="order.status === config.orderStatus.wait_goods ? 'green-09': 'red'") {{ order.status_title }}
            .desc.gray.mgt-20 {{ order.status_desc }}
            .desc.light.mgt-16(v-if="additionalDesc") {{ additionalDesc }}
        .flex(v-if="canSeeReason")
            .gray.fz-22.mgr-32 查看原因
            icon.gray.mgr-32(name="enter")
    .logistics.pdv-36.fz-26.flex.bdb(v-if="logisticsInfo", @click="seeLogistics")
        .flex.flex-1.mgr-32.column-flex
            .flex
                .logistics-icon
                .fz-30 物流追踪
            .desc.gray.mgt-20 {{ logisticsInfo.remark }}
            .desc.light.mgt-16 {{ logisticsInfo.datetime }}
        icon.logistics-enter.gray(name="enter")
    .flex.mgr-32.pdv-36.fz-26.column-flex.bdb(v-if="addressInfo")
        .flex.full-width
            icon.gray.fz-30(name="location")
            .flex-1.fz-30.black {{ addressInfo.title }}
            .operation.center.pdh-12.fz-22.gray(@click="copyAddress") 复制地址
        .desc.black.mgt-20 {{ addressInfo.namePhone }}
        .desc.gray.mgt-16 {{ addressInfo.address }}
    .flex.mgr-32.pdv-36.fz-26.column-flex.bdb
        .flex.full-width
            icon.gray.fz-30(name="shop")
            .flex-1.fz-30.black {{ order.shop.shop_name }}
            .operation.center.pdh-12.fz-22.gray(@click="complainStore") 投诉商家
        .order-items.pdt-36.bdb
            order-item-item(v-for="orderItem in order.order_items", :item="orderItem", :index="$index", :page="'detail'")
        template(v-if="isNegotiable")
            .fz-26.black.amount.mgt-36 {{ `共${amount.itemCount}件商品, 合计: 等待商家改价` }}
        template(v-else)
            .fz-26.black.amount.mgt-36 {{ `共${amount.itemCount}件商品, 合计: ` }}{{ amount.cashAmount | price }}
        .fz-26.black.amount(v-if="amount.shopCouponAmount > 0") 店铺优惠券优惠: -{{ amount.shopCouponAmount | price }}
        .fz-26.black.amount(v-if="amount.platformCouponAmount > 0") 平台优惠券优惠: -{{ amount.platformCouponAmount | price }}
        template(v-if="isNegotiable")
            .fz-26.red.amount 实付款: 等待商家改价
        template(v-else)
            .fz-26.red.amount 实付款: {{ amount.cashAmount | price }}
        .fz-26.pd-22.orange.desc.note(v-if="order.buyer_note") 订单备注：{{ order.buyer_note }}
    order-operation(:order.sync="order", :index="0")
    .bg.pdv-28.fz-26.gray
        .desc 订单编号：{{ order.order_no }}
        .desc.mgt-18 下单时间：{{ order.create_at | date 'yyyy-mm-dd HH:MM:ss' }}
    .pdh-32.pdv-48.download
        .fz-30 下载美玉秀秀APP，更加方便的体验交易服务
        p.fz-26.gray.mgt-28 1. 及时接受订单状态变化提醒
        p.fz-26.gray 2. 领取店铺、平台优惠券，及时接受优惠信息
        p.fz-26.gray 3. 交易完成后，可对卖家进行评价，和卖家建立良好的、长期的交易关系
        .mgt-32.white.bg-red.fz-30.center(@click="download") 免费下载美玉秀秀APP
    download-dialog(:show.sync="showRefundOrBackHint")
        .fz-36.center 退款退货
        p.mgt-40 为了您的资金安全，退款退货需要在美玉秀秀APP内申请
        p.mgt-32.fz-26.gray-8f.special 进入APP后请使用微信登录
</template>
<script>
import date from '../util/date'
import OrderItemItem from './component/item/OrderItem.vue'
import OrderOperation from './component/OrderOperation.vue'
import DownloadDialog from './component/DownloadDialog.vue'
export default {
    name: 'order-view',
    components: [ OrderItemItem, OrderOperation, DownloadDialog ],

    data() {
        return {
            order: {
                shop: {}
            },
            showRefundOrBackHint: false
        }
    },

    computed: {
        canSeeReason() {
            return this.order.status === this.config.orderStatus.refund_rejected ||
                this.order.status === this.config.orderStatus.back_rejected
        },

        additionalDesc() {
            const diffTimeStr = date.diffNowTime(this.order.timeout, false)
            if (!diffTimeStr) {
                return this.order.status_appendix
            } else {
                switch (this.order.status) {
                    case this.config.orderStatus.wait_pay:
                        return `剩余${diffTimeStr}自动关闭`
                    case this.config.orderStatus.refund_requested:
                        return `剩余${diffTimeStr}自动退款`
                    case this.config.orderStatus.confirm_goods:
                        return `${diffTimeStr}内您可以申请退货`
                }
                return ''
            }
        },

        logisticsInfo() {
            const status = this.order.status
            const orderStatus = this.config.orderStatus
            let routes = null
            // 退货订单 卖家确认订单退货超时
            if (status === orderStatus.back || status === orderStatus.back_timeout ||
                status === orderStatus.back_goods || status === orderStatus.back_received) {
                if (this.order.express_rt_info) {
                    routes = this.order.express_rt_info.routes
                }
                // 待收货和待发货显示卖家订单信息
            } else if (status === orderStatus.wait_send || status === orderStatus.wait_goods) {
                if (this.order.express_wg_info) {
                    routes = this.order.express_wg_info.routes
                }
            }
            if (routes && routes.length) {
                return routes[0]
            }
        },

        addressInfo() {
            if (this.isReturn) {
                if (this.order.return_receiver_name) {
                    return {
                        title: '退货地址',
                        namePhone: `${this.order.return_receiver_name} ${this.order.return_receiver_phone}`,
                        address: this.order.return_receiver_address
                    }
                }
            } else {
                if (this.order.receiver_name) {
                    return {
                        title: '收货地址',
                        namePhone: `${this.order.receiver_name} ${this.order.receiver_phone}`,
                        address: this.order.receiver_address
                    }
                }
            }
        },

        isReturn() { // 是否是退货
            switch (this.order.status) {
                case this.config.orderStatus.back_goods:
                case this.config.orderStatus.back_received:
                case this.config.orderStatus.back_approved:
                case this.config.orderStatus.back_proposed:
                case this.config.orderStatus.back_completed:
                case this.config.orderStatus.back_timeout:
                case this.config.orderStatus.back_failed:
                case this.config.orderStatus.back_accepted:
                    return true
            }
            return false;
        },

        amount() {
            if (!this.order.pays) {
                return {}
            }

            let [ cashAmount, shopCouponAmount, platformCouponAmount] = [ 0, 0, 0 ]
            this.order.pays.forEach(pay => {
                if (pay.pay_type === 'cs') {
                    cashAmount += pay.amount
                } else if (pay.pay_type === 'cp') {
                    if (pay.is_shop) {
                        shopCouponAmount += pay.amount
                    } else {
                        platformCouponAmount += pay.amount
                    }
                }
            })
            return {
                shopCouponAmount,
                platformCouponAmount,
                itemCount: this.order.order_items.length,
                cashAmount
            }
        },

        isNegotiable() {
            if (!this.order.order_items) {
                return false
            }
            return this.order.order_items.some(item => !item.trans_amount)
        }
    },

    methods: {
        seeReason() {
            if (!this.canSeeReason) {
                return
            }
            this.$router.go({
                name: 'order-reject',
                params: {
                    id: this.order.order_no,
                    type: this.order.status === this.config.orderStatus.refund_rejected ? 'refund' : 'back'
                }
            })
        },

        seeLogistics() {
            this.$router.go({
                name: 'trace',
                params: {
                    id: this.order.order_no
                }
            })
        },

        copyAddress() {
            const copyTarget = []
            if (this.isReturn) {
                copyTarget.push(this.order.return_receiver_name, this.order.return_receiver_phone, this.order.return_receiver_address)
            } else {
                copyTarget.push(this.order.receiver_name, this.order.receiver_phone, this.order.receiver_address)
            }

            if (window.clipboardData && window.clipboardData.setData) {
                // IE specific code path to prevent textarea being shown while dialog is visible.
                return clipboardData.setData("Text", copyTarget.join('\n'))

            } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                const textarea = document.createElement("textarea")
                textarea.textContent = copyTarget.join('\n')
                textarea.style.position = "fixed"  // Prevent scrolling to bottom of page in MS Edge.
                document.body.appendChild(textarea)
                textarea.select()
                try {
                    return document.execCommand("copy")  // Security exception may be thrown by some browsers.
                } catch (ex) {
                    console.warn("Copy to clipboard failed.", ex)
                    return false;
                } finally {
                    document.body.removeChild(textarea)
                    this.action('toast', { success: 1, text: '复制成功' })
                }
            }
        },

        complainStore() {
            this.$router.go({
                name: 'complain',
                params: {
                    type: 'sh',
                    id: this.order.shop.id
                },
                query: {
                    order: this.order.order_no
                }
            })
        },

        download() {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meiyuxiuxiu.myxx'
        }
    },

    route: {
        data({ to }) {
            return this.$fetch(`mall/order/${to.params.id}`).then(order => ({ order }))
        }
    },

    events: {
        deleteOrder() {
            this.action('back', {step: 1, refresh: true})
        },

        applyRefundOrBack() {
            this.showRefundOrBackHint = true
        }
    }
}
</script>