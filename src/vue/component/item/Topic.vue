<style lang="stylus">
@import '~style/partials/var'
.topic-item
    margin-bottom: 20px
    .header
        padding: 20px 16px
        .name
            color: #666666
    .content
        .pic
            width: 100%
            padding-top: 63%
            border: 2px solid white
            position: relative
            background-size: cover
            background-position: center
            background-image: url($qn + 'placeholder/img.png')
        .pic-2
            padding-top: 50%
            background-size: 50% 100%
            background-position: left top, right top
        .pic-more
            padding-top: 66%
            background-size: 65.8% 100%, 34% 49.5%, 34% 50%
            background-position: left top, right top, right bottom
        .video
            padding-top: 77%
        .activity
            display: inline-block
            margin: 0 0 32px 32px
            padding: 10px 20px
            border-radius: 26px
            background-color: #ffecea
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
    .interact
        height: 80px
        line-height: 60px
        > div
            -webkit-box-flex: 1
            text-align: center
</style>
<template lang="jade">
.topic-item
    .header.flex
        .flex-1.flex
            avatar(:user="item.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.user.nickname}}
        icon-follow(v-if="!item.user.is_followed", :user="item.user.id", :follow="item.user.is_followed")
    .content.bg-white.mgb-24.pdh-16
        .fz-30.line-clamp-2.mgb-28 {{item.content}}
        .pic.video(v-if="item.cover_type==='video'", v-bg.video="item.cover")
            .activity.red.fz-26(v-if="item.activity")
                icon(name="fire")
                span {{item.activity.name}}
        .pic(v-else, :style="{backgroundImage: imgSrc}", :class="{'pic-2': item.medias.length == 2, 'pic-more': item.medias.length >= 3}")
            .activity.red.fz-26(v-if="item.activity")
                icon(name="fire")
                span {{item.activity.name}}
            .more.white.fz-30.flex.pdh-12(v-if="item.medias.length > 3")
                img.mgr-8(:src="'pic.png' | qn")
                div {{item.medias.length}}
    .interact.fz-26.flex.bdt
        icon-comment.bdr(:count="item.comment_count || item.comment")
        icon-like.bdr(:target="item.post_id", type="30", :active="item.liked", :count="item.like_count || item.like")
        icon-share
</template>
<script>
export default {
    name: 'topic-item',
    props: {
        item: Object
    },
    computed: {
        imgSrc() {
            let src = _.chain(this.item.medias).slice(0,3).reduce((pre, item) => {
                return pre + `url(${this.config.img + item.media}), `
            }, '').trimEnd(', ')
            return _.trimEnd(src, ', ')
        }
    }
}
</script>