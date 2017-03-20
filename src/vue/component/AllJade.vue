<style lang="stylus">
.all-jade
    .option
        width: 25%
</style>
<template lang="jade">
.all-jade.bg.pdt
    .options.bg-white.line-height-100.fz-30.flex(v-if="!items.isEmpty")
            .option.center(v-for="tab in tabs", @click="obtain(tab.id)", :class="{'red': (current === tab.id) || (current === ('-'+tab.id))}") {{tab.label}}
    .list
        product-card(v-for="item in items", :item="item")
    empty(v-if="items.isEmpty", title="暂无商品")

    deep-link(v-if="(items.length > 0) && !items.hasMore") 打开美玉秀秀，查看更多优质商品
</template>
<script>
import paging from 'paging'
import ProductCard from 'component/item/ProductCard.vue'
export default {
    name: 'all-jadd',

    mixins: [paging],

    data() {
        return {
            current: 'hot',
            params: {
                shop_id: this.$route.params.id,
                order_by: 'hot' || this.current
            },
            tabs: [
                { id: 'hot', label: '热门'},
                { id: 'new', label: '最新'},
                { id: 'price', label: '价格'},
                { id: 'sold', label: '已售出'}
            ]
        }
    },

    props: {
        shop: Object
    },

    components: {
        ProductCard
    },

    computed: {
        paging() {
            return {
                path: 'mall/homepage/searches',
                list: 'products',
                params: this.params
            }
        }
    },

    methods: {
        obtain(tab) {
            this.current = ((this.current === tab) && (tab === ('price' || '-price'))) ? ((tab === 'price') ? '-price' : 'price') : tab
            this.params = {
                shop_id: this.$route.params.id,
                order_by: (this.current === 'sold') ? 'new' : this.current,
                sell_status: (this.current === 'sold') ? 'sold' : ''
            }
            this.fetch(true)
        }
    },

    events: {
        scrollToBottom(e) {
            if(this.current === 'sold') {
                this.params = {
                    shop_id: this.$route.params.id,
                    order_by: 'new',
                    sell_status: 'sold'
                }
            }
            this.fetch()
        }
    }
}
</script>
