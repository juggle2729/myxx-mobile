<style lang="stylus">
.product-card
    display: inline-block
    width: 47%
    .media
        height: 345px
        position: relative
        .mark
            position: absolute
            left: 0
            top: 0
            display: inline-block
            line-height: 44px
            padding: 0 28px
            background-color: rgba(159, 42, 240, .8)
    .price::first-letter
        font-size: .9em
</style>
<template lang="jade">
.product-card.bg-white(v-link="{name: 'jade', params: {id: item.id}, query: {referer: 'goods_relatedrecomented'}}")
    .media(v-bg='item.first_picture')
        .mark.fz-30.white(v-if="item.is_tob") 清仓
    .pdv-32.pdh
        .fz-26.line-clamp.mgb-32 {{item.title}}
        .fz-30.red(v-if="item.sell_status === 'sold'") {{item.sell_status_editable ? '实体店已售出' : '已售出'}}
        .fz-30.red.price(v-else) {{item.price | price}}
</template>
<script>
import Lv from 'component/Lv.vue'
export default {
    name: 'ProductCard',

    components: {
        Lv
    },

    props: {
        item: Object
    }
}
</script>