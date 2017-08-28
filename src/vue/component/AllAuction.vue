<style lang="stylus">
    .empty-component
        &.empty-title
            background-position center 100px
</style>
<template lang="pug">
.all-auction.bg-gray-f7
    template(v-for="item in items")
        .hr
        auction-item(:item="item")
    empty(v-if="items.isEmpty")
    deep-link(v-if="(items.length > 0) && !items.hasMore") 打开美玉秀秀，查看更多优质拍品
</template>
<script>
import paging from 'paging'
import AuctionItem from 'component/item/AuctionItem.vue'
export default {
    name: 'all-auction',
    mixins: [ paging ],
    components: {
        AuctionItem
    },

    computed: {
        paging() {
            return {
                path: 'mall/auctions',
                list: 'auctions',
                params: {
                    shop_id: this.$route.params.id
                }
            }
        }
    }
}
</script>