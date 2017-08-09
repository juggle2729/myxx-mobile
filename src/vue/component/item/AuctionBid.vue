<style lang="stylus">
.auction-bid-item
   .result
        width 60px
        line-height 32px
</style>
<template lang="pug">
.auction-bid-item.pdl-32.mgt-28.flex
    avatar(:user="item.bidder", :size="50")
    .flex.flex-1
        .bold.fz-26.mgl-20 {{ item.bidder.nickname }}
        .mgl-20.fz-22.light.time {{ createAt }}
    .fz-26.bold(:class="priceClass") {{ item.bid_price | price }}
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
            return dateformat(this.item.create_at, 'mm-dd hh:MM:ss')
        },
        priceClass() {
            if (this.index === 0) {
                return this.status === 'success' ? 'green-2e' : 'red'
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