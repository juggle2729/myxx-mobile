<style lang="stylus" scoped>
.tabs
    position fixed
    top 0
    left 0
    width 100%
    height 100px
    z-index 100
    li
        line-height 100px
    .black-24
        border-bottom 4px solid #e61717
    &.share-page
        top 112px
</style>
<template lang="pug">
ul.tabs.flex.fz-30.bdb.pdh-20.bg-white(:class="{ 'share-page': env.isShare }")
    li.flex-1.center(v-for="label in tabs", :class="$key===current ? 'black-24': 'gray-99'", @click="current=$key") {{ label }}
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