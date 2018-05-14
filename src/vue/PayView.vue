<style lang="stylus">
bg($key)
    background-image url('//o0x80w5li.qnssl.com/auction/' + $key + '.png')
.pay-view
    .title
        padding 28px 32px
    .quota
        padding-top 6px
    .item
        height 100px
        background-color #fff
    .wechat
        .desc
            bg(wechat)
    .balance
        .desc
            bg(balance)
    .limit
        desc
            bg(limit)
    .desc
        height 38px
        margin-left 32px
        padding-left 58px
        background-size 38px 38px
        background-position left center
        background-color #fff
    .icon
        width 108px
        height 48px
    .invalid
        opacity 0.6
    .confirm
        height 90px
        justify-content center
        border-radius 8px
</style>
<template lang="pug">
.pay-view.bg(@touchstart="touchStart($event)")
    .title.fz-26.gray 请选择付款方式
    .flex.item.bdb.wechat.fz-30.black(@click="onSelect('wx_pub')")
        .desc.fz-30.black.flex 微信支付
        .flex-1
        icon.pdh-30(:name="payType === 'wx_pub' ? 'checked' : 'uncheck'")
    .flex.item.bdb.balance(:class="{ invalid: !validBalance }", @click="onSelect('balance')")
        .desc.fz-30.black.flex 余额支付
        .quota.fz-22.gray （剩余{{ balance | price}}）
        .flex-1
        icon.pdh-30(:name="payType === 'balance' ? 'checked' : 'uncheck'")
    .flex.item.bdb.limit(:class="{ invalid: !validBalance }", @click="")
        .desc.fz-30.black.flex 支付限额专用
        .quota.fz-22.gray （剩余{{ balance | price}}）
        .flex-1 >
    .confirm.mg-32.flex.white.bg-red(@click="pay")
        .fz-30 确认支付
        .fz-36 {{ waitPayAmount | price }}
</template>
<script>
import Q from 'q'
export default {
    name: 'pay-view',

    data() {
        return {
            balance: 0,
            payType: 'wx_pub', // 支付方式，默认为微信
            bizType: '',
            validBalance: false,
            waitPayAmount: 0,
            orderId: ''
        }
    },

    beforeDestroy() {
        this.$store.remove('selectedAddress')
    },

    computed: {
        isAuctionMargin() {
            return this.bizType === this.config.payBizType.auction
        },
        isOrder() {
            return this.bizType === this.config.payBizType.order
        }
    },

    methods: {
        onSelect(payType) {
            if (!this.validBalance) {
                return
            }
            this.payType = payType
        },

        pay() {
            Q.resolve((() => {
                if (this.isAuctionMargin) {
                    return this.$post(`mall/auctions/myb/pay_margin`, {
                        channel_type: this.payType,
                        amount: this.waitPayAmount
                    })
                } else if (this.isOrder) {
                    const addressInfo = this.$store.get('selectedAddress')
                    return this.$put(`mall/order/${this.$route.query.id}/pay_order`, {
                        channel_type: this.payType,
                        receiver_name: addressInfo ? addressInfo.name: '',
                        receiver_phone: addressInfo ? addressInfo.phone: '',
                        receiver_address: addressInfo ? addressInfo.address: ''
                    })
                }
                return Q.reject()
            })()).then(this._payCallback.bind(this, true), this._payCallback.bind(this, false))
        },

        _payCallback(isSuccess, data) {
            if (isSuccess) {
                if (data.charge) {
                    require('pingpp-js').createPayment(data.charge, result => {
                        if (result === "success") {
                            this._doneCallback(true, true)
                        } else if (result === "fail") {
                            this._doneCallback()
                        } else if (result === "cancel") {
                            this._doneCallback(false, true)
                        }
                    })
                } else {
                    this._doneCallback(true, true)
                }
            } else {
                this._doneCallback()
            }
        },

        _doneCallback(isPaid = false, paySuccess = false) {
            if (!isPaid && paySuccess) { // 取消支付，直接回退
                this.action('back', {step: 1})
            } else {
                this.$store.set('pay_result', paySuccess)

                // check parameter
                const payData = { biz_type: this.bizType }
                this.bizType === 'auction' && (payData.m = this.$route.query.m)
                this.$route.query.id && (payData.id = this.$route.query.id)

                if (isPaid && paySuccess) {
                    this.$router.replace({name: 'pay-result', query: payData})
                } else {
                    this.$router.go({name: 'pay-result', query: payData}) // 支付失败，直接按照原路由返回
                }
            }
        }
    },

    route: {
        activate({ next }) {
            const url = location.href
            if (url.indexOf('date') === -1) {
                location.replace(url + '&date=' + Date.now())
            } else {
                next()
            }
        },
        data() {
            this.bizType = this.$route.query.t || this.config.payBizType.auction
            return Q.resolve((() => {
                if (this.isAuctionMargin) {
                    return this.$fetch(`mall/auctions/myb/margin_rule`)
                        .then(({buyer_current_amount}) => {
                        return this.$route.query.m - buyer_current_amount
                    })
                } else if (this.isOrder) {
                    return this.$fetch(`mall/order/${this.$route.query.id}`).then(order => {
                        let cashAmount = 0
                        order.pays.forEach(pay => {
                            if (pay.pay_type === 'cs') {
                                cashAmount += pay.amount
                            }
                        })
                        return cashAmount
                    })
                }
                return 0
            })()).then(waitPayAmount => {
                this.waitPayAmount = waitPayAmount
                return this.$fetch(`balance/latest`)
                    .then(({ current_amount }) => {
                        this.validBalance = current_amount > 0 && current_amount > this.waitPayAmount
                        this.validBalance && (this.payType = 'balance')
                        return { balance: current_amount }
                    })
            })
        }
    }
}
</script>