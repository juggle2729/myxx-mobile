<style lang="stylus">
.seller-margin-view
    .price
        margin-right 21px
        &::first-letter
            font-size 13px
</style>
<template  lang="pug">
.seller-margin-view.bg.pdt
    .bg-white.bdt
        .line-height-100.flex.fz-30.bdb.pdh-32(v-for='item in marginList', v-link="{name: item.type, params: {target_type: item.target_type, flow_type: item.flow_type}}")
            .flex-1.black-24 {{ item.title }}
            .enter.flex
                .price.red-e6(v-if="item.type === 'margin'") {{ auctionMarginSeller | price }}
                icon.gray.fz-22(name="enter")
</template>
<script>
export default {
    name: 'seller-margin-view',

    data() {
        return {
            marginList: [
                { title: '已冻结', type: 'margin' },
                { title: '已退款', type: 'wallet-detail', target_type: 'acm', flow_type: 'income' },
                { title: '违约扣除', type: 'wallet-detail', target_type: 'avm', flow_type: 'expense' }
            ],
            auctionMarginSeller: ''
        }
    },

    route: {
        data() {
            return this.$fetch('balance/latest')
                .then(({auction_margin_seller}) => {
                    this.auctionMarginSeller = auction_margin_seller
                })
        }
    }
}
</script>