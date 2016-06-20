<style lang="sass">
.evaluations-view {}
</style>
<template>
<div class="evaluations-view">
    <div v-for="item in items">
        <div class="separator"></div>
        <evaluation-item :item="item"></evaluation-item>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import EvaluationItem from './component/EvaluationItem.vue';
export default {
    name: 'EvaluationsView',
    mixins: [paging],
    components: {
        EvaluationItem
    },
    computed: {
        paging() {
            return {
                path: 'sns/jianbao|v4',
                list: 'jianbaos',
                id: 'post_id',
                params: {
                    limit: 10
                }
            }
        }
    },
    ready() {
        this.fetch();
    }
}
</script>
