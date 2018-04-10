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
    .container
        width: 620px
        margin: 0 auto
        padding: 40px 32px 0
        border-radius: 8px
        font-size: 30px
        transform: translate3d(0, 400px, 0)
    .content
        line-height 1.5
    .btns
        margin-top: 40px
        > div
            cursor: pointer
            text-align: center
            padding: 1em 0
    .center
        line-height: 48px
</style>
<template  lang="pug">
.confirm-action.bg-opacity-7
    .container.bg-white
        .center.bold.mgb-16(v-if="params.title") {{ params.title }}
        .content(:class="!params.title ? 'center' : ''") {{{ params.text }}}
        .btns.bdt.flex
            .flex-1(@click="close('0')") {{params.labels ? params.labels[0] : '取消'}}
            .flex-1.bdl.red(v-if="params.labels[1]", @click="close('1')") {{params.labels[1]}}
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