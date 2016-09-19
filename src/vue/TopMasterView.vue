<style lang="stylus">
.top-master
    &.placeholder
        padding-bottom: 100px
    .banner
        position: relative
        line-height: 0
        img
            width: 100%
            height: 250px
        .date
            position: absolute
            bottom: 36px
            left: 50%
            transform: translateX(-50%)
    .tabs
        height: 100px
        > div
            line-height: 50px
    .items
        > div
            height: 150px
            .order
                line-height: 46px
                width: 46px
                border-radius: 6px
                margin: 0 32px
                padding-top: 2px
</style>
<template lang="jade">
.top-master(:class="{'placeholder': env.isShare}")
    .banner.center
        img(:src="'master/ranking.png' | qn")
        .date.fz-26.white 最近更新：{{date}}
    .tabs.flex.fz-30.bdb
        .flex-1.center(v-for="t in tabs", :class="{'bdl': $index, 'red': t.key===tab}", @click="$router.replace('/top-master?tab='+t.key)") {{t.label}}
    .items
        .flex.fz-30.bdb(v-for="item in items", v-link="{name: 'user', params: {id: item.id}}")
            .order.bg-gray.white.center(:class="{'bg-red': $index < 3}") {{$index + 1}}
            avatar(:user='item', :size='90')
            .info.mgl-32
                div {{item.name}}
                .flex.fz-26.light.mgt-12
                    .mgr-36 获赞数: {{item.like_count}}
                    div 单个鉴定获赞数: {{item.like_count_per_jianbao}}
</template>
<script>
import shareable from 'shareable'
export default {
    name: 'top-master-view',

    mixins: [shareable],

    data() {
        return {
            tab: 'weekly',
            tabs: [{
                        key: 'weekly',
                        label: '周榜',
                        list: []
                    }, {
                        key: 'all',
                        label: '总榜',
                        list: []
                    }
                ]
        }
    },

    computed: {
        items() {
            return _.find(this.tabs, {key: this.tab}).list
        },

        date() {
            return new Date(Date.now()).toLocaleDateString()
        }
    },

    route: {
        data({to, next}) {
            this.setShareData({}, true)
            if(_.find(this.tabs, {key: to.query.tab})) {
                this.tab = to.query.tab
            }
            if(this.items.length) {
                next()
            } else {
                return this.$get('sns/jianbao/popular_masters', {
                    type: this.tab,
                    limit: 50
                }).then(resp => {
                    _.find(this.tabs, {key: this.tab}).list = resp.masters
                })
            }

        }
    }
}
</script>