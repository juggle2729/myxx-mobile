<style lang="sass">
.send-view {
    min-height: 100%;
    .title {
        height: 72px;
        line-height: 72px;
        padding: 0 32px;
    }
    .traceNo {
        height: 86px;
        padding: 28px 32px;
        border: none;
        width: 100%;
    }
    .send {
        width: 686px;
        height: 80px;
        line-height: 80px;
        border-radius: 8px;
        margin: 50px auto 0;
    }
    ::-webkit-input-placeholder {
        padding-top: 3px;
    }
}
</style>
<template>
<div class="send-view bg-default">
    <div class="title font-26 gray">物流信息(物流公司只支持顺丰)</div>
    <input class="traceNo border-vertical font-30" type="tel" maxlength="12" placeholder="请填写顺丰物流单号" v-model="expressNo">
    <div class="send font-30 white bg-gray center" :class="{'bg-red': expressNo}" @click="send">{{isUpdate ? '更新物流' : '确认发货'}}</div>
</div>
</template>
<script>
export default {
    name: 'OrderSendView',
    data() {
        return {
            expressNo: '',
            isUpdate: false
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/order/${to.params.id}`).then((order) => {
                    this.isUpdate = order.express_no;
                    this.isUpdate && (this.expressNo = this.isUpdate);
                });
        }
    },
    methods: {
        send() {
            if(this.expressNo) {
                const params = this.isUpdate ? 'change_express' : 'send_goods';
                this.$put(`mall/order/${this.$route.params.id}/${params}`, {
                    express_no: this.expressNo
                }).then(() => {
                    this.action('back', {step: 1, refresh: true});
                });
            } else {
                this.action('toast', { text: '请输入物流单号'});
            }
        }
    }
}
</script>