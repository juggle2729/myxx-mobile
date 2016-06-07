<style lang="sass">
@import '~style/partials/var';
.share-action {
    &.pop-transition {
        transition: transform .3s ease;
        transform: translate3d(-50%, 0, 0);
    }
    &.pop-enter, &.pop-leave {
        transform: translate3d(-50%, -100%, 0);
    }
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, .6) url('#{$qn}/share.png') right 10px top 10px / 100% auto no-repeat;
}
</style>
<template>
<div class="share-action fixed" @click="close"></div>
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
