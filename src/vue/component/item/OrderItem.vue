<style lang="stylus">
.order-item-item
    .prod-img
        width 120px
        height @width
    .auction-flag
        width 36px
        height @width
        background url('//o0x80w5li.qnssl.com/auction/icon.png') no-repeat
        background-size contain
    .name
        line-height 42px
    .info
        flex-direction column
        align-items stretch
    &.detail
        .prod-img
            width 108px
            height @width
        .name
            font-size 26px
    .price:first-letter
        font-size 20px
</style>
<template lang="pug">
.order-item-item.bg-white.flex.pdr-32(:class="[!index ? 'pdb-8' : 'pdt-8', page]")
    .prod-img.relative(v-bg="item.cover")
        .auction-flag.absolute(v-if='item.auction')
    .flex.mgl-20.info
        .fz-26.black-47.name {{ item.title | truncate 15 }}
        .mgt-16.fz-32.price(:class="priceColor") {{ (item.trans_amount || item.price) | price }}
</template>
<script>
export default {
    name: 'order-item-item',

    props: {
        item: Object,
        index: Number,
        page: String,
        priceColor: {
            type: String,
            default: 'gray'
        }
    }
}
</script>