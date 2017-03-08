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
    opinion-list(:items="tab.items")
    empty(v-if="!tab.items.length", title="暂无评论")
</template>
<script>
import OpinionList from 'component/OpinionList.vue'
export default {
    name: 'shop-comment-view',

    components: {
        OpinionList
    },

    data() {
        return {
            tabs: {
                pro: {label: '好评', items: []},
                avg: {label: '中评', items: []},
                con: {label: '差评', items: []}
            },
            tab: {label: '好评', items: []}
        }
    },

    route: {
        data({from, to, next}) {
            this.tab = this.tabs[to.query.tab] || this.tabs.pro
            if(from.name !== to.name) {
                return this.$fetch('mall/orders/comments', {limit: 999})
                    .then(({comments}) => {
                        comments.forEach(c => {
                            if(c.choice === 'good') {
                                this.tabs.pro.items.push(c)
                            } else if(c.choice === 'bad') {
                                this.tabs.con.items.push(c)
                            } else {
                                this.tabs.avg.items.push(c)
                            }
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