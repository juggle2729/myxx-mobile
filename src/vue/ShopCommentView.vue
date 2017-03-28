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
<template lang="jade">
.shop-comment-view.bg
    .tabs.flex.bdb.fz-30.bg-white
        .tab.flex-1(v-for="(k, t) in tabs", :class="{'red': tab===t, 'bdh': $index===1}", @click="tab=t") {{t.label}}({{t.items.length}})
    tag-list(v-if="tags.length > 0", :tags="tags")
    .line-height-100.flex.fz-26.gray.bdb.pdh-32.bg-white(v-if="tab.items.length", @click="selected = !selected")
        icon(:name="selected ? 'selected' : 'select'")
        .mgl-12 只看有内容的评价
    opinion-list(:items="selected ? tab.contents : tab.items")
    empty(v-if="!tab.items.length", title="暂无评论")
</template>
<script>
import TagList from 'component/TagList.vue'
import OpinionList from 'component/OpinionList.vue'
export default {
    name: 'shop-comment-view',

    components: {
        TagList,
        OpinionList
    },

    data() {
        return {
            tabs: {  // items -> 所有评论, contents -> 有内容评论
                good: {label: '好评', items: [], contents: []},
                normal: {label: '中评', items: [], contents: []},
                bad: {label: '差评', items: [], contents: []}
            },
            tab: {label: '好评', items: []},
            tags: [],
            selected: false
        }
    },

    route: {
        data({from, to, next}) {
            this.tab = this.tabs[to.query.tab] || this.tabs.good
            if(from.name !== to.name) {
                return this.$fetch('mall/orders/comments', {limit: 999})
                    .then((data) => {
                        this.tags = data.tags
                        data.comments.forEach(c => {
                            this.tabs[c.choice].items.push(c)
                        })
                        this.$fetch('mall/orders/comments', {
                            has_content: true,
                            limit: 999
                        }).then((content) => {
                            content.comments.forEach(d => {
                                this.tabs[d.choice].contents.push(d)
                            })
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
    }
}
</script>