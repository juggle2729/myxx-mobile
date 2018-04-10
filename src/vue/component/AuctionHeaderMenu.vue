<style lang="stylus">
@import '~style/partials/mixin'
@import '~style/partials/var'
bg($key)
    background-image url($qn + 'auction/' + $key + '.png')
.auction-header-menu
    border(b, #e8e8e8)
    position fixed
    top 0
    width 100%
    height 100px
    z-index 99
    .logo
        width 200px
        height 64px
        background-image url($qn + 'auction/header-logo.png')
        background-size cover
    .item
        margin-left 64px
        .icon
            line-height 0
    img
        width 48px
        height 48px
    &.share-page
        top 100px
    .red-dot
        top 0
        right 0
        border-radius 14px
        min-width 28px
        min-height 28px
        font-size 18px
        padding 2px
        transform translate3d(8px, -4px, 0)
</style>
<template lang="pug">
.auction-header-menu.bg-white.flex.pdr-40(:class="{ 'share-page': env.isShare }")
    .logo.mgl-24
    .flex-1
    .item.center.relative(v-for="item in items")
        .icon(@click="linkToMenu(item)")
            img(:src="'//o0x80w5li.qnssl.com/auction/' + item.key + '-actived-head.png'")
        .name.fz-20.black-24.mgt-4 {{ item.name }}
        .red-dot.absolute.bg-red-e6.center.white(v-if="item.hasRedDot && waitPayOrderCount > 0") {{ waitPayOrderCount }}
</template>
<script>
export default {
    name: 'auction-header-menu',

    data() {
        return {
            waitPayOrderCount: 0,
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
                    cache: 'order-list',
                    hasRedDot: true // 是否显示红点
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

    ready() {
        // 登录之后，获取订单信息
        this.self && this.$fetch(`mall/order/todo_counts`).then(({ wp }) => {
            this.waitPayOrderCount = wp // 获取待付款订单数目，显示红点
        })
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