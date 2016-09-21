<style lang="stylus">
.product-suggestion
    header
        line-height: 80px
    .item
        width: 208px
    .cover
        width: 100%
        height: 208px
    .title
        margin: 24px 0 18px
</style>
<template lang="jade">
.product-suggestion.bg-white.mgb-28(v-if='items.length')
    .hr
    header.fz-26.gray.mgl-32 商品推荐
    .scrollable.pdh-32
        .item.inline-block.fz-26.mgr(v-for='data in items', v-link="{name: 'jade', params: {id: data.entry.id, tab: 'detail'}}")
            .cover(v-bg.sm='data.entry.first_picture')
            .title.line-clamp {{data.entry.title}}
            .price.red {{data.entry.price | price}}
</template>
<script>
export default {
    name: 'product-suggestion',

    props: {
        id: Number
    },

    data() {
        return {
            items: []
        }
    },

    ready() {
        const params = {
            obj_id: this.id || this.$route.params.id,
            biz_type: {jade: 'pd', story: 'tp', evaluation: 'jb', post: 'rt'}[this.$route.name]
        }
        this.$fetch('dc/rd', params)
            .then(resp => {
                this.items = resp.entries
            })
    }
}
</script>