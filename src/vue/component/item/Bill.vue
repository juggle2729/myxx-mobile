<style lang="stylus">
@import '~style/partials/var'
.bill-item
    height 220px
    padding 31px 30px 0
    .desc
        margin-top 33px
        -webkit-box-align start
        .title
            width 66%
            line-height 40px
            padding-top 2px
        .txt-right
            width calc(100% - 66%)
            height 110px
            position relative
        .pay-way
            position absolute
            bottom 0
            right 0
        .rule
            color: #2C66DB
            font-size  20px
            line-height 1
</style>
<template lang="pug">
.bill-item.bg-white.bdt
    .flex
        .fz-26.gray-8f {{ item.trans_desc }}
        .flex-1
        .fz-22.gray-b3 {{ item.create_at | date 'yyyy/mm/dd HH:MM' }}
    .desc.flex
        .title.fz-28.black-47.line-clamp-2 {{ item.remark }}
        .fz-36.red-e6.txt-right
            .fz-36(:class="item.trans_amount > 0 ? 'green-a1' : 'red-e6'") {{ billPrice }}
            .pay-way.rule(v-if="item.url" ,@click="tolink" ) 费用规则
            .pay-way.fz-22.gray-8f.line-clamp-1(v-else="item.url") {{ item.channel_desc }}
</template>
<script>
export default {
    name: 'bill-item',

    props: {
        item: Object
    },
    methods:{
        tolink(){
            location.href = "https://cms.meiyuxiuxiu.com/2018/03/22/poundage/"
        }
    },
    computed: {
        billPrice() {
            return this.item.trans_amount > 0 ? `+${(this.item.trans_amount / 100).toFixed(2)}`
                : (this.item.trans_amount / 100).toFixed(2)
        }
    }
}
</script>