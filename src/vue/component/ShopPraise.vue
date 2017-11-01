<style lang="stylus">
.shop-praise
    .brand_shop
        background url('//o0x80w5li.qnssl.com/shop/brand_slogan.png') no-repeat
        background-size cover
        width 100%
        padding-top 20%
    .mgv-20
        padding 22px 20px 27px 36px
        border-color #ededed
        .col
            height 118px
            border-color #ededed
        .row
            height calc(100% / 3)
            line-height 39px
        .title
            text-align center
            font-size 24px
            color #b3b3b3
        .percent
            font-size 26px
            font-weight bold
            color #242424
        .number
            font-size 26px
            color #8f8f8f
        .left-border
            width calc((100% / 2) / 3)
            border-left 1px solid #ededed
    .empty-component
        height 300px
        &.empty-title
            background-position center 50px
    .h-center
        -webkit-box-pack center
</style>
<template lang="pug">
.shop-praise.bg-gray-f7
    .mgv-20.bg-white.bdb
        .brand_shop.mgt-22.mgb-39(v-if="brandShop")
        .flex.black-24.fz-26.h-center.mgt-20.mgb-40
            p 开店
            .mgh-10.fz-36 {{ openDays }}
            p 天，累计评价
            .mgh-10.fz-36 {{ commentCount }}
            p 人
        .flex.pdv-20
            .col.fz-26.black-47
                .row
                .row 商品评价：
                .row 商品服务：
            .col.title.flex-1
                .row 好评率
                .row.percent {{ productComment[0] }}
                .row.percent {{ shopComment[0] }}
            .col.title.left-border
                .row 好评
                .row.number {{ productComment[1] }}
                .row.number {{ shopComment[1] }}
            .col.title.left-border
                .row 中评
                .row.number {{ productComment[2] }}
                .row.number {{ shopComment[2] }}
            .col.title.left-border
                .row 差评
                .row.number {{ productComment[3] }}
                .row.number {{ shopComment[3] }}
    shop-comments
</template>
<script>
import paging from 'paging'
import ShopComments from '../ShopCommentsView.vue'
export default {
    name: 'shop-praise',
    mixins: [ paging ],
    components: { ShopComments },

    data() {
        return {
            productComment: [],
            shopComment: [],
            brandShop: false,
            openDays: 0,
            commentCount: 0
        }
    },

    ready() {
        this.$fetch(`mall/shop/${this.$route.params.id}/profile`).then(({comment_stats, brand_shop, open_days, comment_count}) => {
            this.productComment = comment_stats[0]['product']
            this.shopComment = comment_stats[1]['seller']
            this.brandShop = brand_shop
            this.openDays = open_days || 0
            this.commentCount = comment_count || 0
        })
    },

    computed: {
        paging() {
            return {
                path: 'mall/auctions',
                list: 'auctions',
                params: {
                    shop_id: this.$route.params.id
                }
            }
        }
    }
}
</script>