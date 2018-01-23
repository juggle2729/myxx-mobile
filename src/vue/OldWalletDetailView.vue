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
        position: fixed
        z-index: 9
        width: 100%
        top: 0
        > div
            line-height: 40px
            text-align: center
            &.v-link-active
                color: #e61717
    .tabs-placeholder
        height: 100px
    .symbol
        vertical-align: 5px
    .line-clamp-2
        width: 0%
</style>
<template lang="pug">
.wallet-detail(v-if='!$loadingRouteData')
    template(v-if="hasShop")
        .tabs.flex.fz-30.bdb.bg-white
            .flex-1.bdr(v-link="{name: 'detail', params: {tab: 'expects'}, replace: true}")
                | 交易中
            .flex-1.bdr(v-link="{name: 'detail', params: {tab: 'withdraws'}, replace: true}")
                | 已提现
            .flex-1(v-link="{name: 'detail', params: {tab: 'bills'}, replace: true}")
                | 总流水
        .tabs-placeholder
    .fz-30.bdb.pd-32(v-for='item in items',  track-by="$index")
        .flex.fz-22.gray
            .flex-1 {{item.trans_desc}}
            div(v-if="expect && item.expect_at") {{timeTip}} {{item.expect_at | date 'yyyy-m-dd HH:MM'}}
            div(v-if="!expect") {{timeTip}} {{item.create_at | date 'yyyy-m-dd HH:MM'}}
        .flex.mgt-40
            .flex-3.line-clamp-2(:class="{'light-green': item.remark === '等待银行处理'}") {{item.remark}}
            .red.fz-40.flex-1.right(v-if="expect || $route.params.tab === 'withdraws'")
                | {{item.trans_amount | price}}
            .red.fz-40.flex-1.right(v-else, :class="{'light-blue': (item.trans_amount < 0 && item.trans_desc === '手续费'), 'light-green': item.trans_amount < 0}")
                template(v-if="item.trans_amount > 0")
                    span.symbol +
                    span {{item.trans_amount | price}}
                template(v-else)
                    span.symbol -
                    span {{-item.trans_amount | price}}
    empty(v-if='isEmpty')
</template>
<script>
export default {
    name: 'wallet-detail-view',

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
        hasShop() {
            return this.env.version < 3.3 || _.get(this, 'self.shop_id') || _.get(this, 'self.shopId')
        },

        tab() { // 当前tab
            const routeTab = this.$route.params.tab === 'records' ? 'bills' : this.$route.params.tab // 对records做特殊处理
            return ['expects', 'withdraws', 'bills'].indexOf(routeTab) !== -1 ? routeTab : 'expects'
        },

        expect() {
            return this.$route.params.tab === 'expects'
        },

        timeTip() {
            return this.expect ? '可提现时间：' : (this.$route.params.tab === 'withdraws' ? '提现时间：' : '结算时间：')
        }
    },

    route: {
        data({to, next}) {
            if(!this[this.tab]) { // 仅第一次访问该tab的时候获取数据
                return this.$fetch(`balance/${this.tab}?offset=0&limit=10`).then(resp => {
                    this.items = resp.entries
                    this[this.tab] = this.items
                    this.isEmpty = this.items.length === 0
                })
            } else {
                this.items = this[this.tab]
                this.isEmpty = this.items.length === 0
                next()
            }
        }
    },

    events: {
        scrollToBottom(e) {
            const offset = this.items.length
            if(offset) { // tab已经初始化
                return this.$fetch(`balance/${this.tab}?offset=${offset}&limit=10`).then(resp => {
                    this.items = this.items.concat(resp.entries)
                })
            }
        }
    }
}
</script>
