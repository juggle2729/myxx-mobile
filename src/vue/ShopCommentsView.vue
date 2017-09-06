<style lang="stylus">
.shop-comments-view
    [class^='icon-'], [class*=' icon-']
        vertical-align: -5px
    .marks-border
        padding-bottom 26px
        border-bottom 1px solid #ededed
</style>
<template lang="pug">
.shop-comments-view
    .pdh-36.bg-white
        .mark.pdt-36(v-if="tags && (tags.length > 0)", :class="{'marks-border': $route.name === 'shop'}")
            marks(:tags="tags")
        .line-height-80.flex.fz-26.gray.bdb.pdh-28(@click="onlyContent", v-if="items.length && $route.name !== 'shop'")
            icon(:name="selected ? 'selected' : 'select'")
            .mgl-12 只看有内容的评价
    opinion-list(:items="items")
</template>
<script>
import paging from 'paging'
import Marks from 'component/Marks.vue'
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
        Marks
    },

    ready() {
        this.$route.name === 'shop' && this.$fetch(`mall/shop/${this.$route.params.id}/comments`).then(data => {
            this.tags = data.tags
        })
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