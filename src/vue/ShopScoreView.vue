<style lang="stylus">
.shop-score-view
    .flex-v
        display flex
        flex-direction column
        align-items center
    .info
        .name
            display flex
            align-items center
            .shop-logo
                width 60px
                height @width
                border-radius 8px
        .features
            width 100%
            border-radius 20px
            .item
                &:not(:last-of-type)
                    margin-bottom 30px
                .icon
                    width 1em
                    height 1em
    .justify
        -webkit-box-pack justify
    .lh-13
        line-height 1.3

.brand-shop-icon
    width 32px
    height @width
    background-image url('//o0x80w5li.qnssl.com/shop/brand_shop_4.8.png')
    background-size cover
.business-license-cert-icon
    width 32px
    height @width
    background-image url('//o0x80w5li.qnssl.com/shop/business_license_cert.png')
    background-size cover
.personal-cert-icon
    width 32px
    height @width
    background-image url('//o0x80w5li.qnssl.com/shop/personal_cert.png')
    background-size cover
.security-money-icon
    width 32px
    height @width
    background-image url('//o0x80w5li.qnssl.com/shop/security_money.png')
    background-size cover
.arrow-right-icon
    width 1em
    height @width
    background-image url('//o0x80w5li.qnssl.com/arrow-right.png')
    background-size contain


</style>
<template  lang="pug">
.shop-score-view.bg.pdb-20
    .info.bg-yellow-fa.pdt-50.pdb-40.pdh-40.flex-v
        .name.center.flex
            .shop-logo.mgr-20(v-bg="shop.logo")
            .black-24.fz-40.bold {{shop.shop_name}}
        .flex-v(v-if="shop.seller_comment.comment_index[0]")
            .score.fz-58.black-24.mgt-36.mgb-32 {{shop.seller_comment.comment_index[0] | floorfix}}
            star-rating(:rating='shop.seller_comment.comment_index[0]',:max-rating='5',:star-size='16',:increment='0.1')
            .mgt-18.fz-22.high(v-if="shop.seller_comment.comment_index[1] > 0") 高于行业均值
            .mgt-18.fz-22.high(v-if="shop.seller_comment.comment_index[1] == 0") 持平
            .mgv-18.fz-22.low(v-if="shop.seller_comment.comment_index[1] < 0") 低于行业均值
        .fz-58.pdv-60(v-else) -
        .tips.center.fz-20.gray-8f.mgt-48 店铺评分是由买家交易评价得分结合纠纷率、违规率综合计算出。
        .features.bg-white.mgt-22.pdv-40.pdh-56(v-if="shop.brand_shop || shop.owner.vip_flag || shop.owner.auth_flag")
            .item.flex(v-if="shop.brand_shop")
                .brand-shop-icon.mgr-20
                .fz-26.gray-5c 美玉秀秀品牌店铺
            .item.flex(v-if="!shop.auth_flag && shop.owner.vip_flag")
                .personal-cert-icon.mgr-20
                .fz-26.gray-5c 已认证-实名认证
            .item.flex(v-if="shop.auth_flag")
                .business-license-cert-icon.mgr-20
                .fz-26.gray-5c 已认证-营业执照
            //- 产品规划中.. 预留
            //- .item.flex
            //-     .security-money-icon.mgr-40
            //-     .fz-26.gray-5c 已缴纳消费者保障金￥5000

    shop-score(title="买家交易评价", :data="shop.seller_comment")
    .bg-white.pdv-40.pdh-36.bg-white.fz-20.bdt
        .bold.title.fz-30.mgb-50.gray-8f 店铺服务指标
        .pdv-22
            .flex.justify.mgb-22
                .black-47.fz-28.bold
                    span.fz-28 纠纷率&emsp;&emsp;
                    span(v-if="shop.seller_comment.order_dispute_ratio")
                        span.fz-32 {{precision(shop.seller_comment.order_dispute_ratio[0] * 100)}}
                        span.pdl-8.fz-24 %
                .flex.relative.fz-26
                    div
                        span.fz-24.gray-8f 比行业均值
                        span(v-if="shop.seller_comment.order_dispute_ratio && shop.seller_comment.order_dispute_ratio[0]",:class="calcRateColor(shop.seller_comment.dispute_rote && shop.seller_comment.dispute_rote[1])")  {{shop.seller_comment.dispute_rote && shop.seller_comment.dispute_rote[1] | percent}}
                        span.fz-24(v-else)  -

            .flex.fz-24.gray-b3.lh-13 最近100笔订单中，平台介入处理，且判为商家责任的订单笔数所占比率
        .pdv-22
            .flex.justify.mgb-22
                .black-47.fz-28.bold
                    span.fz-28 违规数&emsp;&emsp;
                    span.fz-32 {{shop.recent_violation_count}}
                    span.pdl-8.fz-24 次
            .flex.fz-24.gray-b3.lh-12 近90天累计违反平台规则的次数

    .hr.bdv
    .bg-white.pdv-40.pdh-36.bg-white.fz-20.bdb
        .bold.title.fz-30.mgb-50.gray-8f 店铺信息
        .justify.flex.pdv-22(v-link="{path: '/user/' + shop.owner.id , query: {target: 'blank'}}")
            .black-47.fz-28.bold 店铺掌柜
            .flex.relative.fz-26
                .mgr-16 {{shop.owner.nickname}}
                .arrow-right-icon
        .justify.flex.pdv-22
            .black-47.fz-28.bold 入驻时间
            .flex.relative.fz-26
                div {{shop.create_at | moment}}（{{shop.open_days}}天）

</template>
<script>
import ShopScore from 'component/ShopScore.vue'
import StarRating from 'component/StarRating.vue'
export default {
    name: 'shop-score-view',
    components: { ShopScore, StarRating },

    data() {
        return {
            shop: {
                owner: {},
                seller_comment:{
                    comment_count: 0,
                    comment_index: [],
                    attitude_service: [],
                    goods_description: [],
                    order_dispute_ratio: [],
                }
            }
        }
    },

    methods: {
        calcRateColor(num){
            if(num || num === 0){
                return num >= 0 ? 'high' : 'low'
            }else{
                return ''
            }
        }
    },

    ready() {
        this.$fetch(`mall/shop/${this.$route.params.id}/profile`).then(resp => {
            console.log(resp)
            this.shop = resp
            // this.productComment = comment_stats[0]['product']
            // this.shopComment = comment_stats[1]['seller']
        })
    },
}
</script>