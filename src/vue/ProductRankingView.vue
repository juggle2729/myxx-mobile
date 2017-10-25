<style lang="stylus">
@import '~style/partials/var'
.product-ranking-view
    .banner
        width 100%
        padding-top 18.6%
        background-size cover
        &.recent
            background-image url($qn + 'recent-banner.png')
        &.top100
            background-image url($qn + 'top100-banner.png')
    .tabs
        width 100%
        z-index 99
        &.fixed
            position fixed
            top 0
        &.sticky
            position sticky
            top 0
        .options
            width 600px
            border-radius 40px
            margin 0 auto
            .option
                width calc(100% / 3)
                &:first-child
                    border 0
    .empty-component
        top 268px
        height calc(100% - 268px)
</style>
<template lang="pug">
.product-ranking-view.bg
    .banner(:class="$route.name.split('-')[1]")
    .tabs.bg-white.pdv-24(:class="tabClass")
        .options.line-height-80.flex.bd
            .option.center.fz-30.bdl(v-for="tab in tabs", @click="changeCurrent(tab)", :class="tab.id===current ? 'red-e5': 'dark-6b'") {{ tab.name }}
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
            tabClass: ''
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

        if (this.env.isIOS) {
            this.tabClass = 'sticky'
        } else {
            const realTabsOffsetTop = this.$el.querySelector('.tabs').offsetTop
            this.$on('scroll', () => {
                this._scrollTop() >= realTabsOffsetTop ? (this.tabClass = 'fixed') : this.tabClass = ''
            })
        }
    },

    methods: {
        changeCurrent(tab) {
            if (tab.id !== this.current) {
                this.paging.params.cursor = ''
                this.current = tab.id
                this.$router.replace({...this.$route, query: {...this.$route.query, tab: tab.id}})

                if (this.$route.name === 'product-top100') {
                    switch (tab.id) {
                        case 'all':
                            return this.track('yuyoudouzaikan_quanbu')
                        case 'origin':
                            return this.track('yuyoudouzaikan_yuanshi')
                        case 'finished':
                            return this.track('yuyoudouzaikan_chengpin')
                    }
                } else {
                    switch (tab.id) {
                        case 'all':
                            return this.track('meirishangxin_quanbu')
                        case 'origin':
                            return this.track('meirishangxin_yuanshi')
                        case 'finished':
                            return this.track('meirishangxin_chengpin')
                    }
                }
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