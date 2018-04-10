<style lang="stylus">
.wallet-margin-view
    .item
        height 200px
        padding 33px 30px 0
        &:last-child
            border-bottom 1px solid #ededed
    .mgt-31
        margin-top 31px
        -webkit-box-align start
    .line-clamp-2
        width 0
        padding-top 1px
    .price:first-letter
        font-size 20px
</style>
<template lang="pug">
.wallet-margin-view.bg
    .hr
    .item.fz-30.bdt.bg-white(v-for="item in margins")
        .flex
            .flex-1.fz-26.gray-8f 发布拍品
            .fz-22.gray-b3 {{ item.margin_paid_at | date 'yyyy/mm/dd HH:MM' }}
        .flex.mgt-31
            .flex-3.line-clamp-2.fz-28.black-47 {{ item.product.title }}
            .price.black-24.fz-36.flex-1.txt-right {{ item.margin | price }}
    empty(v-if="isEmpty")
</template>
<script>
export default {
    name: 'wallet-margin-view',

    data() {
        return {
            margins: [],
            isEmpty: false
        }
    },

    route: {
        data() {
            this.$fetch('mall/auctions/my/margin_list').then(({ margin_list }) => {
                return margin_list.length ? this.margins = margin_list : this.isEmpty = true
            })
        }
    }
}
</script>
