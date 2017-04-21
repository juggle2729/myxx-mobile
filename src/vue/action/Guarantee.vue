<style lang="stylus">
.guarantee-action
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
        width: 560px
        margin: 0 auto
        position: relative
        transform: translate3d(0, 200px, 0)
        img
            height: 760px
            width: 560px
        .tip
            position: absolute
            right: 0
            top: 0
            height: 120px
            width: 120px
            background: transparent
</style>
<template  lang="pug">
.guarantee-action(@click.self="close")
    .container
        img(:src="'product/guarantee.png?v1' | qn")
        .tip(@click="close")
</template>
<script>
export default {
    name: 'Guarantee',

    methods: {
        close() {
            this.$root.popup.handler = undefined
        }
    }
}
</script>
