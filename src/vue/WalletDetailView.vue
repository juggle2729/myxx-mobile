<style lang="stylus">
.wallet-detail
    min-height: 100%
    .light-green
        color: #09bb07
    .light-blue
        color: #5b99ee
    .right
        text-align: right
    .tabs
        height: 100px
        > div
            line-height: 40px
            text-align: center
            &.v-link-active
                color: #cc3f4f
    .symbol
        vertical-align: 5px
    .line-clamp-2
        width: 0%
        line-height: 1.2
</style>
<template lang="jade">
.wallet-detail(v-if='!$loadingRouteData')
    .tabs.flex.fz-30.bdb
        .flex-1.bdr(v-link="{name: 'detail', params: {tab: 'expects'}, replace: true}")
            | 交易中
        .flex-1.bdr(v-link="{name: 'detail', params: {tab: 'withdraws'}, replace: true}")
            | 已提现
        .flex-1(v-link="{name: 'detail', params: {tab: 'bills'}, replace: true}")
            | 总流水
    .fz-30.bdb.pd-32(v-for='item in items')
        .flex.fz-22.gray
            .flex-1 {{item.trans_desc}}
            div(v-if="expect && item.expect_at") {{timeTip}} {{item.expect_at | date 'yyyy-m-dd HH:MM'}}
            div(v-if="!expect") {{timeTip}} {{item.create_at | date 'yyyy-m-dd HH:MM'}}
        .flex.mgt-40
            .flex-3.line-clamp-2(:class="{'light-green': item.remark === '等待银行处理'}") {{item.remark}}
            .red.fz-40.flex-1.right(v-if="expect || $route.params.tab === 'withdraws'")
                | {{item.trans_amount | price}}
            .red.fz-40.flex-1.right(v-else, :class="{'light-blue': (item.trans_amount < 0 && item.trans_desc === '手续费'), 'light-green': item.trans_amount < 0}")
                span.symbol {{(item.trans_amount> 0) ? '+' : '-'}}
                span(v-if="item.trans_amount > 0") {{item.trans_amount | price}}
                span(v-else) {{~item.trans_amount+1 | price}}
    empty(v-if='isEmpty')
</template>
<script>
import Q from 'q'
export default {
    name: 'WalletDetailView',

    data() {
        return {
            isEmpty: '',
            items: [],
            expects: false, // 交易中tab
            withdraws: false, // 已提现tab
            bills: false // 总流水tab
        }
    },

    computed: {
        expect() {
            return this.$route.params.tab === 'expects'
        },

        timeTip() {
            return this.expect ? '可提现时间：' : (this.$route.params.tab === 'withdraws' ? '提现时间：' : '结算时间：')
        }
    },

    route: {
        data({to, next}) {
            if(!this[to.params.tab]) { // 仅第一次访问该tab的时候获取数据
                return this.$fetch(`balance/${to.params.tab}`).then((data) => {
                    this.items = data.entries
                    this[to.params.tab] = this.items
                    this.isEmpty = (this.items.length == 0)
                })
            } else {
                this.items = this[to.params.tab]
                this.isEmpty = (this.items.length == 0)
                next()
            }
        }
    }
}
</script>
