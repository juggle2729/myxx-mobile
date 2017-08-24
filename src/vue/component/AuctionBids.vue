<style lang="stylus">
.auction-bids
    .title
        line-height 80px
    .empty
        height 130px
        padding-top 104px
        background url('//o0x80w5li.qnssl.com/auction/bid-empty.png') no-repeat center top
        background-size 88px 84px
    .icon-enter
        width 14px
        height 24px
    .auction-bid-item:last-child
        margin-bottom 28px
</style>
<template lang="pug">
.auction-bids.fz-26
    .flex.bdb.mgl-32(@click="seeMore")
        .title.gray 出价记录 {{items.total || ''}}
        .flex-1
        icon.mgr-32.gray(name="enter", v-if="showMore")
    template(v-for="item in items")
        auction-bid-item(:item="item", :index="$index", :status="status")
    template(v-if="items.isEmpty")
        .mgv-48.fz-26.light.center.empty(v-if="status === 'preview'") 拍卖尚未开始
        .mgv-48.fz-26.light.center.empty(v-else) 暂时没有人出价
</template>
<script>
import paging from 'paging'
import AuctionBidItem from 'component/item/AuctionBid.vue'
export default {
    name: 'AuctionBids',
    mixins: [paging],
    components: [AuctionBidItem],

    props: {
        id: {
            type: Number,
            required: true
        },
        status: String,
        limit: Number
    },

    created() {
        this.$on('freshBids', this.fresh)
    },

    beforeDestroy() {
        this.$off('freshBids', this.fresh)
    },

    computed: {
        paging() {
            return {
                path: `mall/auctions/${this.id}/bids`,
                list: 'bids',
                auto: !this.limit,
                params: {
                    limit: this.limit
                }
            }
        },

        showMore() {
            return this.limit && this.items.total > this.limit
        }
    },

    methods: {
        seeMore() {
            if (!this.showMore) {
                return
            }
            this.$router.go({ name: 'auction-bids', params: {id: this.id, status: this.status}})
        },

        fresh() {
            this.fetch(true)
        }
    }
}
</script>