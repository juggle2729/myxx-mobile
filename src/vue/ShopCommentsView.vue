<style lang="stylus">
.shop-comments-view
    [class^='icon-'], [class*=' icon-']
        vertical-align: -5px
    .bg-white
        border-color #ededed
    .mark
        &.bdb
            border-color #ededed
            padding-bottom 26px
    .type
        padding 10px 22px
        background-color #F7F9FC
        color #6B6B6B
        margin-right 20px
        &.active
            background-color #FFF0F0
            color #E61717
            font-weight bold
</style>
<template lang="pug">
.shop-comments-view
    .pdh-36.bg-white(:class="{'bdt': !items.isEmpty}")
        //- .mark.pdt-36(v-if="tags && (tags.length > 0)", :class="{'bdb': $route.name === 'shop'}")
        //-     marks(:tags="tags")
        .pdt-40.pdb-32.pdl-18.flex.fz-26.bdb
            //-(@click="onlyContent", v-if="items.length && $route.name !== 'shop'")
            //- icon(:name="selected ? 'selected' : 'select'")
            //- .mgl-12 只看有内容的评价
            .type(@click="changeType('all')", :class="type === 'all' ? 'active': ''") 全部
            .type(@click="changeType('new')", :class="type === 'new' ? 'active': ''") 最新评价
            .type(@click="changeType('picture')", :class="type === 'picture' ? 'active': ''") 有图
    opinion-list(:items="items",:seller="false")
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
            tags: [],
            type: 'all'
        }
    },

    components: {
        OpinionList,
        Marks
    },

    ready() {
        // this.$route.name === 'shop' && this.$fetch(`mall/shop/${this.$route.params.id}/comments`).then(data => {
        //     this.tags = data.tags
        // })
    },

    route: {
        // data({to}) {
            // return this.$fetch(`mall/shop/${to.params.id}/comments`).then(data => {
            //     this.tags = data.tags
            // })
        // }
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
        // onlyContent() {
        //     this.selected = !this.selected
        //     this.params = this.selected ? { has_content: true } : {}
        //     this.fetch(true)
        // }
        changeType(type){
            this.type = type
            if(type !== 'picture'){
                this.params = {order_by: type}
            }else{
                this.params = {has_picture: true}
            }
            this.fetch(true)
        }
    }
}
</script>