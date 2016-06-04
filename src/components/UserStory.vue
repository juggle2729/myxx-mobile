<style lang="sass">
@import '../styles/partials/var';
.user-story {
    .item {
        padding: 0 16px 32px;
    }
    .header {
        padding: 20px 4px;
        .icon-follow-big {
            font-size: 20px;
            padding: 3px 8px 0 0;
        }
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
            background-image: url('#{$qn}/placeholder/img.png');
        }
        .title {
            color: #666666;
            height: 114px;
            position: relative;
            font-family: 'song-simple';
            text-align: center;
            margin: 0 auto;
            .user-input {
                width: 508px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                line-height: 1.5;
            }
        }
        .social {
            height: 80px;
            color: #d8d8d8;
            .icon-like-solid {
                position: relative;
                bottom: 2px;
            }
            >div {
                width: 33.3%;
                span:nth-child(2) {
                    color: #bcbcbc;
                }
            }
        }
    }
    .empty-page {
        height: 700px;
    }
}
</style>
<template>
<div class="user-story bg-default">
    <div v-for="item in items" track-by="$index" v-link="{name: 'story', params: {id: item.post_id}}" class="item">
        <div class="header flex">
            <div class="flex-1 flex">
                <avatar :user="item.user" :is-self="false" :size="50"></avatar>
                <div class="name margin-left font-26">{{item.user.name}}</div>
            </div>
            <div class="font-26 flex gray"><div class="icon-follow-big red"></div>关注</div>
        </div>
        <div class="content bg-white">
            <div v-if="item.cover_type==='video'" class="cover video" v-bg.video="item.cover"></div>
            <div v-else class="cover" v-bg="item.cover"></div>
            <div class="title font-30"><div class="user-input">{{item.content}}</div></div>
            <div class="social font-26 flex border-vertical">
                <div class="border-right center"><span class="icon-comment-solid"></span><span>{{item.comment}}</span></div>
                <div class="border-right center" :class="{'red': item.liked}"><span class="icon-like-solid"></span><span>{{item.like}}</span></div>
                <div class="center"><span class="icon-share-social"></span><span>分享</span></div>
            </div>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <partial v-if="items.isEmpty" name="empty-page"></partial>
</div>
</template>
<script>
import StoryList from './StoryList.vue';
import paging from 'paging';
import Avatar from './Avatar.vue';
export default {
    name: 'UserStory',
    mixins: [paging],
    activate(done) {
        this.fetch().then(done);
    },
    components: {
        StoryList,
        Avatar
    },
    computed: {
        paging() {
            return {
                path: 'sns/users/'+ this.$route.params.id +'/topics',
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
