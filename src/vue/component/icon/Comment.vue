<template lang="jade">
.comment-icon.fz-30.gray(@click.stop="comment")
    icon(name="comment")
    span {{count || '评论'}}
</template>
<script>
import Icon from './Icon.vue'
export default {
    name: 'comment-icon',

    components: {Icon},

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
