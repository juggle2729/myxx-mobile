<style lang="stylus">
.auction-bid-item
    .delay-record
        border-top-right-radius 16px
        margin-bottom 16px
    .user-pic
        width 50px
        height @width
    .result
        width 60px
        line-height 32px
</style>
<template lang="pug">
.auction-bid-item.mgt-28
    .delay-record.pdh-20.line-height-32.white.bg-gray.fz-22.inline-block(v-if="item.delay_to") 延时至{{ item.delay_to | date 'HH:MM:ss' }}结束
    .pdl-32.flex
        .user-pic.round(v-bg.sm="item.bidder.photo || 'app/avatar.png'")
        .flex.flex-1
            .fz-26.mgl-20(:class="index === 0 ? 'bold' : 'gray'") {{ item.bidder.nickname }}
            .mgl-20.fz-22.light.time {{ createAt }}
        .fz-26(:class="priceClass") {{ item.bid_price | price }}
        .fz-22.white.mgl-12.result.center(:class="resultInfo.bg") {{ resultInfo.txt }}
</template>
<script>
import dateformat from 'dateformat'
export default {
    name: 'AuctionBidItem',

    props: {
        item: Object,
        index: Number,
        status: String
    },

    computed: {
        createAt() {
            return dateformat(this.item.create_at, 'mm-dd HH:MM:ss')
        },
        priceClass() {
            if (this.index === 0) {
                return this.status === 'success' ? 'green-2e bold' : 'red bold'
            }
            return 'light'
        },
        resultInfo() {
            if (this.index === 0) {
                return {
                    bg: this.status === 'success' ? 'bg-green-2e' : 'bg-red',
                    txt: this.status === 'success' ? '胜出' : '领先'
                }
            }
            return {
                bg: 'bg-gray',
                txt: '出局'
            }
        }
    }
}
</script>