<style lang="sass">
.user-comment-view {
    padding-top: 100px;
    .tabs {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100px;
        .tab {
            text-align: center;
            line-height: 50px;
        }
    }
    .item {
        padding: 32px;
        header {
            .btn {
                width: 140px;
                height: 70px;
                line-height: 70px;
                text-align: center;
                border-radius: 6px;
            }
        }
        main {
            padding: 24px 0 32px 100px;
            .box {
                width: 72px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                border-radius: 6px;
                background-color: #ff3c3c;
                &[type='中评'] {
                    background-color: #ffcc00;
                }
                &[type='差评'] {
                    background-color: #888888;
                }
            }
            .product {
                color: #f0a401;
            }
            .content {
                margin-top: 24px;
                line-height: 1.2;
            }
        }
    }
    .empty-component {
        background-color: #efefef;
        margin-top: 200px;
    }
}
</style>
<template lang="jade">
.user-comment-view.bg-default
    .tabs.flex.border-bottom.font-30.bg-white
        .tab.flex-1(v-for="(k, t) in tabs", :class="{'red': tab===t, 'border-horizontal': $index===1}", @click="tab=t") {{t.label}}({{t.items.length}})
    .item.border-bottom.font-30.bg-white(v-for="item in tab.items")
        header.flex.margin-bottom
            avatar(:user="item.order.buyer", :size="80")
            .flex-1.margin-left
                .font-30.gray {{item.order.buyer.nickname}}
                .font-26.light.margin-top {{item.create_at | moment}}
            .btn.border-all.font-26(@click="action('chat', {id: item.buyer_id, name: item.order.buyer.nickname, product: item.product_id})") 联系买家
        main(v-link="{name: 'order', params: {id: item.order_no}}")
            .flex
                .box.white.font-22(:type="tab.label") {{tab.label}}
                .product.font-26.margin-left 商品名称：{{item.order.product.title}}
            .content {{item.description || '[无内容]'}}
    empty(v-if="!tab.items.length", title="暂无评论")
</template>
<script>
export default {
    name: 'UserCommentView',

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
                return this.$get('mall/orders/comments')
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