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
    .flex
        img
            display: block
            height: 30px
            width: 80px
    .price::first-letter
        font-size: .9em
    .red
        img
            display: block
            height: 30px
            width: 130px
</style>
<template lang="pug">
a.product-card.bg-white.bd-light(:href="href")
    .media(v-bg='item.first_picture')
    .pdb-26.pdh(:class="{'pdt-26': btn}")
        .fz-26.line-clamp-1(:class="{'line-height-104': !btn}") {{item.title}}
        .flex.mgt-12.fz-22.light.mgb-10(v-if="btn")
            img.mgr-8(v-if="item.sunlight", :src="'shop/sunlight.png' | qn")
            img(v-if="item.cigar_scale", :src="'shop/cigar.png' | qn")
        .red.pdv-8.flex
            .fz-24.flex-1(v-if="item.sell_status === 'sold'") {{item.sell_status_editable ? '实体店已售出' : '已售出'}}
            .price.fz-30.flex-1(v-else) {{item.price | price}}
            img(v-if="!env.isApp && $route.name !== 'shop'", src="//o0x80w5li.qnssl.com/open-in-app.png")
</template>
<script>
import config from '../../../config'
export default {
    name: 'ProductCard',

    props: {
        item: Object
    },

    data() {
        return {
            href: config.download
        }
    },

    computed: {
        btn() {
            return this.item.sunlight || this.item.cigar_scale
        }
    },

    ready() {
        if(this.env.isApp || !this.env.isMobile) {
            this.href = `/product/${this.item.id}?referer=goods_relatedrecomented`
        } else if(this.hasUniversalLinkSupport) {
            const originHref = location.href.replace('www.meiyuxiuxiu', 'w3.meiyuxiuxiu').replace(location.pathname, `/product/${this.item.id}?referer=goods_relatedrecomented`)
            this.href = originHref + (location.href.indexOf('?') === -1 ? '?' : '&') + 'ulfa=' + Date.now()
            setInterval(() => {
                this.href = originHref + (location.href.indexOf('?') === -1 ? '?' : '&') + 'ulfa=' + Date.now()
            }, 2000)
        }
    }
}
</script>