<style lang="stylus">
.shop-component
    .logo
        height: 120px
        width: 120px
    .level-comp img
        width: 42px
        height: 42px
</style>
<template lang="pug">
.shop-component.mgv-36.mgh-32.flex.bg-light.bd(v-link="{name: 'shop', params: {id: shop.id}}")
    .logo.img(v-bg="shop.logo")
    .mgl
        .flex.fz-30
            .mgr-12 {{shop.shop_name}}
            lv(:lv="shop.level")
        .flex.fz-26.gray.mgt-16
            icon(name="location")
            .mgl-12 {{shop.locale_name}}
</template>
<script>
import Lv from 'component/Lv.vue'
export default {
    name: 'Shop',

    components: {
        Lv
    },

    props: {
        shop: Object
    }
}
</script>