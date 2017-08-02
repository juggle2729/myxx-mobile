<style lang="stylus">
@import '~style/partials/mixin'
bg($key)
    background-image url('//o0x80w5li.qnssl.com/auction/' + $key + '.png')
.auction-footer-menu
    border(t, #e8e8e8)
    position fixed
    bottom 0
    width 100%
    height 100px
    .name
        margin-top 4px
    .icon
        width 48px
        height 48px
        background-size contain
    .flex-1
        flex-direction column
    .menu-home
        bg(home)
    .menu-compete
        bg(compete)
    .menu-order
        bg(order)
    .menu-mine
        bg(mine)
    .active
        .menu-home
            bg(home-actived)
        .menu-compete
            bg(compete-actived)
        .menu-order
            bg(order-actived)
        .menu-mine
            bg(mine-actived)
        .name
            color #242424
</style>
<template lang="pug">
.auction-footer-menu.bg-white.flex
    .flex.flex-1(v-for="item in items", v-link="{path: item.path, activeClass: 'active', exact: true}")
        .icon(:class="'menu-' + item.key")
        .name.fz-20.gray-99 {{ item.name }}
</template>
<script>
export default {
    name: 'auction-footer-menu',

    data() {
        return {
            items: [
                {
                    key: 'home',
                    name: '首页',
                    path: '/auction/home'
                },
                {
                    key: 'compete',
                    name: '参拍',
                    path: '/auction/compete'
                },
                {
                    key: 'order',
                    name: '订单',
                    path: '/auction/order'
                },
                {
                    key: 'mine',
                    name: '我的',
                    path: '/auction/mine'
                }
            ]
        }
    }
}
</script>