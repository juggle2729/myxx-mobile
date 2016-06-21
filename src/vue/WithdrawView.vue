<style lang="sass">
.cash {
    .item {
        height: 86px;
        line-height: 86px;
        padding: 0 32px;
        input {
            border: 0;
            padding-left: 44px;
            width: 555px;
            font-size: 30px;
            line-height: 1;
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
        margin: 38px 0 24px;
    }
    .instruction {
        width: 648px;
        margin: 0 auto;
        p {
            line-height: 42px;
        }
    }
    ::-webkit-input-placeholder {
        color: #c6c6c6;
        padding-top: 5px;
    }
}
</style>
<template>
<div class="cash bg-default font-30">
    <div class="item font-30 border-bottom bg-white flex">
        <div>提现账户</div>
        <div><input type="text" placeholder="请输入您本人姓名" v-model="name"></div>
    </div>
    <div class="item font-30 border-bottom bg-white flex">
        <div>银行卡号</div>
        <div><input type="number" placeholder="请输入您本人的银行卡号" v-model="account"></div>
    </div>
    <div class="item font-30 border-bottom bg-white flex">
        <div>提现金额</div>
        <div><input type="number" placeholder="本次可提现{{balance | price '0'}}元" v-model="amount"></div>
    </div>
    <div class="button bg-gray white font-30 center" :class="{'bg-red': complete}" @click="withdraw">提交</div>
    <div class="tip gray center"><span class="gray">-</span>&nbsp;提现说明&nbsp;<span class="gray">-</span></div>
    <article class="instruction gray">
        <p>1. 提现平均到账日期1-2个工作日, 节假日顺延;</p>
        <p>2. 每日只能提现1次;</p>
        <p>3. 提现时会收取部分手续费, 目前此费用由美玉秀秀承担</p>
    </article>
</div>
</template>
<script>
export default {
    name: 'CashView',
    data() {
        return {
            name: '',
            account: '',
            amount: '',
            balance: ''
        };
    },
    ready() {
        this.$on('restore', () => {
            this.action('action', {label: '常见问题'}).then(() => {
                this.$router.go({name: 'instruction', params: {id: 'payment'}});
            });
        });
    },
    computed: {
        complete() {
            return this.name && this.account && this.amount;
        }
    },
    route: {
        data() {
            return this.$get('balance/latest').then((data) => {
                this.balance = data.current_amount;
                this.action('action', {label: '常见问题'}).then(() => {
                    this.$router.go({name: 'instruction', params:{id: 'payment'}});
                });
            });
        }
    },
    methods: {
        withdraw() {
            if (this.complete && this.amount <= (this.balance / 100)) {
                this.$post('balance/withdraws', {
                    name: this.name,
                    bank_account: this.account,
                    trans_amount: this.amount*100
                }).then((data) => {
                    this.$router.go({name: 'withdraw-result', params: {id: data.trans_no}});
                });
            } else if(this.amount > (this.balance / 100)) {
                this.action('toast', {text: '超过最大提现金额'});
            }
        }
    }
};
</script>
