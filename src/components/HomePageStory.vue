<style lang="sass">
.homepage-story {
    .item {
        padding: 0 16px 32px 16px;
    }
    .header {
        padding: 20px 4px;
        .name {
            color: #666666;
        }
    }
    .content {
        .cover {
            width: 100%;
            padding-top: 100%;
            background-size: cover;
            background-position: center;
        }
        .title {
            color: #666666;
            text-align: center;
            margin: 0 auto;
            padding: 60px 0;
            width: 480px;
            line-height: 42px;
            font-family: 'song-simple';
        }
        .social {
            color: #d9d9d9;
            text-align: center;
            padding-bottom: 36px;
            > div {
                display: inline-block;
                height: 28px;
                line-height: 28px;
            }
            .left {
                padding-right: 36px;
            }
            .right {
                padding-left: 36px;
            }
        }
    }
    .empty-page {
        height: 700px;
    }
}
</style>
<template>
<div class="homepage-story bg-default">
    <div v-for="item in items" track-by="id" v-link="{name: 'story', params: {id: item.post_id}}" class="item">
        <div class="header flex">
            <div class="flex-1 flex">
                <div v-if="$route.name === 'user-profile'" class="avatar-50" v-bg.sm="item.user.photo"></div>
                <div v-else class="avatar-50" v-link="item.user | profile" v-bg.sm="item.user.photo"></div>
                <div class="name margin-left font-26">{{item.user.name}}</div>
            </div>
            <div class="moment font-22 light">{{item.create_at | moment}}</div>
        </div>
        <div class="content bg-white">
            <div class="cover" v-bg="item.cover" :class="{'video': item.cover_type==='video'}"></div>
            <div class="title font-30 user-input" v-if="item.content">{{item.content}}</div>
            <div class="social font-26">
                <div class="left border-right"><i class="icon-like"></i><span>{{item.like}}</span></div>
                <div class="right"><i class="icon-comment"></i><span>{{item.comment}}</span></div>
            </div>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-if="items.isEmpty" name="empty-page"></partial>
</div>
</template>
<script>
import StoryList from './StoryList.vue';
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'HomePageStory',
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
        StoryList
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.id +'/topics',
                list: 'topics'
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
