<style lang="sass">
.user-evaluation {
}
</style>
<template>
<div class="user-evaluation bg-white">
    <div v-for="item in items">
        <div class="separator"></div>
        <evaluation-item :item="item"></evaluation-item>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <empty v-if="items.isEmpty"></empty>
</div>
</template>
<script>
import paging from 'paging';
import EvaluationItem from './component/EvaluationItem.vue';
export default {
    name: 'UserEvaluation',
    mixins: [paging],
    components: {
        EvaluationItem
    },
    activate(done) {
        this.fetch().then(done);
    },
    computed: {
        paging() {
            return {
                path: 'sns/jianbao|v4',
                list: 'jianbaos',
                id: 'post_id',
                params: {
                    user_id: this.$route.params.id
                }
            }
        }
    }
}
</script>
