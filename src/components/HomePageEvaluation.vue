<style lang="sass">
.homepage-evaluation {
    height: 100%;
}
</style>
<template>
<div class="homepage-evaluation bg-white">
    <evaluation-list :items="items"></evaluation-list>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-if="items.isEmpty" name="empty-page"></partial>
</div>
</template>
<script>
import EvaluationList from './EvaluationList.vue';
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'HomePageEvaluation',
    mixins: [PagingMixin],
    props: {
        id: {
            type: String,
            required: true
        }
    },
    created() {
        this.fetch();
    },
    components: {
        EvaluationList
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.$route.params.id +'/jianbao',
                list: 'jianbaos'
            }
        }
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    }
}
</script>
