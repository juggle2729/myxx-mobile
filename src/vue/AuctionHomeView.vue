<style lang="stylus">
.auction-home-view
    &.has-data
        padding 100px 0
</style>
<template lang="pug">
.auction-home-view.bg(:class="{ 'has-data': !items.isEmpty }")
    tabs.bg-white(:tabs="views")
    template(v-for="item in items")
        .hr
        auction-item(:item="item")
    empty(v-if="items.isEmpty && !$root.loading")
    auction-footer-menu
</template>
<script>
import paging from 'paging'
import AuctionFooterMenu from 'component/AuctionFooterMenu.vue'
import AuctionItem from 'component/item/AuctionItem.vue'
import Tabs from 'component/Tabs.vue'
export default {
    name: 'auction-home-view',
    mixins: [ paging ],
    components: [ Tabs, AuctionItem, AuctionFooterMenu ],

    data() {
        return {
            views: {going: '拍品推荐', preview: '即将开拍', end: '历史拍品'}
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/auctions',
                list: 'auctions',
                params: {
                    filter: this.$route.query.tab || 'going'
                }
            }
        }
    },

    watch: {
        $route() {
            this.paging.params.filter = this.$route.query.tab
            this.fetch(true)
        }
    }
}
</script>