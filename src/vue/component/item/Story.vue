<style lang="stylus">
@import '~style/partials/var'
.story-item
    .follow
        height: 90px
    .header
        padding: 20px
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
            padding: 10px 20px
            border-radius: 26px
            position: absolute
            left: 32px
            bottom: 32px
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
.story-item.bg-white(v-link="{name: 'story', params: {id: data.post_id}}")
    .follow.bdb.flex.pdl.mgb(v-if="collection")
        avatar(:user="data.user", :size="50")
        .mgl.fz-26.gray.flex-1 {{data.user.nickname}} 添加至专辑
        .fz-26.gray.pdr(v-if="collection", v-link="{name: 'collection', params: {id: item.event.what.id}}") 前往专辑
    
    .header.flex(v-if="!collection")
        .flex-1.flex
            avatar(:user="data.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{data.user.nickname}}
        icon-follow(v-if="!data.user.is_followed", :target="data.user.id", :follow="data.user.is_followed")
    
    .content.bg-white.mgb-24.pdh-16
        .fz-30.line-clamp-2.mgb-28 {{{data.content | input}}}
        .pic.video(v-if="data.medias[0].media_type==='video'", v-bg.video="data.medias[0].media", @click="play(data.medias[0].media)")
            .activity.bg-red.white.fz-26(v-if="data.activity")
                icon(name="fire")
                span {{data.activity.name}}
        .pic(v-else, :style="{backgroundImage: imgSrc}", :class="{'pic-2': data.medias.length == 2, 'pic-more': data.medias.length >= 3}")
            .activity.bg-red.white.fz-26(v-if="data.activity")
                icon(name="fire")
                span {{data.activity.name}}
            .more.white.fz-30.flex.pdh-12(v-if="data.medias.length > 3")
                img.mgr-8(:src="'pic.png' | qn")
                div {{data.medias.length}}
    
    .interact.fz-26.flex.bdt
        icon-like.bdr(:target="data.post_id", type="tp", :active="data.liked", :count="data.like_count || data.like")
        icon-comment.bdr(:count="data.comment_count || data.comment", :id="data.post_id", type="tp")
        icon-share
</template>
<script>
export default {
    name: 'story-item',

    props: {
        item: Object
    },

    computed: {
        imgSrc() {
            let src = _.chain(this.data.medias).slice(0,3).reduce((pre, item) => {
                return pre + `url(${this.config.img + item.media}_320), `
            }, '').trimEnd(', ')
            return _.trimEnd(src, ', ')
        },

        collection() {
            return _.get(this, 'item.event.action') === 'us_add_cl_obj'
        },

        data() {
            return this.item.entry || this.item
        }
    }
}
</script>