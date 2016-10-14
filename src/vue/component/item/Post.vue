<style lang="stylus">
@import '~style/partials/var'
.post-item
    margin-bottom: 20px
    .header
        padding: 20px 16px
        .name
            color: #666666
    .pic
        width: 100%
        padding-top: 63%
        border: 2px solid white
        position: relative
        background-size: cover
        background-position: center
        background-image: url($qn + 'placeholder/img.png')
    .more
        position: absolute
        right: 0
        bottom: 0
        height: 40px
        background-color: rgba(136, 136, 136, 0.9)
        img
            height: 24px
            width: 24px
            display: block
    .desc
        padding: 28px 20px
    .interact
        height: 80px
        line-height: 60px
        > div
            -webkit-box-flex: 1
            text-align: center
</style>
<template lang="jade">
.post-item
    .header.flex
        .flex-1.flex
            avatar(:user="item.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.user.nickname}}
        icon-follow(v-if="!item.user.is_followed", :user="item.user.id", :follow="item.user.is_followed")
    .bg-light.mgv-20
        .pic(v-bg="item.cover")
            .more.white.fz-30.flex.pdh-12(v-if="item.media_num > 1")
                img.mgr-8(:src="'pic.png' | qn")
                div {{item.media_num}}
        .desc
            p.fz-30.bold {{item.title}}
            .fz-26.gray.line-clamp-2(:class="{'mgt-20': item.description}") {{item.description}}
    .interact.fz-26.flex.bdt
        icon-comment.bdr(:count="item.comment_count")
        icon-like.bdr(:target="item.post_id", type="100", :active="item.liked", :count="item.like_count")
        icon-share
</template>
<script>
export default {
    name: 'post-item',
    props: {
        item: Object
    }
}
</script>