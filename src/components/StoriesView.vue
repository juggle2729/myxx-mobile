<template>
<div class="stories-view">
    <div class="tabs bg-white border-bottom">
        <div :class="{'red': tab=='time'}" @click="tab='time'" class="font-26 center">
            <div class="border-right">最新</div>
        </div>
        <div :class="{'red': tab=='popularity'}" @click="tab='popularity'" class="font-26 center">热门</div>
    </div>
    <story-list :items="items"></story-list>
    <partial name="load-more" v-show="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import StoryList from './StoryList.vue';
export default {
    name: 'StoriesView',
    mixins: [paging],
    components: {
        StoryList
    },
    data() {
        return {
            tab: 'time'
        };
    },
    computed: {
        paging() {
            return {
                path: 'sns/topics',
                list: 'topics',
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
            this.$route.router.go({name: 'stories', params: {tab}});
        });
    }
}
</script>
<style lang="sass">
.stories-view {
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
