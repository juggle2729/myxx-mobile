<style lang="stylus">
.help-master-title-view
    img
        width 100%
        display block
</style>
<template lang="pug">
.help-master-title-view
    img(:src="'//o0x80w5li.qnssl.com/recognition-' + $route.query.x + '.png?v1'")
</template>
<script>
export default {
    name: 'help-master-title-view'
}
</script>

