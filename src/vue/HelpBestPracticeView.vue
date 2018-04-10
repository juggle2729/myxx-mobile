<style lang="stylus">
.best-practice-view
    min-height: 100%
    .icon-enter
        height: 22px
        width: 22px
</style>
<template  lang="pug">
.best-practice-view.bg.pdv
    .bg-white.mgb(v-for="item in items")
        .line-height-98.fz-30.bold.mgl-32.pdr-32 {{item.title}}
        .line-height-90.flex.fz-26.bdt.mgl-32.pdr-32(v-for='pro in item.pros', v-link="{name:'post', params: {id: pro.id}}")
            .flex-1 {{pro.title}}
            icon.gray(name="enter")
</template>
<script>
export default {
    name: 'best-practice-view',

    data() {
        return {
            items: [
                {
                    title: '核心功能使用',
                    pros: [
                        { title: '如何发布内容(求鉴定、图文视频)？', id: '79864' },
                        { title: '如何发布长图文？', id: '77563' },
                        { title: '如何购买美玉？', id: '79851' },
                        { title: '鉴宝师如何鉴定别人的宝贝？', id: '77560' },
                        { title: '商户或工作室如何发布商品？', id: '80050' }
                    ]
                }, {
                    title: '玉友反馈问题解答',
                    pros: [
                        { title: '如何让鉴宝师帮我鉴定？', id: '79868' },
                        { title: '商户或工作室如何入驻？', id: '80045' },
                        { title: '商铺或工作室如何提升店铺等级？', id: '80051' },
                        { title: '为什么线下交易容易出现问题？', id: '80066' },
                        { title: '美玉秀秀担保交易如何担保？', id: '79850' }
                    ]
                }
            ]
        }
    }
}
</script>
