<style lang="stylus">
    .violation-detail
        .divide
            display inline-block
            width 1px
            height 1em
            margin 0 1em
            background-color #e8e8e8
        .lh-13
            line-height 1.3
</style>

<template lang="pug">
.violation-detail.bg-white(v-if="!$loadingRouteData")
    .item.mgh-32.pdv-34.fz-24.bdb(v-for="item in items")
        .gray-8f.pdt-6 {{item.title}}
        .mgt-24.user-txt.fz-30 {{{item.desc}}}
    .mgl-32.mgt-24.fz-26.gray-b3 {{info.create_at | date 'yyyy/m/dd hh:MM'}}
    .mgl-32.pdr-32.mgt-60.fz-26.gray.lh-13 违约次数将影响店铺对外展示的评分，违规次数越多，商品曝光越少。同时，违规达到一定次数后，店铺将受到限制曝光等处罚措施。
    .mgl-32.pdr-32.mgt-40.fz-26.flex.pdb-60
        .green-00.bold(v-link="{path: '/help/explanation/about_violation_shop', query: {target: 'blank'}}") 商品违规细则
        .divide
        .green-00.bold(v-link="{path: '/help/explanation/about_violation_product', query: {target: 'blank'}}") 店铺违规细则
</template>
<script>
export default {
    name: 'violation-detail',

    data() {
        return {
            items: [],
            violation_type_map: {
                service_violate: '服务违规',
                transaction_violate: '交易违规',
                product_violate: '商品违规'
            },
            violation_rank_map: {
                1: '1级（非常严重）',
                2: '2级（严重）',
                3: '3级（一般）'
            },
            relate_map: {
                od: '订单',
                pd: '商品',
                sh: '店铺'
            },
        }
    },

    route: {
        data() {
            return this.$fetch(`mall/shop/violation/${this.$route.params.id}`).then((data) => {
                this.info = data
                this.items = [
                    { title: '违规类型', desc: this.violation_type_map[data.violation_type]},
                    { title: '违规分类', desc: data.type},
                    { title: '关联信息', desc: this.relate_map[data.relate_info.relate]},
                    { title: '关联信息ID', desc: data.relate_info.relate_desc},
                    { title: '违规说明', desc: data.desc},
                    { title: '严重程度', desc: this.violation_rank_map[data.violation_rank]},
                    { title: '处罚方式', desc: data.way}
                ]
            })
        }
    },

    methods: {
        go(url){
            this.$router.go(url)
        }
    }
}
</script>