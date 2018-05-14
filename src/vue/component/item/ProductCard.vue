<style lang="stylus">
.product-card
    display inline-block
    width 47%
    .media
        height 345px
        position relative
        .mark
            position absolute
            left 0
            top 0
            display inline-block
            line-height 44px
            padding 0 28px
            background-color rgba(159, 42, 240, .8)
        .auction-flag
            left 8px
            top 8px1
            width 108px
            height 40px
            background url('//o0x80w5li.qnssl.com/auction/auction-flag.png') no-repeat
            background-size contain
    .btn
        border-radius 4px
    .flex
        img
            display block
            height 30px
            width auto
    .price::first-letter
        font-size .9em
    .red
        img
            display block
            height 30px
            width 130px
</style>
<template lang="pug">
a.product-card.bg-white.bd-gray-ed(@click="goToDetail(item)")
    .media(v-bg.md='item.first_picture')
        .auction-flag.absolute(v-if='item.auction')
    .pdb-26.pdh(:class="{'pdt-26': btn}")
        .fz-26.line-clamp-1.black-24(:class="{'line-height-104': !btn}") {{item.title}}
        <!--.flex.mgt-12.fz-22.light.mgb-10(v-if="btn")-->
            <!--img.mgr-8(v-if="item.sunlight", :src="'shop/sunlight.png' | qn")-->
            <!--img.mgr-8(v-if="item.cigar_scale", :src="'shop/cigar-4.3.png' | qn")-->
            <!--img(v-if="item.ziliao_feature", :src="'shop/ziliao.png' | qn")-->
        .red-e6.flex.mgt-30
            .fz-24.flex-1(v-if="item.sell_status === 'sold'") {{item.sell_status_editable ? '实体店已售出' : '已售出'}}
            .price.fz-30.flex-1(v-if="!item.auction && item.sell_status !== 'sold'") {{item.price | price}}
            .is-auction.fz-30.flex-1(v-if="item.auction") 拍卖中
</template>
<script>
import config from '../../../config'
export default {
    name: 'ProductCard',

    props: {
        item: Object
    },

    computed: {
        btn() {
            return this.item.sunlight || this.item.cigar_scale
        }
    },

    methods: {
        getDetailUrl(item) {
            const _getUrl = baseUrl => {
                return baseUrl.replace(location.pathname,
                    `/${item.auction ? 'auction' : 'product'}/${item.auction ? item.auction.id : item.id}`)
            }

            if(this.env.isApp || !this.env.isMobile) {
                if (item.auction) {
                    this.saveDetailLeavePosition()
                    return `/auction/${item.auction.id}`
                }
                return `/product/${item.id}`
            } else {
                item.auction && this.saveDetailLeavePosition()
                return _getUrl(location.href)
            }
        },

        goToDetail(item) {
            location.href = this.getDetailUrl(item)
        }
    }
}
</script>