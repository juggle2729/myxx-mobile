<style lang="stylus">
.bid-view
    .comment .gray
        color: #393939
</style>
<template  lang="pug">
.bid-view.bg(v-if="!$loadingRouteData")
    bid-item(:bid="bid", :status="purchase.status", :is-self="isSelf")
</template>
<script>
import Q from 'q'
import BidItem from 'component/item/Bid.vue'
export default {
    name: 'bid-view',

    components: {
        BidItem
    },

    data() {
        return {
            bid: {},
            purchase: {}
        }
    },

    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.purchase.owner.id
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`mall/bid/${to.params.id}`)
                .then(bid => {
                    this.bid = bid
                    return this.$fetch(`mall/purchase/${bid.purchase_id}`)
                }).then(purchase => {
                    this.purchase = purchase
                })
        }
    }
}
</script>
