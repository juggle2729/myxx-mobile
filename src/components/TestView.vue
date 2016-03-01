<template>
    <div class="test-view">
        <h1>test</h1>
        <video controls autoplay playsinline webkit-playsinline preload="auto"
            src="http://7xpdhl.media1.z0.glb.clouddn.com/007deadc-91ac-4747-b16b-acf549e4511e"></video>
    </div>
</template>
<script>
export default {
    name: 'TestView'
}
</script>
<style lang="sass">
.test-view {
    video {
        width: 100%;
        height: 300px;
        background-color: #888888;
    }
}
</style>
