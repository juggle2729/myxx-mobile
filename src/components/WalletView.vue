<style lang="sass">
.purse {
    min-height: 100%;
    .item {
        height: 166px;
        padding: 33px 32px 0;
        .red {
            margin-top: 30px;
        }
    }
    .button {
        width: 686px;
        height: 80px;
        line-height: 80px;
        border-radius: 8px;
        margin: 50px auto 0;
    }
    .tip {
        width: 648px;
        margin: 38px auto;
        line-height: 40px;
    }
    .rule {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
    }
}
</style>
<template>
<div class="purse bg-default">
    <div class="item font-30 bg-white border-bottom">
        <div>可提现金额</div>
        <div class="red font-40">{{balance.current_amount | price}}</div>
    </div>
    <div class="item font-30 bg-white border-bottom">
        <div>待结算金额</div>
        <div class="red font-40">{{balance.expect_amount | price}}</div>
    </div>
    <div class="button bg-red white font-30 center"  v-link="{name: 'cash'}">提现</div>
    <div class="tip font-30 gray">买家付款后, 货款计入"待结算金额"；买家确认收货后的7天内没有提出退货申请,
    货款转入"可提现金额", 您可以随时提现。</div>
    <div class="rule font-30">
        <span>查看详细规则<span class="icon-enter gray font-30"></span></span>
    </div>
</div>
</template>
<script>
export default {
    name: 'PurseView',
    data() {
        return {
            balance: {}
        }
    },
    ready() {
        this.$on('restore', () => {
            this.action('action', {label: '明细'}).then(() => {
                this.$router.go({name: 'detail'});
            });
        });
    },
    route: {
        data() {
            return this.$get('balance/latest').then((balance) => {
                this.action('action', {label: '明细'}).then(() => {
                    this.$router.go({name: 'detail'});
                });
                this.balance = balance;
            });

        }
    }
}
</script>