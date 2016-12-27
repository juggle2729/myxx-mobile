<style lang="stylus">
.share-button-component
    .btn
        display: block
        padding: 16px 32px 20px
        .bg-red
            height: 80px
            line-height: 80px
            border-radius: 8px
</style>
<template lang="pug">
.share-button-component(@click="deepOpen()")
    a.btn(:href="path", target="_blank", v-if="$root.env.isIOSDeepLink")
        .bg-red.white.center.fz-30 {{txt}}
    .btn(v-else)
        .bg-red.white.center.fz-30 {{txt}}
</template>
<script>
export default {
    name: 'ShareButton',

    props: {
        txt: {
            type: String,
            default: '打开美玉秀秀，参与评论互动'
        }
    },

    computed: {
        path() {
            this.$root.deep = true
            return this.$root.env.isTest ? 'https://app.meiyuxiuxiu.com/story/70862' : location.href
        }
    }
}
</script>