<style lang="sass">
@import '~style/partials/var';
@import '~style/partials/mixin';
.story-item {
    .header {
        padding: 20px 16px;
        .name {
            color: #666666;
        }
    }
    .content {
        padding: 0 16px;
        .cover {
            position: relative;
            width: 100%;
            padding-top: 100%;
            background-position: center;
            &.img {
                background-size: cover;
                background-image: url('#{$qn}/placeholder/img.png');
            }
            .type {
                background-color: rgba(0, 0, 0, .8);
                border-radius: 26px;
                padding: .5em .8em;
                position: absolute;
                left: 1em;
                bottom: 1em;
            }
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
    .footer {
        height: 80px;
        line-height: 60px;
        > div {
            -webkit-box-flex: 1;
            text-align: center;
            &:not(:first-of-type) {
                @include border(left);
            }
        }
    }
}
</style>
<template>
<div class="story-item" v-link="{name: 'story', params: {id: item.post_id}}">
    <div class="header flex">
        <div class="flex-1 flex">
            <avatar :user="item.user" :is-self="false" :size="50"></avatar>
            <div class="name margin-left font-26">{{item.user.name}}</div>
        </div>
        <follow v-if="!item.user.is_followed" :user="item.user.id" :follow="item.user.is_followed"></follow>
    </div>
    <div class="content bg-white">
        <div v-if="item.cover_type==='video'" class="cover video" v-bg.video="item.cover">
            <div class="type font-26">{{item.topic_type.name}}</div>
        </div>
        <div v-else class="cover img" v-bg="item.cover">
            <div class="type font-26 white" v-if="item.topic_type.code !== 'hd'">{{item.topic_type.name}}</div>
        </div>
        <div class="title font-30"><div class="user-input">{{item.content}}</div></div>
    </div>
    <div class="footer font-26 flex border-vertical">
        <comment :count="item.comment"></comment>
        <like :target="item.post_id" type="30" :active="item.liked" :count="item.like"></like>
        <share></share>
    </div>
</div>
</template>
<script>
import Follow from 'component/Follow.vue';
import Like from 'component/Like.vue';
import Share from 'component/Share.vue';
import Comment from 'component/Comment.vue';
export default {
    name: 'StoryItem',
    components: {
        Follow,
        Like,
        Share,
        Comment
    },
    props: {
        item: [Object]
    },
    methods: {

    }
}
</script>
