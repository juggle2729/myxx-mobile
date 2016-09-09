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
    .item
        height: 166px
        padding: 30px 32px
        .detail
            margin-top: 20px
            height: 64px
            .line-clamp-2
                width: 0%
                line-height: 1.2
</style>
<template lang="jade">
.wallet-detail(v-if='!$loadingRouteData')
    .tabs.flex.fz-30.bdb
        .flex-1.bdr(v-link="{name: 'detail', params: {tab: 'expects'}, replace: true}")
            | 待结算金额
        .flex-1(v-link="{name: 'detail', params: {tab: 'bills'}, replace: true}")
            | 可提现金额
    .item.fz-30.bdb(v-for='item in items')
        .flex.fz-22.gray
            .flex-1 {{item.trans_desc}}
            div 结算时间 {{item.create_at | date 'yyyy-m-dd'}}
        .flex.detail
            .flex-1.line-clamp-2 {{item.remark}}
            .red.fz-40.flex-1.right(v-if="$route.params.tab === 'expects'")
                | {{item.trans_amount | price}}
            .red.fz-40.flex-1.right(v-else='', :class="{'light-blue': (item.trans_amount < 0 && item.trans_type === 'sr_out_pt_in_pd_fe'), 'light-green': item.trans_amount < 0}")
                span(v-if='item.trans_amount > 0') +
                | {{item.trans_amount/100}}
    empty(v-if='isEmpty', :title="$route.params.tab === 'expects' ? '没有待结算的金额' : '没有可提现的金额'")
</template>
<script>
import Q from 'q'
export default {
    name: 'WalletDetailView',
    data() {
        return {
            isEmpty: false,
            items: {},
            expects: 0,
            bills: 0
        }
    },
    route: {
        data({to, next}) {
            if(to.params.tab === 'expects' && !this.expects) {
                this.$get('balance/expects').then((data) => {
                    this.expects = data.entries
                    this.items = this.expects
                    this.isEmpty = !this.items.length
                })
            } else if(!this.bills) {
                this.$get('balance/bills').then((data) => {
                    this.bills = data.entries
                    this.items = this.bills
                    this.isEmpty = !this.items.length
                })
            }
            this.items = (to.params.tab === 'expects') ? this.expects : this.bills
            next()
        }
    }
}
</script>
