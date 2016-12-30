<style lang="stylus">
.pay-offline-view
    .instruction
        .tip
            margin: 50px 0
            line-height: 1.4
        .contact
            margin-bottom: 40px
            img
                width: 80px
                height: 80px
    .title
        height: 90px
        line-height: 90px
    .content
        .item :first-child
            width: 164px
        .address
            -webkit-box-align: start
    .operation
        padding: 50px
        p
            line-height: 1.3
            margin-bottom: 50px
        .button
            border-radius: 6px
            height: 72px
            line-height: 72px
</style>
<template lang="jade">
    .pay-offline-view
        .instruction.center
            .tip.fz-32 大额支付支持银行转账交易<br>请联系客服
            .contact.flex
                .flex-1.bdr.fz-26.gray(@click.stop="action('kf', {order: order.order_no})")
                    img.margin-bottom(:src="'service/online.svg' | qn", alt="online-service")
                    .mgt-24 在线客服
                .flex-1.fz-26.gray
                    a(href="tel:4000587266")
                        img.margin-bottom(:src="'service/tel.svg' | qn", alt="tel-service")
                        .mgt-24 电话客服
        .hr
        .accout.mgl-32.pdr-32
            .title.bdb.fz-30 官方唯一对公账户
            .content.pdv-24.fz-26
                .item.flex
                    div 户名
                    div 南京美玉秀秀网络科技有限公司
                .item.flex.mgt-24
                    div 账号
                    div 10100501040009603
                .item.flex.mgt-24
                    div 开户行
                    div 南京农行云南路支行
                .gray.fz-26.mgt-32.user-txt 重要提示：切勿转账其他账号！转账完成，截图给客服小秀，会通知商家尽快发货
        .hr
        .order.mgl-32.pdr-32
            .title.bdb.fz-30 订单详情
            .content.pdv-24.fz-26
                .item.flex
                    div 订单金额
                    .red {{order.trans_amount | price}}
                .item.flex.mgt-24
                    div 订单编号
                    div {{order.order_no}}
                .item.flex.mgt-24.address
                    div 收货详情
                    div
                        div {{order.receiver_name}}
                        .pdt-8 {{order.receiver_phone}}
                        .pdt-8 {{order.receiver_address}}
        .hr
        .operation.fz-26.gray
            p 转账时请备注您的联系电话，我们收到货款后会第一时间与您确认后续事宜。
            .flex
                .mgr.button.flex-1.bd-gray.center(@click="action('orderDetail', {id: order.order_no})") 订单详情
                .button.flex-1.bd-gray.center(@click.stop="action('mall')") 回首页
</template>
<script>
    export default {
        name: 'pay-offline-view',
        data() {
            return {
                order: {}
            }
        },
        route: {
            data({to}) {
                return this.$fetch(`mall/order/${to.params.id}`).then((order) => {
                    this.order = order
                })
            }
        }
    }
</script>