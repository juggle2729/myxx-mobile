<style lang="stylus">
.shop-credit-view
    .progress-indicator
        padding 50px 40px 40px
        .progress-bar
            height 6px
            width 100%
            border-radius 6px
            .real-progress
                height 100%
                width 200px
                border-radius 6px
    .title
        margin 27px 0 12px
    .light-green
        color: #09bb07
    .symbol
        vertical-align: 3px
    .line-clamp-2
        width: 0%
        line-height: 1.2
    .icon-enter
        height: 22px
        width: 22px
        vertical-align: -1px
</style>
<template lang="pug">
.shop-credit-view.bg
    .progress-indicator.bg-white.bdb
        .flex
            .fz-30.black-24 当前等级：
            lv(:lv="")
        .progress-bar.bg-gray-f7.mgt-50
            .real-progress.bg-red-e6
        .flex.mgt-12
            .fz-24.red-f2 距离下一等级还需321分
            .flex-1
            lv(:lv="")
    .title.center.fz-24.dark-6b — 积分明细 —
    .fz-30.bdb.pd-32.bg-white(v-for='item in items', v-link="item.violation_id ? {name: 'shop-violation', params: {id: item.violation_id}} : ''")
        .flex.fz-22.gray
            .flex-1 {{item.relate_desc}}
            div {{item.create_at | date 'yyyy-m-dd HH:MM'}}
        .flex.mgt-40
            .flex-2.line-clamp-2 {{item.remark}}
            .flex-1.red.fz-30.txt-right(:class="{'light-green': item.point_value > 0}")
                span.symbol(v-if="item.point_value > 0") +
                span {{item.point_value}}分
            icon.mgl-10.gray(name="enter", v-if="item.violation_id")
</template>
<script>
import paging from 'paging'
import Lv from 'component/Lv.vue'
export default {
    name: 'shop-credit-view',
    mixins: [paging],
    components: { Lv },

    ready() {
        this.showAction()
        this.$on('restore', this.showAction)
    },

    computed: {
        paging() {
            return {
                path: 'mall/shop/points',
                list: 'points'
            }
        }
    },

    methods: {
        showAction() {
            this.action('action', {label: '等级说明'}).then(() => {
                this.$router.go({name: 'shop-level', params: {id: this.$route.params.id}})
            })
        }
    }
}
</script>