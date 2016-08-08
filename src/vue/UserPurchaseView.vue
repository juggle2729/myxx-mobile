<style lang="sass">
.user-purchase-view {}
</style>
<template>
<div class="user-purchase-view">
    <template v-for="item in items">
        <purchase-item :item="item"></purchase-item>
        <div class="separator"></div>
    </template>
</div>
</template>
<script>
import paging from 'paging';
import PurchaseItem from 'component/PurchaseItem.vue';
export default {
    name: 'UserPurchaseView',
    mixins: [paging],
    components: [PurchaseItem],
    computed: {
        paging() {
            return {
                path: 'mall/purchases'
            };
        }
    }
}
</script>
