<style lang="stylus">
@import '~style/partials/mixin'
.shop-component
    flex-direction column
    padding 42px 31px 47px
    > .flex
        width 100%
    .img
        width 96px
        height @width
        border-radius 6px
        margin-right 25px
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
    .mgt-48
        justify-content space-between
        padding 0 10px
    .separator
        border(r, #d9d9d9)
        width 1px
        height 32px
</style>
<template lang="pug">
.shop-component.flex(:class="type === 'community' ? 'bg-light bd' : 'bg-white bdb'", v-link="{name: 'shop', params: {id: shop.id}}")
    .flex
        .img(v-bg="shop.logo")
        .flex-1
            .fz-30.flex.name.black
                .line-clamp {{ shop.shop_name }}
                .brand-shop.mgl-10(v-if="shop.brand_shop")
            .fz-26.gray.flex.mgt-12
                .address-icon.center.mgr-6
                    img(:src="'shop/address.png' | qn")
                .fz-20.dark-6b {{ shop.locale_name }}
        .center
            img(:src="config.www + 'icon.enter.shop.png'")
            .fz-22.gray.mgt-12 进店逛逛
    .flex.mgt-48
        .flex.fz-26
            .black 全部商品
            .red-e6.mgl-12 {{ shop.products_count }}
        .separator
        .flex.fz-26
            .black 今日上新
            .red-e6.mgl-12 {{ shop.pd_count_today }}
        .separator
        .flex.fz-26
            .black 好评率
            .red-e6.mgl-12 {{ shop.shop_good_choice_rate }}%
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