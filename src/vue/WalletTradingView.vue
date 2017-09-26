<style lang="stylus">
.wallet-trading-view
    .bill-item
        height 150px
        padding 40px 34px 0 30px
        &:last-child
            border-bottom 1px solid #ededed
        .desc
            margin-top 20px
            .title
                width 551px
            .red-e6:first-letter
                font-size 20px
</style>
<template  lang="pug">
.wallet-trading-view.pdt-22.bg
    .bill-item.bg-white.bdt(v-for="item in items")
        .fz-26.gray-8f 待结算
        .desc.flex
            .title.fz-28.black-47.line-clamp-1.line-height-36 {{ item.remark }}
            .flex-1
            .fz-36.red-e6.txt-right
                .fz-36.red-e6.bold {{ item.trans_amount | price }}
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
export default {
    name: 'wallet-trading-view',
    mixins: [ paging ],

    computed: {
        paging() {
            return {
                path: 'balance/expects',
                list: 'entries'
            }
        }
    }
}
</script>