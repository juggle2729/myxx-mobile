<style lang="stylus">
.bid-detail
    .pd-32
        padding-left 0
    .line-clamp-2
        width 0
</style>
<template lang="pug">
.bid-detail(:class="bids.length ? 'pdl-32' : ''")
    .fz-30.bdb.pd-32(v-for="bid in bids")
        .flex.fz-22.gray
            .flex-1 {{ bid.status === 'win' ? '竞拍成功' : '竞拍领先' }}
            div 出价时间: {{ bid.create_at | date 'yyyy-mm-dd HH:MM' }}
        .flex.mgt-40
            .flex-3.line-clamp-2 {{ bid.product_title }}
            .red.fz-40.flex-1.txt-right
                span.fz-36 {{ bid.status === 'win' ? '成交价' : '竞拍价' }}
                span {{ bid.bid_price | price }}
    empty(v-if="!bids.length")
</template>
<script>
export default {
    name: 'bid-detail',

    data() {
        return {
            bids: []
        }
    },

    route: {
        data() {
            return this.$fetch('mall/auctions/myb/bids').then(({bids}) => ({bids}))
        }
    }
}
</script>
