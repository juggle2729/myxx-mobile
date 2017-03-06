<style lang="stylus">
.shop-view
    padding-bottom: 110px
    > header
        height: 300px
        position: relative
        background-size: cover
        background-position: center
        .name
            position: absolute
            bottom: 12px
            left: 156px
            -webkit-box-align: baseline
        img.collect
            height: 52px
            width: 152px
            position: absolute
            right: 0
            bottom: 8px
            &.uncollect
                width: 120px
    .shop
        .icon-enter
            vertical-align: -2px
            height: 22px
            width: 22px
        .img
            height: 120px
            width: 120px
            position: relative
            bottom: 60px
            z-index: 99
            border-radius: 8px
    .tabs
        height: 150px
        line-height: 150px
        & > div
            text-align: center
            width: 33.33%
            &:first-child
                color: #c6c6c6
            img
                height: 56px
                width: 56px
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
        .icon-chat
            height: 48px
            width: 48px
</style>
<template lang="jade">
.shop-view.bg(v-if='!$loadingRouteData')
    header(v-bg='shop.image_bg')
        .name.flex
            .white.bold.fz-30 {{shop.shop_name}}
            lv(:lv="shop.level")
        img.collect(:src="shop.is_faved ? 'shop/collected.png' : 'shop/uncollect.png' | qn", :class="{'uncollect': shop.is_faved}", @click="collect(shop.is_faved)")
    .shop.pdh.bg-white.flex.line-height-90.bdb
        .img.mgr-16(v-bg="shop.logo")
        .fz-26.gray.flex.flex-1
            icon(name="location")
            .mgl-8 {{shop.locale_name}}
        .fz-26.gray.flex(v-link="{name: 'shop-comments', params: {id: $route.params.id}}")
            .mgr-12 店铺评价
            icon(name="enter")
    .tabs.bg-white.flex
        .tab(@click="action('toast', {text: '敬请期待'})")
            img(:src="'shop/auction.png' | qn")
            .mgt-16.fz-22.light 拍卖
        .tab(v-for="tab in tabs", @click="view=tab.id", :class="{'red': view === tab.id}")
            img(:src="(view === tab.id ? tab.selected : tab.unselect )| qn")
            .mgt-16.fz-22 {{tab.label}}
    component(:is="view", :shop="shop")

    .footer.flex.bdt.fz-30.bg-white.gray
        deep-link.has-icon.flex-1.fz-30
            icon.red(name="chat")
            span 联系卖家
</template>
<script>
import paging from 'paging'
import shareable from 'shareable'
import lv from 'component/Lv.vue'
import ProductCard from 'component/item/ProductCard.vue'
import jade from 'component/AllJade.vue'
import info from 'component/StoreInfo.vue'
export default {
    name: 'shop-view',

    mixins: [shareable, paging],

    components: {
        lv,
        ProductCard,
        jade,
        info
    },

    data() {
        return {
            view: 'jade',
            tabs: [
                { id: 'jade', selected: 'shop/jade-selected.png', unselect: 'shop/jade-unselect.png', label: '全部商品'},
                { id: 'info', selected: 'shop/info-selected.png', unselect: 'shop/info-unselect.png', label: '店铺信息'}
            ],
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
    },

    methods: {
        collect(status) {
            this.method = status ? this.$put : this.$post
            this.method('users/favs', {
                doc_id: this.$route.params.id,
                doc_type: 'sh'
            }).then(() => {
                this.shop.is_faved = !status
            })
        }
    }
}
</script>