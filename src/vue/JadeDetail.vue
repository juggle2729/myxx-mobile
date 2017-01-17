 <style lang="stylus">
 @import '~style/partials/mixin'
.jade-detail
    padding-top: 6px
    .img
        line-height: 0  /*暂时修复图片下面多出一部分空白的问题*/
        img
            width: 100%
            &:not(:last-child)
                margin-bottom: 6px
    .recommends > div:not(.deep-link)
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
<template lang="jade">
.jade-detail.bg-white
    .pd-32.user-txt.fz-30(v-if="jade.detail") {{jade.detail}}
    .img
        img(:src="config.img + img + '_750'", v-for="img in jade.pictures", @click="coverflow(jade.pictures, $index)")
    .hr
    .tags(v-if="jade.tags.length > 0")
        .tag-title.fz-26.gray 标签
        .tag.pdh-28.mgr-16.mgb-16.fz-26.center.bg(v-for="tag in jade.tags", @click="gotoTagView(tag)") {{tag.name}}
    .recommends.bg.pdt(v-if="related.length")
        .fz-26.gray 商品推荐
        product-card(v-for="item in related", :item="item")
        deep-link(v-if="env.isShare") 没找到感兴趣的，打开美玉秀秀看看吧！
</template>
<script>
import ProductCard from 'component/item/ProductCard.vue'
export default {
    name: 'JadeDetail',

    components: {
        ProductCard
    },

    props: {
        jade: Object
    },

    data() {
        return {
            related: []
        }
    },

    ready() {
        this.$fetch('dc/rd', {obj_id: this.$route.params.id, biz_type: 'pd'})
            .then(data => {
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
