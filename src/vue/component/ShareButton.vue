<style lang="stylus">
.share-button-component
    padding: 16px 32px 20px
    .bg-red
        height: 80px
        line-height: 80px
        border-radius: 8px
</style>
<template lang="pug">
.share-button-component(@click="gotoDownload")
    .bg-red.white.center.fz-30 {{txt}}
</template>
<script>
export default {
    name: 'ShareButton',

    props: {
        txt: {
            type: String,
            default: '下载美玉秀秀，参与评论互动'
        }
    }
}
</script>