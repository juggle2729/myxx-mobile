<style lang="stylus">
@import '~style/partials/mixin'
.topics-component
    padding: 0px 32px 24px
    font-size: 0
    .topic-title
        line-height: 90px
    .topic
        display: inline-block
        height: 60px
        line-height: 60px
        border-radius: 8px
        &:not(:last-child)
            margin-right: 20px
</style>
<template lang="jade">
.topics-component.bg-white(v-if="topics && topics.length")
    .topic-title.fz-26.gray(v-if="title") {{title}}
    .topics
        .topic.pdh-28.mgb-18.fz-26.center.bg(v-for="topic in topics", @click="gotoTopicView(topic)") {{topic.name}}
</template>
<script>
export default {
    name: 'Topics',

    props: {
        topics: Array,
        title: {
            type: Boolean,
            default: '话题'
        }
    },

    methods: {
        gotoTopicView(topic) {
            this.env.isApp ? this.action('DAIDING', tag) : this.$router.go({name: 'topic', params: {id: topic.id}})
        }
    }
}
</script>