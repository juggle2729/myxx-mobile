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
            a img
                width 161px
                height 56px
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
        .center
            font-size 0
        img
            width 44px
            height @width
            margin-bottom 8px
    .shop-footer
        height 120px
        line-height 120px
        .flex-1
            line-height 32px
    .guarantee .icon-enter
        color: #f1ab47
    .placeholder
        height: 110px
    .float-box
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        & > div
            height: 100%
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
    .prod-attr
        header
            height 90px
            line-height @height
        ul
            font-size 0
            padding 10px 32px 30px
            & > li
                padding-top 20px
                display inline-block
                width 50%
                p
                    display inline-block
                    & + p
                        padding-left 32px
    .prod-detail
        padding-top: 6px
        .img
            line-height: 0  /*暂时修复图片下面多出一部分空白的问题*/
            img
                width: 100%
                &:not(:last-child)
                    margin-bottom: 6px
    .prod-banner
        font-size 0
        .banner
            background-size 100%
            position relative
            text-align center
            a
                background-color white
                color #cc3f4f
                font-size 26px
                font-weight bold
                height 90px
                line-height @height
                border-radius 8px
                position absolute
                left 50%
                transform translate3d(-50%, 0, 0)
                bottom 46px
                display inline-block
                width 90%
                width calc(100% - 64px)
    .prod-alike
        header
            height 90px
            line-height @height
        .prod-card
            display inline-block
            width 248px
            margin-right 12px
            .cover
                width 248px
                height @width
    .prod-related
        .recommends > a
            margin: 0 0 20px 15px
        .tag-title
            line-height: 90px
            padding-left 32px
        .tags
            padding: 0px 32px 24px
            font-size: 0
            .tag
                display: inline-block
                height: 60px
                line-height: 60px
                border-radius: 30px
                border(a, #c6c6c6)
    &.offline
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
</style>
<template lang="pug">
.product-view(v-if="prod.status === 'online'")
    .prod-video.video(v-bg='prod.video', @click='play(prod.video)', query='vframe/jpg/offset/7/rotate/auto|imageView2/2/w/750')
    .titles.bg-white
        .header
            .title.fz-32 {{prod.title}}
            .flex.red
                .fz-30.flex-1(v-if="prod.sell_status === 'sold'") {{prod.sell_status_editable ? '实体店已售出' : '已售出'}}
                .price.fz-44.flex-1(v-else) {{prod.price | price}}
        .guarantee(@click="$root.popup = {handler: 'guarantee'}")
            img(:src="'product/term.png?v1' | qn")
            icon.fz-26(name="enter")
    .hr
    .coupon.flex.fz-26.red.pdh-32.bdb(v-if="prod.shop.coupon_count")
        .coupon-labels.flex-1
            div(v-for="coupon in coupons") {{coupon.title}}
            div(v-if="coupon_label_count < prod.shop.coupons.length") &middot;&middot;&middot;
        .btn-get-coupon.bd-red(v-if="env.isApp", @click="getCoupon") 领券
        deep-link.btn-get-coupon.has-icon(v-else) 领券
    .shop.bg-white.flex.detail(v-link="{name: 'shop', params: {id: prod.shop.id}}")
        .img(v-bg='prod.shop.logo')
        .flex-1
            .fz-30.flex.mgb-12.name
                .line-clamp.mgr {{prod.shop.shop_name}}
            .fz-26.gray.flex
                icon(name="location")
                div(:class="{'address': prod.shop.pd_count_today, 'line-clamp-1': prod.shop.pd_count_today}") {{prod.shop.locale_name}}
        .center
            img(:src="config.www + 'icon.enter.shop.png'")
            .fz-22.gray 进店逛逛
    .shop-footer.flex.fz-26.center
        .flex-1.bdr
            span.inline-block 全部商品
            span.inline-block.red.mgl-16 {{prod.shop.selling_count}}
        .flex-1.bdr
            span.inline-block 今日上新
            span.inline-block.red.mgl-16 {{prod.shop.pd_count_today}}
        .flex-1
            span.inline-block 拍卖
            span.inline-block.light.mgl-8 敬请期待
    .master.flex.bg-white.bdt.pdl-32(v-link="{name: 'user', params: {id: prod.owner.id}}")
        avatar(:user='prod.owner', :size='50')
        .flex
            .name.fz-26.gray.mgl {{prod.owner.name}}
            img.mgl-8(v-if="prod.owner.vip_flag", :src="'profile/'+prod.owner.role+'.png' | qn")
    .hr
    .prod-attr
        header.fz-26.gray.pdh-32.bdb 商品属性
        ul
            template(v-for="attr in attrs")
                li.fz-26(v-if="prod[attr.k]")
                    p.label.gray {{attr.l}}
                    p {{prod[attr.k].name || prod[attr.k]}}{{attr.u}}
    .hr
    .prod-detail.bg-white
        .pd-32.user-txt.fz-30(v-if="prod.detail") {{{prod.detail | input}}}
        .img
            img(:src="config.img + img + '?imageView2/0/w/750'", v-for="img in prod.pictures", @click="coverflow(prod.pictures, $index)")
    .prod-banner
        template(v-for="banner in banners")
            .hr
            .banner(:style="banner.style")
                a(v-if="banner.title", href="/help/eco-system", target="_blank") {{banner.title}}
    .hr
    template(v-if="alike.length")
        .prod-alike.pdb
            header.fz-26.gray.pdl 看了这件宝贝的玉友还看了
            .scrollable.pdl
                a.prod-card(v-for="p in alike", :href="p.href")
                    .cover(v-bg.sm="p.cover")
                    .fz-24.mgv.line-clamp {{p.title}}
                    .fz-26.red {{p.price | price}}
        .hr
    .prod-related(v-if="related.length")
        .tag-title.fz-26.gray 相关推荐
        .tags(v-if="prod.tags.length > 0")
            .tag.pdh-28.mgr-16.mgb-16.fz-26.center.bg(v-for="tag in prod.tags", @click="gotoTagView(tag)") {{tag.name}}
        .recommends.bg.pdt(v-if="related.length")
            product-card(v-for="item in related", :item="item")
            deep-link(v-if="env.isShare") 没找到感兴趣的，打开美玉秀秀看看吧！
    .bg.placeholder
    .float-box.flex.fixed.fz-30.bg-white(v-if="env.isApp")
        .bdt.flex-1.flex
            .flex.flex-1.red.contact-btn.bdr(@click="contact()")
                icon.fz-30(name="chat")
                .mgt-6 私信
            .flex.flex-1.gray.collect-btn.bdr(:class="{'red': prod.is_faved}", @click='collect()')
                icon.fz-30(:name="prod.is_faved ? 'star-solid' : 'star'")
                .mgt-6 {{prod.is_faved ? '已收藏' : '收藏'}}
            .flex.flex-1.gray.shop-btn(v-link="{name: 'shop', params:{id: prod.shop.id}}")
                icon.fz-30(name="shop")
                .mgt-6 店铺
        template(v-if="prod.sell_status==='selling'")
            .fz-26.add-btn.bg-yellow.white(@click="addToCart()") 加入购物车
            .fz-26.buy-btn.bg-red.white(@click="buy()") 立即购买
        template(v-else)
            .fz-26.add-btn.bg-gray.white 加入购物车
            .fz-26.buy-btn.bg-gray.white 已售出
    .float-box.flex.fixed.fz-30.bg-white(v-else)
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
        deep-link.has-icon.buy-btn.bg-red.white.fz-30(v-if="prod.sell_status==='selling'") 立即购买
        deep-link.has-icon.buy-btn.bg-gray.white.fz-30(v-else) 已售出
.product-view.offline(v-else)
    img(:src="'mall/offline.png' | qn")
    .mgt-28.gray.fz-30.center 商品已下架
</template>
<script>
import shareable from 'shareable'
import ProductCard from 'component/item/ProductCard.vue'
export default {
    name: 'product-view',

    mixins: [shareable],

    components: {
        ProductCard
    },

    data() {
        return {
            prod: {
                owner: {},
                shop: {
                    coupons: []
                },
                is_faved: false,
                status: 'online',
                tags: [],
                banner: []
            },
            isSelf: false,
            coupon_label_count: 3,
            related: [],
            alike: [],
            attrs: [
                {k: 'category', l: '分类'},
                {k: 'size', l: '尺寸', u: 'mm'},
                {k: 'circle_size', l: '圈口', u: 'mm'},
                {k: 'weight', l: '重量', u: '克'},
                {k: 'variety', l: '种类'},
                {k: 'place', l: '产地'},
                {k: 'skin', l: '皮色'},
                {k: 'material', l: '产状'},
                {k: 'certificate', l: '证书'},
                {k: 'gift_to', l: '赠送对象'},
                {k: 'gift_when', l: '赠送场合'},
                {k: 'theme', l: '题材'},
                {k: 'moral', l: '寓意'},
                {k: 'genre', l: '流派'}
            ]
        }
    },

    computed: {
        coupons() {
            console.log(this.coupon_label_count, this.prod.shop.coupons)
            return this.prod.shop.coupons.slice(0, this.coupon_label_count)
        },

        banners() {
            return this.prod.banner.map(b => {
                return {
                    ...b,
                    style: {
                        paddingTop: b.height / b.width * 100  + '%',
                        backgroundImage: `url('${this.config.img + b.image}_750')`
                    }
                }
            })
        }
    },

    ready() {
        this.$fetch('dc/mlym?limit=10').then(resp => {
            this.alike = resp.entries.map(e => {
                if(this.env.isApp || !this.env.isMobile) {
                    e.href = `/product/${e.id}`
                } else if(this.hasUniversalLinkSupport) {
                    e.href = location.href.replace('www.meiyuxiuxiu', 'w3.meiyuxiuxiu').replace(location.pathname, `/product/${e.id}`)
                }
                return e
            })
        })
        this.$fetch(`dc/rd?biz_type=pd&obj_id=${this.$route.params.id}`).then(resp => {
            this.related = resp.entries
        })
    },

    route: {
        data({from, to, next}) {
            return this.$fetch('mall/products/'+ this.$route.params.id).then(prod => {
                _.update(prod, 'circle_size', size => size ? (this.env.version < 3.8 ? size/100 : size) : '')
                this.setShareData(prod)
                this.prod = prod
                this.isSelf = _.get(this, 'self.id') == prod.owner.id
            }, () => this.prod.status = '')
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

        getCoupon() {
            this.action('couponList', {
                shop: this.prod.shop.id
            })
        }
    }
}
</script>
