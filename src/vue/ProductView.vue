<style lang="stylus">
@import '~style/partials/var'
@import '~style/partials/mixin'
.product-view
    position: relative
    .prod-video
        height: 577px
        background-size: contain
        background-color: #000000
        &.play::after
            background-size: 144px 144px
    .titles
        .header
            min-height: 164px
            padding: 28px 32px 28px 26px
            .price
                font-weight: bold
                &:first-letter
                    font-size: 32px
                    font-weight: normal
        .title
            margin: 0 0 18px 4px
            line-height: 1.5
        .button
            padding: 0 20px 0 20px
            height: 72px
            border-width: 0
            border-radius: 10px
            text-align: center
            line-height: 56px
        .guarantee
            line-height: 0
            position: relative
            img
                // height: 97px
                width: 100%
            .icon-enter
                height: 24px
                width: 12px
                position: absolute
                right: 32px
                top: 36px
    .master
        height: 72px
        line-height: 72px
        .name
            height: 72px
            line-height: 72px
        img
            display: block
            height: 26px
            width: 26px
    .coupon
        height: 100px
        .coupon-labels
            opacity: 0
            white-space nowrap
            div
                display inline-block
                font-size 22px
                color white
                background-color #cc3f4f
                background-image radial-gradient(at left center, white 4px, #cc3f4f 4px), radial-gradient(at right center, white 4px, #cc3f4f 4px)
                background-size 10px 20px, 10px 20px
                background-position left center, right center
                background-repeat no-repeat
                margin-right 6px
                padding 6px 8px
                border-radius 6px
        .bd-red
            border-radius: 6px
            padding: 10px 20px 0
            height: 48px
            line-height: 30px
            font-size: .34rem   // TODO: Android Webview 汉字渲染有毛病
        .deep-link .btn //reset deep-link style
            font-size: 26px
            border-radius: 6px
            padding: 8px 20px
            border(a, #cc3f4f)
    .shop
        height: 144px
        padding: 0 32px
        .img
            height: 100px
            width: 100px
            border-radius: 6px
            margin-right: 20px
        .name
            width: 380px
            .line-clamp
                line-height: 1.2
        .address
            max-width: 200px
            font-size: 0.34rem
        .icon-shop
            height: 44px
            width: 48px
            margin-top: -46px
            & + div
                margin-top: -24px
        .new
            border-radius: 40px
            height: 32px
            line-height: 32px
    .guarantee .icon-enter
        color: #f1ab47
    .tabs
        width: 100%
        height: 90px
        top: 0
        > div
            width: 33.3%
            line-height: 54px
            &.active
                line-height: 54px // FIXME: 临时方案
                color: #cc3f4f
        &.default > div:first-child
                color: #cc3f4f
    .float-box
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        & > div
            height: 100%
        // & > div:first-child
        //     width: 370px
        .contact-btn,.collect-btn,.shop-btn
            font-size: 22px
            -webkit-box-orient: vertical
            -webkit-box-pack: center
            width: 50%
            height: 100%
            .btn
                font-size: 22px
            [class^='icon-'], [class*=' icon-']
                margin-bottom: 4px
                padding: 0
                height: 1.6em
                width: @height
        .contact-btn .btn
            color: #CC3F4F
        .add-btn
            height: 98px
            line-height: 98px
            padding: 0 32px
        .buy-btn, .buy-btn .btn
            padding: 0 32px
            color: white
            text-align: center
            height: 98px
            line-height: 98px
        .buy-btn.bg-gray
            border(l, #d9d9d9)
    .tabs-fixed
        will-change: visibility
        position: fixed
        visibility: hidden
        width: 100%
        z-index: 999
    .placeholder
        height: 110px
    .offline
        position: absolute
        width: 100%
        top: 45%
        left: 50%
        transform: translate(-50%, -50%)
        img
            display: block
            margin: 0 auto
            height: 244px
            width: 386px
.old-android
    .product-view
        .coupon-labels div
            padding: 8px 8px 0
        .new
            border-radius: 40px
            padding-top: 6px
</style>
<template lang="pug">
.product-view
    template(v-if="prod.status === 'online'")
        //- .tabs.tabs-fixed.bdb.flex.fz-26.bg-white.center(:class="{'default': isDefaultView}")
        //-     .bdr(@click="go('detail')", :class="{'active': $route.params.tab === 'detail'}") 详情
        //-     .bdr(@click="go('attribute')", :class="{'active': $route.params.tab === 'attribute'}") 属性
        //-     div(@click="go('problem')", :class="{'active': $route.params.tab === 'problem'}") 常见问题
        .prod-video.video(v-bg='prod.video', @click='play(prod.video)', query='vframe/jpg/offset/7/rotate/auto|imageView2/2/w/750')
        .titles.bg-white
            .header
                .title.fz-32 {{prod.title}}
                .flex.red
                    .fz-30(v-if="prod.sell_status === 'sold'") {{prod.sell_status_editable ? '实体店已售出' : '已售出'}}
                    .price.fz-44.flex-1(v-else) {{prod.price | price}}
            .guarantee(@click="guarantee")
                img(:src="'product/term.png?v1' | qn")
                icon.fz-26(name="enter")
        .hr
        .coupon.flex.fz-26.red.pdh-32.bdb(v-if="prod.shop.coupon_count")
            .coupon-labels.flex-1
                div(v-for="coupon in coupons") {{coupon.title}}
                div(v-if="coupon_label_count < prod.shop.coupons.length") &middot;&middot;&middot;
            deep-link.btn-get-coupon.has-icon(v-if="env.isShare") 领券
            .btn-get-coupon.bd-red(v-else, @click="getCoupon") 领券
        .shop.bg-white.flex.detail(v-link="{name: 'shop', params: {id: prod.shop.id}}")
            .img(v-bg='prod.shop.logo')
            .flex-1
                .fz-30.flex.mgb-12.name
                    .line-clamp.mgr {{prod.shop.shop_name}}
                    lv(:lv='prod.shop.level')
                .fz-26.gray.flex
                    icon(name="location")
                    div(:class="{'address': prod.shop.pd_count_today, 'line-clamp-1': prod.shop.pd_count_today}") {{prod.shop.locale_name}}
                    .new.bg-red.white.fz-22.mgl-16.pdh-16(v-if="prod.shop.pd_count_today") 今日上新 {{prod.shop.pd_count_today}}
            .center
                icon.gray(name="shop")
                .fz-22.gray 进店逛逛
        .master.flex.bg-white.bdt.pdl-32(v-link="{name: 'user', params: {id: prod.owner.id}}")
            avatar(:user='prod.owner', :size='50')
            .flex
                .name.fz-26.gray.mgl {{prod.owner.name}}
                img.mgl-8(v-if="prod.owner.vip_flag", :src="'profile/'+prod.owner.role+'.png' | qn")
        .hr
        .tabs.tabs-static.bdb.flex.fz-26.bg-white.center(:class="{'default': isDefaultView}")
            .bdr(@click="go('detail')", :class="{'active': $route.params.tab === 'detail'}") 详情
            .bdr(@click="go('attribute')", :class="{'active': $route.params.tab === 'attribute'}") 属性
            div(@click="go('problem')", :class="{'active': $route.params.tab === 'problem'}") 常见问题
        .bg.tab-content
            component(:is='view', keep-alive, :prod='prod')
        .bg.placeholder
        .float-box.flex.fixed.fz-30.bg-white(v-if="env.isShare")
            .bdt.flex-1.flex
                deep-link.has-icon.flex.flex-1.red.contact-btn.bdr
                    icon.fz-30(name="chat")
                    .mgt-6 私信
                deep-link.has-icon.flex.flex-1.gray.collect-btn.bdr
                    icon.fz-30(:name="prod.is_faved ? 'star-solid' : 'star'")
                    .mgt-6 {{prod.is_faved ? '已收藏' : '收藏'}}
                .flex.flex-1.gray.shop-btn(v-link="{name: 'shop', params:{id: prod.shop.id}}")
                    icon.fz-30(name="shop")
                    .mgt-6 店铺
            deep-link.has-icon.buy-btn.bg-red.white.fz-30 {{(prod.sell_status==='selling') ? '立即购买' : '已售出'}}
        .float-box.flex.fixed.fz-30.bg-white(v-else)
            .bdt.flex-1.flex
                .flex.flex-1.red.contact-btn.bdr(@click='contact')
                    icon.fz-30(name="chat")
                    .mgt-6 私信
                .flex.flex-1.gray.collect-btn.bdr(:class="{'red': prod.is_faved}", @click='collect()')
                    icon.fz-30(:name="prod.is_faved ? 'star-solid' : 'star'")
                    .mgt-6 {{prod.is_faved ? '已收藏' : '收藏'}}
                .flex.flex-1.gray.shop-btn(v-link="{name: 'shop', params:{id: prod.shop.id}}")
                    icon.fz-30(name="shop")
                    .mgt-6 店铺
            template(v-if="prod.sell_status==='selling'")
                .fz-26.add-btn.bg-yellow.white(v-if="3.3 <= env.version", @click="addToCart()") 加入购物车
                .fz-26.buy-btn.bg-red.white(@click='buy()') 立即购买
            template(v-else)
                .fz-26.add-btn.bg-gray.white(v-if="3.3 <= env.version") 加入购物车
                .fz-26.buy-btn.bg-gray.white 已售出
    .offline(v-else)
        img(:src="'mall/offline.png' | qn")
        .mgt-28.gray.fz-26.center 该商品已下架
</template>
<script>
import Q from 'q'
import shareable from 'shareable'
import lv from 'component/Lv.vue'
import detail from './ProductDetail.vue'
import attribute from './ProductAttribute.vue'
import problem from './ProductProblem.vue'
export default {
    name: 'product-view',

    mixins: [shareable],

    components: {
        lv,
        detail,
        attribute,
        problem
    },

    data() {
        return {
            prod: {
                owner: {},
                shop: {
                    coupons: []
                },
                is_faved: false,
                status: 'online'
            },
            isSelf: false,
            isDefaultView: false,
            view: undefined,
            coupon_label_count: 2
        }
    },

    computed: {
        coupons() {
            return this.prod.shop.coupons.slice(0, this.coupon_label_count)
        }
    },

    ready() {
        this.staticTabs = this.$el.querySelector('.tabs-static')
        // this.fixedTabs = this.$el.querySelector('.tabs-fixed')
        const tabContent = this.$el.querySelector('.tab-content')
        // FIXME: 采用css解决方案
        // tab内容最小高度为 window高度 - tabs高度 - $el的底部padding
        tabContent && (tabContent.style.minHeight = `calc(${window.innerHeight-this.staticTabs.clientHeight}px - ${window.getComputedStyle(this.$el)['padding-bottom']})`)

        _.delay(() => {
            const container = this.$el.querySelector('.coupon-labels')
            if(container) {
                this.adjustCouponLabels(container)
            }
        }, 50)

    },

    route: {
        canReuse({from, to}) {
            return from.name === to.name && from.params.id === to.params.id
        },
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入商品详情页
                return this.$fetch('mall/products/'+ this.$route.params.id)
                    .then(prod => {
                        _.update(prod, 'circle_size', size => size ? size/100 : '')
                        this.setShareData(prod)
                        this.isSelf = (_.get(this, 'self.id') == (prod.owner.id || prod.default_admin.id))
                        this.isDefaultView = ['detail', 'attribute', 'problem'].indexOf(to.params.tab) === -1
                        this.view = this.isDefaultView ? 'detail' : to.params.tab
                        this.prod = prod
                    }, () => {
                        this.prod.status = ''
                    })
            } else {
                this.isDefaultView = false
                this.view = to.params.tab
                next()
            }
        }
    },

    methods: {
        buy() {
            if(this.isSelf) {
                this.action('toast', {success: 0, text: '您不能购买自己的商品'})
            } else {
                this.action('orderConfirm', {product: this.prod.id})
            }
         },

         addToCart() {
            this.$put('mall/cart', { product_id: this.prod.id }).then(resp => {
                this.action('updateCartCount', { count: resp.cart_count })
                this.action('toast', {
                    success: '1',
                    text: '已加入购物车'
                })
            })
         },

        contact() {
            if(this.isSelf) {
                this.action('toast', {success: 0, text: '您不能和自己聊天'})
            } else {
                this.action('chat', {id: this.prod.default_admin.id, name: this.prod.default_admin.nickname, product: this.prod.id})
            }
        },

        go(tab) { // FIXME 采用v-link替代
            (this.$route.params.tab !== tab) && this.$router.replace(`/product/${this.prod.id}/${tab}`)
        },

        collect(tab) {
            // TODO api
            const api = 'users/favs'
            const data = {
                doc_type: 'pd',
                doc_id: this.prod.id
            }
            this[this.prod.is_faved ? '$put' : '$post'](api, data)
            .then(() => {
                this.prod.is_faved = !this.prod.is_faved
                this.action('toast', {
                    success: 1,
                    text: this.prod.is_faved ? '恭喜，宝贝收藏成功!' : '取消宝贝收藏成功!'
                })
            })
        },

        guarantee() {
            this.$root.popup = {handler: 'guarantee'}
        },

        getCoupon() {
            this.action('couponList', {
                shop: this.prod.shop.id
            })
        },

        adjustCouponLabels(container) {
            const overflow = container.scrollWidth > container.clientWidth
            if(container.scrollWidth > container.clientWidth) {
                this.coupon_label_count -= 1
                container.style.opacity = 1
            } else if(this.coupon_label_count < this.prod.shop.coupons.length) {
                this.coupon_label_count += 1
                _.delay(() => this.adjustCouponLabels(container), 10)
            } else {
                container.style.opacity = 1
            }
        }
    },

    events: {
        // scroll() {
        //     if(!this.fixedTabs) {
        //         this.staticTabs = this.$el.querySelector('.tabs-static')
        //         this.fixedTabs = this.$el.querySelector('.tabs-fixed')
        //     } else {
        //         if(!this.env.isWechat) {
        //             this.fixedTabs.style.visibility = window.scrollY - this.staticTabs.offsetTop > 0 ? 'visible' : 'hidden'
        //         }
        //     }
        // }
    }
}
</script>
