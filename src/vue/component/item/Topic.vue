<style lang="stylus">
.topic-item
    .follow
        height: 90px
    .cover
        height: 148px
        width: 148px
</style>
<template lang="jade">
.topic-item.bg-white.pdh.pdb-24
    .follow.flex
        avatar(:user="user", :size="50")
        .mgl.fz-26.gray {{user.nickname}}关注了话题
    .content.flex.bg-light
        .img.cover.mgr(v-bg="item.entry.picture")
        div
            .fz-30.mgb-16 {{item.entry.name}}
            .fz-26.gray {{item.entry.desc}}
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
        }
    }
}
</script>