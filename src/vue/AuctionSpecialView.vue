<style lang="stylus">
.auction-special-view
    .banner
        width 100%
        padding-top 56.25%
    .info
        font-size 12px
    .empty-component
        height calc(100% - 430px)
</style>
<template  lang="pug">
.auction-special-view.bg.pdb
    .banner(v-bg.lg="auctionDetail.picture")
    .info.line-height-50.white.pdh-26.flex(:class="infoBg")
        .status.fz-24 {{ auctionTime }}
        .flex-1
        .auction-number.fz-24 拍品:{{ auctionDetail.auction_count }}件
    shop(:shop="auctionDetail.shop")
    template(v-for="auction in auctionDetail.auctions")
        .hr
        auction-item(:item="auction")
    empty(v-if="!auctionDetail.auctions.length" title="专场已下架")
</template>
<script>
import Lv from 'component/Lv.vue'
import Shop from 'component/Shop.vue'
import AuctionItem from 'component/item/AuctionItem.vue'
import dateformat from 'dateformat'
import shareable from 'shareable'
export default {
    name: 'auction-special-view',
    mixins: [ shareable ],
    components: { Lv, Shop, AuctionItem },

    data() {
        return {
            auctionDetail: {
                shop: {
                    level: 1,
                    logo: '',
                    shop_name: '',
                    locale_name: '',
                    id: ''
                },
                auctions: []
            }
        }
    },

    ready() {
        this.action('updateTitle', { text: this.auctionDetail.title })
    },

    route: {
        data() {
            return this.$fetch(`mall/auctions/special/${this.$route.params.id}`)
                .then(auctionDetail => {
                    this.auctionDetail = auctionDetail
                    this.setShareData(auctionDetail)
                })
        }
    },

    computed: {
        infoBg() {
            switch (this.auctionDetail.status) {
                case 'preview':
                    return 'bg-yellow-f5'
                case 'going':
                    return 'bg-red-e6'
                case 'success':
                    return 'bg-gray-6b'
            }
        },
        auctionTime() {
            switch (this.auctionDetail.status) {
                case 'preview':
                    return `开始时间: ${dateformat(this.auctionDetail.start_time, 'mm月dd日 HH:MM')}`
                case 'going':
                    return `结束时间: ${dateformat(this.auctionDetail.real_end_time, 'mm月dd日 HH:MM')}`
                case 'success':
                    return `已结束: ${dateformat(this.auctionDetail.real_end_time, 'mm月dd日 HH:MM')}结束`
            }
        }
    }
}
</script>
