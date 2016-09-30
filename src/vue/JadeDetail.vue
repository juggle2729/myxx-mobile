<style lang="stylus">
.jade-detail
    padding-top: 6px
    .img
        line-height: 0  /*暂时修复图片下面多出一部分空白的问题*/
        img
            width: 100%
            &:not(:last-child)
                margin-bottom: 6px
    .recommends > div
        margin: 0 0 20px 20px
</style>
<template lang="pug">
.jade-detail.bg-white
    .pd-32.user-txt.fz-30(v-if="jade.detail") {{jade.detail}}
    .img
        img(:src="config.img + img + '_750'", v-for="img in jade.pictures", @click="coverflow(jade.pictures, $index)")
    .hr
    tags(:tags="jade.tags")
    .recommends.bg.pdt(v-if="related.length")
        .fz-26.gray 商品推荐
        product-card(v-for="item in related", :item="item")
</template>
<script>
import Tags from 'component/Tags.vue'
import ProductCard from 'component/item/ProductCard.vue'
export default {
    name: 'JadeDetail',

    props: {
        jade: {
            type: Object
        }
    },

    data() {
        return {
            related: []
        }
    },

    components: {
        Tags,
        ProductCard
    },

    ready() {
        this.$fetch('dc/rd', {obj_id: this.$route.params.id, biz_type: 'pd'})
            .then(data => {
                this.related = data.entries.map(e => e.entry)
            })
    }
}
</script>
