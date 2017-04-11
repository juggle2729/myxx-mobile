<style lang="stylus">
@import "~style/partials/var"
.top-product-view
    background-image: url($qn + 'ranking-product.png')
    background-size: contain
    padding-top: 486px
    .date
        margin: -100px auto 0
        line-height: 100px
</style>
<template  lang="pug">
.top-product-view
    .date.fz-26.white.center 最近更新：{{date}}
    tabs(:tabs="{weekly: '周榜', all: '总榜'}", :current.sync="view")
    component(:is="view", keep-alive)
</template>
<script>
const ds = {path:'mall/shops/rank', transform: 'shops'}
import Tabs from 'component/Tabs.vue'
import List from 'component/List.vue'
export default {
    name: 'top-master-view',

    components: {
        Tabs,
        weekly: new List('TopProduct', {...ds, params: {order_by: 'day'}}),
        all: new List('TopProduct', {...ds, params: {order_by: 'month'}})
    },
    data() {
        return {
            view: 'weekly'
        }
    },
    computed: {
        date() {
            return new Date().toLocaleDateString()
        }
    }
}
</script>