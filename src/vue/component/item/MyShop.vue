<style lang="stylus">
@import '~style/partials/mixin'
$width = calc((100% - 20px) / 3)
.my-shop
    .item
        flex-direction column
        -webkit-box-align start
        & + .item
            margin-top 20px
        .img
            height 120px
            width 120px
            border-radius 8px
    .shop-info
        width 100%
        & > .flex
            flex-direction column
            -webkit-box-align start
        &.has-product
            padding-bottom 20px
            margin-bottom 20px
            border(b, #efefef)
    .line
        color #efefef
    .coupon-info
        width 100%
       .logo
            width 20px
            height 20px
            background transparent url('//o0x80w5li.qnssl.com/coupon/logo.png') no-repeat
            background-size contain
    .product-info
        width 100%
    .product-item
        display inline-block
        width $width
        padding-top $width
        position relative
        & + .product-item
            margin-left 10px
        .price
            position absolute
            bottom 0
            left 0
            padding 0 6px
            line-height 32px
            background-color rgba(0, 0, 0, 0.3)
</style>
<template lang="pug">
.my-shop(:class="{'bg': !items.isEmpty}")
    .item.pd-20.flex.bg-white(v-for="item in items", v-link="{name: 'shop', params: {id: item.id}}")
        .shop-info.flex(:class="{'has-product': !!item.selling_count}")
            .img(v-bg="item.logo")
            .flex-1.mgl-20
                .flex.name-level
                    .fz-30.black {{ item.shop_name }}
                .mgt-14.fz-22.gray {{ item.locale_name }}
                .mgt-16.fz-22.gray
                    span 在售商品数 {{ item.selling_count }}
                    span.line.mgh-20 |
                    span 今日上新 {{ item.pd_count_today }}
        .coupon-info.flex.line-clamp.mgb-20(v-if="!!item.coupon_count")
            .logo
            .fz-22.mgl-8.dark {{ couponInfo(item) }}
        .product-info(v-if="!!item.selling_count")
            .product-item(v-for="product in item.products", v-bg='product.cover', v-link="{name: 'product', params: {id: product.id}}")
                span.price.fz-22.white.center.pgh-6 {{ product.price | price }}
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
export default {
    name: 'my-shop',

    mixins: [paging],

    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/follow_list`,
                list: 'shops',
                params: {
                    target_type: 'sh'
                }
            }
        }
    },

    methods: {
        couponInfo(item) {
            return item.coupons.reduce((res, coupon) => {
                res.push(coupon.title)
                return res
            }, []).join(', ')
        }
    }
}
</script>