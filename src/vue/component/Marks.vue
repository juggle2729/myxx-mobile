<style lang="stylus">
.marks-comp
    font-size: 0
    &.out
        padding: 12px 32px 30px
    .tag
        margin: 18px 16px 0 0
        border-radius: 8px
        display: inline-block
</style>
<template lang="pug">
.marks-comp.bg-white(:class="{'out': !inner,'bdb': !inner}")
    template(v-for="tag in tags")
        .tag.line-height-36.fz-22.gray.bd.pdh-8(v-if="inner") {{tag}}
        .tag.line-height-60.fz-26.gray.bd.pdh(v-else) {{tag.tag}} {{tag.count}}
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