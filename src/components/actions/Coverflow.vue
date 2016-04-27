<style lang="sass">
.coverflow {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: black;
    color: white;
}
</style>
<template>
<div class="coverflow">
    <slider :ids="params.ids" :i="params.index" :close="close"></slider>
</div>
</template>
<script>
import Slider from 'Slider.vue';
export default {
    name: 'Coverflow',
    components: {
        Slider
    },
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    methods: {
        close() {
            this.params.handler = undefined;
        }
    }
}
</script>
