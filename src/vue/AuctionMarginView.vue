<style lang="stylus">
.auction-margin-view
    padding-top 88px
    .quota
        &:before
            content '￥'
            position relative
            top 4px
    p
        line-height 39px
    .confirm
        line-height 90px
        border-radius 8px
    .special
        &:before
            content '* '
            position relative
            top 4px
</style>
<template lang="pug">
.auction-margin-view.bg(@touchstart="onTouchStart($event)")
    auction-header-menu
    .pdh-32
        .fz-30.black.mgt-48.center 竞拍保证金
        .quota.fz-60.red.center.mgt-32 50
        .mgt-44.fz-26.gray
            template(v-if="isPaid")
                p.center.fz-30.black 保证金已缴纳，您可以立即参与拍卖
            template(v-if="paySuccess && !isPaid")
                p 为了确保合理使用拍卖功能，避免恶意出价等情况，参与美玉秀秀拍卖需要缴纳保证金，保证金只用缴纳一次，缴纳完毕后即可参与平台内所有拍卖。
                p 保证金可随时退回。
            template(v-if="!paySuccess && !isPaid")
                p.center.fz-30.black 付款失败，请重新支付
        .confirm.fz-30.white.bg-red.center.mgt-32(@click="onConfirm") {{ isPaid ? '我知道了' : (!paySuccess ? '重新支付' : '确认支付保证金￥50') }}
        .mgt-36.fz-26.blue-52.center(v-if="isPaid", @click="onMarginRefund") 保证金退款
    auction-dialog(:show.sync="showRefundHint")
        .fz-36.center 退款退货
        p.mgt-40 为了您的资金安全，退款退货需要在美玉秀秀APP内申请
        p.mgt-32.fz-26.gray-8f.special 进入APP后请使用微信登录
</template>
<script>
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
import AuctionDialog from 'component/AuctionDialog.vue'
export default {
    name: 'auction-margin-view',

    data() {
        return {
            isPaid: false,
            paySuccess: true,
            showRefundHint: false
        }
    },

    components: {
        AuctionHeaderMenu,
        AuctionDialog
    },

    beforeDestroy() {
        this.$store.remove('pay_result')
    },

    methods: {
        onTouchStart(event) {
            return event.preventDefault()
        },
        onConfirm() {
            if (this.isPaid && this.paySuccess) {
                this.$router.go('/auction/mine')
            } else {
                this.$router.go({name: 'pay', query: { t: this.config.payBizType.auction.key }})
            }
        },
        onMarginRefund() {
            this.showRefundHint = true
        }
    },

    route: {
        data() {
            const payResult = this.$store.get('pay_result')
            if (payResult) {
                this.isPaid = payResult.isPaid
                this.paySuccess = payResult.paySuccess
            } else {
                return this.$fetch(`balance/latest`)
                    .then(({ aution_margin_buyer }) => ({ isPaid: aution_margin_buyer > 0 }))
            }
        }
    }
}
</script>