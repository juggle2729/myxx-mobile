<style lang="stylus">
.bid-detail
    .auction-header-menu
        left 0
    .pd-32
        padding-left 0
    .line-clamp-2
        width 0
    .price::first-letter
        font-size 24px
</style>
<template lang="pug">
.bid-detail(:class="{'pdl-32': bids.length, 'pdt-100': !env.isApp}")
    auction-header-menu(v-if="!env.isApp",v-bind:number="goodsNumber")
    .fz-30.bdb.pd-32(v-for="bid in bids")
        .flex.fz-22.gray
            .flex-1 {{ bid.status === 'win' ? '竞拍成功' : '竞拍领先' }}
            div 出价时间: {{ bid.create_at | date 'yyyy-mm-dd HH:MM' }}
        .flex.mgt-40
            .flex-3.line-clamp-2 {{ bid.product_title }}
            .red.fz-36.flex-1.txt-right
                span.fz-24 {{ bid.status === 'win' ? '成交价' : '竞拍价' }}
                .inline-block.price {{ bid.bid_price | price }}
    empty(v-if="!bids.length")
</template>
<script>
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
export default {
    name: 'bid-detail',
    components: { AuctionHeaderMenu },

    data() {
        return {
            bids: [],
            goodsNumber: 3,
        }
    },

    route: {
        data() {
            return this.$fetch('mall/auctions/myb/bids').then(({bids}) => ({bids}))
        }
    }
}
</script>
