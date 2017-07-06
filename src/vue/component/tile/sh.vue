<style lang="stylus">
@import '~style/partials/mixin'
.sh-tile
    background-color #f5f5f5
    padding-left 24px
    height 168px
    img
        width 120px
        height @width
        margin-right 24px
    .flex-1
        .name
            width: 260px
            line-height: 1.2
    .red
        width 160px
        line-height 168px
        border(l, white)
</style>
<template lang="pug">
.sh-tile.flex(v-link="{name: 'shop', params: {id: entry.id}}")
    img(:src="config.img + entry.logo + '_240'")
    .flex-1
        .fz-30.flex.mgb-12
            .name.line-clamp.mgr {{entry.shop_name}}
        .fz-26.gray.flex
            icon(name="location")
            div {{entry.locale_name}}
    .center.red.fz-26 进店
</template>
<script>
export default {
    name: 'sh-tile',

    props: {
        entry: {}
    }
}
</script>
