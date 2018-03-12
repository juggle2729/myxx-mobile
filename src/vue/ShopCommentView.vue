<style lang="stylus">
.shop-comment-view
    padding-top 22px
    .evaluate
        margin-bottom 20px
        padding 47px 20px 47px 36px
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
    .tabs
        .tab
            margin 0 49px 0 0
    .icon
        transform translateY(-3px)
    .empty-component
        height calc(100% - 440px)

    .type
        padding 10px 22px
        background-color #F7F9FC
        color #6B6B6B
        margin-right 20px
        &.active
            background-color #FFF0F0
            color #E61717
            font-weight bold
</style>
<template  lang="pug">
.shop-comment-view.bg
    shop-score(:data="sellerComment")
    .bg-white.bdt
        .pdt-40.pdb-32.pdl-18.flex.fz-26.mgh-32.bdb
            .type(@click="changeType('all')", :class="type === 'all' ? 'active': ''") 全部
            .type(@click="changeType('new')", :class="type === 'new' ? 'active': ''") 最新评价
            .type(@click="changeType('picture')", :class="type === 'picture' ? 'active': ''") 有图
        opinion-list(:items="items",:seller="true")
</template>
<script>
import Marks from 'component/Marks.vue'
import OpinionList from 'component/OpinionList.vue'
import ShopScore from 'component/ShopScore.vue'
import paging from 'paging'
import emitter from "../util/emitter";
export default {
    name: 'shop-comment-view',
    mixins: [paging],
    components: { Marks, OpinionList, ShopScore },

    data() {
        return {
            sellerComment: {},
            type: 'all',
            params: {
                order_by: 'all'
            }
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/orders/comments',
                list: 'comments',
                params: this.params,
            }
        }
    },

    ready() {
        this.$fetch(`mall/shop/${this.$route.params.id}/profile`).then(({seller_comment}) => {
            this.sellerComment = seller_comment
        })

        emitter.on('reply_success',() => {
            this.fetch(true)
        })
    },

    methods: {
        changeType(type){
            this.type = type
            if(type !== 'picture'){
                this.params = {order_by: type}
            }else{
                this.params = {has_picture: true}
            }
            this.fetch(true)
        }
    }
}
</script>