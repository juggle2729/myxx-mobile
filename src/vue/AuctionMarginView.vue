<style lang="stylus">
.auction-margin-view
    padding-top 88px
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
.auction-margin-view.bg(@touchstart="touchStart($event)")
    auction-header-menu
    .pdh-32
        .fz-30.black.mgt-48.center 竞拍保证金
        .quota.fz-60.red.center.mgt-32 {{ margin | price }}
        .mgt-44.fz-26.gray
            template(v-if="isPaid")
                p.center.fz-30.black 保证金已缴纳，您可以立即参与拍卖
            template(v-if="paySuccess && !isPaid")
                p 为了确保合理使用拍卖功能，避免恶意出价等情况，参与美玉秀秀拍卖需要缴纳保证金，保证金只用缴纳一次，缴纳完毕后即可参与平台内所有拍卖。
                p 保证金可随时退回。
            template(v-if="!paySuccess && !isPaid")
                p.center.fz-30.black 付款失败，请重新支付
        .confirm.fz-30.white.bg-red.center.mgt-32(@click="onConfirm") {{ isPaid ? '我知道了' : (!paySuccess ? '重新支付' : `确认支付保证金￥${ toYuan(margin) }`) }}
        .mgt-36.fz-26.blue-52.center(v-if="isPaid", @click="onMarginRefund") 保证金退款
    download-dialog(:show.sync="showRefundHint")
        .fz-36.center 退款退货
        p.mgt-40 为了您的资金安全，退款退货需要在美玉秀秀APP内申请
        p.mgt-32.fz-26.gray-8f.special 进入APP后请使用微信登录
</template>
<script>
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
import DownloadDialog from 'component/DownloadDialog.vue'
import Q from 'q'
export default {
    name: 'auction-margin-view',
    components: { AuctionHeaderMenu, DownloadDialog },

    data() {
        return {
            isPaid: false,
            paySuccess: true,
            showRefundHint: false,
            margin: 0
        }
    },

    beforeDestroy() {
        this.$store.remove('pay_result')
    },

    methods: {
        onConfirm() {
            if (this.isPaid && this.paySuccess) {
                if (this.$route.query.id) {
                    this.$router.go({
                        name: 'auction',
                        params: {
                            id: this.$route.query.id
                        }
                    })
                } else {
                    this.$router.go('/auction/mine')
                }
            } else {
                this.$router.go({name: 'pay', query: { t: this.config.payBizType.auction }})
            }
        },

        onMarginRefund() {
            this.showRefundHint = true
        },

        loadMargin() {
            return this.$fetch(`mall/auctions/get_margin`).then(({ myb_amount }) => {
                this.margin = myb_amount
            })
        },

        loadBalance() {
            return this.$fetch(`balance/latest`).then(({ aution_margin_buyer }) => {
                    this.isPaid = aution_margin_buyer > 0
                })
        }
    },

    route: {
        data() {
            const payResult = this.$store.get('pay_result')
            if (payResult) {
                this.isPaid = payResult.isPaid
                this.paySuccess = payResult.paySuccess
                return this.loadMargin()
            } else {
                return Q.all([this.loadMargin(), this.loadBalance()])
            }
        }
    }
}
</script>