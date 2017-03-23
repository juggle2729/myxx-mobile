<style lang="stylus">
.shop-comments-view
    [class^='icon-'], [class*=' icon-']
        vertical-align: -5px
</style>
<template lang="pug">
.shop-comments-view
    tag-list
    .line-height-100.flex.fz-26.gray.bdb.pdh-32(@click="onlyContent")
        icon(:name="selected ? 'selected' : 'select'")
        .mgl-12 只看有内容的评价
    opinion-list(:items="items")
</template>
<script>
import paging from 'paging'
import TagList from 'component/TagList.vue'
import OpinionList from 'component/OpinionList.vue'
export default {
    name: 'shop-comments-view',

    mixins: [paging],

    components: {
        OpinionList,
        TagList
    },

    computed: {
        paging() {
            return {
                path: `mall/shop/${this.$route.params.id}/comments`,
                list: 'comments'
            }
        }
    },

    methods: {
        onlyContent() {
            this.selected = !this.selected
        }
    }
}
</script>