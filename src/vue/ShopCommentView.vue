<style lang="stylus">
.shop-comment-view
    padding-top: 100px
    .tabs
        position: fixed
        top: 0
        width: 100%
        height: 100px
        z-index: 9
        .tab
            text-align: center
            line-height: 50px
</style>
<template  lang="pug">
.shop-comment-view.bg
    .tabs.flex.bdb.fz-30.bg-white
        .tab.flex-1(v-for="(k, t) in tabs", :class="{'red': tab===t, 'bdh': $index===1}", @click="tab=t") {{t.label}}({{stats[k]}})
    marks(v-if="tags.length > 0", :tags="tags")
    .line-height-100.flex.fz-26.gray.bdb.pdh-32.bg-white(v-if="tab.items.length", @click="selected = !selected")
        icon(:name="selected ? 'selected' : 'select'")
        .mgl-12 只看有内容的评价
    opinion-list(:items="selected ? tab.contents : tab.items")
    empty(v-if="!tab.items.length", title="暂无评论")
</template>
<script>
import Marks from 'component/Marks.vue'
import OpinionList from 'component/OpinionList.vue'
export default {
    name: 'shop-comment-view',

    components: {
        Marks,
        OpinionList
    },

    data() {
        return {
            tabs: {  // items -> 所有评论, contents -> 有内容评论
                good: {label: '好评', items: [], contents: []},
                normal: {label: '中评', items: [], contents: []},
                bad: {label: '差评', items: [], contents: []}
            },
            stats: {},
            tab: {label: '好评', items: []},
            tags: [],
            selected: false
        }
    },

    route: {
        data({from, to, next}) {
            const choice = to.query.tab || 'good'
            this.tab = this.tabs[choice]
            if(!this.tab.items.length) {
                return this.$fetch('mall/orders/comments', { limit: 20, choice }).then(resp => {
                    this.stats = resp.stats
                    this.tags = resp.tags
                    this.tab.items = this.tab.items.concat(...resp.comments)

                    this.$fetch('mall/orders/comments', {
                        has_content: true,
                        limit: 20,

                    }).then(content => {
                        this.tab.contents = this.tab.contents.concat(...content.comments)
                    })
                })
            } else {
                next()
            }
        }
    },

    ready() {
        this.$watch('tab', tab => {
            const k = _.findKey(this.tabs, tab)
            this.$router.replace(_.merge({query: {tab: k}}, _.pick(this.$route, 'name', 'params')))
        })
    },

    events: {
        scrollToBottom(e) {
            const choice = this.$route.query.tab
            this.$fetch('mall/orders/comments', { choice, limit: 10, offset: this.tab.items.length }).then(resp => {
                this.tab.items = this.tab.items.concat(...resp.comments)

                this.$fetch('mall/orders/comments', {
                    has_content: true,
                    choice,
                    limit: 10,
                    offset: this.tab.contents.length
                }).then(content => {
                    this.tab.contents = this.tab.contents.concat(...content.comments)
                })
            })
        }
    }
}
</script>