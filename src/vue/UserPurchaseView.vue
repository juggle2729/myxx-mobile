<style lang="stylus">
.user-purchase-view
    .purchase-item.won
        background-image: none
</style>
<template lang="pug">
.user-purchase-view(:class="{'bg': !items.isEmpty}")
    template(v-for='item in items')
        .hr
        purchase-item(:item='item')
    empty(v-if='items.isEmpty', title='暂无求购竞标')
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
