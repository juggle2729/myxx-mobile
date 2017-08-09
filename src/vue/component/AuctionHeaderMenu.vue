<style lang="stylus">
@import '~style/partials/mixin'
bg($key)
    background-image url('//o0x80w5li.qnssl.com/auction/' + $key + '.png')
.auction-header-menu
    border(b, #e8e8e8)
    position fixed
    top 0
    width 100%
    height 88px
    z-index 999
    .icon
        padding 0 12px
    img
        width 48px
        height 48px
    .item:nth-child(2)
        margin-left 44px
    .item:nth-child(4)
        margin-right 44px
</style>
<template lang="pug">
.auction-header-menu.bg-white.flex.pdh-20
    .item(v-for="item in items", :class="{'flex-1': lodash.isString(item)}")
        .title.fz-36.black-24.center(v-if="lodash.isString(item)") {{ item }}
        .icon(v-if="lodash.isObject(item)", v-link="{path: item.path, exact: true}")
            img(:src="`//o0x80w5li.qnssl.com/auction/${item.key}-actived.png`")
</template>
<script>
export default {
    name: 'auction-header-menu',

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
                '美玉秀秀',
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