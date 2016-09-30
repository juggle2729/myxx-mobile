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
    .order
        padding-left: 50px
        .item
            height: 112px
            line-height: 112px
        .customer
            padding: 36px 0
            .tel
                margin: 28px 0
            .address
                margin-right: 50px
                line-height: 1.2
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
<template lang="pug">
    .pay-offline-view
        .instruction.center
            .tip.fz-32 大额支付支持银行转账交易<br>请联系客服
            .contact.flex
                .flex-1.bdr.fz-26.gray(@click.stop="action('kf', {order: order.order_no})")
                    img.margin-bottom(:src="'service/online.svg' | qn", alt="online-service")
                    p 在线客服
                .flex-1.fz-26.gray
                    a(href="tel:4000587266")
                        img.margin-bottom(:src="'service/tel.svg' | qn", alt="tel-service")
                        p 电话客服
        .hr
        .order.fz-30
            .item.bdb 订单金额
                span.red.fz-36.mgl {{order.trans_amount | price}}
            .item.bdb 订单编号
                span.gray.mgl {{order.order_no}}
            .customer
                p {{order.receiver_name}}
                p.tel {{order.receiver_phone}}
                div.address.line-clamp-2.fz-26.gray {{order.receiver_address}}
        .hr
        .operation.fz-30
            p 转账时请备注您的联系电话，我们收到货款后会第一时间与您确认后续事宜。
            .flex
                .mgr.button.flex-1.bd-gray.center(@click="action('orderDetail', {id: order.order_no})") 订单详情
                .button.flex-1.bd-gray.center(@click.stop="action('mall')") 回首页
</template>
<script>
    export default {
        name: 'PayOfflineView',
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