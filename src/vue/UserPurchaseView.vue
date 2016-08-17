<style lang="sass">
.user-purchase-view {}
</style>
<template>
<div class="user-purchase-view" :class="{'bg-default': !items.isEmpty}">
    <template v-for="item in items">
        <div class="separator"></div>
        <purchase-item :item="item"></purchase-item>
    </template>
    <empty v-if="items.isEmpty" title="暂无求购竞标"></empty>
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
