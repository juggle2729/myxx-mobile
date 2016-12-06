<style lang="stylus">
@import "~style/partials/var"
:root
    counter-reset: c-master
.top-product
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
.top-product.flex.fz-30.bdb(v-link="{name: 'shop', params: {id: item.id}}")
    avatar(:user='item.owner', :size='90')
    .mgl-32
        div {{item.shop_name}}
        .fz-26.light.mgt-16
            .inline-block.mgr-36 本月上新: {{item.pd_new_count}}

</template>
<script>
export default {
    name: 'top-product-item',

    props: {
        item: Object
    }
}
</script>