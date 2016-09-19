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

</style>
<template lang="jade">
.tags-component.bg-white(v-if="tags && tags.length")
    .tag-title.fz-26.gray 标签
    .tags
        .tag.fz-26.center.bg(v-for="tag in tags", @click="gotoTagView(tag)") {{tag.name}}
</template>
<script>
export default {
    name: 'Tags',

    props: {
        tags: Array
    },

    methods: {
        gotoTagView(tag) {
            if(this.env.isApp) {
                this.action('tag', tag)
            } else {
                location.href = this.config.download
            }
        }
    }
}
</script>