<style lang="stylus">
.order-item-item
    .prod-img
        width 148px
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
</style>
<template lang="pug">
.order-item-item.bg-white.flex.pdr-32(:class="[!index ? 'pdb-8' : 'pdt-8', page]")
    .prod-img.relative(v-bg="item.cover")
        .auction-flag.absolute(v-if='item.auction')
    .flex.mgl-20.info
        .fz-30.black.name {{ item.title | truncate 15 }}
        .mgt-24.gray.fz-26 {{ item.trans_amount | price }}
</template>
<script>
export default {
    name: 'order-item-item',

    props: {
        item: Object,
        index: Number,
        page: String
    }
}
</script>