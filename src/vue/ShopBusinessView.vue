<style lang="stylus">
.shop-business
    .last-login
        -webkit-box-pack justify
        height 99px
        padding-right 32px
    .icon-enter
        width 15px
        height 26px
        margin-left 12px
        right 0
        top 50%
        transform translateY(-50%)
    .title
        height 80px
        padding-right 32px
        &.justify
            -webkit-box-pack justify
    .title-txt
        &::before
            content ''
            width 5px
            height 26px
            background-color #e61717
            display block
            margin-right 12px
    .flex-1
        width 50%
    .diff
        -webkit-box-align baseline
</style>
<template lang="pug">
.shop-business.bg-white
    .hr.bdv
    .flex.pdl-32.last-login
        .black-24.fz-30 上一次登录时间
        .flex.relative
            .green-a1.fz-26.mgr-32 {{ lastLoginDate }}
            icon.gray.absolute(:name="'enter'")
    .hr.bdv
    .title.title-txt.flex.fz-26.gray-8f.pdl-24.bdb 商品
    .pdv-50
        .flex
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 在售总数
                .mgt-28.fz-48.black-24 {{ stats.product_stats.selling_count }}
            .flex-1.pdl-40
                .fz-26.dark-6b 今日上新
                .mgt-28.fz-48.black-24 {{ stats.product_stats.pd_count_today }}
        .flex.mgt-45
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 客单价 (元)
                .mgt-28.fz-48.black-24 {{ stats.product_stats.trans_amount_buyer_average | price '0' false }}
            .flex-1.pdl-40
                .fz-26.dark-6b 复购率
                .mgt-28.fz-48.black-24 {{ stats.product_stats.repurchase_rate * 100 + '%' }}
    .hr.bdv
    .title.flex.pdl-24.bdb.justify(@click="goDetail('click_stats')")
        .title-txt.flex.fz-26.gray-8f 店铺平台浏览
        .flex.relative
            .gray-b3.fz-26.mgr-32 查看更多
            icon.gray.absolute(:name="'enter'")
    .pdv-50
        .flex
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 昨日平台浏览 (人)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.click_stats.pv }}
                    .fz-20.mgl-16(v-if='clickStatsPvDiff > 0', :class="this.diffClass(clickStatsPvDiff)") {{ this.diffRateStr(clickStatsPvDiff) }}
            .flex-1.pdl-40
                .fz-26.dark-6b 昨日平台浏览 (次)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.click_stats.uv }}
                    .fz-20.mgl-16(v-if='clickStatsUvDiff > 0', :class="this.diffClass(clickStatsUvDiff)") {{ this.diffRateStr(clickStatsUvDiff) }}
    .hr.bdv
    .title.flex.pdl-24.bdb.justify(@click="goDetail('share_stats')")
        .title-txt.flex.fz-26.gray-8f 店铺分享浏览
        .flex.relative
            .gray-b3.fz-26.mgr-32 查看更多
            icon.gray.absolute(:name="'enter'")
    .pdv-50
        .flex
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 昨日分享浏览 (人)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.share_stats.pv }}
                    .fz-20.mgl-16(v-if='shareStatsPvDiff > 0', :class="this.diffClass(shareStatsPvDiff)") {{ this.diffRateStr(shareStatsPvDiff) }}
            .flex-1.pdl-40
                .fz-26.dark-6b 昨日分享浏览 (次)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.share_stats.uv }}
                    .fz-20.mgl-16(v-if='shareStatsUvDiff > 0', :class="this.diffClass(shareStatsUvDiff)") {{ this.diffRateStr(shareStatsUvDiff) }}
    .hr.bdv
    .title.flex.pdl-24.bdb.justify(@click="goDetail('order_stats')")
        .title-txt.flex.fz-26.gray-8f 付款
        .flex.relative
            .gray-b3.fz-26.mgr-32 查看更多
            icon.gray.absolute(:name="'enter'")
    .pdv-50
        .flex
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 昨日付款订单 (笔)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.order_paid_stats.count }}
            .flex-1.pdl-40
                .fz-26.dark-6b 昨日付款总额 (元)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.order_paid_stats.sum | price '0' false }}
    .hr.bdv
    .title.flex.pdl-24.bdb.justify(@click="goDetail('return_stats')")
        .title-txt.flex.fz-26.gray-8f 退款退货
        .flex.relative
            .gray-b3.fz-26.mgr-32 查看更多
            icon.gray.absolute(:name="'enter'")
    .pdv-50
        .flex
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 昨日退款退货订单 (笔)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.order_return_stats.count }}
            .flex-1.pdl-40
                .fz-26.dark-6b 昨日退款退货总额 (元)
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ stats.order_return_stats.sum | price '0' false }}
        .flex.mgt-45
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 近30日退货率
                .mgt-28.fz-48.black-24 {{ stats.order_return_stats.order_return_rate_last_30days * 100 + '%' }}
            .flex-1.pdl-40
                .fz-26.dark-6b 累计退货率
                .mgt-28.fz-48.black-24 {{ stats.order_return_stats.order_return_rate * 100 + '%' }}
    .hr.bdv
    .title.title-txt.flex.fz-26.gray-8f.pdl-24.bdb 服务
    .pdv-50
        .flex
            .flex-1.bdr.pdl-40
                .fz-26.dark-6b 发货速度
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ sendSpeed }}
                    .fz-20.mgl-16(v-if='sendDiff > 0', :class="this.diffClass(sendDiff)") {{ sendDiff >= 0 ? '高于均值' : '低于均值' }}
            .flex-1.pdl-40
                .fz-26.dark-6b 售后处理速度
                .flex.mgt-28.diff
                    .fz-48.black-24 {{ serviceSpeed }}
                    .fz-20.mgl-16(v-if='serviceDiff > 0', :class="this.diffClass(serviceDiff)") {{ serviceDiff >= 0 ? '高于均值' : '低于均值' }}
    .hr.bdv
</template>
<script>
import date from '../util/date'
export default {
    name: 'shop-business-view',

    data() {
        return {
            stats: {
                product_stats: {},
                click_stats: {},
                share_stats: {},
                order_paid_stats: {},
                order_return_stats: {},
                service_stats: {}
            }
        }
    },

    computed: {
        lastLoginDate() {
            return date.historyDate(this.stats.last_login_at)
        },

        clickStatsPvDiff() {
            const { pv = 0, last_pv = 0 } = this.stats.click_stats
            return this.diffRate(pv, last_pv)
        },

        clickStatsUvDiff() {
            const { uv = 0, last_uv = 0 } = this.stats.click_stats
            return this.diffRate(uv, last_uv)
        },

        shareStatsPvDiff() {
            const { pv = 0, last_pv = 0 } = this.stats.share_stats
            return this.diffRate(pv, last_pv)
        },

        shareStatsUvDiff() {
            const { uv = 0, last_uv = 0 } = this.stats.share_stats
            return this.diffRate(uv, last_uv)
        },

        sendSpeed() {
            return date.diffTime(this.stats.service_stats.time_send_goods_cost * 1000) || '暂无数据' // change to ms
        },

        sendDiff() {
            const { time_send_goods_cost, time_send_goods_cost_platform } = this.stats.service_stats
            return time_send_goods_cost - time_send_goods_cost_platform
        },

        serviceSpeed() {
            return date.diffTime(this.stats.service_stats.time_after_sale_cost * 1000) || '暂无数据' // change to ms
        },

        serviceDiff() {
            const { time_after_sale_cost, time_after_sale_cost_platform } = this.stats.service_stats
            return time_after_sale_cost - time_after_sale_cost_platform
        }
    },

    route: {
        data() {
            return this.$fetch(`mall/shop/business_stats`).then(data => {
                this.stats = data
            })
        }
    },

    methods: {
        diffRate(cur, last) {
            if (!cur || !last) return
            return ((cur-last)/last*100).toPrecision(4).replace(/\.00$/, '')
        },

        diffRateStr(rate) {
            return `比前日${rate > 0 ? '+' + rate + '%' : rate + '%'}`
        },

        diffClass(rate) {
            return rate > 0 ? 'green-a1' : 'red-e6'
        },

        goDetail(type) {
            this.$router.go({
                name: 'shop-business-detail',
                params: {
                    id: this.$route.params.id,
                    type
                }
            })
        }
    }
}
</script>