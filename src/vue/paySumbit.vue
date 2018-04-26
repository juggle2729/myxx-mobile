<template>
    <div>
        <div class="right">
            <img src="//o0x80w5li.qnssl.com/pay/comment_success.png" alt="" class="mgr-10">
        </div>
        <div class="black-47 fz-40 sumbited">转账信息已提交</div>
        <div class="desc fz-28">在系统核实转账成功之前，订单状态将会保持“待支付”，系统核实后会自动更变订单状态。</div>
        <div class="paySumbitBtn fz-36" @click="action('orderDetail/{{order_id}}')">我知道了</div>
    </div>
</template>

<script>
    export default {
        name: "pay-sumbit",
        data() {
            return {
                order_id:''
            }
        },
        ready() {
            this.order_id = this.$router._currentRoute.path.slice(12,-3)
        }}
</script>

<style lang="stylus">
    .right
        margin 0 auto
        margin-top 114px
        width 100px
        height 100px
        img
            display block
            width 100%
            height 100%
    .sumbited
        text-align center
        margin-top 60px
        margin-bottom 48px
    .desc
        margin 0 auto
        width: 600px
        text-align center
        color #888
        line-height 1.4
    .paySumbitBtn
        margin 0 auto
        margin-top 74px
        width:400px
        height:80px
        color #fff
        text-align center
        line-height 80px
        background:rgba(230,23,23,1)
        border-radius: 40px
</style>