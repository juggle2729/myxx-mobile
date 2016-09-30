<style lang="stylus">
@import '~style/partials/var'
.empty-component
    background-image: url($qn + 'placeholder/empty.png')
    background-size: 160px 160px
    background-position: center top
    margin-top: 100px
    padding-top: 180px
</style>
<template lang="pug">
.empty-component.fz-30.gray
    slot
        .title.center(v-if="title") {{title}}
</template>
<script>
export default {
    name: 'empty',

    props: {
        title: String
    }
}
</script>