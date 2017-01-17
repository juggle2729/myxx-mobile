<style lang="stylus">
.coupon-rule-view
    img
        display: block
        height: 10px
        width: 10px
    li
        list-style: decimal
        line-height: 1.5
        margin-left: 32px
</style>
<template lang="jade">
    .coupon-rule-view.pdh-32.pdt-40.fz-30
        .mgb-36(v-for="rule in rules")
            .bold.mgb-24.flex.mgb
                img(:src="'red_dot.png' | qn") 
                .mgl-12 {{rule.title}}
            ol.gray
                li(v-for="item in rule.items") {{item}}
</template>
<script>
const rules = [
    {
        title: '如何使用优惠券',
        items: ['下单后，系统会自动选取满足条件的优惠券进行减额']
    }, {
        title: '使用规则',
        items: [
            '首单券：首次下单即可使用', '满减券：下单时金额满足满减条件后即可使用',
            '同一个订单同一类优惠券最多只能使用一张', '取消订单时，自动退回对应的优惠券',
            '拒收或退货时，不退回对应的优惠券', '优惠券必须在其有效期内使用。建议打开美玉秀秀APP消息推送，及时接收优惠券过期提醒'
        ]
    }
]
export default {
    name: 'coupon-rule-view',

    computed: {
        rules() {
            return rules
        }
    }
}
</script>