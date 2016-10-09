<style lang="stylus">
@import '~style/partials/var'
.purchase-add-view
    .content
        padding: 36px 32px 0 0
        &:before
            position: absolute
            top: 36px
            left: 0
            content: ''
            background: url($qn + "purchase/text_edit.png")
            background-size: cover
            width: 36px
            height: 36px
    textarea
        border: 0
        overflow: hidden
        resize: none
        width: 100%
        height: 240px
        line-height: 40px
    .budget
        height: 100px
    input
        border: 0
        margin: 0 14px
        width: 150px
        &::-webkit-input-placeholder
            padding-top: 4px
    .margin
        height: 136px
    .bottom
        height: 98px
        left: 0
        bottom: 0
        width: 100%
    .pay
        line-height: 100px
        width: 232px
</style>
<template lang="pug">
.purchase-add-view
    .pdl-32
        .content.relative.bdb
            textarea.fz-30.pdl-48(v-model="description", placeholder="需求描述，可描述玉质、样式、大小及购买用途，提高竞标的匹配度")
        .budget.flex
            .gray.fz-30.flex-1 预算
            .price.fz-30.pdr-32
                span ￥
                input.fz-30(placeholder="请输入数字", type="tel", v-model="budget", maxlength="8")
                span 左右
    .hr
    .margin.flex.pdh-32
        .flex-1
            .fz-26.gray 保证金（竞标结束后全额退还）
            .fz-22.light.mgt-14 为确保求购质量，需支付预算金额的1‰(最低￥1)
        .fz-30.red ￥{{margin}}
    .hr
    .bottom.flex.pdl-32.absolute.bdt
        .flex-1.fz-30
            span.gray 需支付
            span.red.mgl-10 ￥{{margin}}
        .fz-30.white.pay.center(@click="sendPay()", :class="{'bg-disable': !isValid, 'bg-red': isValid}") 发布并支付
</template>
<script>
const pingpp = require('pingpp-js');
export default {
    name: 'purchase-add-view',
    data() {
        return {
            budget: null,
            description: ''
        }
    },
    computed: {
        margin() {
            const val = this.budget / 1000;
            if(!val || Number.isNaN(val)) {
                return 0
            } else if (val < 1) {
                return 1
            } else {
                return val.toFixed(2)
            }
        },
        isValid() {
            return this.description.trim().length > 0 && +this.budget > 0
        }
    },
    methods: {
        sendPay() {
            if(!this.isValid) {
                return
            }

            this.$post(`mall/purchases`, {
                description: this.description,
                price_max: this.budget * 100
            }).then(data => {
                this.$router.go({name: 'pay-channels', query: {id: data.id, type: 'bid'}, replace: true})
            })
        }
    }
}
</script>