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
</style>
<template  lang="pug">
.shop-comment-view.bg
    .evaluate.bg-white.flex.bdt.bdb
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
    .bg-white.bdt
        .pdh-36
            .line-height-110.flex.fz-26.black-24(@click="hasContent = !hasContent")
                icon(:name="hasContent ? 'selected' : 'select'")
                .mgl-20 只看有内容的评价
            .tabs.flex.fz-26(:class="{'pdb-26 bdb': tags.length <= 0}")
                .tab.flex(v-for="tab in tabs", @click="chooseTab = tab.id")
                    icon(:name="tab.id === chooseTab ? 'selected' : 'select'")
                    .mgl-16 {{ tab.label }}
            marks.pdb-26.pdt-50.bdb.bg-white(v-if="tags.length > 0", :tags="tags")
        opinion-list(:items="items")
</template>
<script>
import Marks from 'component/Marks.vue'
import OpinionList from 'component/OpinionList.vue'
import paging from 'paging'
export default {
    name: 'shop-comment-view',
    mixins: [paging],
    components: { Marks, OpinionList },

    data() {
        return {
            tabs: [
                {id: '', label: '全部'},
                {id: 'good', label: '好评'},
                {id: 'normal', label: '中评'},
                {id: 'bad', label: '差评'}
            ],
            chooseTab: '',
            hasContent: false,
            tags: [],
            productComment: [],
            shopComment: []
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/orders/comments',
                list: 'comments',
                params: {
                    limit: 20,
                    choice: this.chooseTab,
                    has_content: this.hasContent
                }
            }
        }
    },

    ready() {
        this.$fetch(`mall/shop/${this.$route.params.id}/profile`).then(({comment_stats}) => {
            this.productComment = comment_stats[0]['product']
            this.shopComment = comment_stats[1]['seller']
        })
        this.$fetch(`mall/orders/comments`).then(({tags}) => {
            this.tags = tags
        })
    },

    watch: {
        chooseTab(newVal) {
            this.paging.params.choice = newVal
            this.fetch(true)
        },
        hasContent(newVal) {
            this.paging.params.has_content = newVal
            this.fetch(true)
        }
    }
}
</script>