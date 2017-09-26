<style lang="stylus">
@import '~style/partials/var'
@import '~style/partials/mixin'
.shop-view
    min-height 100%
    padding-bottom 110px
    > header
        border-color #ededed
        padding 52px 36px 24px
        -webkit-box-pack center
        -webkit-box-orient vertical
        .shop-logo
            width 120px
            height @width
            border-radius 24px
            border 2px solid #f9f9f9
        .collect
            width 140px
            padding 13px 0
            right 36px
            top 112px
            border-radius 25px
        .address
            -webkit-box-pack center
            img
                width 30px
                height @width
        .border
            width 1px
            height 18px
    .tabs
        .tabs-placeholder
            width 100%
            height 90px
        ul
            width 100%
            height 90px
            top 0
            z-index 100
            border-color #ededed
            li
                line-height 90px
            .black-24
                font-weight bold
                border-bottom 4px solid #e61717
            &.share-on-top
                position fixed
                top 112px
            &.on-top
                position fixed
                top 0
    .list
        padding-top 20px
        background-color #efefef
        & > div
            margin 0 0 20px 15px

    .footer
        height 98px
        line-height 48px
        width 100%
        position fixed
        bottom 0
        .deep-link
            .btn
                display -webkit-box
                -webkit-box-pack center
                -webkit-box-align center
                -webkit-box-orient horizontal
                .message-icon
                    width 48px
                    height @width
                    background-image url('//o0x80w5li.qnssl.com/shop/message.png')
                    background-size cover
    .coupons
        width 100%
        -webkit-box-pack justify
        .coupon-labels
            .fz-20
                padding 5px 10px
        .btn-get-coupon
            width 100px
            border-radius 36px
            padding 6px 20px
            right 36px
            bottom 24px
.old-android
    .shop-view
        .coupon-labels div
            padding 8px 8px 0
</style>
<template lang="pug">
.shop-view.bg
    header.bg-white.bdb.flex.relative
        .shop-logo(v-bg="shop.logo")
        deep-link.has-icon.collect.bd-black-24.fz-24.black-24.absolute(@click="gotoDownload") 关注掌柜
        .fz-36.bold.black-24.mgt-40 {{ shop.shop_name }}
        .flex.fz-20.black-47.mgt-20
            .address.flex
                img(:src="'shop/address.png' | qn")
                .mgl-6.line-height-30.line-clamp-1 {{ shop.locale_name }}
                .border.bg-gray-b3.mgh-16
                span 粉丝:
                span {{ shop.owner.fans_count }}
        .coupons.flex.mgt-50(v-if="shop.coupon_count")
            .coupon-labels.flex
                .fz-20.red-e6.bd-red-f8.mgr-6.pdh-10(v-for="coupon in coupons.slice(0,3)") {{ coupon.title }}
                .fz-20.red-e6.bd-red-f8.mgr-6.pdh-10(v-if="coupon_label_count < shop.coupons.length") &middot;&middot;&middot;
            deep-link.flex-1.btn-get-coupon.has-icon.fz-24.red-e6.bd-red-e6.absolute 领券
    .tabs.relative
        .tabs-placeholder
        ul.flex.fz-30.bdb.pdh-20.bg-white.absolute(:class="onTop")
            li.flex-1.center(v-for="tab in tabs", :class="view === tab.id ? 'black-24': 'dark-6b'", @click="view = tab.id") {{ tab.name }}
    component(:is="view", :shop="shop", keep-alive)
    .footer.flex.bdt.bg-white
        deep-link.has-icon.flex-1.fz-36
            .message-icon
            .mgl-12.red-e6 联系商家
</template>
<script>
import shareable from 'shareable'
import Auction from 'component/AllAuction.vue'
import Product from 'component/AllProduct.vue'
import Praise from 'component/ShopPraise.vue'
import Info from 'component/StoreInfo.vue'
import Tabs from 'component/Tabs.vue'
export default {
    name: 'shop-view',
    mixins: [shareable],
    components: { Auction, Product, Praise, Info, Tabs },

    data() {
        return {
            view: 'product',
            tabs: [
                { id: 'auction', name: '拍卖'},
                { id: 'product', name: '全部商品'},
                { id: 'praise', name: '口碑'},
                { id: 'info', name: '店铺信息'}
            ],
            shop: {
                owner: {}
            },
            coupon_label_count: 3,
            onTop: ''
        }
    },

    ready() {
        this.view = this.$route.query.tab || this.view
        this.$watch('view', tab => {
            this.$router.replace({...this.$route, query: {...this.$route.query, tab: tab}})
        })

        _.delay(() => {
            const container = this.$el.querySelector('.coupon-labels')
            if(container) {
                this.adjustCouponLabels(container)
            }
        }, 50)

        this.$on('scroll', () => {
            window.scrollY >= this.$el.children[1].offsetTop - this.$el.offsetTop
                ? this.onTop = (this.env.isShare ? 'share-on-top' : 'on-top') : this.onTop = ''
        })
    },

    route: {
        data({from, to, next}) {
            if(from.name !== to.name) {
                return this.$fetch(`mall/shop/${to.params.id}/profile`).then(resp => {
                    this.shop = resp
                    this.action('updateTitle', {text: this.shop.shop_name})
                    this.setShareData({name: this.shop.shop_name, logo: this.shop.logo, type:
                        this.shop.shop_type === 'studio' ? '工作室' : '店铺'})
                })
            } else {
                next()
            }
        }
    },

    computed: {
        coupons() {
            return this.shop.coupons.slice(0, this.coupon_label_count)
        }
    },

    methods: {
        adjustCouponLabels(container) {
            const overflow = container.scrollWidth > container.clientWidth
            if(container.scrollWidth > container.clientWidth) {
                this.coupon_label_count -= 1
                container.style.opacity = 1
            } else if(this.coupon_label_count < this.shop.coupons.length) {
                this.coupon_label_count += 1
                _.delay(() => this.adjustCouponLabels(container), 10)
            } else {
                container.style.opacity = 1
            }
        }
    }
}
</script>