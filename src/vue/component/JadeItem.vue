<style lang="sass">
@import '~style/partials/var';
.jade-item {
    .header {
        padding: 20px 16px;
        .name {
            color: #666666;
        }
    }
    .content {
        padding: 0 16px;
        .cover {
            width: 100%;
            padding-top: 100%;
            background-position: center;
            position: relative;
            .type {
                position: absolute;
                background-color: #cc3f4f;
                color: white;
                top: 30px;
                right: 0;
                padding: .5em;
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
            }
        }
    }
    .footer {
        height: 80px;
        line-height: 60px;
        >div {
            -webkit-box-flex: 1;
            text-align: center;
        }
    }
}
</style>
<template>
<div class="jade-item" v-link="{name: 'jade', params: {id: item.id}}">
    <div class="header flex">
        <div class="flex-1 flex">
            <avatar :user="item.user" :is-self="false" :size="50"></avatar>
            <div class="name margin-left font-26">{{item.user.name}}</div>
        </div>
        <follow :user="item.user.id" :follow="item.user.is_followed"></follow>
    </div>
    <div class="content bg-white">
        <div class="cover video" v-bg.video="item.video">
            <div class="type font-30">商品</div>
        </div>
        <div class="title font-30"><div class="user-input omit-2">{{item.title}}</div></div>
    </div>
    <div class="footer flex border-vertical">
        <comment :count="item.comment"></comment>
        <share class="border-left"></share>
    </div>
</div>
</template>
<script>
import Comment from 'component/Comment.vue';
import Share from 'component/Share.vue';
import Follow from 'component/Follow.vue';
export default {
    name: 'JadeItem',
    components: {
        Comment,
        Share,
        Follow
    },
    props: {
        item: [Object]
    }
}
</script>
