<style lang="sass">
.purchases-view {
    padding-bottom: 98px;
    .purchase-btn {
        position: fixed;
        bottom: 0;
        height: 98px;
        width: 100%;
        line-height: 98px;
        text-align: center;
        font-weight: bold;
    }
}
</style>
<template>
<div class="purchases-view">
    <template v-for="item in items">
        <purchase-item :item="item"></purchase-item>
        <div class="separator"></div>
    </template>
    <empty v-if="items.isEmpty" title="暂无求购"></empty>
    <div @click="purchase()" class="purchase-btn bg-red white font-34">我要求购</div>
</div>
</template>
<script>
import Q from 'q';
import paging from 'paging';
import PurchaseItem from 'component/PurchaseItem.vue';
export default {
    name: 'PurchasesView',
    mixins: [paging],
    components: [PurchaseItem],
    computed: {
        paging() {
            return {
                path: 'mall/all_purchases'
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
                this.action('newPurchase');
            });
        }
    }
}
</script>
