<style lang="stylus">
@import "~style/partials/var"
.top-master-view
    background-image: url($qn + 'master/ranking.png')
    background-size: contain
    padding-top: 250px
    .date
        margin: -100px auto 0
        line-height: 100px
</style>
<template  lang="pug">
.top-master-view
    .date.fz-26.white.center 最近更新：{{date}}
    tabs(:tabs="{weekly: '周榜', all: '总榜'}", :current.sync="view")
    component(:is="view", keep-alive)
</template>
<script>
const ds = {path:'sns/jianbao/popular_masters', transform: 'masters'}
import shareable from 'shareable'
import Tabs from 'component/Tabs.vue'
import List from 'component/List.vue'
export default {
    name: 'top-master-view',

    mixins: [shareable],

    components: {
        Tabs,
        weekly: new List('TopMaster', {...ds, params: {type: 'weekly'}}),
        all: new List('TopMaster', {...ds, params: {type: 'all'}})
    },

    computed: {
        date() {
            return new Date().toLocaleDateString()
        }
    },

    data() {
        return {
            view: 'weekly'
        }
    },

    ready() {
        this.setShareData({})
    }
}
</script>