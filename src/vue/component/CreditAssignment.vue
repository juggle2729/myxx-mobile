<style lang="stylus">
.credit-assignment
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
.credit-assignment.mgh-32.pdb
    .flex.fz-26.bold.item
        .flex-4 加分项
        .flex-2 分值
        .flex-1.center 进度
    .flex.gray.fz-26.item(v-for="item in items")
        .user-txt.mgr {{item.title}}
        .user-txt
            span.gray {{item.point/100}}
            span.light.fz-22 （上限{{item.point_max/100}}）
        .center.gray(:class="{'green': item.point_today == item.point_max}") {{item.point_today == item.point_max ? '已完成' : '未达成'}}
</template>
<script>
import paging from 'paging'
export default {
    name: 'credit-assignment',

    mixins: [paging],

    computed: {
        paging() {
            return {
                path: 'users/points/today',
                list: 'entries',
                params: {
                    task_type: 'task'
                }
            }
        }
    }
}
</script>
