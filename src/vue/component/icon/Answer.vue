<style lang="stylus">
.answer-icon
    .icon
        height: 2em
        width: @height
</style>
<template  lang="pug">
.answer-icon.fz-26.gray
    icon(name="add-answer")
    span {{count ? count+'个回答' : (identifiable ? '我来回答' : '邀请回答')}}
</template>
<script>
import Icon from './Icon.vue'
export default {
    name: 'answer-icon',

    components: {Icon},

    props: {
        count: [Number],
        identifiable: {
            type: Boolean,
            default: true
        }
    }
}
</script>
