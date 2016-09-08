<style lang="stylus">
.user-purchase-view {
    .purchase-item.won {
        background-image: none
    }
}
</style>
<template>
<div class="user-purchase-view" :class="{'bg': !items.isEmpty}">
    <template v-for="item in items">
        <div class="hr"></div>
        <purchase-item :item="item"></purchase-item>
    </template>
    <empty v-if="items.isEmpty" title="暂无求购竞标"></empty>
</div>
</template>
<script>
import paging from 'paging'
import PurchaseItem from 'component/PurchaseItem.vue'
export default {
    name: 'UserPurchaseView',
    mixins: [paging],
    components: [PurchaseItem],
    computed: {
        paging() {
            return {
                path: 'mall/purchases'
            }
        }
    }
}
</script>
