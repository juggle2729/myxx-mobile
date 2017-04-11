<style lang="stylus">
.user-comment-view {
    padding-top: 100px
    .tabs {
        position: fixed
        top: 0
        width: 100%
        height: 100px
        .tab {
            text-align: center
            line-height: 50px
        }
    }
    .item {
        padding: 32px
        header {
            .btn {
                width: 140px
                height: 70px
                line-height: 70px
                text-align: center
                border-radius: 6px
            }
        }
        main {
            padding: 24px 0 32px 100px
            .box {
                width: 72px
                height: 38px
                line-height: 38px
                text-align: center
                border-radius: 6px
                background-color: #ff3c3c
                &[type='中评'] {
                    background-color: #ffcc00
                }
                &[type='差评'] {
                    background-color: #888888
                }
            }
            .product {
                color: #f0a401
            }
            .content {
                margin-top: 24px
                line-height: 1.2
            }
        }
    }
}
</style>
<template  lang="pug">
.user-comment-view
    .tabs.flex.bdb.fz-30
        .tab.flex-1(v-for="(k, t) in tabs", :class="{'red': tab===t, 'bdh': $index===1}", @click="tab=t") {{t.label}}({{t.items.length}})
    .item.bdb.fz-30(v-for="item in tab.items")
        header.flex.margin-bottom
            avatar(:user="item.user", :size="80")
            .flex-1.mgl
                .fz-30.gray {{item.user.nickname}}
                .fz-26.light.mgt {{item.create_at | moment}}
            .btn.bd.fz-26 联系买家
        main
            .flex
                .box.white.fz-22(:type="tab.label") {{tab.label}}
                .product.fz-26.mgl 商品名称：{{item.product.name}}
            .content {{item.content}}

</template>
<script>
const user = {
    photo: "5760fbc8-f938-4c3d-9cff-4397bf68bcdf",
    nickname: "二爷",
    portrait: "b79438fb-f57c-4e9c-8f96-1fdbd23cecb0",
    title: null,
    vip_flag: true,
    id: 1263,
    role: "merchant"
}
const comments = [
    {
        rate: true,
        user,
        create_at: Date.now(),
        product: {
            id: 127,
            name: '和田玉籽料 朝花夕拾',
            owner: 1203
        },
        content: '哈市的刻录机按时发货快拉什福德回来看见暗室逢灯'
    }, {
        rate: null,
        user,
        create_at: Date.now(),
        product: {
            id: 127,
            name: '和田玉籽料 xasd',
            owner: 1203
        },
        content: '哈市的刻录机按时发货快拉什福德回来看见暗室逢灯'
    }, {
        rate: false,
        user,
        create_at: Date.now(),
        product: {
            id: 127,
            name: 'as和田玉籽料 朝花夕拾',
            owner: 1203
        },
        content: '撒旦法法师法非常v'
    }, {
        rate: true,
        user,
        create_at: Date.now(),
        product: {
            id: 127,
            name: 'adf 朝花夕拾',
            owner: 1203
        },
        content: '按时打算发'
    }, {
        rate: true,
        user,
        create_at: Date.now(),
        product: {
            id: 127,
            name: '阿诗丹顿 朝花夕拾',
            owner: 1203
        },
        content: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
    },{
        rate: null,
        user,
        create_at: Date.now(),
        product: {
            id: 127,
            name: '啊啊啊 朝花夕拾',
            owner: 1203
        },
        content: '肥嘟嘟地地道道过2'
    }
]
const tabs = {
    pro: {label: '好评', items: []},
    avg: {label: '中评', items: []},
    con: {label: '差评', items: []}
}
export default {
    name: 'UserCommentView',

    data() {
        return {
            tabs,
            tab: tabs.pro
        }
    },

    route: {
        data({from, to, next}) {
            this.tab = this.tabs[to.query.tab] || this.tab
            if(from.name !== to.name) {
                comments.forEach(c => {
                    if(c.rate === true) {
                        this.tabs.pro.items.push(c)
                    } else if(c.rate === false) {
                        this.tabs.con.items.push(c)
                    } else {
                        this.tabs.avg.items.push(c)
                    }
                })
            }
            next()
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