<style lang="stylus">
.card-component
    width: 100%
    position: relative
    margin-bottom: 20px
    &:nth-child(odd)
        margin-right: 20px
    .media
        width: 260px
        height: 260px
    .data-label
        position: absolute
        top: 0
        background: rgba(0, 0, 0, 0.5)
        padding: 0 28px
        line-height: 44px
    .data-info
        position: relative
        width: 345px
        height: 100px
        text-align: center
        .data-name
            width: 320px
            line-height: 1.5
            word-break: break-all
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
    .data-detail
        padding: 0 20px
        -webkit-box-flex: 1
        > div:first-child
            margin-bottom: 20px
</style>
<template lang="jade">
.card-component.bg-white.flex(v-link="jb ? {name: 'question', params: {id: item.entry.id}} : {name: 'story', params: {id: item.entry.post_id}}")
    div(v-if="jb")
        .media.img(v-bg.md="item.entry.picture")
    div(v-else)
        .media.img(v-if="item.entry.cover_type === 'video'", v-bg="item.entry.cover", query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/320")
        .media.img(v-else, v-bg.md="item.entry.cover")
    .data-detail
        .fz-30.line-clamp-4 {{jb ? item.entry.description : (item.entry.content || item.entry.title)}}
        .flex(v-if="!jb")
            icon-like(:active="false", :count="item.entry.like_count || item.entry.like", readonly=true, v-if="item.type === 'tp'")
            icon-comment.fz-26(:count="item.entry.comment_count")
        .fz-26.light(v-else) {{item.entry.status}}个回答
</template>
<script>
export default {
    name: 'card',
    computed: {
        jb() {
            return this.item.type == 3
        }
    },
    props: {
        item: Object
    }
}
</script>
