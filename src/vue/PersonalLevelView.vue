<style lang="stylus">
.personal-level-view
    img
        width: 100%
</style>
<template lang="jade">
.personal-level-view.bg-white.fz-30
    img(:src="'user/personal_level.png' | qn")
</template>
<script>
export default {
    name: 'personal-level-view'
}
</script>