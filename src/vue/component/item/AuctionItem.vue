<style lang="stylus">
@import '~style/partials/var'
.auction-item
    border-color #ededed
    padding 26px 25px 18px
    .desc
        -webkit-box-align start
        .flex-1
            .title
                width 480px
                padding-left 3px
            .status
                .mgr-12
                    width 90px
                .mgr-12, .fz-30
                    line-height 32px
        .price
            .inline-block::first-letter
                font-size 20px
                margin 0 2px
        .bid-times
            right 0
            bottom 7px
    .pics
        .pic
            width 230px
            padding-top @width
            &:not(:first-child)
                margin-left 5px
    .foot
        .margin
            width 166px
            height 48px
            background-image: url($qn + 'auction/margin-paid-2.png')
            background-size cover
        .shop
            height 48px
            -webkit-box-align center
            -webkit-box-pack end
            img
                width 30px
                height @width
                transform translateY(-26px)
</style>
<template lang="pug">
.auction-item.bg-white.bdt.bdb(v-link="{name: 'auction', params: {id: item.id}}")
    .desc.flex.relative
        .flex-1
            .title.fz-26.bold.black-47.line-height-32.line-clamp-1 {{ item.product.title }}
            .status.flex.mgt-18
                .mgr-12.fz-24.white.txt-center(:class="bgColor") {{ auctionStatus }}
                .fz-30.red-e6(v-if="item.status === 'going'") {{ endCountdown }}
                .fz-30.yellow-f5(v-if="item.status === 'preview'") {{ startCountdown }}
        .price.fz-32(v-if="item.status === 'going'")
            .inline-block.red-e6  {{ item.current_price || item.upset_price | price }}
        .price.fz-32(v-if="item.status === 'preview' || item.status === 'fail'")
            .inline-block(:class="item.status === 'preview' ? 'yellow-f5' : 'black-47'")  {{ item.upset_price | price }}
        .price.fz-32(v-if="item.status === 'success'")
            .inline-block.black-47  {{ item.current_price | price }}
        .bid-times.absolute.fz-24.gray-b3(v-if="!(item.status === 'preview' || item.status === 'fail')") {{ item.bid_count > 0 ? `${item.bid_count}次出价` : '暂无出价' }}
    .pics.mgt-16.flex
        .pic.bg-gray-f7(v-for="pic in item.product.pictures.slice(0,3)", v-bg.sm="pic")
    .foot.flex.pdt-14
        .margin(v-if="item.status !== 'unpaid'")
        .shop.gray.flex-1.txt-right.flex(v-if="routeName !== 'shop'",v-link="{name: 'shop', params: {id: item.product.shop.id}}")
            img(:src="'auction/shop-icon.png' | qn")
            .fz-24.black-47.pdl-10 {{ item.product.shop.shop_name }}
</template>
<script>
import date from '../../../util/date'
export default {
    name: 'auction-item',

    props: {
        item: Object
    },

    data() {
        return {
            routeName: this.$route.name
        }
    },

    computed: {
        startCountdown() {
            if (this.item.start_time - Date.now() <= 300000) {
                return '即将开始'
            }
            return `距开始 ${date.diffNowTime(this.item.start_time, false)}`
        },
        endCountdown() {
            if (this.item.real_end_time - Date.now() <= 300000) {
                return '即将结束'
            }
            return `距结束 ${date.diffNowTime(this.item.real_end_time, false)}`
        },
        bgColor() {
            switch (this.item.status) {
                case 'going':
                    return 'bg-red-e6'
                case 'preview':
                    return 'bg-yellow-f5'
                case 'success':
                case 'fail':
                case 'unpaid':
                    return 'bg-black-47'
            }
        },
        auctionStatus() {
            switch (this.item.status) {
                case 'going':
                    return '拍卖中'
                case 'preview':
                    return '预展中'
                case 'success':
                    return '已结拍'
                case 'fail':
                    return '已流拍'
                case 'unpaid':
                    return '未支付'
            }
        }
    }
}
</script>