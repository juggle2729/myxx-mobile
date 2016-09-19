<style lang="stylus">
</style>
<template lang="jade">
ul.tabs
    li(v-for="tab in tabs") {{tab.label}}
</template>
<script>
export default {
    name: 'tabs',

    props: {
        tabs: {
            type: Array,
            default: []
        }
    }
}
</script>