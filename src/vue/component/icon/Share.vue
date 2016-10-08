<template lang="jade">
.share-icon.fz-30.gray(@click.stop="action('share', _.pick(this.$root.shareData, 'title', 'desc', 'icon', 'url'))")
    i.icon-share
    span 分享
</template>
<script>
export default {
    name: 'share-icon'
}
</script>
