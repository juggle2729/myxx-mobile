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
        >div {
            width: 50%;
            text-align: center;
            padding-top: 28px;
            .dash {
                width: 180px;
                height: 4px;
                margin: 10px auto 0;
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
}
</style>
<template>
<div class="wallet-detail" v-if="!$loadingRouteData">
    <div class="tabs flex font-30 border-bottom">
        <div @click="toggle">
            <div :class="{'red': expect}">待结算金额</div>
            <div class="dash bg-red" :class="{'bg-white': !expect}"></div>
        </div>
        <div @click="toggle">
            <div :class="{'red': !expect}">可提现金额</div>
            <div class="dash bg-red" :class="{'bg-white': expect}"></div>
        </div>
    </div>
    <div class="item flex font-30 border-bottom" v-for="item in items">
        <div class="flex-1">{{item.remark}}</div>
        <div>
            <div class="font-22 gray right">{{item.create_at | date 'yyyy-m-dd'}}</div>
            <div class="red margin-top right font-36" :class="{'light-green': item.trans_amount<0}">
                <span v-if="item.trans_amount>0">+</span>{{item.trans_amount}}
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Q from 'q';
export default {
    name: 'WalletDetailView',
    data() {
        return {
            expect: true,
            bill: false,
            items: {}
        }
    },
    route: {
        data() {
            return Q.all([this.$get('balance/expects'), this.$get('balance/bills')]).done((data) => {
                    this.expects = data[0].entries;
                    this.bills = data[1].entries;
                    this.items = this.expects;
                });
        }
    },
    methods: {
        toggle() {
            this.expect = !this.expect;
            this.items = this.expect ? this.expects : this.bills;
        }
    }
}
</script>