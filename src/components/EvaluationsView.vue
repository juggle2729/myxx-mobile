<style lang="sass">
.evaluations-view {}
</style>
<template>
<div class="evaluations-view">
    <evaluation-list :items="items"></evaluation-list>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import EvaluationList from './EvaluationList.vue';
export default {
    name: 'EvaluationsView',
    mixins: [paging],
    components: {
        EvaluationList
    },
    computed: {
        paging() {
            return {
                path: 'sns/jianbao|v2',
                list: 'jianbaos',
                params: {
                    limit: 10
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.fetch();
        }
    }
}
</script>
