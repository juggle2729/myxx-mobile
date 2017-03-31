<style lang="stylus">
@import '~style/partials/var'
.shop-view
    min-height: 100%
    padding-bottom: 110px
    > header
        height: 300px
        position: relative
        background-size: cover
        background-position: center
        .shop-bg
            position: absolute
            bottom: 0
            height: 120px
            width: 100%
            background-size: cover
            background: url($qn + 'shop/bg.png?v2') repeat-x
        .name
            position: absolute
            bottom: 12px
            left: 156px
            -webkit-box-align: baseline
        .fans
            position: absolute
            left: 370px
            bottom: 0
        img.collect
            height: 52px
            width: 152px
            position: absolute
            right: 0
            bottom: 8px
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
            border: 4px solid #f9f9f9
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
<template lang="pug">
.shop-view.bg(v-if='!$loadingRouteData')
    header(v-bg='shop.image_bg')
        .shop-bg
        .name.flex.white
            .bold.fz-30 {{shop.shop_name}}
            .mgr-8.center.fans
                .fz-26.mgb-4 {{shop.owner.fans_count}}
                .fz-22 粉丝
        deep-link.has-icon
            img.collect(:src="'shop/follow.png' | qn", @click="gotoDownload")
    .shop.pdh.bg-white.flex.line-height-90.bdb
        .img.mgr-16(v-bg="shop.logo")
        .fz-26.gray.flex.flex-1
            icon(name="location")
            .mgl-8.mgt-4 {{shop.locale_name}}
        .fz-26.gray.flex(v-link="{name: 'shop-comments', params: {id: $route.params.id}}")
            .mgr-12 店铺评价
            icon(name="enter")
    .tabs.bg-white.flex
        .tab(@click="action('toast', {text: '敬请期待'})")
            img(:src="'shop/auction.png' | qn")
            .mgt-16.fz-22.light 拍卖
        .tab(v-for="tab in tabs", @click="view = tab.id", :class="{'red': view === tab.id}")
            img(:src="(view === tab.id ? tab.selected : tab.unselect )| qn")
            .mgt-16.fz-22 {{tab.label}}
    component(:is="view", :shop="shop", keep-alive)

    .footer.flex.bdt.bg-white
        deep-link.has-icon.flex-1.fz-30
            icon.red(name="chat")
            span.black 联系卖家
</template>
<script>
import shareable from 'shareable'
import lv from 'component/Lv.vue'
import jade from 'component/AllJade.vue'
import info from 'component/StoreInfo.vue'
export default {
    name: 'shop-view',

    ready() {
        this.view = this.$route.query.tab || this.tabs[0].id
        this.$watch('view', tab => {
            this.$router.replace({...this.$route, query: {...this.$route.query, tab: tab}})
        })
    },

    mixins: [shareable],

    components: {
        lv,
        jade,
        info
    },

    data() {
        return {
            view: '',
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
        data({from, to, next}) {
            if(from.name !== to.name) {
                return this.$fetch(`mall/shop/${to.params.id}/profile`).then((data) => {
                    this.shop = data
                    this.action('updateTitle', {text: this.shop.shop_name})
                    this.setShareData({name: this.shop.shop_name, logo: this.shop.logo, type:
                        this.shop.shop_type === 'studio' ? '工作室' : '店铺'})
                })
            } else {
                next()
            }
        }
    }
}
</script>