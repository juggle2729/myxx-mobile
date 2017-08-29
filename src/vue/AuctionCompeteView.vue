<style lang="stylus">
.auction-compete-view
    &.has-data
        padding 120px 0 100px 0
</style>
<template lang="pug">
.auction-compete-view.bg(:class="{ 'has-data': !items.isEmpty }")
    tabs.bg-white.mgb-20(:tabs="views")
    template(v-for="(index, item) in items")
        compete-item(:item="item", :index="index")
    empty(v-if="items.isEmpty")
    auction-footer-menu
</template>
<script>
import AuctionFooterMenu from 'component/AuctionFooterMenu.vue'
import CompeteItem from 'component/item/CompeteItem.vue'
import Tabs from 'component/Tabs.vue'
import paging from 'paging'
export default {
    name: 'auction-compete-view',
    mixins: [ paging ],
    components: [ Tabs, CompeteItem, AuctionFooterMenu ],

    data() {
        return {
            views: {going: '竞拍中', remind: '参拍提醒', success: '竞拍成功', fail: '竞拍失败'}
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/auctions/myb',
                list: 'auctions',
                params: {
                    tab: this.$route.query.tab || 'going'
                }
            }
        }
    },

    watch: {
        $route() {
            this.paging.params.tab = this.$route.query.tab
            this.fetch(true)
        }
    },

    events: {
        deleteAuction(index) {
            this.items.splice(index, 1)
        }
    }
}
</script>