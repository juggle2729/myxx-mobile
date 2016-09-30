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
<<<<<<< d29dec60130867405c7800a6689a408afeaefd72:src/vue/component/item/ProductCard.vue
<template lang="jade">
.product-card.bg-white(v-link="{name: 'jade', params: {id: item.id}}")
    .media(v-bg='item.first_picture')
        .mark.fz-30.white(v-if="item.is_tob") 清仓
=======
<template lang="pug">
.product-card.bg-white(v-link="{name: 'jade', params: {id: entry.id}}")
    .media(v-bg='entry.first_picture')
        .mark.fz-30.white(v-if="entry.is_tob") 清仓
>>>>>>> 发布求购、升级jade到pug:src/vue/component/ProductCard.vue
    .data-info
        p.fz-26.line-clamp.desc {{item.title}}
        p.fz-30.red.price {{item.price | price}}
</template>
<script>
export default {
    name: 'ProductCard',

    props: {
        item: Object
    }
}
</script>