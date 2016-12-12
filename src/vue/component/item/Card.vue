<style lang="stylus">
.card-component
    width: 100%
    margin-bottom: 20px
    &:nth-child(odd)
        margin-right: 20px
    .media
        width: 260px
        height: 260px
    .data-detail
        padding: 0 20px
        -webkit-box-flex: 1
        > div:first-child
            margin-bottom: 20px
        .like-icon, .comment-icon
            color: #c6c6c6
            font-size: 25px
</style>
<template lang="jade">
.card-component.bg-white.flex(v-if="item.type != 'rt'", v-link="{name: config.category[item.type], params: {id: item.entry.post_id || item.entry.id}}")
    div(v-if="jb")
        .media.img(v-bg.md="item.entry.picture")
    div(v-else)
        .media.img(v-if="item.entry.cover_type === 'video'", v-bg="item.entry.cover", query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/320")
        .media.img(v-else, v-bg.md="item.entry.cover")
    .data-detail
        .fz-30.line-clamp-4 {{jb ? item.entry.description : (item.entry.content || item.entry.title)}}
        .flex.fz-26(v-if="!jb")
            icon-like.pdr-28(:active="false", type="tp", :count="item.entry.like_count || item.entry.like", readonly=true)
            icon-comment(:count="item.entry.comment_count", readonly=true)
        .fz-24.light(v-else) {{item.entry.status}}个回答
</template>
<script>
export default {
    name: 'card',
    computed: {
        jb() {
            return this.item.type == 'jb'
        }
    },
    props: {
        item: Object
    }
}
</script>
