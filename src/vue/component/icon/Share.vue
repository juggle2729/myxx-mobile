
<template lang="jade">
.share-icon.fz-30.gray(@click.stop="action('share', lodash.pick(this.$root.shareData, 'title', 'desc', 'icon', 'url'))")
    icon(name="share")
    span 分享
</template>
<script>
import Icon from './Icon.vue'
export default {
    name: 'share-icon',

    components: {Icon}
}
</script>
