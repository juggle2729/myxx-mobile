<style lang="sass">
.wallet-detail {
    min-height: 100%;
    .light-green {
        color: #09bb07;
    }
    .light-blue {
        color: #5b99ee;
    }
    .right {
        text-align: right;
    }
    .tabs {
        height: 100px;
        padding: 0 100px;
        > div {
            line-height: 40px;
            text-align: center;
            &.v-link-active {
                color: #cc3f4f;
            }
        }
    }
    .item {
        height: 166px;
        padding: 30px 32px;
        .detail {
            margin-top: 20px;
            height: 64px;
            .omit-2 {
                width: 0%;
                line-height: 1.2;
            }
        }
    }
    .empty-page {
        margin-top: 50%;
    }
}
</style>
<template>
<div class="wallet-detail" v-if="!$loadingRouteData">
    <div class="tabs flex font-30 border-bottom">
        <div class="flex-1 border-right" v-link="{name: 'detail', params: {tab: 'expects'}, replace: true}">
            待结算金额
        </div>
        <div class="flex-1" v-link="{name: 'detail', params: {tab: 'bills'}, replace: true}">
            可提现金额
        </div>
    </div>
    <div class="item font-30 border-bottom" v-for="item in items">
        <div class="flex font-22 gray">
            <div class="flex-1">{{item.trans_desc}}</div><div>{{item.create_at | date 'yyyy-m-dd'}}</div>
        </div>
        <div class="flex detail">
            <div class="flex-1 omit-2">{{item.remark}}</div>
            <div class="red font-40 flex-1 right" :class="{'light-blue': (item.trans_amount < 0 && item.trans_type === 'sr_out_pt_in_pd_fe'), 'light-green': item.trans_amount < 0}">
                <span v-if="item.trans_amount > 0">+</span>{{item.trans_amount/100}}
            </div>
        </div>
    </div>
    <empty v-if="isEmpty" :title="$route.params.tab === 'expects' ? '没有待结算的金额' : '没有可提现的金额'"></empty>
</div>
</template>
<script>
import Q from 'q';
export default {
    name: 'WalletDetailView',
    data() {
        return {
            isEmpty: false,
            items: {}
        }
    },
    route: {
        data({to}) {
            const tab = to.params.tab;
            return this.$get(`balance/${tab}`).then((data) => {
                this.items = data.entries;
                this.isEmpty = (data.total === 0);
            });
        }
    }
}
</script>
