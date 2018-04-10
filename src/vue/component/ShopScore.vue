<style lang="stylus">
@import '~style/partials/mixin'
.shop-score
    .title
        span
            font-weight normal
            color #6B6B6B
            float right
    .label
        font-weight bold
    .rate
        width 222px
        text-align left
    .flex
        display flex
        &.between
            justify-content space-between
    .v-center
        align-items center
</style>
<template lang="pug">
.shop-score.pdv-40.pdh-36.bg-white.bdb.fz-20.mgb-20(:class="{bdt: title === '店铺动态评分'}")
    .title.fz-30.mgb-50.gray-8f.bold {{title}}
        span.fz-24 {{data.comment_count || 0}}人评价
    .flex.between.v-center.pdv-20
        .flex
            .label.mgr-56.black-47.fz-28 描述相符
            star-rating(v-if="data.goods_description && data.goods_description[0]",:rating='data.goods_description[0]',:star-size='14',:increment='0.1')
            span.pdh-36(v-else) -
        .bold.fz-32(v-if="data.goods_description && data.goods_description[0]") {{data.goods_description[0] | floorfix}}
        .fz-32.pdh-36(v-else) -
        .rate.fz-24
            span.gray-8f 比行业均值
            span.bold(v-if="data.goods_description && data.goods_description[0] ",:class="calcRateColor(data.goods_description[1])") {{data.goods_description[1] | percent}}
            span(v-else)  -
    .flex.between.v-center.pdv-20
        .flex
            .label.mgr-56.black-47.fz-28 服务态度
            star-rating(v-if="data.attitude_service && data.attitude_service[0]",:rating='data.attitude_service[0]',:star-size='14',:increment='0.1')
            span.pdh-36(v-else) -
        .bold.fz-32(v-if="data.attitude_service && data.attitude_service[0]") {{data.attitude_service[0] | floorfix}}
        .fz-32.pdh-36(v-else) -
        .rate.fz-24
            span.gray-8f 比行业均值
            span.bold(v-if="data.attitude_service && data.attitude_service[0] ",:class="calcRateColor(data.attitude_service && data.attitude_service[1])") {{data.attitude_service && data.attitude_service[1] | percent}}
            span(v-else)  -
    .flex.between.v-center.pdv-20
        .flex
            .label.mgr-56.black-47.fz-28 物流服务
            star-rating(v-if="data.express_service && data.express_service[0]",:rating='data.express_service[0]',:star-size='14',:increment='0.1')
            span.pdh-36(v-else) -
        .bold.fz-32(v-if="data.express_service && data.express_service[0]") {{data.express_service[0] | floorfix}}
        .fz-32.pdh-36(v-else) -
        .rate.fz-24
            span.gray-8f 比行业均值
            span.bold(v-if="data.express_service && data.express_service[0] ",:class="calcRateColor(data.express_service && data.express_service[1])") {{data.express_service && data.express_service[1] | percent}}
            span(v-else)  -
</template>
<script>
import StarRating from './StarRating.vue'
export default {
    name: 'shop-score',
    components: { StarRating },
    props: {
        title: {
            type: String,
            default: '店铺动态评分'
        },
        data: {
            type: Object,
            default: () => ({
                comment_count: 0,
                comment_index: [],
                attitude_service: [],
                goods_description: [],
                express_service: [],
            })
        },
    },
    data() {
        return {

        }
    },

    ready() {

    },

    computed: {

    },

    methods: {
        calcRateColor(num){
            if(num || num === 0){
                return num >= 0 ? 'high' : 'low'
            }else{
                return ''
            }
        }
    }
}
</script>