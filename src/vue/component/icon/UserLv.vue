<style lang="stylus">
.user-level-comp
    font-size 0
    display inline-block
    margin-left 5px
    img
        height: 20px
</style>
<template  lang="pug">
.user-level-comp
    img(:src="'user/lv'+ lv + '.png' | qn")
</template>
<script>
export default {
    name: 'UserLevelComponent',

    props: {
        lv: {
            type: Number,
            default: 1
        }
    }
}
</script>