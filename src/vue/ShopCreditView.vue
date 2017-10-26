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
                border-radius 6px
        .next-level
            .level-comp
                img
                    width 90px
                    height 24px
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
            lv(:lv="shopLevel")
        .progress-bar.bg-gray-f7.mgt-50
            .real-progress.bg-red-e6
        .next-level.flex.mgt-12(v-if="shopLevel < 15")
            .fz-24.red-f2 距离下一等级还需{{ upgradeNeedPoint }}分
            .flex-1
            lv(:lv="shopLevel + 1")
    .title.center.fz-24.dark-6b — 积分明细 —
    .bdt
        .fz-30.bdb.pd-32.bg-white(v-for='item in items', v-link="item.violation_id ? {name: 'violation-detail', params: {id: item.violation_id}} : ''")
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

    data() {
        return {
            shopLevel: 1,
            upgradeNeedPoint: 0,
            realProgressPercent: ''
        }
    },

    ready() {
        this.showAction()
        this.$on('restore', this.showAction)
        this.$el.querySelector('.real-progress').style.width = `${this.realProgressPercent * 100}%`
    },

    route: {
        data() {
            return this.$fetch('mall/shop/profile').then(resp => {
                this.upgradeNeedPoint = resp.point_upgrade - resp.point
                this.shopLevel = resp.level
                this.realProgressPercent = resp.point >= 10000000 ? '1' : resp.point / resp.point_upgrade
            })
        }
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