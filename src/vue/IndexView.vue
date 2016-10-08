<style lang='stylus'>
.index-view
    color: #2196F3
    li
        padding: .5em 1em
        white-space: nowrap
        a::after
            content: ' - ' attr(href)
            font-size: .8em
            color: gray
        background: linear-gradient(left, tomato 0, transparent 100%) no-repeat
        background-size: 0 100%
        transition: background-size 1s
        &:hover
            background-size: 100% 100%
            animation: glow 1.5s 1s infinite alternate

@keyframes glow
    from
        text-shadow: 0 0 10px white
    to
        text-shadow: 0 0 5px white
        color: white
</style>
<template lang="jade">
ul.index-view.bg.fz-34
    li(v-for="link in links")
        a(:href="link.href") {{link.label}}
</template>
<script>
export default {
    name: 'index-view',
    data() {
        return {
            links: [
                {
                    label: '图文详情',
                    href: '/post/1'
                },{
                    label: '问答详情',
                    href: '/question/211'
                },{
                    label: '求购竞标列表',
                    href: '/purchases'
                }, {
                    label: '鉴宝师排行',
                    href: '/top-master'
                }, {
                    label: '大额支付',
                    href: '/pay-offline/160808170534035573'
                }, {
                    label: '商品详情',
                    href: '/jade/188/none'
                }, {
                    label: '订单详情',
                    href: '/order/160615152959035578'
                }, {
                    label: '确认收货成功',
                    href: '/order/receive/160520185535031891'
                }, {
                    label: '收货地址列表',
                    href: '/address/list'
                }, {
                    label: '我的钱包',
                    href: '/wallet'
                }, {
                    label: '明细',
                    href: '/wallet-detail/expects'
                }
            ]
        }
    }
}
</script>
