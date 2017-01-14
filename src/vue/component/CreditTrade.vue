<style lang="stylus">
.credit-trade
    .item
        height: 80px
        line-height: 80px
        &:not(:first-child)
            border-top: 1px dashed #efefef
        >div:first-child
            width: 50%
        >div:nth-child(2)
            width: 34%
        >div:last-child
            width: 16%
</style>
<template lang="pug">
.credit-trade.mgh-32.pdb
    .flex.fz-26.bold.item
        .flex-4 加分项
        .flex-2 分值
        .flex-1.center 今日
    .flex.gray.fz-26.item(v-for="item in items")
        div {{item.title}}
        .gray +{{item.point/100}}
        .center.gray(:class="{'green': item.point_today}") {{item.point_today/100 || 0}}
</template>
<script>
import paging from 'paging'
export default {
    name: 'credit-trade',

    mixins: [paging],

    computed: {
        paging() {
            return {
                path: 'users/points/today',
                list: 'entries',
                params: {
                    task_type: 'order'
                }
            }
        }
    }
}
</script>
