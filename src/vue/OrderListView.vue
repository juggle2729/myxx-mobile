<style lang="stylus">
.order-list-view
    &.has-data
        padding 100px 0
</style>
<template lang="pug">
.order-list-view.bg(:class="{ 'has-data': !items.isEmpty }")
    tabs(:tabs="views", :current="'all'")
    template(v-for="(index, item) in items")
        .hr
        order-item(:item.sync="item", :index="index")
    empty(v-if="items.isEmpty")
    auction-footer-menu
    download-dialog(:show.sync="showRefundOrBackHint")
        .fz-36.center 退款退货
        p.mgt-40 为了您的资金安全，退款退货需要在美玉秀秀APP内申请
        p.mgt-32.fz-26.gray-8f.special 进入APP后请使用微信登录
</template>
<script>
import Tabs from 'component/Tabs.vue'
import paging from 'paging'
import OrderItem from 'component/item/Order.vue'
import AuctionFooterMenu from 'component/AuctionFooterMenu.vue'
import DownloadDialog from 'component/DownloadDialog.vue'
export default {
    name: 'order-list-view',
    mixins: [ paging ],
    components: [ Tabs, OrderItem, AuctionFooterMenu, DownloadDialog ],

    data() {
        return {
            showRefundOrBackHint: false, // 退款退货提示
            views: {all: '全部', pay: '待付款', send: '待发货', receive: '待收货', 'done': '售后'}
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/orders',
                list: 'orders',
                params: {
                    is_seller: false,
                    search_key: '',
                    status: this.status
                }
            }
        },

        status() {
            const status = []
            switch (this.$route.query.tab) {
                case 'pay':
                    status.push(this.config.orderStatus.wait_pay, this.config.orderStatus.no_price)
                    break
                case 'send':
                    status.push(this.config.orderStatus.wait_send)
                    break
                case 'receive':
                    status.push(this.config.orderStatus.wait_goods)
                    break
                case 'done':
                    status.push(this.config.orderStatus.refund_return)
                    break
            }
            return status
        }
    },

    watch: {
        $route() {
            this.paging.params.status = this.status
            this.fetch(true)
        }
    },

    events: {
        deleteOrder(index) {
            this.items.splice(index, 1)
        },

        applyRefundOrBack() {
            this.showRefundOrBackHint = true
        }
    }
}
</script>