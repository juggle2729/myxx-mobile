<style lang="sass">
    .video-view {
    }
</style>
<template>
    <h1 @click="play">播放</h1>
    <template v-if="playlist">
        <h2>test</h2>
        <player :playlist="playlist"></player>
    </template>
</template>
<script>
// import Player from './Player.vue';
export default {
    // name: 'VideoView',
    // components: {
    //     Player
    // },
    methods: {
        play() {
            this.playlist = [
                '81e3b492-a555-47e0-bc1b-89b89897a22f',
                '0a1f4ab5-989e-41b9-a90f-049e5a85c749',
                '8a7dba60-a3d1-4331-ad1e-2aef85173428'
            ];
        }
    }
}
</script>
