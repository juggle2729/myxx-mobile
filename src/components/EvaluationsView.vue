<style lang="sass">
.evaluations-view {
    .tabs {
        display: -webkit-box;
        height: 80px;
        > div {
            -webkit-box-flex: 1;
            padding: 25px 0 23px;
            &:active {
                color: #cc3f4f;
            }
        }
        label {
            width: 100%;
            display: inline-block;
        }
        input {
            display: none;
        }
    }
}
</style>
<template>
<div class="evaluations-view">
    <div class="tabs bg-white border-bottom">
        <div :class="{'red': tab=='time'}" @click="tab='time'" class="font-26 center">
            <div class="border-right">最新</div>
        </div>
        <div :class="{'red': tab=='popularity'}" @click="tab='popularity'" class="font-26 center">热门</div>
    </div>
    <evaluation-list :items="items"></evaluation-list>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
import EvaluationList from './EvaluationList.vue';
export default {
    name: 'EvaluationsView',
    mixins: [PagingMixin],
    components: {
        EvaluationList
    },
    data() {
        return {
            tab: 'time'
        };
    },
    computed: {
        paging() {
            return {
                path: 'sns/jianbao',
                list: 'jianbaos',
                params: {
                    limit: 10,
                    [this.tab]: 1
                }
            }
        }
    },
    route: {
        data({to}) {
            this.tab = to.params.tab;
            return this.fetch();
        },
        canReuse() {
            return false;
        }
    },
    created() {
        this.$watch('tab', (tab) => {
            this.toggleLoading(true);
            this.$route.router.go({name: 'evaluations', params: {tab}});
        });
    }
}
</script>
