<style lang="stylus">
.bzone-purchases
    padding-bottom: 98px
    .fixed-header
        position: fixed
        width: 100%
        top: 100px
        z-index: 9
    .purchase-btn
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        text-align: center
        .fz-30
            padding: 24px 0 6px
        .fz-22
            color: #ffb3bc
</style>
<template lang="jade">
.bzone-purchases
    .placeholder-notice(v-if="$parent.firstVisit")
    .fixed-header
        .placeholder-notice(v-if="$parent.firstVisit")
    template(v-for="item in items")
        .hr
        purchase-item(:item="item")
    empty(v-if="items.isEmpty")
    .purchase-btn.bg-red(@click="purchase()")
        .white.fz-30 我要调货
        .fz-22 (只展示在商户专区)
</div>
</template>
<script>
import Q from 'q'
import paging from 'paging'
import PurchaseItem from 'component/PurchaseItem.vue'
export default {
    name: 'BPurchases',
    mixins: [paging],
    components: [PurchaseItem],
    computed: {
        paging() {
            return {
                path: 'mall/all_purchases',
                params: {
                    is_tob: true
                }
            }
        }
    },

    methods: {
        purchase() {
            Q.promise(resolve => {
                if(this.self) {
                    resolve()
                } else {
                    this.action('login').then(resolve)
                }
            }).then(() => {
                this.action('newDemand')
            })
        }
    }
}
</script>
