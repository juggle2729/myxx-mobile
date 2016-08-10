<style lang='sass'>
.index-view {
    color: #2196F3;
    height: 100%;
    counter-reset: link-counter;
    li {
        padding: .5em 1em;
        white-space: nowrap;
        counter-increment: link-counter;
        &::before {
            content: counter(link-counter);
            font-size: .8em;
            color: gray;
        }
        a::after {
            content: ' - ' attr(href);
            font-size: .8em;
            color: gray;
        }
        background: linear-gradient(left, tomato 0, transparent 100%) no-repeat;
        background-size: 0 100%;
        transition: background-size 1s;
        &:hover {
            background-size: 100% 100%;
            animation: glow 1.5s 1s infinite alternate;
        }
    }
}
@keyframes glow {
    from {text-shadow: 0 0 10px white; }
    to {color: white; text-shadow: 0 0 5px white; }
}
</style>
<template lang="jade">
ul.index-view.bg-default.font-34
    li(v-for="link in links")
        a(:href="link.href") {{link.label}}
</template>
<script>
export default {
    name: 'Index',
    data() {
        return {
            links: [
                {
                    label: '求购竞标列表',
                    href: '/purchases'
                }, {
                    label: '鉴宝师排行',
                    href: '/ranking/weekly'
                }, {
                    label: '大额支付',
                    href: '/pay-offline'
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
        };
    }
}
</script>
