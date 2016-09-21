<style lang="stylus">
.share-component {
    font-size: 30px
    i {
        transform: scale(1.5)
    }
}
</style>
<template>
<div class="share-component light" @click.stop="share">
    <i class="icon-share"></i><span>分享</span>
</div>
</template>
<script>
export default {
    name: 'Share',
    methods: {
        share() {
            let {title, desc, icon, url, targets} = this.$root.shareData
            this.action('share', {title, desc, icon, url, targets})
        }
    }
}
</script>
