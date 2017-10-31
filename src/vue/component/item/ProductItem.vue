<style lang="stylus">
@import '~style/partials/var'
.product-item
    padding 20px 25px 28px
    .ranking
        left 25px
        top 0
        z-index 10
        width 28px
        height 34px
        background-image: url($qn + 'top100-ranking.png')
        background-size: 100%
    .desc
        padding 22px 0 22px 3px
        .price::first-letter
            font-size 20px
            margin-right 2px
    .pics
        &.enough
            display flex
            justify-content space-between
        .pic
            width calc((100% - 10px)/3)
            padding-top @width
            &:not(:first-child)
                margin-left 5px
    .foot
        height 30px
        .flex-1
            img
                display block
                height 30px
                width auto
        .shop
            right 0
</style>
<template lang="pug">
.product-item.bg-white.relative.bdt.bdb(v-link="{name: 'product', params: {id: item.id}}", @click="clickProduct")
    .ranking.absolute.white.fz-20.center.line-height-28(v-if="$route.name === 'product-top100' && index <= 98") {{ index + 1 }}
    .desc.flex
        .flex-1.fz-26.bold.black-47.line-height-32.line-clamp-1 {{ item.title }}
        .price.red-e6.fz-32(v-if="item.sell_status === 'selling'") {{ item.price | price }}
        .red-e6.fz-28(v-else) 已售出
    .pics.flex(:class="{'enough':item.pictures.length >= 3}")
        .pic.bg-gray-f7(v-for="pic in item.pictures.slice(0,3)", v-bg.sm="pic")
    .foot.mgt-24.flex.relative
        .flex-1.flex
            img.mgr-8(v-if="item.sunlight", :src="'shop/sunlight.png' | qn")
            img.mgr-8(v-if="item.cigar_scale", :src="'shop/cigar-4.3.png' | qn")
            img(v-if="item.ziliao_feature", :src="'shop/ziliao.png' | qn")
        .shop.fz-24.black-47.flex.pdb-4.absolute(v-link="{name: 'shop', params: {id: item.shop.id}}", @click.stop="clickShop")
            icon(name="shop")
            span.pdl-10 {{ item.shop.shop_name }}
</template>
<script>
import date from '../../../util/date'
export default {
    name: 'product-item',

    props: {
        item: Object,
        index: Number
    },

    methods: {
        clickProduct() {
            this.clickTrack('shangpinxiangqing')
        },

        clickShop() {
            this.clickTrack('dianpu')
        },

        clickTrack(target) {
            switch(this.$route.name) {
                case 'product-top100':
                    this.track(`yuyoudouzaikan_${target}`)
                    break;
                case 'product-recent':
                    this.track(`meirishangxin_${target}`)
                    break;
            }
        }
    }
}
</script>