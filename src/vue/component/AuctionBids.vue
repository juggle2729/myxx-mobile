<style lang="stylus">
@import '~style/partials/var'
@keyframes fresh
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
.auction-bids
    .title
        line-height 80px
    .empty
        height 130px
        padding-top 104px
        background url($qn + 'auction/bid-empty.png') no-repeat center top
        background-size 88px 84px
    .icon-enter
        width 14px
        height 24px
        transform translateY(-2px)
    .auction-bid-item:last-child
        margin-bottom 28px
    .update-btn
        -webkit-box-pack center
    .update-icon
        width 26px
        height @width
        background url($qn + 'auction/update.png') no-repeat center
        background-size 100%
        &.fresh
            animation fresh 0.8s
</style>
<template lang="pug">
.auction-bids.fz-26
    .flex.bdb.mgl-32(@click="seeMore")
        .title.gray 出价记录
        .flex-1
        .bid-times.fz-26.gray.mgr-16(v-if="items.total > 0") {{ items.total }}次出价
        icon.mgr-32.gray(name="enter", v-if="showMore")
    .bid-records
        template(v-for="item in items")
            auction-bid-item(:item="item", :index="$index", :status="status")
    template(v-if="items.isEmpty")
        .mgv-48.fz-26.light.center.empty(v-if="status === 'preview'") 拍卖尚未开始
        .mgv-48.fz-26.light.center.empty(v-else) 暂时没有人出价
    template(v-if="!items.isEmpty && $route.name === 'auction'")
        .update-btn.line-height-100.bdt.flex(@touchstart="refreshBid")
            .update-icon(:class="freshStyle")
            .fz-26.red.mgl-12 点击刷新出价
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

    data() {
        return {
            freshStyle: ''
        }
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
                loading: false,
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
        },

        refreshBid() {
            this.freshStyle = 'fresh'
            setTimeout(() => this.freshStyle = '', 800) // 时间和动画时间保持一致

            this.fetch(true).then(() => {
                this.$dispatch('refreshPrice', this.items[0].bid_price)
            })
        }
    }
}
</script>