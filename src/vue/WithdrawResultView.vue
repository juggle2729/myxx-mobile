<style lang="stylus">
.cash-result
    padding-top: 120px
    .result
        .icon-check-on
            font-size: 120px
            color: #09bb07
            margin-bottom: 40px
        .light
            margin: 24px 0 80px
    .item
        height: 86px
        line-height: 86px
        padding: 0 32px
    .button
        width: 686px
        height: 80px
        line-height: 80px
        border-radius: 8px
        margin: 50px auto 0
</style>
<template lang="jade">
.cash-result.bg.fz-30
    .result.center
        .icon-check-on
        p 您的提现申请已受理
        p.fz-26.light 预计会在1-2个工作日内到账
    .item.flex.bdv.bg-white
        .flex-1.gray 提现到银行卡
        div {{info.bank_account}}
    .item.flex.bdb.bg-white
        .flex-1.gray 提现金额
        div {{info.trans_amount | price}}
    .button.bg-red.white.fz-30.center(@click='back') 我知道了
</template>
<script>
export default {
    name: 'CashResultView',
    data() {
        return {
            info: {}
        }
    },
    ready() {
        this.$on('restore', () => {
            this.action('action', {label: '常见问题'}).then(() => {
                this.$router.go({name: 'mall-help-category', params:{category: 'payment'}})
            })
        })
    },
    route: {
        data({to}) {
            return this.$get(`balance/withdraw/${to.params.id}`).then((data) => {
                this.info = data
                this.action('action', {label: '常见问题'}).then(() => {
                    this.$router.go({name: 'mall-help-category', params:{category: 'payment'}})
                })
            })
        }
    },
    methods: {
        back() {
            this.action('back', {step: 2, refresh: true})
        }
    }
}
</script>
