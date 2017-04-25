<style lang="stylus">
.topic-item
    .follow
        height: 90px
    .cover
        height: 148px
        width: 148px
</style>
<template  lang="pug">
.topic-item.bg-white.pdb-24
    .follow.flex.bdb.pdh
        avatar(:user="user", :size="50")
        .mgl.fz-26.gray {{user.nickname}} 关注了话题
    .content.flex.pdt-24.pdh
        img.cover.mgr(:src="'tag.png' | qn")
        .flex-1
            .fz-30.mgb-16 {{title}}
            .fz-26.gray.user-txt.line-clamp-2 {{desc}}
</template>
<script>
export default {
    name: 'topic-item',

    props: {
        item: Object
    },

    computed: {
        user() {
            return this.$parent.$parent.profile
        },

        title() {
            return this.item.entry.name || this.item.entry.content
        },

        desc() {
            return this.item.entry.desc || this.title
        }
    }
}
</script>