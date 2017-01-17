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
            padding-top: 66%
            border: 2px solid white
            position: relative
            background-size: cover
            background-position: center
            background-image: url($qn + 'placeholder/img.png')
        .pic-more
            padding-top: 66%
            background-size: 65.8% 100%, 34% 49.5%, 34% 50%
            background-position: left top, right top, right bottom
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
        height: 98px
        line-height: 98px
        .like-icon
            margin-right: 66px
</style>
<template lang="jade">
.story-item.bg-white(v-link="{name: 'story', params: {id: data.post_id}}")
    .follow.flex.pdl(v-if="collection")
        avatar(:user="data.user", :size="50")
        .mgl.fz-26.gray.flex-1 {{data.user.nickname}} 添加至专辑

    .header.flex(v-if="!collection")
        .flex-1.flex
            avatar(:user="data.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{data.user.nickname}}

    .content.bg-white.mgb-24.pdh-20
        .fz-30.mgb-28.user-txt {{{data.content | content | input}}}
        .pic.video(v-if="lodash.get(data, 'medias.0.media_type')==='video'", v-bg.video="data.medias[0].media", @click="play(data.medias[0].media)")
            .activity.bg-red.white.fz-26(v-if="data.activity")
                icon(name="fire")
                span {{data.activity.name}}
        .pic(v-else, :style="{backgroundImage: imgSrc}", :class="{'pic-more': data.medias.length >= 3}")
            .activity.bg-red.white.fz-26(v-if="data.activity")
                icon(name="fire")
                span {{data.activity.name}}
            .more.white.fz-30.flex.pdh-12(v-if="data.medias.length > 1 && data.medias.length !== 3")
                img.mgr-8(:src="'pic.png' | qn")
                div {{data.medias.length}}

    .interact.fz-26.flex.bdt.pdh-32
        icon-like(:active="data.liked", :count="data.like_count")
        icon-comment(:count="data.comment_count || data.comment", :id="data.post_id", type="tp")
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
            const entry = this.item.entry || this.item
            return _.isEmpty(entry) ? { medias: [], user: {} } : entry
        }
    }
}
</script>