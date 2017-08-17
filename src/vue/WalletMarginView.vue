<style lang="stylus">
.wallet-margin
    .pd-32
        padding-left 0
    .line-clamp-2
        width 0
</style>
<template lang="pug">
.wallet-margin(:class="isEmpty ? '' : 'pdl-32'")
    .fz-30.bdb.pd-32(v-for="item in margins")
        .flex.fz-22.gray
            .flex-1 发布拍品-保证金
            div 结算时间: {{ item.margin_paid_at | date 'yyyy-mm-dd HH:MM' }}
        .flex.mgt-40
            .flex-3.line-clamp-2 {{ item.product.title }}
            .red.fz-40.flex-1.txt-right {{ item.margin | price }}
    empty(v-if="isEmpty")
</template>
<script>
export default {
    name: 'margin',

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
