<style lang="sass">
@import '~style/partials/var';
.user-story {
    .header {
        padding: 20px 16px;
        .icon-follow-big {
            font-size: 20px;
            padding: 3px 8px 0 0;
        }
        .name {
            color: #666666;
        }
    }
    .content {
        padding: 0 16px;
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
</style>
<template>
<div class="user-story">
    <div v-for="item in items" track-by="$index" v-link="{name: 'story', params: {id: item.entry.post_id}}" class="item">
        <div class="separator"></div>
        <div class="header flex">
            <div class="flex-1 flex">
                <avatar :user="item.entry.user" :is-self="false" :size="50"></avatar>
                <div class="name margin-left font-26">{{item.entry.user.name}}</div>
            </div>
            <div v-if="!item.entry.user.is_followed" class="font-26 flex gray"><div class="icon-follow-big red"></div>关注</div>
        </div>
        <div class="content bg-white">
            <div v-if="item.entry.cover_type==='video'" class="cover video" v-bg.video="item.entry.cover"></div>
            <div v-else class="cover" v-bg="item.entry.cover"></div>
            <div class="title font-30"><div class="user-input">{{item.entry.content}}</div></div>
        </div>
        <div class="social font-26 flex border-vertical">
            <div class="border-right center"><span class="icon-comment-solid"></span><span>{{item.entry.comment}}</span></div>
            <div class="border-right center" :class="{'red': item.entry.liked}"><span class="icon-like-solid"></span><span>{{item.entry.like}}</span></div>
            <div class="center"><span class="icon-share-social"></span><span>分享</span></div>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <empty v-if="items.isEmpty"></empty>
</div>
</template>
<script>
import paging from 'paging';
export default {
    name: 'UserStory',
    mixins: [paging],
    activate(done) {
        this.fetch().then(done);
    },
    computed: {
        paging() {
            return {
                path: 'sns/topics|v4',
                list: 'topics',
                id: 'entry.post_id',
                params: {
                    user_id: this.$route.params.id
                }
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
