<style lang="stylus">
.comment-icon .icon
    height: 2em
    width: @height
</style>
<template lang="pug">
deep-link.has-icon.comment-icon.fz-26.gray
    icon(name="comment")
    span {{count || '评论'}}
</template>
<script>
import Icon from './Icon.vue'
import DeepLink from 'component/DeepLink.vue'
export default {
    name: 'comment-icon',

    components: {
        Icon,
        DeepLink
    },

    props: {
        count: Number,
        id: [Number, String],
        type: String,
        readonly: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        comment() {
            !this.readonly && (this.count ? this.$root.popup = { handler: 'comment', id: this.id, type: this.type} : this.action('toast', { text: '还没有人评论' }))
        }
    }
}
</script>
