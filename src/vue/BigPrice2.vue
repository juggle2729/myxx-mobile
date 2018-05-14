<style lang="stylus">
    @import '~style/partials/var'
    .pay-result-view
        text-align center
        padding 0 70px
        .success
            width 100px
            height @width
            margin 112px 0 58px
            background-image url($qn + 'auction/pay-margin-success.png')
            background-size 100%
            &.fail
                background-image url($qn + 'auction/pay-margin-fail.png')
        .confirm
            width 400px
            margin 110px 0
            border-radius 80px
</style>
<template lang="pug">
    .pay-result-view
        .success.inline-block(:class="{'fail': !paySuccess}")
        .fz-40.black-47 {{ paySuccess ? '支付成功' : '支付失败'}}
        .mgt-50.fz-24.gray-b3(v-if="bizType === 'auction'") {{ paySuccess ? '保证金已缴纳，您可以立即参与拍卖' : '保证金支付失败，请重新支付'}}
        .mgt-50.fz-24.gray-b3(v-else) {{ paySuccess ? '支付成功，可查看订单' : '支付失败，请重新支付'}}
        .inline-block.confirm.fz-36.white.line-height-80.bg-red-e6.center(@click="onConfirm") {{ paySuccess ? (bizType === 'auction' ? '我知道了' : '查看订单') : '重新支付'}}
</template>
<script>
    export default {
        name: 'pay-result-view',

        data() {
            return {
                paySuccess: false,
                bizType: ''
            }
        },

        methods: {
            onConfirm() {
                if (this.bizType === 'auction'){
                    if (this.paySuccess) {
                        if (this.$route.query.id) {
                            this.$router.replace({
                                name: 'auction',
                                params: {
                                    id: this.$route.query.id
                                }
                            })
                        } else {
                            this.$router.replace('/auction/mine')
                        }
                    } else {
                        this.$router.go({name: 'pay',
                            query: { t: this.bizType, m: this.$route.query.m, id: this.$route.query.id }})
                    }
                } else {
                    if (this.paySuccess) {
                        this.$router.replace({name: 'order', params: {id: this.$route.query.id}})
                    } else {
                        this.$router.go({name: 'pay',
                            query: { t: this.bizType, id: this.$route.query.id }})
                    }
                }
            }
        },

        route: {
            data() {
                this.paySuccess = this.$store.get('pay_result')
                this.bizType = this.$route.query.biz_type
            }
        },

        beforeDestroy() {
            this.$store.remove('pay_result')
        },
    }
</script>