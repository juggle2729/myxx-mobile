<style lang="stylus">
.confirm-action
    position: fixed
    &.pop-transition
        opacity: 1
        transition: opacity .3s ease
    &.pop-enter, &.pop-leave
        opacity: 0
    width: 100%
    top: 0
    bottom: 0
    z-index: 999
    background-color: rgba(0, 0, 0, .3)
    .container
        width: 620px
        margin: 0 auto
        padding-top: 40px
        border-radius: 8px
        font-size: 30px
        transform: translate3d(0, 400px, 0)
    .btns
        margin-top: 40px
        > div
            cursor: pointer
            width: 50%
            display: inline-block
            text-align: center
            padding: 1em 0
    .center
        line-height: 48px
</style>
<template lang="pug">
.confirm-action
    .container.bg
        .center {{params.text}}
        .btns.bdt
            div(@click="close('0')") {{params.labels ? params.labels[0] : '取消'}}
            .bdl.red(@click="close('1')") {{params.labels ? params.labels[1] : '确定'}}
</template>
<script>
export default {
    name: 'Confirm',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    methods: {
        close(decision) {
            this.params.cb(decision)
            this.params.handler = undefined
        }
    }
}
</script>
