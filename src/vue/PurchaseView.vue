<style lang="stylus">
@import '~style/partials/var'
.purchase-view
    padding-bottom: 32px
    &.share
        padding-bottom: 142px
    .purchase
        padding: 36px 32px
        .guarantee
            height: 48px
            line-height: 48px
            border-radius: 6px
            padding: 0 12px
            img
                height: 24px
                width: 19.2px
                margin-right: 5px
                vertical-align: text-bottom
        .desc
            margin-top: 36px
        .medias
            li
                margin-top: 30px
                height: 222px
                width: 222px
                &:not(:last-child)
                    margin-right: 10px
        .tags
            li
                display: inline-block
                background-color: #f5f5f5
                border-radius: 6px
                padding: 8px 12px
                margin: 24px 16px 0 0
        .operations
            margin-top: 36px
            .operation
                height: 90px
                line-height: 90px
                border-radius: 8px
                text-align: center
                width: 48%
        .deadline
            margin-top: 24px
            b
                color: #c6c6c6
                margin: 0 5px
        .join
            height: 90px
            line-height: 90px
            border-radius: 8px
            margin-top: 36px
    .bids
        padding: 0 16px
        > header
            padding: 60px 0
            .win-count::before
                content: '\2022'
                margin: 0 12px
</style>
<template lang="pug">
.purchase-view.bg(:class="{'share': env.isShare}")
    .purchase.bg-white
        header.flex
            avatar(:user="purchase.owner")
            .mgl.fz-30.gray.flex-1 {{purchase.owner.nickname}}
            .guarantee.fz-22.gray.bd(v-if="paid", v-link="{name: 'purchase-help', query: {subject: 'guarantee'}}")
                img(:src="'icon/guarantee.png' | qn")
                span 保证金已付
        .desc.fz-30.user-txt
            span.red 预算{{purchase.price_max | price}}左右
            |   {{purchase.description}}
        ul.medias.flex
            li.img(v-for="pic in purchase.pictures", track-by="$index", @click="coverflow(purchase.pictures, $index)", v-bg="pic")
        ul.tags.fz-22.gray
            li(v-for="attr in purchase.attributes", track-by="$index") {{attr}}
        .operations.flex.fz-30(v-if="isSelf && !paid")
            .operation.mgr.bd-gray(@click="remove(purchase.id)") 删除此求购
            .operation.white.bg-red(@click="action('pay', {id: purchase.id, price: purchase.pledge, type: purchase.is_tob ? 'sale' : 'purchase'})") 立即支付保证金
        .deadline.fz-26(v-if="isOpen")
            span.gray.mgr 距离竞标结束
            countdown.red(:msecs="purchase.closed_at")
        .join.bg-gray.white.center.fz-30(v-if="btnTxt", :class="{'bg-red': isOpen}", @click="addBid()") {{btnTxt}}
    .bids(v-if="purchase.total_count > 0")
        header.center.fz-26.gray
            span 竞标作品 {{purchase.total_count}}
            span.win-count(v-if="purchase.win_count") 中标作品 {{purchase.win_count}}
        bid-item(:bid="item", :status="purchase.status", :is-self="isSelf", v-for="item in items")
    empty(v-if="paid && !purchase.total_count", :title="emptyTip")
</template>
<script>
import Q from 'q'

import countdown from 'component/Countdown.vue'
import BidItem from 'component/BidItem.vue'
import paging from 'paging'
import shareable from 'shareable'
export default {
    name: 'PurchaseView',
    mixins: [paging, shareable],
    components: {
        countdown,
        BidItem
    },

    data() {
        return {
            purchase: {
                owner: {}
            }
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

    ready() {
        this.$on('restore', () => {
            this.setShareData({title: this.purchase.description, icon: this.purchase.pictures[0]})
        })
    },
    route: {
        data({to}) {
            return this.$fetch(`mall/purchase/${to.params.id}`).then((data) => {
                this.purchase = data
                this.setShareData({title: data.description, icon: data.pictures[0]})
            })
        }
    },
    methods: {
        addBid() {
            if(this.env.isShare) {
                this.gotoDownload()
            } else if(this.isOpen){
                Q.promise(resolve => {
                    if(this.self) {
                        resolve()
                    } else {
                        this.action('login').then(resolve)
                    }
                }).then(() => {
                    const userInfo = this.purchase.conf.user_conf
                    if(!userInfo.add_product) {
                        this.action('confirm', {
                            text: '申请开通店铺才能参与竞标，添加官方微信客服申请：jmyb66',
                            labels: ['我知道了']
                        })
                    } else if(!userInfo.shop_remain_bids) {
                        this.action('confirm', {
                            text: '您今天参与的竞标数已达上限（3次），明天再试吧',
                            labels: ['我知道了']
                        })
                    } else {
                        this.action('newBid', {id: this.purchase.id, type: this.purchase.is_tob ? 'sale' : 'product'})
                    }
                })
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
        }
    },
    events: {
        timeup() {
            this.purchase.status = 'fn'
        }
    }
}
</script>
