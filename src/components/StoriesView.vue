<template>
<div class="stories-view">
    <div class="tabs bg-white">
        <div :class="{'red': tab=='time'}" v-touch:tap="tab='time'" class="font-26 center">
            <div class="border-right">最新</div>
        </div>
        <div :class="{'red': tab=='popularity'}" v-touch:tap="tab='popularity'" class="font-26 center">热门</div>
    </div>
    <story-list :items="items"></story-list>
    <div v-show="hasMore" class="loadmore center font-22 gray padding-vertical">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
</div>
</template>
<script>
import StoryList from './StoryList.vue';
export default {
    name: 'StoriesView',
    components: {
        StoryList
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
            this.$route.router.go({name: 'stories', params: {tab}});
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
                console.debug('fetch', this.tab, offset);
                loading = true;
                const params = {[this.tab]: 1, offset, limit};
                return this.$get('sns/topics', params).then((data) => {
                        this.items.splice(this.items.length, 0, ...data.topics);
                        this.total = data.total;
                        loading = false;
                        if (data.topics.length < limit) {
                            this.hasMore = false;
                        }
                    });
            }
        })()
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
    .social {
        padding: 0 32px;
    }
    .loadmore {
        img {
            width: 120px;
            height: 68px;
        }
    }
}
</style>
