<style lang="stylus">
@import '~style/partials/var'
.post-item
    .follow
        height: 90px
    .header
        padding: 20px 20px 0
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
.post-item.bg-white(v-link="{name: 'post', params: {id: item.entry.post_id}}")
    .follow.bdb.flex.pdl(v-if="collection")
        avatar(:user="item.entry.user", :size="50")
        .mgl.fz-26.gray.flex-1 {{item.entry.user.nickname}} 添加至专辑
        .fz-26.gray.pdr(v-if="collection", v-link="{name: 'collection', params: {id: item.event.what.id}}") 前往专辑
    
    .header.flex(v-if="!collection")
        .flex-1.flex
            avatar(:user="item.entry.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.entry.user.nickname}}
        icon-follow(v-if="!item.entry.user.is_followed", :target="item.entry.user.id", :follow="item.entry.user.is_followed")
    
    .bg-light.mg
        .pic(v-bg="item.entry.cover")
            .more.white.fz-30.flex.pdh-12(v-if="item.entry.media_num > 1")
                img.mgr-8(:src="'pic.png' | qn")
                div {{item.entry.media_num}}
        .desc
            p.fz-30.bold {{item.entry.title}}
            .fz-26.gray.line-clamp-2(:class="{'mgt-20': item.entry.description}") {{{item.entry.description | input}}}
    
    .interact.fz-26.flex.bdt
        icon-like.bdr(:target="item.entry.post_id", type="rt", :active="item.entry.liked", :count="item.entry.like_count")
        icon-comment.bdr(:count="item.entry.comment_count")
        icon-share
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