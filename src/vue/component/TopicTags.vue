<style lang="stylus">
.topic-tags-comp
    padding-bottom 20px
    font-size 0
    .tag
        display inline-block
        color #6384df
        line-height 1.6
        & + .tag
            margin-left 16px
</style>
<template lang="pug">
.topic-tags-comp.bg-white(v-if="tags && tags.length")
    .tag.fz-30(v-for="tag in tags", @click="gotoTagView(tag)") {{ '#' + tag.name + '#' }}
</template>
<script>
export default {
    name: 'topic-tags-comp',

    props: {
        tags: Array
    },

    methods: {
        gotoTagView(tag) {
            this.$router.go({name: 'tag', params: {id: tag.id}})
        }
    }
}
</script>