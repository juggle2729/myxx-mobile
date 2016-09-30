<style lang="stylus">
.comment-component
    i
        transform: scale(1.5)
</style>
<template lang="pug">
.comment-component.fz-30.light
    i.icon-comment-solid
    span {{count}}
</template>
<script>
export default {
    name: 'comment',
    props: {
        count: Number
    }
}
</script>
