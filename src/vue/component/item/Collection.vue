<style lang="stylus">
.collection-item
    .follow
        height: 90px
    .cover
        height: 148px
        width: 148px
</style>
<template  lang="pug">
.collection-item.bg-white
    .follow.flex.bdb.pdh
        avatar(:user="user", :size="50")
        .mgl.fz-26.gray {{user.nickname}} 关注了专辑
    .content.flex.pdv-24.pdh
        .img.cover.mgr(v-bg="item.entry.cover")
        div
            .fz-30.mgb-16 {{item.entry.name}}
            .fz-26.gray {{item.entry.author.nickname}}
</template>
<script>
export default {
    name: 'collection-item',

    props: {
        item: Object
    },

    computed: {
        user() {
            return this.$parent.$parent.profile
        }
    }
}
</script>