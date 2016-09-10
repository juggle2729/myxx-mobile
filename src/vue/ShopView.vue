<style lang="stylus">
.studio-view {
    padding-bottom: 98px
    > header {
        height: 460px
        background-size: cover
        background-position: center
        .shop {
            position: relative
            top: 320px
            background-color: rgba(0, 0, 0, .6)
            height: 140px
            padding: 0 32px
            .name {
                width: 500px
                &.auth {
                    width: 400px
                }
            }
            .img {
                height: 100px
                width: 100px
                border-radius: 6px
                margin-right: 20px
            }
        }
    }
    .level {
        height: 100px
        line-height: 100px
        padding: 0 32px
        .level-comp {
            display: block
            img {
                width: 42px
            }
        }
    }
    .master {
        padding: 0 32px
        height: 114px
        .icon-enter {
            position: relative
            bottom: 10px
        }
    }
    section {
        header {
            padding: 0 32px
            height: 84px
            line-height: 84px
            span {
                border-left: 6px solid #cc3f4f
                padding-left: 12px
            }
        }
        main {
            padding-top: 20px
            & > div {
                margin: 0 0 20px 20px
            }
        }
    }
    .medias {
        display: inline-block
        &:nth-child(odd) {
            margin-left: 4px
        }
        .media {
            height: 373px
            width: 373px
        }
        .detail {
            height: 110px
            width: 373px
            padding: 16px 24px
            .desc {
                line-height: 1.2
                margin-bottom: 16px
            }
        }
    }
    .footer {
        height: 98px
        line-height: 48px
        width: 100%
        position: fixed
        bottom: 0
    }
}
</style>
<template lang="jade">
.studio-view.bg-white(v-if='!$loadingRouteData')
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
        .icon-enter.fz-30.gray
    .hr
    .master.flex(v-link="{name: 'user', params: {id: shop.owner.id}}")
        avatar(:user='shop.owner')
        .fz-26.mgl.flex-1
            p {{shop.owner.nickname}}
            p.mgt.gray {{shop.owner.title}}
        .icon-enter.fz-30.gray
    .hr(v-if='items && items.length > 0')
    section(v-if='items.length > 0')
        header.fz-26.gray.bg-white
            span 新品发布
        main.bg
            product-card(v-for='item in items', :entry="item")
    .footer.flex.bdt.fz-30.bg-white.gray
        chat.flex-1.center.bdr(:id='shop.owner.id', :name='shop.owner.nickname')
        share.flex-1.center
</template>
<script>
import paging from 'paging'
import share from 'component/Share.vue'
import chat from 'component/Chat.vue'
import lv from 'component/Lv.vue'
import ProductCard from 'component/ProductCard.vue'
import shareable from 'shareable'
export default {
    name: 'ShopView',
    mixins: [paging, shareable],
    components: {
        share,
        chat,
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
                    shop_id: this.shop.id,
                    order_by: 'new'
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/shop/${to.params.id}/profile`).then((data) => {
                this.shop = data
                this.action('updateTitle', {text: this.shop.shop_name})
                this.setShareData({name: this.shop.shop_name, logo: this.shop.logo, type:
                    this.shop.shop_type === 'studio' ? '工作室' : '店铺'}, true)
            })
        }
    }
}
</script>