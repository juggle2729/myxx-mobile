<style lang="stylus">
.shop-praise
    .mgv-20
        padding 47px 20px 47px 36px
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
</style>
<template lang="pug">
.shop-praise.bg-gray-f7
    .mgv-20.bg-white.flex
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
            shopComment: []
        }
    },

    ready() {
        this.$fetch(`mall/shop/${this.$route.params.id}/profile`).then(({comment_stats}) => {
            this.productComment = comment_stats[0]['商品评价']
            this.shopComment = comment_stats[1]['商家服务']
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