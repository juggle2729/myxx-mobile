<style lang="stylus">
.shop-view
    padding-bottom: 110px
    > header
        height: 460px
        background-size: cover
        background-position: center
        .shop
            position: relative
            top: 320px
            background-color: rgba(0, 0, 0, .6)
            height: 140px
            padding: 0 32px
            .name
                width: 500px
                &.auth
                    width: 400px
            .img
                height: 100px
                width: 100px
                border-radius: 6px
                margin-right: 20px
    .level
        height: 100px
        line-height: 100px
        padding: 0 32px
        .level-comp
            display: block
    .master
        padding: 0 32px
        height: 114px
        img
            display: block
            height: 26px
            width: 26px
    .title
        padding: 0 32px
        line-height: 84px
    .list
        padding-top: 20px
        background-color: #efefef
        & > div
            margin: 0 0 20px 15px

    .footer
        height: 98px
        line-height: 48px
        width: 100%
        position: fixed
        bottom: 0
</style>
<template lang="jade">
.shop-view.bg(v-if='!$loadingRouteData')
    header(v-bg='shop.image_bg')
        .shop.flex.white
            .img(v-bg='shop.logo')
            .flex-1
                .fz-30.flex.mgb-10.name(:class="{'auth': shop.auth_flag}")
                    .line-clamp {{shop.shop_name}}
                .fz-26
                    icon(name="location")
                    span {{shop.locale_name}}
    .level.fz-30.flex.bg-white(v-link="{name: 'level-help', params: {id: 'none'}}")
        .mgr 信誉评价等级
        lv.flex-1(:lv="shop.level")
        icon.fz-20.light(name="enter")
    .hr
    .master.flex.bg-white(v-link="{name: 'user', params: {id: shop.owner.id}}")
        avatar(:user='shop.owner')
        .fz-26.mgl.flex-1
            .flex
                div {{shop.owner.nickname}}
                img.mgl-8(v-if="shop.owner.vip_flag", :src="'profile/'+shop.owner.role+'.png' | qn")
            p.mgt-12.gray {{shop.owner.title || config.role[shop.owner.role]}}
        icon.fz-20.light.mgb-16(name="enter")
    .hr
    .title.fz-26.gray.center.bg-white 新品发布

    .list
        product-card(v-for="item in items", :item="item")

    deep-link(v-if="!items.hasMore") 打开美玉秀秀，查看更多优质商品

    .footer.flex.bdt.fz-30.bg-white.gray
        deep-link.has-icon.flex-1.fz-30
            icon(name="star")
            span 收藏
</template>
<script>
import paging from 'paging'
import shareable from 'shareable'
import lv from 'component/Lv.vue'
import ProductCard from 'component/item/ProductCard.vue'
export default {
    name: 'shop-view',

    mixins: [shareable, paging],

    components: {
        lv,
        ProductCard
    },

    data() {
        return {
            shop: {
                owner: {}
            }
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/homepage/searches',
                list: 'products',
                params: {
                    shop_id: this.$route.params.id,
                    order_by: 'new'
                }
            }
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`mall/shop/${to.params.id}/profile`).then((data) => {
                this.shop = data
                this.action('updateTitle', {text: this.shop.shop_name})
                this.setShareData({name: this.shop.shop_name, logo: this.shop.logo, type:
                    this.shop.shop_type === 'studio' ? '工作室' : '店铺'})
            })
        }
    }
}
</script>