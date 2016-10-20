<style lang="stylus">
@import '~style/partials/var'
.pay-channels-view
    .title
        line-height: 74px
    .pay-item
        height: 100px
        &.alipay
            &:before
                content: ''
                background: url($qn + "icon/wxpay.png")
                background-size: cover
                display: block
                width: 40px
                height: 40px
                margin-right: 24px
        .select-box
            width: 46px
            height: 46px
            background-size: cover
            background-image: url($qn + "icon/unselect.png")
        &.selected
            .select-box
                background-image: url($qn + "icon/selected.png")
    .remark
        padding: 32px 32px 50px
    p + p
        margin-top: 8px
    .button
        height: 100px
        border-radius: 6px
</style>
<template lang="jade">
.pay-channels-view.bg
    .pdl-32.gray.fz-24.title 请选择付款方式
    .pay-list
        .pay-item.alipay.flex.pdh-32.bg-white(v-for="item in channels", @click="selectPay(item)", :class="{'selected': hasSelected(item)}")
            .fz-28.flex-1 微信支付
            .select-box
    .remark.fz-26.gray.none
        p 订单金额5万以上或超过在线支付限额
        p
            span 请使用
            span.red(v-link="{name: 'pay-offline', params: {id: id}}")  其他支付方式
    .button.mgh-32.white.center.mgt-50(:class="{'bg-red': isSelected, 'bg-gray': !isSelected}", @click="sendPay()")
        span.fz-28 确认支付
        span.fz-30.mgl-22 ￥
        span.fz-30 {{price}}
</template>
<script>
import pingpp from 'pingpp-js';
export default {
    name: 'PayChannelsView',
    data() {
        return {
            id: 0,
            type: '',
            selected: '',
            channels: ['wx'],
            price: 0,
            pathMap: {
                bid: {
                    data: 'mall/purchase/{id}',
                    charge: 'mall/purchase/{id}/pay_purchase',
                    back: 'purchases'
                }
            }
        }
    },
    route: {
        data({to}) {
            const t = to.query.t;
            if(!t) {
                location.href = location.href + '&t=' + new Date().getTime();
                return;
            }

            this.selected = this.channels[0]
            this.id = to.query.id
            this.type = to.query.type
            return this.$fetch(this.pathMap[this.type].data.replace('{id}', this.id)).then(data => {
                this.price = data.pledge / 100
            })
        }
    },
    computed: {
        isSelected() {
            return !!this.selected;
        }
    },
    methods: {
        sendPay() {
            if(!this.isSelected) {
                return
            }

            this.$put(this.pathMap[this.type].charge.replace('{id}', this.id), {
                channel_type: 'wx_pub'
            }).then(data => {
                pingpp.createPayment(data.charge, (result, err) => {
                    if (result === "success") {
                        this.$router.go({name: this.pathMap[this.type].back})
                    } else if(result !== 'cancel') {
                        this.action('toast', {success: 0, text: err.msg})
                    }
                })
            })
        },
        hasSelected(code) {
            return this.selected === code
        },
        selectPay(code) {
            if(this.selected === code) {
                this.selected = ''
            } else {
                this.selected = code
            }
        }
    }
}
</script>
