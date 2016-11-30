<style lang="stylus">
.share-button-component
    height: 80px
    line-height: 80px
    border-radius: 8px
</style>
<template lang="pug">
.share-button-component.bg-red.white.center.fz-30.mgh-32(@click="gotoDownload") {{txt}}
</template>
<script>
export default {
    name: 'ShareButton',

    props: {
        txt: {
            type: String,
            default: '免费下载美玉秀秀，参与评论互动'
        }
    }
}
</script>