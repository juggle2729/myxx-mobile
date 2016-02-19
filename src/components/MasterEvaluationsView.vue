<style lang="sass">
@import '../styles/partials/var';
.master-evaluations-view {
    .share-bottom {
        z-index: 990;
        position: fixed;
        bottom: 0;
        height: 98px;
        width: 100%;
        background-image: url('#{$qn}/share/bottom.png');
        background-size: contain;
        font-size: 32px;
    }
}
</style>
<template>
<div class="master-evaluations-view">
    <evaluation-list :items="arr"></evaluation-list>
    <div class="share-bottom flex bg-red white" v-link="{name: 'master-request', params: {id: this.self.id}}">
        <div class="flex-1 center bold">申请鉴宝</div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
import EvaluationList from './EvaluationList.vue';
export default {
    name: 'MasterEvaluationsView',
    mixins: [PagingMixin],
    components: {
        EvaluationList
    },
    data() {
        return {
            masterId: '',
            arr: []
        };
    },
    created() {
        this.$watch('items', (items) => {
            this.arr = this.items.filter(item => item.event_type === 'jianbao_add').map(item => item.event);
        });
    },
    computed: {
        paging() {
            return {
                path: `sites/${this.masterId}/timeline`,
                list: 'events'
            }
        }
    },
    route: {
        data({to}) {
            this.masterId = to.params.id;
            return this.fetch();
        },
        canReuse() {
            return false;
        }
    }
}
</script>
