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
    .loadmore {
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>
<template>
<div class="evaluations-view">
    <div class="tabs bg-white border-bottom">
        <div :class="{'red': tab=='time'}" v-touch:tap="tab='time'" class="font-26 center">
            <div class="border-right">最新</div>
        </div>
        <div :class="{'red': tab=='popularity'}" v-touch:tap="tab='popularity'" class="font-26 center">热门</div>
    </div>
    <evaluation-list :items="items"></evaluation-list>
    <div v-show="hasMore" class="loadmore center font-22 gray padding-vertical">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
</div>
</template>
<script>
import EvaluationList from './EvaluationList.vue';
export default {
    name: 'EvaluationsView',
    components: {
        EvaluationList
    },
    data() {
        return {
            tab: 'time',
            items: [],
            total: 0,
            hasMore: true
        };
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
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    },
    methods: {
        fetch: (function() {
            const limit = 5;
            let loading = false;
            return function() {
                let offset = this.items.length;
                if(loading) {
                    return console.debug('skip!!!!!!!!');
                }
                loading = true;
                const params = {[this.tab]: 1, offset, limit};
                return this.$get('sns/jianbao', params).then((data) => {
                        this.items.splice(this.items.length, 0, ...data.jianbaos);
                        this.total = data.total;
                        loading = false;
                        if (data.jianbaos.length < limit) {
                            this.hasMore = false;
                        }
                    });
            }
        })()
    }
}
</script>
