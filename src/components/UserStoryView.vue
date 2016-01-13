<template>
<div class="user-story bg-default">
    <story-list :items="items"></story-list>
    <div v-if="total" class="loadmore center font-22 gray padding-vertical border-top">
        <img v-if="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
    <empty-page v-else title="你还没有话题"></empty-page>
</div>
</template>
<script>
import StoryList from './StoryList.vue';
import EmptyPage from './EmptyPage.vue';
export default {
    name: 'UserStoryView',
    data() {
        return {
            userId: 0,
            items: [],
            hasMore: true,
            hasNew: false,
            loading: true,
            total: 0
        };
    },
    components: {
        StoryList,
        EmptyPage
    },
    route: {
        data() {
            this.userId = this.$route.params.id;
            return this.fetch();
        }
    },
    events: {
        scrollToBottom(e) {
          this.fetch();
        }
    },
    methods: {
        fetch: (function() {
            const limit = 3;
            return function() {
                let offset = this.items.length;
                if(this.loading) {
                    this.loading = false;
                    const params = {offset, limit};
                    return this.$get('sns/users/'+ this.userId +'/topics', params)
                        .then((data) => {
                            this.total = data.total;
                            this.items.splice(this.items.length, 0, ...data.topics);
                            this.loading = true;
                            if (data.topics.length < limit || offset + limit >= this.total) {
                                this.hasMore = false;
                                this.loading = false;
                            }
                        });
                }
            }
        })(),
        coverflow(story, index) {
            let ids = story.medias
                        .filter(media => media.type==='picture')
                        .map(media => media.id);
            this.action('coverflow', {ids, index});
        }
    }
}
</script>
<style lang="sass">
.user-story {
    height: 100%;
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
            padding-top: percentage(1/3);
            border: thick solid white;
            background-size: cover;
            background-position: center;
        }
        .media:first-child:nth-last-child(4) ~ .media:nth-of-type(2) {
            margin-right: percentage(1/3);
        }
        .unique {
            width: 100%;
            padding-top: 60%;
            background-size: cover;
            background-position: center;
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
