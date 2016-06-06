<style lang="sass">
@import '../styles/partials/var';
.story-list {
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
            background-image: url('#{$qn}/placeholder/img.png');
        }
        .title {
            color: #666666;
            text-align: center;
            margin: 0 auto;
            padding: 60px 0;
            width: 480px;
            line-height: 42px;
            font-family: 'song-simple';
            .user-input {
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                line-height: 1.5;
            }
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
<div class="story-list bg-default">
    <div v-for="item in items" track-by="$index" v-link="{name: 'story', params: {id: item.post_id}}" class="item">
        <div class="header flex">
            <div class="flex-1 flex">
                <avatar :user="item.user" :size="50"></avatar>
                <div class="name margin-left font-26">{{item.user.name}}</div>
            </div>
            <div class="moment font-22 light">{{item.create_at | moment}}</div>
        </div>
        <div class="content bg-white">
            <div v-if="item.medias[0].type==='video'" class="cover video" v-bg.video="item.medias[0].id"></div>
            <div v-else class="cover" v-bg="item.medias[0].id"></div>
            <div class="title font-30"><span class="user-input">{{item.content}}</span></div>
            <div class="social font-26">
                <div class="left border-right" :class="{'red': item.liked}"><i class="icon-like-solid"></i><span>{{item.like}}</span></div>
                <div class="right"><i class="icon-comment-solid"></i><span>{{item.comment}}</span></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Avatar from './Avatar.vue';
export default {
    name: 'StoryList',
    components: {
        Avatar
    },
    props: {
        items: {
            type: Array,
            required: true
        }
    }
}
</script>
