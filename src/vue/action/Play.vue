<style lang="stylus">
.play-action
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color #000
    z-index 999
</style>
<template lang="pug">
.play-action(@click="start()", :class="!isReady ? 'loading': (!this.isPlaying ? 'video' : '')")
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

    data() {
        return {
            player: null,
            isReady: true,
            isPlaying: false
        }
    },

    methods: {
        start() {
            this.isReady = false
            this.isPlaying = false
            if (!this.player) {
                this.player = document.createElement('video')
                this.player.src = this.config.video + this.params.id
                this.player.autoplay = true
                this.player.preload = true
                this.player.controls = false
                this.player.playsinline = true
            }

            this.player.play()
            this.player.oncanplaythrough = () => {
                this.isReady = true
                this.isPlaying = true
                setTimeout(() => {
                    this.close()
                    this.player = null
                }, 2000)
            }
            this.player.onerror = () => {
                this.isReady = true
                this.isPlaying = false

                this.action('toast', {
                    success: 0,
                    text: '无效的视频'
                })
                console.log('error', this.player.error.code)
            }
        },

        close() {
            this.params.handler = undefined
        }
    }
}
</script>
