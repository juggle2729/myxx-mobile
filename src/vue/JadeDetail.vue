<style lang="stylus">
.jade-detail
    padding-top: 6px
    .desc
        padding: 32px
        line-height: 1.5
    .img
        line-height: 0  /*暂时修复图片下面多出一部分空白的问题*/
        img
            width: 100%
            &:not(:last-child)
                margin-bottom: 6px
</style>
<template lang="jade">
.jade-detail.bg-white
    .desc.fz-30(v-if="jade.detail") {{jade.detail}}
    .img
        img(:src="config.img + img + '_750'", v-for="img in jade.pictures", @click="coverflow(jade.pictures, $index)")
    .hr
    tags(:tags="jade.tags")
    product-recommend
</template>
<script>
import Tags from './component/Tags.vue'
import ProductRecommend from './component/ProductRecommend.vue'
export default {
    name: 'JadeDetail',
    props: {
        jade: {
            type: Object
        }
    },
    components: {
        Tags,
        ProductRecommend
    }
}
</script>
