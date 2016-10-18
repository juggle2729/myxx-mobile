<template lang="jade">
.comment-icon.gray
    icon(name="comment")
    span {{count || '评论'}}
</template>
<script>
import Icon from './Icon.vue'
export default {
    name: 'comment-icon',

    components: {Icon},

    props: {
        count: Number
    }
}
</script>
