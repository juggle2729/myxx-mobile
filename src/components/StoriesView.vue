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
import PagingMixin from './PagingMixin.vue';
import StoryList from './StoryList.vue';
export default {
    name: 'StoriesView',
    mixins: [PagingMixin],
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
    .item {
        padding: 24px 32px;
    }
    .user {
        display: -webkit-box;
        -webkit-box-align: center;
        .avatar {
            height: 68px;
            width: 68px;
            border-radius: 50%;
            background-size: cover;
            vertical-align: middle;
        }
        .name {
            margin-left: 20px;
            .moment {
                margin-top: 12px;
            }
        }
    }
    .desc {
        margin: 30px 0 24px;
    }
    .medias {
        .media {
            vertical-align: top;
            display: inline-block;
            width: percentage(1/3);
            padding-top: 33.3333%;
            padding-top: -webkit-calc(33.3333% - 10px);
            border: 5px solid white;
        }
        .media:first-child:nth-last-child(4) ~ .media:nth-of-type(2) {
            margin-right: percentage(1/3);
        }
        .unique {
            width: 100%;
            padding-top: 60%;
            background-size: cover;
        }
    }
}
</style>
