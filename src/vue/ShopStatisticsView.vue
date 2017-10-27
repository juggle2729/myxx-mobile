<style lang="stylus">
.shop-statistics
    .shop-index
        -webkit-box-align baseline
    .items
        padding 21px 0 72px 0
    .item
        display inline-block
        width calc(100%/3)
        height 149px
        text-align center
        margin-top 51px
    .active-bottom
        height 4px
    .right-separator
        width 1px
        height 120px
        right 0
        top 0
    .tabs
        margin 0 55px
        height 80px
        border-radius 40px
        .separator
            width 1px
            height 30px
            border-color #e3e3e3
    .tab
        text-align center
        width 50%
    .weeks
        padding-bottom 55px
    .week
        margin 0 42px
        -webkit-box-pack justify
        .separator
            width 28px
            height 1px
            margin 0 22px
            &::after
                content ''
                width 12px
                height 1px
                transform translate3d(16px, -3px, 0) rotate(30deg)
                display block
                background #b3b3b3
        .original, .current, .diff
            width 60px
            text-align center
    .one-week
        margin-top 64px
    .diff
        margin-left 67px
        width 56px
    .week-separator
        height 1px
        margin 33px 42px
    .rule
        margin 53px 43px 0
        line-height 1.5
</style>
<template lang="pug">
.shop-statistics.bg-white
    .pdt-50.pdl-42.pdb-21
        .black-24.fz-30 店铺指数:
        .flex.shop-index
            .fz-60.red-e6.mgt-35 {{ statistics.shop_index.point || '暂无数据' }}
            .fz-24.red-f2.mgl-21 {{ statistics.shop_index.remark }}
        .mgt-42.gray-b3.fz-22 评估时间: {{ updateAt | date 'yyyy-mm-dd' }}
    .hr.bdv
    .items
        .item.relative(v-for="(idx, item) in indexItems", @click="index=idx")
            .fz-26.dark-6b {{ item.name }}
            .mgt-18.fz-48(:class="idx === index ? 'red-e6' : 'black-24'") {{ item.point || '-' }}
            .mgt-10.fz-22.gray-b3 {{ `满分${item.total || 100}` }}
            .active-bottom.mgt-25.bg-red-e6.mgh-26(v-if="idx === index")
            .right-separator.absolute.bdr(v-if="idx%3 !== 2")
    .mgh-20.bg-gray-f7.pdt-33.weeks.mgb-32(v-if="!lodash.isEmpty(weekData)")
        .tabs.bd-gray-e3.flex
            .tab.fz-30(:class="tab === 0 ? 'red-e6' : 'dark-6b'", @click="tab=0") 数据变化情况
            .separator.bdr
            .tab.fz-30(:class="tab === 1 ? 'red-e6' : 'dark-6b'", @click="tab=1") 计算规则
        template(v-if="tab === 0")
            .one-week.week.flex
                .fz-26.dark-6b 1周变化情况
                .flex.data
                    .original.black-24.fz-32 {{ weekData.one_week[0] || 0 }}
                    .separator.bg-gray-b3
                    .current.black-24.fz-32 {{ weekData.one_week[1] || 0 }}
                    .fz-32.diff(:class="oneWeekDataDiff === 0 ? 'black-24' : (oneWeekDataDiff > 0 ? 'green-a1' : 'red-e6')") {{ oneWeekDataDiff === 0 ? 0 : (oneWeekDataDiff > 0 ? '+' + oneWeekDataDiff : oneWeekDataDiff) }}
            .week-separator.bdt
            .four-week.week.flex
                .fz-26.dark-6b 4周变化情况
                .flex.data
                    .original.black-24.fz-32 {{ weekData.four_week[0] || 0 }}
                    .separator.bg-gray-b3
                    .current.black-24.fz-32 {{ weekData.four_week[1] || 0 }}
                    .fz-32.diff(:class="fourWeekDataDiff === 0 ? 'black-24' : (fourWeekDataDiff > 0 ? 'green-a1' : 'red-e6')") {{ fourWeekDataDiff === 0 ? 0 : (fourWeekDataDiff > 0 ? '+' + fourWeekDataDiff : fourWeekDataDiff) }}
        template(v-if="tab === 1")
            .rule.fz-24.dark-6b.mgb(v-html="calculateRule")
</template>
<script>
import rule from '../rule'
export default {
    name: 'shop-statistics-view',

    data() {
        return {
            statistics: {
                shop_index: {},
                product_index: {},
                service_index: {},
                activity_index: {},
                return_index: {},
                violation_index: {}
            },
            index: 0, // 选中的指数index
            tab: 0 // 选中的指数数据tab index
        }
    },

    computed: {
        indexItems() {
            return [
                {
                    name: '总指数',
                    key: 'shop_index',
                    point: this.statistics.shop_index.point,
                    total: 500,
                    rule: rule.storeStatistics[0]
                },
                {
                    name: '商品',
                    key: 'product_index',
                    point: this.statistics.product_index.point,
                    total: 225,
                    rule: rule.storeStatistics[1]
                },
                {
                    name: '服务',
                    key: 'service_index',
                    point: this.statistics.service_index.point,
                    total: 75,
                    rule: rule.storeStatistics[2]
                },
                {
                    name: '活跃',
                    key: 'activity_index',
                    point: this.statistics.activity_index.point,
                    total: 50,
                    rule: rule.storeStatistics[3]
                },
                {
                    name: '退货',
                    key: 'return_index',
                    point: this.statistics.return_index.point,
                    total: 50,
                    rule: rule.storeStatistics[4]
                },
                {
                    name: '违规',
                    key: 'violation_index',
                    point: this.statistics.violation_index.point,
                    total: 100,
                    rule: rule.storeStatistics[5]
                }
            ]
        },

        weekData() {
            if (!this.indexItems) return {}
            return this.statistics[this.indexItems[this.index].key]
        },

        oneWeekDataDiff() {
            return (this.weekData.one_week[1] || 0) - (this.weekData.one_week[0] || 0)
        },

        fourWeekDataDiff() {
            return (this.weekData.four_week[1] || 0) - (this.weekData.four_week[0] || 0)
        },

        calculateRule() {
            return this.indexItems[this.index].rule
        },

        updateAt() {
            return this.statistics.shop_index.update_at || Date.now()
        }
    },

    route: {
        data() {
            return this.$fetch(`mall/shop/index_detail`).then(data => {
                this.statistics = data
            })
        }
    }
}
</script>