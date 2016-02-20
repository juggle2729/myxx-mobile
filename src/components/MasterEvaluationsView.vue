<style lang="sass">
@import '../styles/partials/var';
.master-evaluations-view {
    .bottom-button {
        z-index: 990;
        position: fixed;
        bottom: 0;
        height: 98px;
        width: 100%;
        background-image: url('#{$qn}/share/bottom.png');
        background-size: contain;
        font-size: 32px;
        a {
            display: block;
        }
    }
    .bottom {
        width: 100%;
        height: 98px;
    }
}
</style>
<template>
<div class="master-evaluations-view">
    <evaluation-list :items="arr"></evaluation-list>
    <div class="bottom-button flex bg-red white">
        <a href="http://wx.meiyuxiuxiu.com/eval-add.html" class="flex-1 center">申请鉴宝</a>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <div class="bottom"></div>
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
