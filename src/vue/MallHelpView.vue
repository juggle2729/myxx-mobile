<style lang="stylus">
.mall-help-view
    .icon-enter
        height: 22px
        width: 22px
</style>
<template lang="jade">
.mall-help-view.bg.pdv
    .bg-white.mgb(v-for="item in items")
        .line-height-98.fz-30.bold.mgl-32.pdr-32 {{item.name}}
        .line-height-90.flex.fz-26.bdt.mgl-32.pdr-32(v-for='pro in item.pros', v-link="{path: '/help/mall-detail/' + item.type + '#' + pro.id}")
            .flex-1 {{pro.title}}
            icon.gray(name="enter")
</template>
<script>
export default {
    name: 'HelpView',

    data() {
        return {
            items: [
                {
                    type: 'common',
                    name: '常见问题',
                    pros: [
                        {id: 'common_1', title: '担保交易如何保障资金安全？'},
                        {id: 'common_2', title: '退货期从什么时候开始计算？'},
                        {id: 'common_3', title: '发货和退货运费谁来承担？'},
                        {id: 'common_4', title: '付款了，商家不发货怎么办？'},
                        {id: 'common_5', title: '交易中发生纠纷怎么办？'},
                        {id: 'common_6', title: '如何退货？'},
                        {id: 'common_7', title: '退款多久可以到账？'},
                        {id: 'common_8', title: '商家不同意退货（退款）怎么办？'},
                        {id: 'common_9', title: '可以申请延长退货期吗？'},
                        {id: 'common_10', title: '私下会有什么风险？平台保障吗？'}
                    ]
                }, {
                    type: 'customer',
                    name: '售后问题',
                    pros: [
                        {id: 'customer_1', title: '3天退货期从什么时候开始计算？'},
                        {id: 'customer_2', title: '退货期过了还能退货吗？'},
                        {id: 'customer_3', title: '卖家不同意退货（退款）怎么办？'},
                        {id: 'customer_4', title: '卖家同意退货，我怎么将商品寄回去？'},
                        {id: 'customer_5', title: '退货用哪家快递公司退回商品？'},
                        {id: 'customer_6', title: '退货的运费和保价费谁出？'},
                        {id: 'customer_7', title: '退款多久到账？'},
                    ]
                }, {
                    type: 'logistics',
                    name: '物流问题',
                    pros: [
                        {id: 'logistics_1', title: '发货用哪家快递公司发货？'},
                        {id: 'logistics_2', title: '发货运费和保价费谁出？'},
                        {id: 'logistics_3', title: '为什么查询不到物流信息？'},
                        {id: 'logistics_4', title: '物流显示已签收，但并没有收到商品怎么办？'},
                        {id: 'logistics_5', title: '没收到商品，误点击了确认签收怎么处理？'}
                    ]
                }
            ]
        }
    }
}
</script>
