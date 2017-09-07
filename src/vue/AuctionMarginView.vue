<style lang="stylus">
@import '~style/partials/var'
.auction-margin-view
    padding-top 100px
    padding-bottom 80px
    &.paid-result
        background #ffffff
        text-align center
    .success
        width 100px
        height @width
        margin 112px 0 50px
        background-image url($qn + 'auction/pay-margin-success.png')
        background-size 100%
        &.fail
            background-image url($qn + 'auction/pay-margin-fail.png')
    .confirm
        margin 110px 175px 0
        border-radius 80px
    .margin-desc
        line-height 1.4
    .bid-limit
        .red-e6:first-letter
            font-size 26px
    .margin-list
        border-color #ededed
        .margin
            width calc(45%)
        .list
            height 100px
            line-height 100px
            &:not(:last-child)
                border-bottom 1px dashed #ededed
            font-size 30px
            color #242424
            position relative
            .icon
                width 36px
                height @width
                position absolute
                right 28px
                top 50%
                transform translateY(-18px)
    .go-paid
        margin 44px 54px 0
        border-radius 80px
    .margin-rule
        width 100%
        height 1308px
    .bid-total
        border-color #ededed
        padding 40px 20px 0 36px
        .red-e6:first-letter
            font-size 26px
        .icon
            width 26px
            height @width
            transform translateY(-6px)
    p
        line-height 39px
</style>
<template lang="pug">
.auction-margin-view(@touchstart="touchStart($event)", :class="tryPaid ? 'paid-result' : 'bg-gray-f7'")
    auction-header-menu
    template(v-if="tryPaid")
        .success.inline-block(:class="{'fail': !paySuccess}")
        .fz-40.black-47 {{ paySuccess ? '支付成功' : '支付失败'}}
        .mgt-50.fz-24.gray-b3 {{ paySuccess ? '保证金已缴纳，您可以立即参与拍卖' : '保证金支付失败，请重新支付'}}
        .confirm.fz-36.white.line-height-80.bg-red-e6.center(@click="onConfirm") {{ paySuccess ? '我知道了' : '重新支付'}}
    template(v-else)
        .margin-desc.pdh-36.pdv-32.fz-30.black-24(v-if="$route.name === 'pay-margin'") 您参与的拍品最低出价{{ auctionCurrentPrice | price }}，您当前剩余出价额度不足，需要缴纳对应金额的保证金，提高可出价总额才可继续出价
        .bid-total.bg-white.bdb(v-else)
            .fz-26.black-24 您参与中的拍卖出价总额
            .line-height-120.flex
                .red-e6.bold.line-height-120.fz-36 {{ auctionUsedAmount | price }}
                .flex-1
                .bid-detail.flex
                    .fz-24.green-00.mgr-6(v-link="{name: 'bid-detail'}") 出价明细
                    icon.gray(name="enter")
        .bid-limit.bg-white.bdt.bdb.flex.black-24.fz-26
            .flex-1.bdr.pdt-40.pdl-36
                div 已缴纳保证金
                .red-e6.bold.line-height-120.fz-36 {{ buyerCurrentAmount | price }}
            .flex-1.pdt-40.pdl-36(v-if="$route.name === 'pay-margin'")
                div 剩余出价额度
                .red-e6.bold.line-height-120.fz-36 {{ overAmount - auctionUsedAmount | price }}
            .flex-1.pdt-40.pdl-36(v-else)
                div 可出价总额
                .red-e6.bold.line-height-120.fz-36 {{ overAmount | price }}
        template(v-if="overAmount || overAmount === 0")
            .fz-26.gray-8f.pdt-36.pdb-24.pdl-36 提高可出价总额
            .margin-list.pdh-36.bg-white.bdt.bdb
                .flex.line-height-80.bdb.fz-26.dark-6b
                    .title.margin.pdl-28 保证金金额
                    .flex-1 可出价总额
                .list.flex(v-for="item in marginRule", @click="choseMargin = item.margin")
                    .margin.pdl-28 {{ item.margin | price }}
                    .flex-1(v-if="item.upper_limit") {{ item.upper_limit | price }}
                    .flex-1(v-else) 不限制
                    icon(:name="item.margin === choseMargin ? 'selected' : 'select'", v-if="buyerCurrentAmount < item.margin")
            .go-paid.line-height-80.white.fz-36.bg-red-e6.center(@click="onConfirm") 需支付{{ choseMargin - buyerCurrentAmount | price }}，去支付
        .margin-refund.mgt-40.fz-24.green-00.center(v-if="$route.name === 'bid-margin && buyerCurrentAmount !== 0'", @click="onMarginRefund") 保证金退款
        .margin-rule.mgt-48(v-bg.lg="marginRulePhoto")
    download-dialog(:show.sync="showRefundHint")
        .fz-36.center 退款退货
        p.mgt-40 为了您的资金安全，退款退货需要在美玉秀秀APP内申请
        p.mgt-32.fz-26.gray-8f.special 进入APP后请使用微信登录
</template>
<script>
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
import DownloadDialog from 'component/DownloadDialog.vue'
export default {
    name: 'auction-margin-view',
    components: { AuctionHeaderMenu, DownloadDialog },

    data() {
        return {
            tryPaid: false,
            paySuccess: false,
            showRefundHint: false,
            buyerCurrentAmount: '',
            auctionUsedAmount: '',
            overAmount: null,
            auctionCurrentPrice: '',
            marginRule: [],
            choseMargin: '',
            marginRulePhoto: ''
        }
    },

    ready() {
        this.$fetch(`mall/auctions/myb/margin_rule`).then(marginRules => {
            this.marginRulePhoto = marginRules.margin_rule_photo.photo
            this.marginRule = marginRules.margin_rule
            this.buyerCurrentAmount = marginRules.buyer_current_amount
            this.auctionUsedAmount = marginRules.auction_used_amount
            this.overAmount = marginRules.over_amount

            if (this.buyerCurrentAmount === 0) {
                this.choseMargin = this.marginRule[0].margin
            } else {
                for (let item of this.marginRule) {
                    if (item.margin > this.buyerCurrentAmount) {
                        this.choseMargin = item.margin
                        break
                    }
                }
            }
        })
        this.$fetch(`mall/auctions/${this.$route.query.id}`).then(({current_price}) => {
            this.auctionCurrentPrice = current_price
        })
    },

    beforeDestroy() {
        this.$store.remove('pay_result')
    },

    methods: {
        onConfirm() {
            if (this.tryPaid && this.paySuccess) {
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
                this.$router.go({name: 'pay',
                    query: { t: this.config.payBizType.auction, m: this.choseMargin }})
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
                this.tryPaid = payResult.tryPaid
                this.paySuccess = payResult.paySuccess
            }
        }
    }
}
</script>