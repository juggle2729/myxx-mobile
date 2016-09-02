<style lang="sass">
.bzone-purchases {
    padding-bottom: 98px;
    padding-top: 20px;
    .fixed-header {
        position: fixed;
        width: 100%;
        top: 100px;
        z-index: 9;
    }
    .purchase-btn {
        position: fixed;
        bottom: 0;
        height: 98px;
        width: 100%;
        line-height: 98px;
        text-align: center;
    }
}
</style>
<template lang="jade">
.bzone-purchases
    .placeholder-notice(v-if="$parent.firstVisit")
    .fixed-header
        .placeholder-notice(v-if="$parent.firstVisit")
        .separator-20-no
    template(v-for="item in items")
        purchase-item(:item="item")
        .separator-20-no
    empty(v-if="items.isEmpty", title="暂无调货")
    .purchase-btn.bg-red.white.font-34(@click="purchase()") 我要调货
</div>
</template>
<script>
import Q from 'q';
import paging from 'paging';
import PurchaseItem from 'component/PurchaseItem.vue';
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
            };
        }
    },

    methods: {
        purchase() {
            Q.promise(resolve => {
                if(this.self) {
                    resolve();
                } else {
                    this.action('login').then(resolve);
                }
            }).then(() => {
                this.action('newDemand');
            });
        }
    }
}
</script>
