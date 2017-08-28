<style lang="stylus">
@import '~style/partials/mixin'
.download-dialog
    position fixed
    width 100%
    top 0
    bottom 0
    z-index 999
    .container
        width calc(100% - 120px)
        font-size 30px
        position absolute
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
    .content
        padding 84px 60px 60px
    .close
        top 24px
        right 24px
        width 60px
        height 60px
        background-size cover
        background-image url('//o0x80w5li.qnssl.com/auction/close.png')
    .btn
        width 100%
        line-height 120px
</style>
<template lang="pug">
.download-dialog.bg-opacity-7(v-if="show")
    .container.bg-white.black-24
        .close.absolute(@click="close")
        .content
            slot
        .btn.fz-30.red.bdt.center(@click="download") 免费下载美玉秀秀APP
</template>
<script>
export default {
    name: 'download-dialog',

    props: {
        show: {
            type: Boolean,
            required: false
        }
    },

    methods: {
        close() {
            this.show = false
        },

        download() {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meiyuxiuxiu.myxx'
        }
    }
}
</script>
