<style lang="sass">
.card-component {
    width: 350px;
    position: relative;
    display: inline-block;
    margin-bottom: 20px;
    &:nth-child(odd) {
        margin-right: 20px;
    }
    .media {
        width: 100%;
        height: 300px;
    }
    .data-label {
        position: absolute;
        top: 0;
        background: rgba(0, 0, 0, 0.5);
        padding: 0 28px;
        line-height: 44px;
    }
    .data-info {
        position: relative;
        width: 345px;
        height: 100px;
        text-align: center;
        .data-name {
            width: 320px;
            line-height: 1.5;
            word-break: break-all;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .data-footer {
        height: 48px;
        padding-bottom: 20px;
        > div {
            -webkit-box-flex: 1;
            &:first-child {
                text-align: right;
                margin-right: 24px;
            }
            &:last-child {
                margin-left: 24px;
                text-align: left;
            }
            &:first-child:nth-last-child(1) {
                text-align: center;
            }
        }
    }
    .like-component, .comment-component {
        color: #d8d8d8;
    }
}
</style>
<template>
<div class="card-component bg-white">
    <div v-if="type === 'jb'" v-link="{name: 'evaluation', params: {id: entry.id, result: 'none'}}">
        <div class="data-label font-22 center white">求鉴宝</div>
        <div class="media img" v-bg.md="entry.picture"></div>
        <div class="data-info font-26"><div class="data-name omit-2">{{entry.description}}</div></div>
    </div>
    <div v-else v-link="{name: 'story', params: {id: entry.post_id}}">
        <div class="data-label font-22 center white">{{entry.topic_type.name}}</div>
        <div class="media img" v-bg.md="entry.cover"></div>
        <div class="data-info font-26"><div class="data-name omit-2">{{entry.content}}</div></div>
    </div>
    <div class="data-footer flex">
        <like :active="false" :count="entry.like_count" readonly=true v-if="type === 'tp'"></like>
        <comment :count="entry.comment_count"></comment>
    </div>
</div>
</template>
<script>
import Like from './Like.vue';
import Comment from './Comment.vue';
export default {
    name: 'Card',
    components: [Like, Comment],
    props: {
        entry: Object,
        type: String
    }
}
</script>
