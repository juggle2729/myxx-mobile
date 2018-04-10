<style lang="stylus">
@import '~style/partials/var'
.post-item
    .follow
        height: 90px
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
        .flex
            // -webkit-box-align: start
        img.post
            display: block
            height: 30px
            width: 56px
    .like-icon
        margin-right: 66px
</style>
<template  lang="pug">
.post-item.bg-white(v-link="{name: 'post', params: {id: item.entry.post_id}}")
    .follow.flex.pdl(v-if="collection")
        avatar(:user="item.entry.user", :size="50")
        .mgl.fz-26.gray.flex-1 {{item.entry.user.nickname}} 添加至专辑

    .pdt-28.pdh.flex(v-if="!collection")
        .flex-1.flex
            avatar(:user="item.entry.user", :is-self="false", :size="50")
            .dark.mgl.fz-26 {{item.entry.user.nickname}}

    .mgh.mgb-28(:class="{'mgt-24': !collection}")
        .pic(v-bg="item.entry.cover")
            .more.white.fz-30.flex.pdh-12(v-if="item.entry.media_num > 1")
                img.mgr-8(:src="'pic.png' | qn")
                div {{item.entry.media_num}}
        .desc.pdt-24
            .flex
                img.post(:src="'article.png' | qn")
                .pdl-10.fz-30.bold.flex-1.user-txt.line-clamp-2 {{item.entry.title}}
            .fz-26.gray.line-clamp-2.user-txt(:class="{'mgt-20': item.entry.description}") {{{item.entry.description | content | input}}}

    .line-height-98.fz-26.flex.bdt.pdh-32
        icon-like(:active="item.entry.liked", :count="item.entry.like_count")
        icon-comment(:count="item.entry.comment_count", :id="item.entry.post_id", type="rt")
</template>
<script>
export default {
    name: 'post-item',

    props: {
        item: Object
    },

    computed: {
        collection() {
            return _.get(this, 'item.event.action') === 'us_add_cl_obj'
        }
    }
}
</script>