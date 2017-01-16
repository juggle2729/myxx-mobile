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
        .sold
            // width: 345px
            height: 345px
            position: relative
            background-color: rgba(0, 0, 0, .6)
            .btn
                width: 128px
                height: 52px
                line-height: 52px
                border-radius: 6px
                position: absolute
                top: 50%
                left: 50%
                transform: translate(-50%, -50%)
    .data-info
        padding: 32px 20px
        .desc
            margin-bottom: 32px
        .price::first-letter
            font-size: .9em
</style>
<template lang="jade">
.product-card.bg-white(v-link="{name: 'jade', params: {id: item.id}}")
    .media(v-bg='item.first_picture')
        .mark.fz-30.white(v-if="item.is_tob") 清仓
        .sold(v-if="item.sell_status == 'sold'")
            .btn.white.fz-30.center.bd-white 已售出
    .data-info
        .fz-26.line-clamp.desc {{item.title}}
        .fz-30.red.price {{item.price | price}}
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