<style lang="stylus">
.shop-component
    .logo
        height: 120px
        width: 120px
    .address
        width: 200px
    .icon-shop
        height: 44px
        width: 48px
        margin-top: -46px
        & + div
            margin-top: -24px
    .new
        height: 32px
        line-height: 32px
        border-radius: 20px
</style>
<template lang="pug">
.shop-component.mgt-32.flex.bg-light.bd(v-link="{name: 'shop', params: {id: shop.id}}")
    .logo.img(v-bg="shop.logo")
    .mgl.flex-1
        .flex.fz-30
            .mgr-12 {{shop.shop_name}}
            lv(:lv="shop.level")
        .flex.fz-26.gray.mgt-16
            icon(name="location")
            .mgl-12(:class="'address, line-clamp-1': shop.pd_count_today") {{shop.locale_name}}
            .new.bg-red.white.pdh-16.mgl-16.fz-22(v-if="shop.pd_count_today") 今日上新 {{shop.pd_count_today}}
    .center.pdh-32
        icon(name="shop")
        .gray.fz-22 进店逛逛
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