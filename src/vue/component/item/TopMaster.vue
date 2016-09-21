<style lang="stylus">
@import "~style/partials/var"
:root
    counter-reset: c-master
.top-master
    height: 150px
    counter-increment: c-master
    &::before
        content: counter(c-master)
        display: inline-block
        text-align: center
        line-height: 46px
        min-width: 46px
        border-radius: 6px
        margin: 0 32px
        color: white
        background-color: $colors.light
    &:nth-child(-n + 3)::before
        background-color: $colors.red
</style>
<template lang="jade">
.top-master.flex.fz-30.bdb(v-link="{name: 'user', params: {id: item.id}}")
    avatar(:user='item', :size='90')
    .mgl-32
        div {{item.name}}
        .fz-26.light.mgt-16
            .inline-block.mgr-36 获赞数: {{item.like_count}}
            .inline-block 单个鉴定获赞数: {{item.like_count_per_jianbao}}
</template>
<script>
export default {
    name: 'top-master-item',

    props: {
        item: Object
    }
}
</script>