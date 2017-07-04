<style lang="stylus">
.level-comp
    font-size 0
    img
        width: 130px
        height: 34px
</style>
<template  lang="pug">
.level-comp
    img(:src="'level/'+ lv + '.png?v1' | qn")
</template>
<script>
export default {
    name: 'LevelComponent',

    props: {
        lv: {
            type: Number,
            default: 1
        },

        lg: {
            type: Boolean,
            default: true
        }
    }
}
</script>