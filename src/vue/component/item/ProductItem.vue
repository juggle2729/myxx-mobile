<style lang="stylus">
@import '~style/partials/var'
.product-item
    border-top 1px solid #ededed
    border-bottom 1px solid #ededed
    padding 20px 25px 28px
    .ranking
        left 25px
        top 0
        z-index 10
        width 28px
        height 34px
        background-image: url($qn + 'top100-ranking.png')
        background-size: 100%
    .desc
        padding 22px 0 22px 3px
        .price::first-letter
            font-size 20px
            margin-right 2px
    .pics
        .pic
            width 230px
            padding-top @width
            &:not(:first-child)
                margin-left 5px
    .foot
        height 30px
        .flex-1
            span
                width 90px
                &:not(:first-child)
                    margin-left 10px
        .shop
            right 0
</style>
<template lang="pug">
.product-item.bg-white.relative(v-link="{name: 'product', params: {id: item.id}}")
    .ranking.absolute.white.fz-20.center.line-height-28(v-if="$route.name === 'top100' && index <= 98") {{ index + 1 }}
    .desc.flex
        .flex-1.fz-26.bold.black-47.line-height-32.line-clamp-1 {{ item.title }}
        .price.red-e6.fz-32 {{ item.price | price }}
    .pics.flex
        .pic.bg-gray-f7(v-for="pic in item.pictures.slice(0,3)", v-bg.sm="pic")
    .foot.mgt-24.flex.relative
        .flex-1.flex
            span.block.bd-gray-e3.fz-20.gray-b2.line-height-30.center(v-if="item.cigar_scale") 烟标图
            span.block.bd-gray-e3.fz-20.gray-b2.line-height-30.center(v-if="item.sunlight") 自然光
        .shop.fz-24.black-47.flex.pdb-4.absolute(v-link="{name: 'shop', params: {id: item.shop.id}}")
            icon(name="shop")
            span.pdl-10 {{ item.shop.shop_name }}
</template>
<script>
import date from '../../../util/date'
export default {
    name: 'product-item',

    props: {
        item: Object,
        index: Number
    }
}
</script>