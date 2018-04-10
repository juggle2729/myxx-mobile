<style lang="stylus">
.shop-violation
    .icon-enter
        height: 22px
        width: 22px
</style>
<template lang="pug">
.shop-violation.bg-white
    .fz-30.bdb.pd-32(v-for='item in items', v-link="{name: 'violation-detail', params: {id: item.id}, query: {target: 'blank'}}")
        .flex.fz-22.gray
            .flex-1 {{item.type}}
            div {{item.create_at | date 'yyyy-m-dd hh:MM'}}
        .flex.mgt-40
            .flex-1.line-clamp-2.mgr {{item.desc}}
            icon(name="enter")
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
export default {
    name: 'shop-violation',

    mixins: [paging],

    computed: {
        paging() {
            return {
                path: 'mall/shop/violations',
                list: 'violations'
            }
        }
    }
}
</script>