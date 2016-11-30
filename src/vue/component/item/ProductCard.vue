<style lang="stylus">
.product-card
    display: inline-block
    width: 345px
    .media
        width: 345px
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