<style lang="stylus">
.play-view
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
        width: 100%
        height: 100%
        opacity: 1
</style>
<template lang="pug">
.play-view(@click="close")
    video(:src="config.video + $route.params.id", autoplay, controls, @webkitendfullscreen="close")
</template>
<script>
export default {
    name: 'Play',

    ready() {
        const video = document.querySelector('video')
        video.oncanplay = () => {
            video.play()
        }
    },

    methods: {
        close() {
            this.action('back', {step: 1, refresh: true})
        }
    }
}
</script>