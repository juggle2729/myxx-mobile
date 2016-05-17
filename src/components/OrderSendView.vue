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
        line-height: 86px;
        padding: 0 32px;
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
}
</style>
<template>
<div class="send-view bg-default">
    <div class="title font-26 gray">物流信息(物流公司只支持顺丰)</div>
    <input class="traceNo border-vertical font-30" type="text" placeholder="请填写顺丰物流单号" v-model="traceNo">
    <div class="send font-30 white bg-gray center" :class="{'bg-red': traceNo}" @click="send">确认发货</div>
</div>
</template>
<script>
export default {
    name: 'OrderSendView',
    methods: {
        send() {
            if(this.traceNo) {
//                this.$put(`mall/order/${this.order.order_no}/send_goods`, {
//                    express_no: this.traceNo
//                }).then(() => {
//                    this.$router.go({name: 'order', params: { id: this.order.order_no}});
//                });
                this.action('toast', {success: '1', text: '已经发货成功!!!'});
                this.$router.go({name: 'order', params: { id: this.$route.params.id}});
            } else {
                this.action('toast', { text: '请输入物流单号'});
            }
        }
    }
}
</script>