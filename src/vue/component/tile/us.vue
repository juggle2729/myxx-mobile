<style lang="stylus">
@import '~style/partials/mixin'
.us-tile
    background-color #f5f5f5
    height 168px
    padding-left 24px
    .red
        width 160px
        height 168px
        line-height 168px
        border(l, white)
</style>
<template lang="pug">
.us-tile.flex(v-link="{name: 'user', params: {id: entry.id}}")
    avatar(:user='entry', :size="120")
    .flex-1.mgl-24
        .fz-30.flex.mgb-12.name
            .line-clamp.mgr {{entry.nickname}}
        .fz-26.gray.flex
            div {{entry.title}}
    .center.red.fz-26 +关注
</template>
<script>
import Avatar from 'component/Avatar.vue'
export default {
    name: 'us-tile',

    components: {
        Avatar
    },

    props: {
        entry: {}
    }
}
</script>
