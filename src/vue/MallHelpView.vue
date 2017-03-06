<style lang="stylus">
.mall-help-view
    .icon-enter
        height: 22px
        width: 22px
</style>
<template lang="jade">
.mall-help-view.bg.pdt
    .bg-white.mgb(v-for="item in items")
        .line-height-98.fz-30.bdb.bold.mgl-32.pdr-32 {{item.name}}
        .line-height-90.flex.fz-26.bdb.mgl-32.pdr-32(v-for='pro in item.pros', v-link="{path: '/help/mall/' + item.type + '#' + pro.id}")
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
                        {id: 'common_8', title: '平台上的和田玉都是真的吗？'},
                        {id: 'common_2', title: '美玉秀秀怎么保证交易安全？'},
                        {id: 'common_3', title: '如何付款？'},
                        {id: 'common_4', title: '如何还价？'},
                        {id: 'common_5', title: '订单生成后需要在多长时间内付款？'},
                        {id: 'common_6', title: '什么是鉴赏期？'}
                    ]
                }, {
                    type: 'order',
                    name: '订单问题',
                    pros: [
                        {id: 'order_1', title: '为什么要确认收货？'},
                        {id: 'order_2', title: '多长时间能送到？'},
                        {id: 'order_3', title: '运费和保价费由谁承担？'},
                        {id: 'order_4', title: '验货与签收？'},
                        {id: 'order_5', title: '如何付款？'},
                        {id: 'order_6', title: '订单生成后需要在多长时间内付款？'},
                        {id: 'order_7', title: '商品改价？'},
                    ]
                }
            ]
        }
    }
}
</script>
