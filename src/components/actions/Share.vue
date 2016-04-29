<style lang="sass">
@import '../../styles/partials/var';
.share-action {
    &.pop-transition {
        transition: transform .3s ease;
        transform: translate3d(0, 0, 0);
    }
    &.pop-enter, &.pop-leave {
        transform: translate3d(0, -100%, 0);
    }
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .6) url('#{$qn}/share.png') right 10px top 10px / 100% auto no-repeat;
}
</style>
<template>
<div class="share-action" @click="close"></div>
</template>
<script>
export default {
    name: 'Share',
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
