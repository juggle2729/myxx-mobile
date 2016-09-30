<style lang="stylus">
.comments-view
    .fake-input-placeholder
        height: 90px
        padding: 12px
    .fake-input
        position: fixed
        left: 0
        bottom: 0
        width: 100%
        height: 90px
        padding: 12px
        .emoji
            border-radius: 50%
            margin-top: 4px
            width: 60px
            height: @width
        .input
            line-height: 68px
            border-radius: 8px
            margin:0 16px 0 20px
        .submit
            line-height: 68px
            width: 140px
            border-radius: 8px
</style>
<template lang="pug">
.comments-view
    comment-list(v-ref:comments)
    .fake-input-placeholder
    .fake-input.fz-30.flex.bdt.bg-light(@click='$refs.comments.addComment()')
        img.emoji.bd-gray(:src="'emoji.svg' | qn", alt='表情')
        .input.flex-1.bg-white.light.pdh 点此处发表评论...
        .submit.center.white.bg-disable 发送
</template>
<script>
import CommentList from 'component/CommentList.vue'
export default {
    name: 'CommentsView',

    components: {
        CommentList
    }
}
</script>
