<style lang="stylus">
.mall-help-view
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
    .container
        display: inline-block
        width: 100%
    .category
        display: inline-block
        height: 200px
        width: 25%
        padding-top: 51px
        [class^='icon-']
            padding-right: 0
            font-size: 50px
            margin-bottom: 22px
</style>
<template lang="jade">
.mall-help-view.bg
    .bg-white.mgb
        .title.flex.fz-30.gray.bdb
            .line.bg-red
            div 常见问题
        .item.flex.fz-26.bdb(v-for='item in problems', @click="action('open', {url: item.url})")
            .flex-1 {{item.title}}
            icon.gray(name="enter")
    .mgb
        .title.flex.fz-30.gray.bdb.bg-white
            .line.bg-red
            div 问题分类
        .fz-26.container
            .category.center.bg-white.bd(v-for='item in classification', v-link="{name: 'mall-help-category', params: {category: item.id}}")
                icon(:name="item.icon")
                .mgt {{item.title}}
    .bg-white
        .title.flex.fz-30.bdb.gray
            .line.bg-red
            div 条款和协议
        .item.flex.fz-26.bdb(v-for='item in clause', @click="action('open', {url: item.url})")
            .flex-1 {{item.title}}
            icon.gray(name="enter")
</template>
<script>
export default {
    name: 'HelpView',
    data() {
        return {
            problems: [
                {
                    title: '美玉秀秀服务宝是如何保障交易的?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=2&sn=e586d5c1b173e3ff10ae9129f0264001'
                }, {
                    title: '付款方式有哪几种?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=1&sn=d09080bffdb2c01e309dd27446818f73'
                }, {
                    title: '为什么一定要当面验货?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000006&idx=1&sn=400115e261bab073565fc180157c91be'
                }, {
                    title: '"五天退货"支持范围、处理流程及条件',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=3&sn=ed9941f5caafac854dfbc95bf717adbf'
                }, {
                    title: '商城商品的品质有保证吗?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000015&idx=1&sn=e783c3f473b0b1804c72982c7db02a44'
                }, {
                    title: '一定要保价吗？产生的费用由谁承担?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=2247483720&idx=1&sn=fa0986a7a7b883eaadf60c45ce94852e'
                }
            ],
            classification: [
                {
                    id: 'service',
                    title: '服务宝',
                    icon: 'help-service'
                }, {
                    id: 'guide',
                    title: '购买指南',
                    icon: 'guide'
                }, {
                    id: 'payment',
                    title: '付款和提现',
                    icon: 'payment'
                }, {
                    id: 'logistics',
                    title: '发货和物流',
                    icon: 'logistics'
                }, {
                    id: 'receiving',
                    title: '收货和验货',
                    icon: 'help-verify'
                }, {
                    id: 'goods-return',
                    title: '退货售后',
                    icon: 'help-return'
                }, {
                    id: 'argue',
                    title: '争议处理',
                    icon: 'help-list'
                }
            ],
            clause: [
                {
                    title: '消费者服务保障协议',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000011&idx=1&sn=91906e3f892f51960a6cc1aa35549d67'
                }, {
                    title: '商家诚信交易协议',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000010&idx=1&sn=27483ddec48986a215296c67ec8d879a'
                }
            ]
        }
    }
}
</script>
