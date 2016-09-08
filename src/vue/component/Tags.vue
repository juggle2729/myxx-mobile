<style lang="stylus">
@import '~style/partials/mixin'
.tags-component
    padding: 0px 32px 24px
    font-size: 0
    .tag-title
        line-height: 90px
    .tag
        display: inline-block
        height: 60px
        line-height: 60px
        padding: 0 28px
        margin-bottom: 16px
        border-radius: 30px
        &:not(:last-child)
            margin-right: 20px
        border(a, #c6c6c6)
.nowrap
    padding-left: 0
    padding-right: 0
    .tags
        white-space: nowrap
        overflow-x: scroll
        overflow-y: hidden
        .tag
            margin-top: 40px
        .tag:first-child
            margin-left: 32px
        .tag:last-child
            margin-right: 32px
</style>
<template lang="jade">
.tags-component.bg-white(:class="{'nowrap': nowrap}", v-if="tags && tags.length")
    .tag-title.fz-26.gray(v-if="showTitle") 标签
    .tags
        .tag.fz-26.center.bg(v-for="tag in tags", v-link="{name: 'tag', params: {id: tag.id, name: tag.name}}") {{tag.name}}
</template>
<script>
export default {
    name: 'Tags',
    props: {
        tags: [Array],
        showTitle: {
            type: Boolean,
            default: true
        },
        nowrap: {
            type: Boolean,
            default: false
        }
    }
}
</script>