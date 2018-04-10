<style lang="stylus">
svg.icon
    width: 1.2em
    height: @width
    vertical-align: middle
    fill: currentColor
    & + span
        padding-left: 8px
        vertical-align: middle
span + .icon
    margin-left: 8px
span + .icon-enter
    padding-bottom: 4px
</style>
<template  lang="pug">
svg(:class="'icon icon-' + name", preserve-aspect-ratio="none")
    use(:xlink:href="'#icon-' + name")
</template>
<script>
export default {
    name: 'icon',

    props: {
        name: String
    }
}
</script>