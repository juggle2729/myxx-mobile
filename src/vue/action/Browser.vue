<style lang="stylus">
@import '~style/partials/var'
.browser-action
    &.pop-transition
        transition: transform .3s ease
        transform: translate3d(0, 0, 0)
    &.pop-enter, &.pop-leave
        transform: translate3d(0, -100%, 0)
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 999
    background: rgba(0, 0, 0, .6) url($qn + 'browser.png') right 10px top 10px / 100% auto no-repeat
</style>
<template  lang="pug">
.browser-action(@click="params.handler = undefined")
</template>
<script>
export default {
    name: 'browser-action',

    props: {
        params: {
            type: Object,
            required: true
        }
    }
}
</script>
