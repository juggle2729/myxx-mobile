<style lang="stylus">
.not-found-view
    img
        width: 70%
        margin-top: 150px
</style>
<template lang="jade">
.not-found-view.center
    img(:src="'placeholder/notfound.png' | qn")
    .text.fz-30.gray 内容不存在
</template>
<script>
export default {
    name: 'not-found'
}
</script>
