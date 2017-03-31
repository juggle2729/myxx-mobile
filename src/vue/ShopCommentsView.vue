<style lang="stylus">
.shop-comments-view
    [class^='icon-'], [class*=' icon-']
        vertical-align: -5px
</style>
<template lang="pug">
.shop-comments-view
    tag-list(v-if="tags && (tags.length > 0)", :tags="tags")
    .line-height-100.flex.fz-26.gray.bdb.pdh-32(@click="onlyContent", v-if="items.length")
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

    data() {
        return {
            selected: false,
            params: {},
            tags: []
        }
    },

    components: {
        OpinionList,
        TagList
    },

    route: {
        data({to}) {
            return this.$fetch(`mall/shop/${to.params.id}/comments`).then(data => {
                this.tags = data.tags
            })
        }
    },

    computed: {
        paging() {
            return {
                path: `mall/shop/${this.$route.params.id}/comments`,
                list: 'comments',
                params: this.params
            }
        }
    },

    methods: {
        onlyContent() {
            this.selected = !this.selected
            this.params = this.selected ? { has_content: true } : {}
            this.fetch(true)
        }
    }
}
</script>