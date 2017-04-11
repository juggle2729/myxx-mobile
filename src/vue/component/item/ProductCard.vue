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
    img
        display: block
        height: 30px
        width: 80px
    .price::first-letter
        font-size: .9em
</style>
<template  lang="pug">
.product-card.bg-white.bd-light(v-link="{name: 'product', params: {id: item.id}, query: {referer: 'goods_relatedrecomented'}}")
    .media(v-bg='item.first_picture')
        .mark.fz-30.white(v-if="item.is_tob") 清仓
    .pdb-26.pdh(:class="{'pdt-26': btn}")
        .fz-26.line-clamp-1(:class="{'line-height-104': !btn}") {{item.title}}
        .flex.mgt-12.fz-22.light.mgb-10(v-if="btn")
            img.mgr-8(v-if="item.sunlight", :src="'shop/sunlight.png' | qn")
            img(v-if="item.cigar_scale", :src="'shop/cigar.png' | qn")
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