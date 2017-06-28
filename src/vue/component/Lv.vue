<style lang="stylus">
.level-comp
    font-size 0
    img
        height: 20px
        width: 46px
        &.lg
            height: 24px
            width: 56px
            &.high
                width: 70px
        &.high
            width: 58px
</style>
<template  lang="pug">
.level-comp
    img(:src="'level/'+ lv + '.png' | qn", :class="{'lg': lg, 'high': lv > 9}" )
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