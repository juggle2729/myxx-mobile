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
<template  lang="pug">
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
                    label: 'deep-link',
                    href: '/deep-link'
                }, {
                    label: '举报',
                    href: '/complain/cm/1092'
                }, {
                    label: '专辑详情',
                    href: '/collection/1'
                }, {
                    label: '图文详情',
                    href: '/post/3829'
                }, {
                    label: '问答详情',
                    href: '/question/6048'
                }, {
                    label: '求购竞标列表',
                    href: '/purchases'
                }, {
                    label: '大额支付',
                    href: '/pay-offline/160808170534035573'
                }, {
                    label: '商品详情',
                    href: '/product/188/none'
                }, {
                    label: '关于美玉秀秀',
                    href: '/about'
                }
            ]
        }
    }
}
</script>
