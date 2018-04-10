<style lang="stylus">
@import '~style/partials/var'
.purchase-view
    padding-bottom: 32px
    &.share
        padding-bottom: 142px
    .purchase
        .deadline b
            color: #c6c6c6
            margin: 0 5px
        .join
            border-radius: 8px
    .bids
        > header
            padding: 60px 0
            .win-count::before
                content: '\2022'
                margin: 0 12px
    .empty-component
        .title
            top 300px
    .attribute-list
        line-height 0
        padding 7px 0 24px 0
        > :first-child
            padding-left 32px
    .attribute
        margin-top 17px
        display inline-block
        width 50%
        &:nth-child(odd)
            padding-left 32px
</style>
<template  lang="pug">
.purchase-view.bg(:class="{'share': env.isShare}")
    .purchase.bg-white.pdb-40
        purchase-item(:item="purchase")
        .attribute-list.bg-gray-f7.mgb-32.mgh-32
            .attribute.fz-26(v-for="attr in productAttributes")
                span.gray-8f {{ attr.name + '：' }}
                span.black-47(v-if="attr.value") {{ attr.value }}
        .deadline.fz-26.mgh-32.mgb-32(v-if="isOpen")
            span.gray.mgr 距离竞标结束
            countdown.red(:msecs="purchase.closed_at", :now="purchase.timestamp")
        .join.line-height-90.bg-gray.white.center.fz-30.mgh-32(v-if="btnTxt", :class="{'bg-red': isOpen}", @click="addBid()") {{btnTxt}}
    .bids.pdh-16(v-if="purchase.total_count > 0")
        header.center.fz-26.gray
            span 竞标作品 {{purchase.total_count}}
            span.win-count(v-if="purchase.win_count") 中标作品 {{purchase.win_count}}
        bid-item(:bid="item", :status="purchase.status", :is-self="isSelf", v-for="item in items")
    empty.bg-gray-f7(v-if="paid && !purchase.total_count", :title="emptyTip")
</template>
<script>
import PurchaseItem from 'component/item/Purchase.vue'
import countdown from 'component/Countdown.vue'
import BidItem from 'component/item/Bid.vue'
import paging from 'paging'
import shareable from 'shareable'
export default {
    name: 'PurchaseView',
    mixins: [paging, shareable],
    components: {
        countdown,
        BidItem,
        PurchaseItem
    },

    data() {
        return {
            purchase: {
                owner: {}
            },
            productAttributes: []
        }
    },

    computed: {
        paging() {
            return {
                path: `mall/purchase/${this.$route.params.id}/bids`,
                list: 'bids'
            }
        },

        isSelf() {
            return _.get(this, 'self.id') == this.purchase.owner.id
        },

        paid() {
            return this.purchase.status !== 'np'
        },

        isOpen() {
            return this.purchase.status !== 'fn' && this.paid
        },

        btnTxt() {
            let label = ''
            if(this.purchase.status === 'fn') {
                label = '竞标已结束'
            } else if(!this.isSelf && !_.get(this, 'purchase.conf.user_conf.shop_in_bid')) {
                label = '我要竞标'
            }
            return label
        },

        emptyTip() { // 竞拍为空时提示
            return this.isOpen ? '暂无竞标作品' : '无作品参与竞标'
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`mall/purchase/${to.params.id}`).then((data) => {
                this.purchase = data
                this.generateAttributes(data)
                this.setShareData({title: data.description, icon: data.pictures[0]})
            })
        }
    },
    methods: {
        addBid() {
            if(this.isOpen){
                const userInfo = this.purchase.conf.user_conf || {}
                if(!userInfo.add_product) {
                    this.action('confirm', {
                        text: '申请开通店铺才能参与竞标，添加官方微信客服申请：jmyb66',
                        labels: ['我知道了']
                    })
                } else if(!userInfo.shop_remain_bids) {
                    this.action('confirm', {
                        text: '您今天参与的竞标数已达上限（10次），明天再试吧',
                        labels: ['我知道了']
                    })
                } else {
                    this.action('newBid', {id: this.purchase.id, type: this.purchase.is_tob ? 'sale' : 'product'})
                }
            }
        },

        remove(id) { //删除求购
            this.action('confirm', {
                text: '确定删除此求购？',
                labels: ['取消', '删除']
            }).then(index => {
                if(index === '1') {
                    this.$delete(`mall/purchase/${id}`)
                        .then(() => {
                            this.action('back', {step: 1, refresh: true})
                        })
                }
            })
        },

        generateAttributes(product) {
            const attrs = _.cloneDeep(product.attrs)
            this.productAttributes.length = 0
            this.productAttributes.push({
                name: '重量',
                value: (product.weight || 0) + '克'
            }, ...attrs.map(attr => {
                attr.value && (attr.value = attr.value.join(','))
                if (attr.value) {
                    attr.value = this.truncate(attr.value, /\d/.test(attr.value) ? 16 : 12)
                }
                return attr
            }))
        }
    },
    events: {
        timeup() {
            this.purchase.status = 'fn'
        }
    }
}
</script>
