<style lang="stylus">
@import '~style/partials/var'
.product-ranking-view
    .banner
        width 100%
        height 140px
        background-size cover
        &.recent
            background-image url($qn + 'recent-banner.png')
        &.top100
            background-image url($qn + 'top100-banner.png')
    .tabs
        width 100%
        .tabs-placeholder
            width 100%
            height 130px
        .bg-white
            width 100%
            top 0
            -webkit-box-pack center
            border-bottom 1px solid #ededed
            .options
                width 600px
                border 1px solid #ededed
                border-radius 40px
                .option
                    width calc(100% / 3)
                    &:not(:first-child)
                        border-left 1px solid #e8e8e8
            &.on-top
                position fixed
                top 0
                z-index 99
    .empty-component
        top 268px
        height calc(100% - 268px)
</style>
<template lang="pug">
.product-ranking-view.bg
    .banner(:class="$route.name.split('-')[1]")
    .tabs.relative
        .tabs-placeholder
        .bg-white.flex.absolute.pdv-24(:class="onTop")
            .options.line-height-80.flex
                .option.center.fz-30(v-for="tab in tabs", @click="changeCurrent(tab)", :class="tab.id===current ? 'red-e5': 'dark-6b'") {{ tab.name }}
    template(v-for="item in items")
        .hr
        product-item(:item="item", :index="$index")
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
import ProductItem from 'component/item/ProductItem.vue'
export default {
    name: 'product-ranking-view',
    mixins: [ paging ],
    components: { ProductItem },

    data() {
        return {
            current: 'all',
            tabs: [
                { id: 'all', name: '全部'},
                { id: 'origin', name: '原石'},
                { id: 'finished', name: '成品'}
            ],
            onTop: ''
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/homepage/searches',
                list: 'products',
                params: {
                    tab: this.$route.query.tab || 'all',
                    order_by: 'new',
                    section: this.$route.name.split('-')[1],
                    cursor: ''
                }
            }
        }
    },

    ready() {
        this.current = this.$route.query.tab || this.current

        this.$on('scroll', () => {
            window.scrollY >= 70 ? this.onTop = 'on-top' : this.onTop = ''
        })
    },

    methods: {
        changeCurrent(tab) {
            if (tab.id !== this.current) {
                this.paging.params.cursor = ''
                this.current = tab.id
                this.$router.replace({...this.$route, query: {...this.$route.query, tab: tab.id}})
            }
        }
    },

    watch: {
        $route() {
            this.paging.params.tab = this.$route.query.tab
            this.fetch(true)
        }
    }
}
</script>