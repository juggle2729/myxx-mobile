<style lang="stylus">
.tags-component
    padding: 0px 32px 10px
    font-size: 0
    .topic
        display: inline-block
        height: 60px
        line-height: 60px
        border-radius: 8px
        &:not(:last-child)
            margin-right: 20px
</style>
<template  lang="pug">
.tags-component.bg-white(v-if="tags && tags.length")
    .topic.pdh-28.mgb-18.fz-26.center.bg(v-for="tag in tags", @click="gotoTopicView(tag)") {{tag.name}}
</template>
<script>
export default {
    name: 'tags',

    props: {
        tags: Array,
        title: {
            type: Boolean,
            default: '话题'
        }
    },

    methods: {
        gotoTopicView(tag) {
            this.$router.go({name: 'tag', params: {id: tag.id}})
        }
    }
}
</script>