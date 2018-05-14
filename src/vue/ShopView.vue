<style lang="stylus">
@import '~style/partials/var'
@import '~style/partials/mixin'
.shop-view
    min-height 100%
    padding-top 100px
    > header
        border-color #ededed
        padding 52px 36px 24px
        -webkit-box-pack center
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        > .flex1
            width 100%
            display -webkit-box
            -webkit-box-pack justify
            box-sizing border-box
        .judge-shop
            -webkit-box-pack center
            border(a, #e61717)
            width 140px
            height 50px
            border-radius 25px
            top 112px
            left 36px
        .shop-logo
            width 120px
            height @width
            border-radius 24px
            border 2px solid #f9f9f9
        .flex3
            display -webkit-box
            -webkit-box-orient vertical
            text-align center
            img
                width 36px
                height 36px
                display block
        .separator
            border(r, #d9d9d9)
            width 1px
            height 64px
        .renzheng
            width 100%
            display -webkit-box
            -webkit-box-pack start
            box-sizing border-box
            img
                width 30px
                height 30px
                display block
                margin-left   15px
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
            .bold
                border-bottom 4px solid #e61717
            &.share-on-top
                position fixed
                top 100px
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
    product-header-menu(v-bind:number="goodsNumber")
    header.bg-white.bdb.flex.relative
        .flex.flex1
            .shop-logo(v-bg="shop.logo")
            .flex
                .flex
                    .flex3.mgr-24.mgl-24
                        .fz-30.black-24 {{ fans }}
                        .black-47.fz-20.mgt-12 粉丝
                    .separator
                .flex
                    .flex3.mgr-24.mgl-24(@click='follow')
                        img(v-if="!followed",:src="'shop/guanzhu.png' | qn")
                        img(v-if="followed",:src="'shop/yiguanzhu.png' | qn")
                        .black-47.fz-20.mgt-12(v-if="followed") 已关注
                        .black-47.fz-20.mgt-12(v-if="!followed") 关注
        <!--deep-link.has-icon.collect.bd-black-24.fz-24.black-24.absolute(@click="gotoDownload") 关注掌柜-->
        .flex.mgt-40.renzheng
            .fz-36.bold.black-24 {{ shop.shop_name }}
            img(v-if="shop.brand_shop",:src="'shop/pinpaidianpu.png' | qn")
            img(v-if="shop.shop_type == 'person'",:src="'shop/gerenrenzheng.png' | qn")
            img(v-if="shop.shop_type == 'enterprise'",:src="'shop/yingyezhizhaorenzheng.png' | qn")
        .flex1.mgt-25
            .flex.mgl-10.mgr-10
                star-rating(:rating='shop.seller_comment.comment_index[0]',:max-rating='5',:star-size='8',:increment='0.1')
                .black-24.fz-30 {{shop.seller_comment.comment_index[0].toFixed(1)}}
            .black-47.fz-24(@click="view = 'praise'") {{shop.seller_comment.comment_count}} 人评价 >
        .fz-20.black-47.mgt-20.flex1
            .address.flex
                img(:src="'shop/address.png' | qn")
                .mgl-6.line-height-30.line-clamp-1 {{ shop.locale_name }}
        .coupons.flex.mgt-50(v-if="shop.coupon_count")
            .coupon-labels.flex
                .fz-20.red-e6.bd-red-f8.mgr-6.pdh-10(v-for="coupon in coupons.slice(0,3)") {{ coupon.title }}
                .fz-20.red-e6.bd-red-f8.mgr-6.pdh-10(v-if="coupon_label_count < shop.coupons.length") &middot;&middot;&middot;
            deep-link.flex-1.btn-get-coupon.has-icon.fz-24.red-e6.bd-red-e6.absolute 领券
    .tabs.relative
        .tabs-placeholder
        ul.flex.fz-30.bdb.pdh-20.bg-white.absolute(:class="onTop")
            li.flex-1.center.black-24(v-for="tab in tabs", :class="view === tab.id ? 'bold': ''", @click="view = tab.id")
                span {{ tab.name }}
                span.mgl-12.gray-8f.fz-22.number {{numbers[tab.id]}}
    component(:is="view", :shop="shop", :user-id="shop.owner.id" keep-alive)
    <!--.footer.flex.bdt.bg-white-->
        <!--deep-link.has-icon.flex-1.fz-36-->
            <!--.message-icon-->
            <!--.mgl-12.red-e6 联系商家-->
</template>
<script>
import shareable from 'shareable'
import Auction from 'component/AllAuction.vue'
import Product from 'component/AllProduct.vue'
import Praise from 'component/ShopPraise.vue'
// import Info from 'component/StoreInfo.vue'
import Story from 'component/UserActivity.vue'
import Tabs from 'component/Tabs.vue'
import ProductHeaderMenu from 'component/productHeaderMenu.vue'
import StarRating from 'component/StarRating.vue'


export default {
    name: 'shop-view',
    mixins: [shareable],
    components: { Auction, Product, Praise, Tabs, Story,ProductHeaderMenu,StarRating},

    data() {
        return {
            view: 'product',
            tabs: [
                { id: 'product', name: '商品'},
                { id: 'auction', name: '拍卖'},
                { id: 'praise', name: '评价'},
                // { id: 'info', name: '店铺信息'}
            ],
            shop: {
                owner: {}
            },
            numbers: {
                product: 12,
                auction: 12,
                praise: 12,
            },
            coupon_label_count: 3,
            onTop: '',
            goodsNumber: 3
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
                    if(resp.auction_count == 0){
                        this.tabs.splice(1,1)
                    }
                    this.numbers.auction = resp.auction_count
                    this.numbers.product = resp.selling_count
                    this.numbers.praise = resp.comment_count
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
        },
        followed() {
            return  this.shop.owner.is_followed
        },
        fans() {
            return this.shop.pd_count_today
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
        },
        follow() {
            if (!this.followed) {
                this.$post("users/target/"+this.$route.params.id+"/type/us/follow").then(res=>{
                    this.action('toast', {success: 1, text: '已关注'})
                    this.followed = !this.followed;
                    this.fans ++
                })
            } else{
                this.$delete("users/target/"+this.$route.params.id+"/type/us/follow").then(res=>{
                    this.action('toast', {success: 1, text: '取消关注'})
                    this.followed = !this.followed;
                    this.fans --
                })

            }
        }
    }
}
</script>