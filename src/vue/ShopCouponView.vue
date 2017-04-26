<style lang="stylus">
 @import '~style/partials/mixin'
.shop-coupon-view
    background-color: #fff8ea
    padding: 32px
    header
        -webkit-box-align: start
        .hello
            border-radius: 12px
            padding: 20px
            position: relative
            color: #bd925f
            border(a, #e2c8a8)
            &::before
                content: ''
                position: absolute
                left: -16px
                top: 16px
                width: 0
                height: 0
                border-top: 12px solid transparent
                border-right: 16px solid #e2c8a8
                border-bottom: 12px solid transparent
            &::after
                content: ''
                position: absolute
                left: -14px
                top: 16px
                width: 0
                height: 0
                border-top: 12px solid transparent
                border-right: 16px solid white
                border-bottom: 12px solid transparent
    .shop
        color: #bd925f
        background-color: #fcedd6
        margin-top: 28px
        border-radius: 12px 12px 0 0
        padding: 28px 32px 28px 28px
        border-bottom: 1px dotted rgba(189, 146, 95, .5)
        .logo
            height: 100px
            width: 100px
            border-radius: 8px
            margin-right: 20px
        .name
            color: #603500
        .btn-to-shop
            margin-top: -20px
        .icon-shop
            width: 46px
            height: .9em
        .icon-location
            vertical-align: 1px
            height: 1.1em
    .empty
        color: #bd925f
        background-color: #fcedd6
        border-radius: 0 0 12px 12px
        padding: 72px 0
    .coupons
        background-color: #fcedd6
        border-radius: 0 0 12px 12px
        padding: 28px 26px 28px 28px
    .coupon
        &:not(:last-child)
            margin-bottom: 20px
        .flex-1
            height: 160px
            padding: 20px 0 0 20px
            border-radius: 8px 0 0 8px
            .amount::before
                content: '￥'
                font-size: 30px
            .desc
                margin: 16px 0 10px 0
        .btn-get-coupon
            height: 160px
            width: 172px
            line-height: 160px
            text-align: center
            border-radius: 0 8px 8px 0
            background: linear-gradient(120deg, #f77080, #cc3f4f 90%, #cc3f4f)
            position: relative
            // &:focus
            //     background-color: #cc3f4f
            //     color: black
            &::before
                content: ''
                display: block
                width: 20px
                height: 20px
                position: absolute
                left: -10px
                top: -10px
                border-radius: 50%
                background-color: #fcedd6
            &::after
                content: ''
                display: block
                width: 20px
                height: 20px
                position: absolute
                left: -10px
                bottom: -10px
                border-radius: 50%
                background-color: #fcedd6
    .support
        height: 94px
        line-height: 94px
        color: #bd925f
        img
            display: inline-block
            height: 26px
            padding: 0 6px
            vertical-align: -1px
    .deep-link
        padding: 0
        .btn
            background-color: #f1ab47
    .btn-share-coupon
        height: 80px
        line-height: 80px
        border-radius: 8px
        margin: 28px 0 48px

</style>
<template lang="pug">
.shop-coupon-view(v-if='!$loadingRouteData')
    header.flex
        avatar(:user='user')
        .hello.flex-1.mgl-30.fz-26.bg-white
            p Hi，我是{{user.nickname}}。
            p.mgt-12 送你{{coupons.length || ''}}张优惠券，赶紧领取进店看看吧！
    .shop.flex.detail(v-link="{name: 'shop', params: {id: shop.id}}")
        .logo(v-bg='shop.logo')
        .flex-1
            .fz-30.flex.mgb-20.name
                .line-clamp.mgr-8 {{shop.shop_name}}
                lv(:lv="shop.level")
            .fz-26.flex
                icon(name="location")
                div {{shop.locale_name}}
        .btn-to-shop.center(v-link="{name: 'shop', params: {id: shop.id}}")
            icon(name="shop")
            .fz-22 进店逛逛
    .coupons(v-if="coupons.length")
        .coupon.flex(v-for="coupon in coupons")
            .flex-1.fz-22.gray.bg-white
                .amount.fz-48.red.bold {{coupon.discount_amount}}
                .desc.pdl-8 订单{{coupon.note}}，全店通用
                .duration.pdl-8 {{coupon.coupon_start_time}} - {{coupon.coupon_end_time}}
            .btn-get-coupon.white.fz-30(@click="getCoupon(coupon.id)") 立即领取
    .empty.fz-26.center(v-else) 你的速度太慢了，优惠券已被领完了...
    .support.fz-26.center
        span 优惠券由
        img(:src="'coupon/app-logo.svg' | qn")
        span 提供交易服务支持
    deep-link 立即使用优惠券
    .btn-share-coupon.bg-red.white.fz-30.center(@click="share") 送优惠券给好友
</template>
<script>
import dateformat from 'dateformat'
import shareable from 'shareable'
import lv from 'component/Lv.vue'
import DeepLink from 'component/DeepLink.vue'
export default {
    name: 'shop-coupon-view',

    mixins: [shareable],

    components: {
        lv,
        DeepLink
    },

    data() {
        return {
            user: null,
            shop: null,
            coupons: []
        }
    },

    route: {
        data({ to, next }) {
            return this.$fetch(`users/${to.query.user}/profile`)
                .then(resp => {
                    this.user = resp
                    return this.$fetch(`coupon/templates?shop_id=${to.params.id}`)
                }).then(resp => {
                    this.shop = resp.shop
                    this.coupons = resp.templates.map(coupon => {
                        coupon.discount_amount = coupon.discount_amount/100
                        coupon.coupon_start_time = dateformat(new Date(coupon.coupon_start_time), 'yyyy.m.d')
                        coupon.coupon_end_time = dateformat(new Date(coupon.coupon_end_time), 'yyyy.m.d')
                        return coupon
                    })
                    const title = `送你${this.coupons.length || ''}张优惠券，赶紧进店看看吧!`
                    this.action('updateTitle', { text: title })
                    this.setShareData({
                        title,
                        desc: '优质美玉每日上新，优惠不断，仅限好友！',
                        icon: 'https://o0x80w5li.qnssl.com/coupon/share_icon.png'
                    })
                })
        }
    },

    methods: {
        getCoupon(id) {
            this.$post('coupon/templates', { template_id: id }).then(resp => {
                this.action('toast', {
                    success: '1',
                    text: '领取成功'
                })
            })
        },

        share() {
            this.action('share')
        }
    }
}
</script>