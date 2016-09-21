<style lang="stylus">
.card-component {
    width: 350px
    position: relative
    display: inline-block
    margin-bottom: 20px
    &:nth-child(odd) {
        margin-right: 20px
    }
    .media {
        width: 100%
        height: 350px
    }
    .data-label {
        position: absolute
        top: 0
        background: rgba(0, 0, 0, 0.5)
        padding: 0 28px
        line-height: 44px
    }
    .data-info {
        position: relative
        width: 345px
        height: 100px
        text-align: center
        .data-name {
            width: 320px
            line-height: 1.5
            word-break: break-all
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
        }
    }

    .data-footer {
        height: 48px
        padding-bottom: 20px
        > div {
            -webkit-box-flex: 1
            &:first-child {
                text-align: right
                margin-right: 24px
            }
            &:last-child {
                margin-left: 24px
                text-align: left
            }
            &:first-child:nth-last-child(1) {
                text-align: center
            }
        }
    }
    .like-component, .comment-component {
        color: #d8d8d8
    }
}
</style>
<template>
<div class="card-component bg-white">
    <div v-if="item.type === 'jb'" v-link="{name: 'evaluation', params: {id: item.entry.id, result: 'none'}}">
        <div class="data-label fz-22 center white">鉴宝</div>
        <div class="media img" v-bg.md="item.entry.picture"></div>
        <div class="data-info fz-26"><div class="data-name line-clamp-2">{{item.entry.description}}</div></div>
    </div>
    <div v-else v-link="{name: 'story', params: {id: item.entry.post_id}}">
        <div class="data-label fz-22 center white">{{item.entry.topic_type.name}}</div>
        <div v-if="item.entry.cover_type==='picture'" class="media img" v-bg.md="item.entry.cover"></div>
        <div v-else class="media img" v-bg="item.entry.cover" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/320"></div>
        <div class="data-info fz-26"><div class="data-name line-clamp-2">{{item.entry.content}}</div></div>
    </div>
    <div class="data-footer flex">
        <like :active="false" :count="item.entry.like_count" readonly=true v-if="item.type === 'tp'"></like>
        <comment :count="item.entry.comment_count"></comment>
    </div>
</div>
</template>
<script>
import Like from 'component/Like.vue'
import Comment from 'component/Comment.vue'
export default {
    name: 'card',

    components: [Like, Comment],

    props: {
        item: Object
    }
}
</script>
