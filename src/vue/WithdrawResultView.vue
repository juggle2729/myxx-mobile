<style lang="sass">
.cash-result {
    padding-top: 120px;
    .result {
        .icon-check-on {
            font-size: 120px;
            color: #09bb07;
            margin-bottom: 40px;
        }
        .light {
            margin: 24px 0 80px;
        }
    }
    .item {
        height: 86px;
        line-height: 86px;
        padding: 0 32px;
    }
    .button {
        width: 686px;
        height: 80px;
        line-height: 80px;
        border-radius: 8px;
        margin: 50px auto 0;
    }
}
</style>
<template>
<div class="cash-result bg-default font-30">
    <div class="result center">
        <div class="icon-check-on"></div>
        <p>您的提现申请已受理</p>
        <p class="font-26 light">预计会在1-2个工作日内到账</p>
    </div>
    <div class="item flex border-vertical bg-white">
        <div class="flex-1 gray">提现到银行卡</div>
        <div>{{info.bank_account}}</div>
    </div>
    <div class="item flex border-bottom bg-white">
        <div class="flex-1 gray">提现金额</div>
        <div>{{info.trans_amount | price}}</div>
    </div>
    <div class="button bg-red white font-30 center" @click="back">我知道了</div>
</div>
</template>
<script>
export default {
    name: 'CashResultView',
    data() {
        return {
            info: {}
        }
    },
    ready() {
        this.$on('restore', () => {
            this.action('action', {label: '常见问题'}).then(() => {
                this.$router.go({name: 'mall-help-category', params:{category: 'payment'}});
            });
        });
    },
    route: {
        data({to}) {
            return this.$get(`balance/withdraw/${to.params.id}`).then((data) => {
                this.info = data;
                this.action('action', {label: '常见问题'}).then(() => {
                    this.$router.go({name: 'mall-help-category', params:{category: 'payment'}});
                });
            });
        }
    },
    methods: {
        back() {
            this.action('back', {step: 2, refresh: true});
        }
    }
}
</script>
