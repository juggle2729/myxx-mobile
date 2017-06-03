 <style lang="stylus">
 @import '~style/partials/mixin'
.product-detail
    padding-top: 6px
    .img
        line-height: 0  /*暂时修复图片下面多出一部分空白的问题*/
        img
            width: 100%
            &:not(:last-child)
                margin-bottom: 6px
    .btn-complaint
        text-align: right
        padding: 18px 32px 16px 0
        font-size: 0
        & > div
            display: inline-block
            padding: 6px 10px
            border-radius: 6px
    .recommends > a
        margin: 0 0 20px 15px
    .tags
        padding: 0px 32px 24px
        font-size: 0
        .tag-title
            line-height: 90px
        .tag
            display: inline-block
            height: 60px
            line-height: 60px
            border-radius: 30px
            border(a, #c6c6c6)
</style>
<template lang="pug">
.product-detail.bg-white
    .pd-32.user-txt.fz-30(v-if="prod.detail") {{prod.detail}}
    .img
        img(:src="config.img + img + '?imageView2/0/w/750'", v-for="img in prod.pictures", @click="coverflow(prod.pictures, $index)")
    .btn-complaint
        .fz-26.gray.bd(v-link="{name: 'complain', params: {type: 'pd', id: prod.id}}") 举报
    .hr
    .tags(v-if="prod.tags.length > 0")
        .tag-title.fz-26.gray 标签
        .tag.pdh-28.mgr-16.mgb-16.fz-26.center.bg(v-for="tag in prod.tags", @click="gotoTagView(tag)") {{tag.name}}
    .recommends.bg.pdt(v-if="related.length")
        .fz-26.gray.pdl-16.pdb-16 商品推荐
        product-card(v-for="item in related", :item="item")
        deep-link(v-if="env.isShare") 没找到感兴趣的，打开美玉秀秀看看吧！
</template>
<script>
import ProductCard from 'component/item/ProductCard.vue'
export default {
    name: 'product-detail',

    components: {
        ProductCard
    },

    props: {
        prod: Object
    },

    data() {
        return {
            related: []
        }
    },

    ready() {
        this.$fetch('dc/rd', {obj_id: this.$route.params.id, biz_type: 'pd'}).then(data => {
                this.related = data.entries.map(e => e.entry)
            })
    },

    methods: {
        gotoTagView(tag) {
            this.env.isApp ? this.action('tag', tag) : this.gotoDownload()
        }
    }
}
</script>
