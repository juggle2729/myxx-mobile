<style lang="stylus">
.shop-view
    padding-bottom: 98px
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
            img
                width: 42px
    .master
        padding: 0 32px
        height: 114px
    .title
        padding: 0 32px
        line-height: 84px
    .list
        padding-top: 20px
        & > div
            margin: 0 0 20px 20px

    .footer
        height: 98px
        line-height: 48px
        width: 100%
        position: fixed
        bottom: 0
</style>
<<<<<<< d29dec60130867405c7800a6689a408afeaefd72
<template lang="jade">
.shop-view.bg-white(v-if='!$loadingRouteData')
=======
<template lang="pug">
.studio-view.bg-white(v-if='!$loadingRouteData')
>>>>>>> 发布求购、升级jade到pug
    header(v-bg='shop.image_bg')
        .shop.flex.white
            .img(v-bg='shop.logo')
            .flex-1
                .fz-30.flex.margin-bottom.name(:class="{'auth': shop.auth_flag}")
                    .line-clamp {{shop.shop_name}}
                .fz-26
                    span.icon-location
                    span {{shop.locale_name}}
    .level.fz-30.flex(v-link="{name: 'level-help', params: {id: 'none'}}")
        .mgr 信誉评价等级
        lv.flex-1(:lv="shop.level")
        .icon-enter.fz-30.light
    .hr
    .master.flex(v-link="{name: 'user', params: {id: shop.owner.id}}")
        avatar(:user='shop.owner')
        .fz-26.mgl.flex-1
            p {{shop.owner.nickname}}
            p.mgt.gray {{shop.owner.title}}
        .icon-enter.fz-30.light
    .hr
    .title.fz-26.gray.center.bg-white 新品发布
    product-list.bg(path="mall/homepage/searches", :params="{shop_id: $route.params.id, order_by: 'new'}", transform="products")
    .footer.flex.bdt.fz-30.bg-white.gray
        chat.flex-1.center(:id='shop.owner.id', :name='shop.owner.nickname')
        star.flex-1.center.bdh(:id='shop.id', type='sh', :active='shop.is_faved')
        share.flex-1.center
</template>
<script>



import lv from 'component/Lv.vue'
import List from 'component/List.vue'
import shareable from 'shareable'
export default {
    name: 'shop-view',

    mixins: [shareable],

    components: {
        lv,
        ProductList: new List('ProductCard')
    },
    data() {
        return {
            shop: {
                owner: {}
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