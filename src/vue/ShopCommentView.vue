<style lang="stylus">
.shop-comment-view
    padding-top: 100px
    .tabs
        position: fixed
        top: 0
        width: 100%
        height: 100px
        z-index: 9
        .tab
            text-align: center
            line-height: 50px
    .item
        padding: 32px
        header
            .btn
                width: 140px
                height: 70px
                line-height: 70px
                text-align: center
                border-radius: 6px
        main
            padding: 24px 32px 32px 100px
            .product
                color: #f0a401
                &[type]
                    &::before
                        content: attr(type)
                        display: inline-block
                        width: 72px
                        height: 38px
                        line-height: 38px
                        text-align: center
                        border-radius: 6px
                        margin-right: 20px
                        color: white
                        background-color: #ff3c3c
                    &[type='中评']::before
                        background-color: #ffcc00
                    &[type='差评']::before
                        background-color: #888888
            .content
                margin-top: 24px
                line-height: 1.2
</style>
<template lang="jade">
.shop-comment-view.bg
    .tabs.flex.bdb.fz-30.bg-white
        .tab.flex-1(v-for="(k, t) in tabs", :class="{'red': tab===t, 'bdh': $index===1}", @click="tab=t") {{t.label}}({{t.items.length}})
    .item.bdb.fz-30.bg-white(v-for="item in tab.items")
        header.flex.mgb-12
            avatar(:user="item.order.buyer", :size="80")
            .flex-1.mgl
                .fz-30.gray {{item.order.buyer.nickname}}
                .fz-26.light.mgt {{item.create_at | moment}}
            .btn.bd.fz-26(@click="action('chat', {id: item.buyer_id, name: item.order.buyer.nickname, product: item.product_id})") 联系买家
        main(@click="action('orderDetail', {id: item.order_no})")
            .product.fz-26.line-clamp(:type="tab.label") 商品名称：{{item.order.product.title}}
            .content(v-if="item.description") {{item.description}}
    empty(v-if="!tab.items.length", title="暂无评论")
</template>
<script>
export default {
    name: 'shop-comment-view',

    data() {
        return {
            tabs: {
                pro: {label: '好评', items: []},
                avg: {label: '中评', items: []},
                con: {label: '差评', items: []}
            },
            tab: {label: '好评', items: []}
        }
    },

    route: {
        data({from, to, next}) {
            this.tab = this.tabs[to.query.tab] || this.tabs.pro
            if(from.name !== to.name) {
                return this.$fetch('mall/orders/comments', {limit: 999})
                    .then(({comments}) => {
                        comments.forEach(c => {
                            if(c.choice === 'good') {
                                this.tabs.pro.items.push(c)
                            } else if(c.choice === 'bad') {
                                this.tabs.con.items.push(c)
                            } else {
                                this.tabs.avg.items.push(c)
                            }
                        })
                    })
            } else {
                next()
            }
        }
    },

    ready() {
        this.$watch('tab', tab => {
            const k = _.findKey(this.tabs, tab)
            this.$router.replace(_.merge({query: {tab: k}}, _.pick(this.$route, 'name', 'params')))
        })
    }
}
</script>