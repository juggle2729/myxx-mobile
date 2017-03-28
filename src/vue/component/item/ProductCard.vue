<style lang="stylus">
.product-card
    display: inline-block
    width: 47%
    .media
        height: 345px
        position: relative
        .mark
            position: absolute
            left: 0
            top: 0
            display: inline-block
            line-height: 44px
            padding: 0 28px
            background-color: rgba(159, 42, 240, .8)
    .btn
        border-radius: 4px
    .price::first-letter
        font-size: .9em
</style>
<template lang="jade">
.product-card.bg-white(v-link="{name: 'jade', params: {id: item.id}, query: {referer: 'goods_relatedrecomented'}}")
    .media(v-bg='item.first_picture')
        .mark.fz-30.white(v-if="item.is_tob") 清仓
    .pdv-26.pdh
        .fz-30.line-clamp-1(:class="{'line-height-100': !btn}") {{item.title}}
        .flex.mgt-12.fz-22.light.mgb-10(v-if="btn")
            .btn.line-height-30.pdh-6.bd.mgr-10(v-if="item.sunlight") 自然光
            .btn.line-height-30.pdh-6.bd(v-if="item.cigar_scale") 烟标图
        .red.fz-30.pdv-8
            div(v-if="item.sell_status === 'sold'") {{item.sell_status_editable ? '实体店已售出' : '已售出'}}
            .price(v-else) {{item.price | price}}
</template>
<script>
import Lv from 'component/Lv.vue'
export default {
    name: 'ProductCard',

    components: {
        Lv
    },

    props: {
        item: Object
    },

    computed: {
        btn() {
            return this.item.sunlight || this.item.cigar_scale
        }
    }
}
</script>