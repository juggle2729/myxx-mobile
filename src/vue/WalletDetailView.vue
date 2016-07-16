<style lang="sass">
.wallet-detail {
    min-height: 100%;
    .light-green {
        color: #09bb07;
    }
    .right {
        text-align: right;
    }
    .tabs {
        height: 86px;
        padding: 0 100px;
        > div {
            line-height: 86px;
            text-align: center;
            &.v-link-active {
                color: #cc3f4f;
            }
        }
    }
    .item {
        height: 110px;
        padding: 0 32px;
        .flex-1 {
            line-height: 110px;
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
        <div class="flex-1" v-link="{name: 'detail', params: {tab: 'expects'}, replace: true}">
            待结算金额
        </div>
        <div class="flex-1" v-link="{name: 'detail', params: {tab: 'bills'}, replace: true}">
            可提现金额
        </div>
    </div>
    <div class="item flex font-30 border-bottom" v-for="item in items">
        <div class="flex-1">{{item.remark}}</div>
        <div>
            <div class="font-22 gray right">{{item.create_at | date 'yyyy-m-dd'}}</div>
            <div class="red margin-top right font-36" :class="{'light-green': item.trans_amount<0}">
                <span v-if="item.trans_amount>0">+</span>{{item.trans_amount/100}}
            </div>
        </div>
    </div>
    <partial name="empty-page" v-if="isEmpty"></partial>
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
