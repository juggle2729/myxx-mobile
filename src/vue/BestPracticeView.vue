<style lang="stylus">
.best-practice-view
    min-height: 100%
    padding-bottom: 22px
    .title
        height: 86px
        line-height: 86px
        padding: 0 32px
        .line
            width: 6px
            height: 24px
            margin-right: 14px
        .more
            margin-left: 12px
    .item
        height: 86px
        line-height: 86px
        margin-left: 32px
        padding-right: 32px
</style>
<template lang="jade">
.best-practice-view.bg
    .bg-white.mgb(v-for="item in items")
        .title.flex.fz-30.gray.bdb
            .line.bg-red
            div {{item.title}}
        .item.flex.fz-28.bdb(v-for='problem in item.problems', v-link="{name:'post', params: {id: problem.link}}")
            .flex-1 {{problem.title}}
            icon.gray(name="enter")
</template>
<script>
const items = [
    {
        title: '核心功能使用',
        problems: [
            {
                title: '如何发布内容(求鉴宝、图文视频)？',
                link: ''
            }, {
                title: '如何发布长图文？',
                link: '77563'
            }, {
                title: '如何购买美玉？',
                link: ''
            }, {
                title: '鉴宝师如何鉴定别人的宝贝？',
                link: '77560'
            }, {
                title: '商户或工作室如何发布商品？',
                link: ''
            }
        ]
    }, {
        title: '玉友反馈问题解答',
        problems: [
            {
                title: '如何让鉴宝师帮我鉴定？',
                link: ''
            }, {
                title: '商户或工作室如何入驻？',
                link: ''
            }, {
                title: '商铺或工作室如何提升店铺等级？',
                link: ''
            }, {
                title: '为什么线下交易容易出现问题？',
                link: ''
            }, {
                title: '美玉秀秀担保交易如何担保？',
                link: ''
            }
        ]
    }
]
export default {
    name: 'best-practice-view',
    
    data() {
        return {
            items: items
        }
    }
}
</script>
