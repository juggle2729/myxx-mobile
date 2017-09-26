<style lang="stylus">
@import '~style/partials/var'
.bill-item
    height 200px
    padding 31px 30px 0
    .desc
        margin-top 33px
        -webkit-box-align start
        .title
            width 502px
            line-height 40px
            padding-top 2px
        .pay-way
            margin-top 27px
</style>
<template lang="pug">
.bill-item.bg-white.bdt
    .flex
        .fz-26.gray-8f {{ item.trans_desc }}
        .flex-1
        .fz-22.gray-b3 {{ item.create_at | date 'yyyy/mm/dd HH:MM' }}
    .desc.flex
        .title.fz-28.black-47.line-clamp-2 {{ item.remark }}
        .flex-1
        .fz-36.red-e6.txt-right
            .fz-36(:class="item.trans_amount > 0 ? 'green-a1' : 'red-e6'") {{ billPrice }}
            .pay-way.fz-22.gray-8f {{ item.channel_desc }}
</template>
<script>
export default {
    name: 'bill-item',

    props: {
        item: Object
    },

    computed: {
        billPrice() {
            return this.item.trans_amount > 0 ? `+${(this.item.trans_amount / 100).toFixed(2)}`
                : (this.item.trans_amount / 100).toFixed(2)
        }
    }
}
</script>