<style lang="sass">
.coverflow {
    &.pop-transition {
        transition: transform .3s ease;
        transform: translate3d(0, 0, 0);
    }
    &.pop-enter, &.pop-leave {
        transform: translate3d(0, 100%, 0);
    }
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
    <slider :ids="ids" :i="params.index" :close="close"></slider>
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
    computed: {
        ids() {
            return this.params.ids.split(',');
        }
    },
    methods: {
        close() {
            this.params.handler = undefined;
        }
    }
}
</script>
