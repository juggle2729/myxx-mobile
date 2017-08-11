<style lang="stylus">
.tabs
    height 100px
    li
        line-height 100px
    .black-24
        border-bottom 4px solid #242424
</style>
<template lang="pug">
ul.tabs.flex.fz-30.bdb.pdh-20.bg-white
    li.flex-1.center(v-for="label in tabs", :class="$key===current ? 'black-24': 'gray-99'", @click="current=$key") {{label}}
</template>
<script>
export default {
    name: 'tabs',

    props: {
        current: String,
        tabs: Object
    },

    ready() {
        this.current = this.$route.query.tab || this.current || _.keys(this.tabs)[0]
        this.$watch('current', view => {
            this.$router.replace({...this.$route, query: {...this.$route.query, tab: view}})
        })
    }
}
</script>