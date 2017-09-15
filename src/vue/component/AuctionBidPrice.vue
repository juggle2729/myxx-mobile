<style lang="stylus">
@import '~style/partials/mixin'
.auction-bid-price
    flex-direction column
    position fixed
    width 100%
    top 0
    bottom 0
    z-index 999
    .mask
        width 100%
    .container
        position absolute
        left 0
        bottom 0
        width 100%
    .current
        height 100px
        .gray
            border-color #e6e6e6
    .icon-select, .icon-selected
        width 30px
        height @width
        transform translateY(-2px)
    .bid
        height 180px
        justify-content center
    .minus, .plus
        width 80px
        height 80px
        line-height 66px
        border-radius 8px
    .minus
        &::after
            content ''
            display inline-block
            width 16px
            height 2px
            margin-bottom 6px
        &.light::after
            background #c6c6c6
        &.white::after
            background #fff
    .btn
        width 100%
        line-height 100px
</style>
<template lang="pug">
.auction-bid-price.flex(v-if="show")
    .mask.flex-1.bg-opacity-7(@click="close")
    .container.bg-white
        .flex.pdh-36.current
            .flex-1.flex
                .fz-26.gray.pdr-20.bdr 当前价{{ (auction.current_price || auction.upset_price || 0) | price }}
                .fz-26.gray.pdl-20 加价幅度{{ auction.bid_increment | price }}
            .line-height-100.flex.fz-26(@click="toggleAnonymous")
                icon(:name="isAnonymous ? 'selected' : 'select'")
                .mgl-12 匿名出价
        .bid.flex.bg
            .minus.fz-40.center(:class="[canMinus ? 'white' : 'light', canMinus ? 'bg-red' : 'bg-white']", @click="togglePrice(false)")
            .fz-40.red.mgh-48 {{ (bidPrice || initPrice) | price }}
            .plus.white.bg-red.fz-40.center(@click="togglePrice(true)") +
        .btn.fz-34.red.center(@click="confirmBid") 确定出价
</template>
<script>
export default {
    name: 'auction-bid-price',

    data() {
        return {
            bidPrice: 0,
            isAnonymous: false
        }
    },

    props: {
        show: {
            type: Boolean,
            required: false
        },
        auction: {
            type: Object,
            required: true
        }
    },

    computed: {
        initPrice() {
            return this.auction.current_price ? this.auction.current_price + this.auction.bid_increment : this.auction.upset_price
        },

        canMinus() {
            return this.bidPrice > this.initPrice
        }
    },

    ready() {
        this.isAnonymous = this.$store.get('isAnonymous') || false
    },

    methods: {
        close() {
            this.show = false
        },

        confirmBid() {
            const bid_price = this.bidPrice || this.initPrice
            this.action('confirm', {
                text: '确认出价？',
                labels: ['取消', '确定']
            }).then((choice) => {
                if (choice === '1') {
                    this.$fetch(`mall/auctions/myb/margin_rule`).then(marginRules => {
                        // 用户选取的出价大于其可用额度时跳转缴纳保证金页面
                        if(marginRules.over_amount &&
                            marginRules.over_amount - marginRules.auction_used_amount < bid_price) {
                            this.$router.go({
                                name: 'pay-margin',
                                query: {
                                    id: this.auction.id,
                                    b: bid_price
                                }
                            })
                        } else {
                            this.$post(`mall/auctions/myb/${this.auction.id}/bids`, {
                                bid_price,
                                is_anonymous: this.isAnonymous
                            }).then(() => {
                                this.show = false
                                this.$dispatch('bidDone', bid_price)
                                this.$store.set('isAnonymous', this.isAnonymous)
                                this.action('toast', {
                                    success: 1,
                                    text: '出价成功'
                                })
                            })
                        }
                    })
                }
            })
        },

        togglePrice(isAdd) {
            if (!this.bidPrice) {
                this.bidPrice = this.initPrice
            }
            isAdd ? (this.bidPrice = this.bidPrice + this.auction.bid_increment) :
                (this.canMinus && (this.bidPrice = this.bidPrice - this.auction.bid_increment))
        },

        toggleAnonymous() {
            this.isAnonymous = !this.isAnonymous
        }
    }
}
</script>