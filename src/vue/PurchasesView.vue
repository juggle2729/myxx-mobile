<style lang="sass">
.purchases-view {
    .xxx {
        text-align: center;
        height: 200px;
        line-height: 200px;
    }
}
</style>
<template>
<div class="purchases-view">
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
    name: 'PurchasesView',
    mixins: [paging],
    components: [PurchaseItem],
    computed: {
        paging() {
            return {
                path: 'sns/users/1020/topics',
                list: 'topics'
            };
        }
    }
}
</script>
