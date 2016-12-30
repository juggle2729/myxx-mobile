<style lang="stylus">
.coupon-rule-view
    li
        list-style: decimal
        line-height: 1.5
        margin-left: 32px
</style>
<template lang="jade">
    .coupon-rule-view.pdh-32.pdt-40.fz-30
        .bold.mgb-24 如何使用优惠券
        ol.gray
            li 下单后，系统会自动选取满足条件的优惠券进行减额
        .bold.mgt-48.mgb-24 使用规则
        ol.gray
            li 现金券：下单即可使用
            li 满减券：下单时金额满足满减条件后即可使用
            li 同一个订单同一类优惠券最多只能使用一张，但可同时使用一张现金券和一张满减券
            li 取消订单时，自动退回对应的优惠券
            li 拒收或退货时，不退回对应的优惠券
            li 优惠券必须在其有效期内使用。建议打开美玉秀秀APP消息推送，及时接收优惠券过期提醒
</template>
<script>
    export default {
        name: 'coupon-rule-view'
    }
</script>