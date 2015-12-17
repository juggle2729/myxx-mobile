<style lang="sass">
.evaluation {
    .tabs {
        display: -webkit-box;
        height: 80px;
        > div {
            -webkit-box-flex: 1;
            margin: 24px 0;
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
<div class="evaluation">
    <div class="tabs">
        <div :class="{'red': tab=='time'}" class="font-26 center border-right">
            <label for="tab-time">最新</label><input name="tab" v-model="tab" type="radio" id="tab-time" value="time" />
        </div>
        <div :class="{'red': tab=='popularity'}" class="font-26 center">
            <label for="tab-popularity">热门</label><input name="tab" v-model="tab" type="radio" id="tab-popularity" value="popularity"/>
        </div>
    </div>
    <div class="separator" v-show="tab"></div>
    <evaluation-list :items="items"></evaluation-list>
    <div class="loadmore center font-22 gray padding-vertical">
        <img v-show="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
        <span v-show="!hasMore">没有了</span>
    </div>
</div>
</template>
<script>
import EvaluationList from './EvaluationList.vue';
export default {
    name: 'EvalView',
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
            this.fetch();
        },
        canReuse() {
            return false;
        }
    },
    created() {
        this.$watch('tab', (tab) => {
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
            const limit = 2;
            let loading = false;
            return function() {
                let offset = this.items.length;
                if(loading) {
                    return console.debug('skip!!!!!!!!');
                }
                console.debug('fetch', this.tab, offset);
                loading = true;
                const params = {[this.tab]: 1, offset, limit};
                return this.$http
                    .get('sns/jianbao', params, ({data}) => {
                        this.items.splice(this.items.length - 1, 0, ...data.jianbaos);
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