<style lang="sass">
.bzone-products {
    padding-bottom: 98px;
    padding-top: 80px;
    .fixed-header {
        position: fixed;
        width: 100%;
        top: 100px;
        z-index: 9;
        .filters {
            height: 80px;
            .filter {
                text-align: center;
                &::after {
                    content: '';
                    display: inline-block;
                    margin-left: 10px;
                    width: 0;
                    height: 0;
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-top: 15px solid gray;
                }
                &.red::after {
                    border-left: 10px solid transparent;
                    border-right: 10px solid transparent;
                    border-bottom: 15px solid #cc3f4f;
                    border-top: none;
                }
            }
        }
        .opt {
            height: 100px;
            line-height: 100px;
            padding-left: 72px;
        }
    }
    .list {
        padding-top: 20px;
        min-height: calc(100vh - 280px);
        > div {
            margin: 0 0 20px 20px;
        }
    }
    .product-btn {
        position: fixed;
        bottom: 0;
        height: 98px;
        width: 100%;
        text-align: center;
        .font-30 {
            padding: 24px 0 6px;
        }
        .font-22 {
            color: #ffb3bc;
        }
    }
}
</style>
<template lang="jade">
.bzone-products
    .placeholder-notice(v-if="$parent.firstVisit")
    .fixed-header
        .placeholder-notice(v-if="$parent.firstVisit")
        .filters.border-vertical.flex.font-26.bg-white
            .filter.flex-1(@click="changeFilter('category')", :class="{'red': filter.display==='category' || filter.category.value}") {{filter.category.value ? filter.category.label : '分类'}}
            .filter.flex-1(@click="changeFilter('price')", :class="{'red': filter.display==='price' || filter.price.value}") {{filter.price.value ? filter.price.label : '价格'}}
        .filter-opts.bg-white(v-show="filter.display")
            .opt.font-26.border-top(v-for="opt in opts", @click="applyFilter(opt)", :class="{'red': opt===filter[filter.display]}") {{opt.label}}
    empty(v-if="items.isEmpty", title="暂无清仓")
    .list.bg-default(v-else)
        product-card(v-for="item in items", :entry="item", v-link="{name: 'jade', params: {id: item.id}}")
    .product-btn.bg-red(@click="purchase()")
        .white.font-30 我要清仓
        .font-22 (只展示在商户专区)
</template>
<script>
import Q from 'q'
import paging from 'paging'
import ProductCard from 'component/ProductCard.vue'
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
        this.$get('mall/product_attrs')
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
                    resolve();
                } else {
                    this.action('login').then(resolve);
                }
            }).then(() => {
                this.action('newSale');
            });
        }
    }
}
</script>
