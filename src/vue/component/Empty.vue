<style lang="stylus">
@import '~style/partials/var'
.empty-component
    position absolute
    width 100%
    height 100%
    &.empty-title
        background-image url($qn + 'placeholder/empty.png')
        background-size 160px 160px
        background-position center 40%
    .title
        position absolute
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
</style>
<template lang="pug">
.empty-component.fz-30(:class="{'empty-title': !title}", @touchstart="touchStart($event)")
    slot
        .title.gray-8f(v-if="title") {{title}}
</template>
<script>
export default {
    name: 'empty',

    props: {
        title: String
    }
}
</script>