<style lang="stylus">
.play-action
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 999
    background-color: black
    width: 100%
    height: 100%
    video
        position: relative
        top: 50%
        transform: translate3d(0, -50%, 0)
        width: 100%
        height: auto
        max-height: 100%
        opacity: 1
</style>
<template lang="pug">
.play-action(@click="params.handler=undefined")
    video(:src="config.video + params.id", controls)
</template>
<script>
export default {
    name: 'Play',
    props: {
        params: {
            type: Object,
            required: true
        }
    },

    ready() {
        // this.params.cb(this.start)
        this.start()
    },

    methods: {
        start() {
            document.querySelector('video').play()
        }
    }
}
</script>
