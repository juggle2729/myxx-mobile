<style lang="stylus">
@import '~style/partials/mixin'
bg($key)
    background-image url('//o0x80w5li.qnssl.com/auction/' + $key + '-4.21' + '.png')
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
    .menu-auction-home
        bg(auction-home)
    .menu-compete
        bg(compete)
    .menu-order
        bg(order)
    .menu-mine
        bg(mine)
    .active
        .menu-auction-home
            bg(auction-home-actived)
        .menu-compete
            bg(compete-actived)
        .menu-order
            bg(order-actived)
        .menu-mine
            bg(mine-actived)
        .name
            color #cc3d3d
</style>
<template lang="pug">
.auction-footer-menu.bg-white.flex
    .flex.flex-1(v-for="item in items", @click="linkToMenu(item)", :class="{'active': $route.title === item.name}")
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
                    key: 'auction-home',
                    name: '首页',
                    path: '/auction/home',
                    login: false
                },
                {
                    key: 'compete',
                    name: '参拍',
                    path: '/auction/compete'
                },
                {
                    key: 'order',
                    name: '订单',
                    path: '/order-list',
                    cache: 'order-list'
                },
                {
                    key: 'mine',
                    name: '我的',
                    path: '/auction/mine',
                    cache: 'auction-mine'
                }
            ]
        }
    },

    methods: {
        linkToMenu(item) {
            if (item.login === false || this.self) {
                // 手动点击跳转时清除缓存，避免缓存数据加载到非对应tab
                this.$store.remove(`cache-items-${item.cache || item.key}`)
                this.$store.remove(`list-leave-position-${item.cache || item.key}`)

                this.$router.go(item.path)
            } else {
                this.action('user').then(user => {
                    if (!user) {
                        this.action('login')
                        return
                    }
                    this.$set('self', user)
                })
            }
        }
    }
}
</script>