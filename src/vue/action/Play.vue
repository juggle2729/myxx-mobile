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
<<<<<<< d29dec60130867405c7800a6689a408afeaefd72
<template lang="jade">
.play-action(@click="params.handler=undefined")
    video(:src="config.video + params.id", controls)
=======
<template lang="pug">
.play-action(@click="close")
    template(v-for="media in medias")
        video(v-if="media.type==='video'", :id="media.id", controls, :class="{'on': $index===playing}", :src="config.video + media.id", @ended="ended", @webkitendfullscreen="endFullscreen")
        img(v-else, :id="media.id", :class="{'on': $index===playing}", :src="config.img + media.id")
>>>>>>> 发布求购、升级jade到pug
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
        this.params.cb(this.start)
    },

    methods: {
        start() {
            document.querySelector('video').play()
        }
    }
}
</script>
