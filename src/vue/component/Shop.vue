<style lang="stylus">
.shop-component
    padding 0 42px 0 23px
    .img
        height 80px
        width 80px
        border-radius 16px
        margin 25px 23px 26px 0
    .flex-1
        .name
            width 380px
            .line-clamp
                line-height 1.2
        .level-comp
            width 130px
            height 34px
            img
                width 100%
                height 100%
        .address-icon
            width 30px
            height @width
            img
                margin-top 3px
                width 21px
                height 24px
    .center
        font-size 0
        img
            width 44px
            height @width
        .fz-18
            font-size 18px
</style>
<template lang="pug">
.shop-component.flex(:class="type === 'community' ? 'bg-light bd' : 'bg-white bdb'", v-link="{name: 'shop', params: {id: shop.id}}")
    .img(v-bg="shop.logo")
    .flex-1
        .fz-30.flex.name.black-47
            .line-clamp {{ shop.shop_name }}
            .brand-shop.mgl-10(v-if="shop.brand_shop")
        .fz-26.gray.flex.mgt-12
            .address-icon.center.mgr-6
                img(:src="'shop/address.png' | qn")
            .fz-20.dark-6b {{ shop.locale_name }}
    .center
        img(:src="config.www + 'icon.enter.shop.png'")
        .fz-18.gray-8f.mgt-12 进店逛逛
</template>
<script>
export default {
    name: 'Shop',

    props: {
        shop: Object,
        type: String
    }
}
</script>