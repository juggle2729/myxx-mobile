<style lang="stylus">
.marks-comp
    font-size 0
    .tag
        margin 0 10px 10px 0
        display inline-block
        &.good
            border-color #f26d6d
            color #f26d6d
        &.normal
            border-color #6dcfd1
            color #6dcfd1
        &.bad
            border-color #8f8f8f
            color #8f8f8f
</style>
<template lang="pug">
.marks-comp.bg-white
    template(v-for="tag in tags", track-by="$index")
        .tag.line-height-36.fz-22.gray.bd.pdh-8(v-if="inner") {{tag}}
        .tag.line-height-44.fz-26.bd.pdh-22(v-else, :class="tag.choice") {{tag.tag}} {{tag.count}}
</template>
<script>
export default {
    name: 'marks',

    props: {
        tags: Array,
        inner: false
    }
}
</script>