<style lang="stylus">
.credit-active
    .item
        height: 90px
        line-height: 90px
        &:not(:first-child)
            border-top: 1px dashed #efefef
        >div:first-child
            width: 46%
        >div:nth-child(2)
            width: 34%
        >div:last-child
            width: 16%
</style>
<template lang="pug">
.credit-active.mgh-32.pdb
    .flex.fz-26.bold.item
        .flex-4 加分项
        .flex-2 分值
        .flex-1.center 今日
    .flex.gray.fz-26.item(v-for="item in items")
        .user-txt.mgr {{item.title}}
        .user-txt
            span.gray {{item.point/100}}
            span.light.fz-22 （每日上限{{item.point_max/100}}）
        .center.gray(:class="{'green': item.point_today}") {{item.point_today/100}}
</template>
<script>
import paging from 'paging'
export default {
    name: 'credit-active',

    mixins: [paging],

    computed: {
        paging() {
            return {
                path: 'users/points/today',
                list: 'entries',
                params: {
                    task_type: 'active'
                }
            }
        }
    }

}
</script>
