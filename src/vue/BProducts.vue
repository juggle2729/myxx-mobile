<style lang="stylus">
.bzone-products
    padding-bottom: 98px
    padding-top: 80px
    .fixed-header
        position: fixed
        width: 100%
        top: 100px
        z-index: 9
        .filters
            height: 80px
            .filter
                line-height: 80px
                text-align: center
                &::after
                    content: ''
                    display: inline-block
                    margin-left: 10px
                    width: 0
                    height: 0
                    border-left: 10px solid transparent
                    border-right: 10px solid transparent
                    border-top: 15px solid gray
                &.red::after
                    border-left: 10px solid transparent
                    border-right: 10px solid transparent
                    border-bottom: 15px solid #cc3f4f
                    border-top: none
        .filter-opts
            box-shadow: 0 2px 10px 0 #d9d9d9
            max-height: calc(1350px - 270px)
            max-height: calc(100vh - 270px)
            -webkit-overflow-scrolling: touch
            overflow-y: scroll
        .opt
            height: 100px
            line-height: 100px
            padding-left: 72px
    .list
        padding-top: 20px
        min-height: calc(100vh - 280px)
        > div
            margin: 0 0 20px 20px
    .product-btn
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        text-align: center
        .fz-30
            padding: 24px 0 6px
        .fz-22
            color: #ffb3bc
</style>
<template lang="jade">
.bzone-products
    .placeholder-notice(v-if="$parent.firstVisit")
    .fixed-header
        .placeholder-notice(v-if="$parent.firstVisit")
        .filters.bdb.flex.fz-26.bg-white
            .filter.flex-1(@click="changeFilter('category')", :class="{'red': filter.display==='category'}") {{filter.category.value ? filter.category.label : '分类'}}
            .filter.flex-1(@click="changeFilter('price')", :class="{'red': filter.display==='price'}") {{filter.price.value ? filter.price.label : '价格'}}
        .filter-opts.bg-white(v-show="filter.display")
            .opt.fz-26.bdt(v-for="opt in opts", @click="applyFilter(opt)", :class="{'red': opt===filter[filter.display]}") {{opt.label}}
    empty(v-if="items.isEmpty")
    .list.bg(v-else)
        product-card(v-for="item in items", :item="item", v-link="{name: 'jade', params: {id: item.id}}")
    .product-btn.bg-red(@click="purchase()")
        .white.fz-30 我要清仓
        .fz-22 (只展示在商户专区)
</template>
<script>
import Q from 'q'
import paging from 'paging'
import ProductCard from 'component/item/ProductCard.vue'
export default {
    name: 'BProducts',

    mixins: [paging],

    components: {
        ProductCard
    },

    data() {
        return {
            filter: {
                display: '',
                category: {},
                price: {}
            },
            category: [],
            price: [
                {
                    label: '不限'
                }, {
                    label: '1万以内',
                    value: [0, 1]
                }, {
                    label: '1~3万',
                    value: [1, 3]
                }, {
                    label: '5~10万',
                    value: [5, 10]
                }, {
                    label: '10~20万',
                    value: [10, 20]
                }, {
                    label: '20万以上',
                    value: [20, 0]
                }
            ]
        }
    },

    computed: {
        paging() {
            let params = {
                is_tob: true,
                order_by: 'new'
            }
            if(this.filter.category.value) {
                params.category_id = this.filter.category.value
            }
            if(this.filter.price.value) {
                const [min, max] = this.filter.price.value
                min && (params.price_min = min*1000000)
                max && (params.price_max = max*1000000)
            }
            return {path: 'mall/homepage/searches', list: 'products', params}
        },

        opts() {
            return _.get(this, this.filter.display, [])
        }
    },

    ready() {
        this.$fetch('mall/product_attrs')
            .then(attrs => {
                this.category = [{label: '不限'}].concat(attrs.category.children.map(c => ({label: c.name, value: c.id})))
            })

        this.$watch('paging', paging => {
            this.fetch(true)
        })
    },

    methods: {
        changeFilter(dis) {
            this.filter.display = this.filter.display === dis ? '' : dis
        },

        applyFilter(opt) {
            this.filter[this.filter.display] = opt
            this.filter.display = ''
        },

        purchase() {
            Q.promise(resolve => {
                if(this.self) {
                    resolve()
                } else {
                    this.action('login').then(resolve)
                }
            }).then(() => {
                this.action('newSale')
            })
        }
    }
}
</script>
