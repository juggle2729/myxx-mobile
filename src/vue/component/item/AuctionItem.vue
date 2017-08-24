<style lang="stylus">
.auction-item
    .desc
        -webkit-box-align start
        .flex-1
            .status
                height 32px
                .mgr-12, .fz-26
                    line-height 32px
        .margin
            background url('//o0x80w5li.qnssl.com/auction/gurantee.png') no-repeat 12px center
            background-size 24px 28px
            line-height 48px
            border-radius 6px
    .pics
        .pic
            width 234px
            padding-top @width
            &:not(:first-child)
                margin-left 4px
    .foot
        height 120px
        .shop
            height 120px
            right 32px
</style>
<template lang="pug">
.auction-item.bg-white(v-link="{name: 'auction', params: {id: item.id}}")
    .desc.pdh-32.pdt-34.flex
        .flex-1
            .title.fz-32 {{ item.product.title }}
            .status.flex.mgt-28
                .mgr-12.fz-22.pdh-6.white(:class="bgColor") {{ auctionStatus }}
                .fz-26.red(v-if="item.status === 'going'") 距结束 {{ item.real_end_time | diffNowTime }}
                .fz-26.yellow-f1(v-if="item.status === 'preview'") 距开始 {{ item.start_time | diffNowTime }}
        .margin.pdl-44.pdr-12.bd.fz-22.gray(v-if="item.status !== 'unpaid'") 保证金已付
    .pics.mgt-28.flex.pdh-20
        .pic(v-for="pic in item.product.pictures.slice(0,3)", v-bg.sm="pic")
    .foot.pdh-32.flex.relative
        .price.red.fz-30.flex-1(v-if="item.status === 'going'") 当前价
            span.fz-36  {{ item.current_price || item.upset_price | price }}
        .price.yellow-f1.fz-30.flex-1(v-if="item.status === 'preview'") 起拍价
            span.fz-36  {{ item.upset_price | price }}
        .price.gray.fz-30.flex-1(v-if="item.status === 'success'") 成交价
            span.fz-36  {{ item.current_price | price }}
        .shop.gray.flex.absolute(v-if="routeName !== 'shop'",v-link="{name: 'shop', params: {id: item.product.shop.id}}")
            icon.fz-30(name="shop")
            span.fz-26.pdl-10 {{ item.product.shop.shop_name }}
</template>
<script>
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
        bgColor() {
            switch (this.item.status) {
                case 'going':
                    return 'bg-red'
                case 'preview':
                    return 'bg-yellow-f1'
                case 'success':
                case 'fail':
                case 'unpaid':
                    return 'bg-gray'
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