<style lang="stylus">
.all-jade
    .option
        width: 25%
</style>
<template lang="jade">
    .all-jade.bg.pdt
        .options.bg-white.line-height-100.fz-30.flex
            .option.center(v-for="tab in tabs", @click="obtain(tab.id)", :class="{'red': current === tab.id}") {{tab.label}}
    .list
        product-card(v-for="item in items", :item="item")

    deep-link(v-if="!items.hasMore") 打开美玉秀秀，查看更多优质商品
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
                params: {
                    shop_id: this.$route.params.id,
                    order_by: this.current
                }
            }
        }
    },

    methods: {
        obtain(tab) {
            // this.current === tab && tab === ('price' || '-price')
            this.current = tab
            this.fetch(true, {
                shop_id: this.$route.params.id,
                order_by: this.current
            })
        }
    }
}
</script>
