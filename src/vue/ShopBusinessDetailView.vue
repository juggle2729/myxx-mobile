<style lang="stylus">
.shop-business-detail
    .item
        height 100px
        & > div:first-child
            width 14%
        & > div:not(:first-child)
            width 43%
    .title
        height 80px
</style>
<template lang="pug">
.shop-business-detail.bg-white
    .flex.title.item.bdv.pdh-41
        .gray-8f.fz-26 日期
        .gray-8f.fz-26.txt-right {{ titles[0] }}
        .gray-8f.fz-26.txt-right {{ titles[1] }}
    template(v-for="(index, item) in items")
        .item.flex.mgh-41(:class="index !== items.length - 1 ? 'bdb' : ''")
            .fz-30.black-24 {{ item.create_at | date 'mm-dd' }}
            .fz-30.black-24.txt-right {{ item.stats[0] }}
            template(v-if="isPrice")
                .fz-30.black-24.txt-right {{ item.stats[1] | price }}
            template(v-else)
                .fz-30.black-24.txt-right {{ item.stats[1] }}
    .fz-24.gray-b3.pdv-41.center.bdt.bg-gray-f7(v-if="items.length") 仅展示最近30天数据
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
export default {
    name: 'shop-business-detail-view',
    mixins: [ paging ],
    computed: {
        paging() {
            return {
                path: 'mall/shop/business_list',
                list: 'records',
                auto: false,
                params: {
                    business_type: this.$route.params.type,
                    limit: 30
                }
            }
        },

        isPrice() {
            return this.titles && this.titles.length && this.titles[1].indexOf('元') !== -1
        },

        titles() {
            switch (this.$route.params.type) {
                case 'click_stats':
                    return ['平台浏览 (人)', '平台浏览 (次)']
                case 'share_stats':
                    return ['分享浏览 (人)', '分享浏览 (次)']
                case 'order_stats':
                    return ['付款订单 (笔)', '付款订单总额 (元)']
                case 'return_stats':
                    return ['退款订单 (笔)', '退款订单总额 (元)']
                default:
                    return ['', '']
            }
        }
    }
}
</script>