<style lang="stylus">
.wallet-view
    .item
        height: 156px
        padding: 33px 32px 0
        .red
            margin-top: 25px
    .button
        width: 648px
        height: 80px
        line-height: 80px
        border-radius: 8px
        margin: 50px auto 0
    .tip
        width: 648px
        margin: 38px auto
        line-height: 40px
        p
            margin-top: 20px
    .rule
        position: absolute
        left: 50%
        transform: translate(-50%)
        .icon-enter
            position: relative
            top: 3px
</style>
<template lang="jade">
.wallet-view.bg
    .item.fz-30.bg-white.bdb
        div 可提现金额
        .red.fz-40 {{balance.current_amount | price '0'}}
    .item.fz-30.bg-white.bdb
        div 待结算金额
        .red.fz-40 {{balance.expect_amount | price '0'}}
    .button.bg-gray.white.fz-30.center(:class="{'bg-red': balance.current_amount}", v-link="balance.current_amount ? {name: 'withdraw'} : ''") 提现
    .tip.fz-30.gray
        | 买家付款后, 货款计入"待结算金额"；买家确认收货后的5天内没有提出退货申请,
        | 货款转入"可提现金额", 您可以随时提现。
        br
        p 每笔成功交易的订单将会收取3%的服务费。
    .rule.fz-30(v-link="{name: 'mall-help-category', params: {category: 'payment'}}")
        span
            | 查看详细规则
            span.icon-enter.gray.fz-30
</template>
<script>
export default {
    name: 'wallet-view',
    data() {
        return {
            balance: {}
        }
    },
    ready() {
        this.$on('restore', () => {
            this.action('action', {label: '明细'}).then(() => {
                this.$router.go({name: 'detail', params: {tab: 'expects'}})
            })
        })
    },
    route: {
        data() {
            return this.$fetch('balance/latest').then((balance) => {
                this.action('action', {label: '明细'}).then(() => {
                    this.$router.go({name: 'detail', params: {tab: 'expects'}})
                })
                this.balance = balance
            })
        }
    }
}
</script>
