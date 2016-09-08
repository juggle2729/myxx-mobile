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
        .item
            margin-bottom: 40px
            position: relative
            .mark
                position: absolute
                top: 0
                right: 0
                width: 184px
                height: 144px
                z-index: 9
            &:last-child
                margin-bottom: 0
            header
                padding: 0 24px
                height: 98px
            .logo
                height: 50px
                width: 50px
                border-radius: 4px
                margin-right: 20px
                background-size: cover
            main
                padding: 0 24px
                .img
                    height: 670px
                    width: 670px
                    position: relative
                    .sale-mark
                        position: absolute
                        left: 0
                        top: 0
                        display: inline-block
                        height: 64px
                        line-height: 64px
                        padding: 0 40px
                        background-color: rgba(159, 42, 240, .8)
                .desc
                    padding: 24px 0
            footer
                height: 88px
                padding: 0 24px
                .btn
                    border-radius: 6px
                    width: 120px
                    height: 60px
                    line-height: 60px
                    text-align: center
                    + .btn
                        margin-left: 20px
</style>
<template lang="jade">
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
        .join.bg-gray.white.center.fz-30(v-if="btnLabel", :class="{'bg-red': isOpen}", @click="joinBid()") {{btnLabel}}
    .bids(v-if="purchase.total_count > 0")
        header.center.fz-26.gray
            span 竞标作品 {{purchase.total_count}}
            span.win-count(v-if="purchase.win_count") 中标作品 {{purchase.win_count}}
        .item.bg-white(v-for="bid in purchase.wins.concat(purchase.bids)", v-link="{name: 'jade', params: {id: bid.product.id}}")
            img.mark(v-if="bid.status==='win'", :src="'purchase/winned.png' | qn")
            header.flex
                .logo(v-bg="bid.shop.logo")
                .flex-1.fz-26.gray {{bid.shop.shop_name}}
                .win-count.fz-22.gray(v-if="bid.shop.recent_win_count") 近期中标{{bid.shop.recent_win_count}}笔
            main
                .img(v-bg="bid.product.first_picture")
                    .sale-mark.fz-30.white(v-if="bid.product.is_tob") 清仓
                .desc.fz-30.user-txt
                    span.gray.mgr 原价{{bid.product.price | price}}
                    span {{bid.description}}
            footer.bdt.flex
                .flex.red.flex-1
                    .fz-30 一口价
                    .fz-36 {{bid.ceil_price || bid.product.price | price}}
                template(v-if="isSelf && !bid.neglect_flag")
                    .btn.fz-26.bd-gray(@click.stop="chat(bid)") 私聊
                    .btn.fz-26.bd-gray(v-if="isOpen && bid.status!=='win'", @click.stop="dismiss(bid)") 淘汰
                .fz-26.red(v-if="bid.neglect_flag && bid.status!=='win'") 已淘汰
    empty(v-if="paid && !purchase.total_count", :title="emptyTip")
</template>
<script>
import Q from 'q'
import like from 'component/Like.vue'
import countdown from 'component/Countdown.vue'
import shareable from 'shareable'
export default {
    name: 'PurchaseView',
    mixins: [shareable],
    components: {
        like,
        countdown
    },

    data() {
        return {
            purchase: {
                owner: {}
            }
        }
    },

    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.purchase.owner.id
        },

        paid() {
            return this.purchase.status !== 'np'
        },

        hasSeat() {
            return this.purchase.open_seat > this.purchase.total_count
        },

        isOpen() {
            return this.purchase.status !== 'fn' && this.paid
        },

        btnLabel() {
            let label = ''
            if(this.purchase.status === 'fn') {
                label = '竞标已结束'
            } else if(this.hasSeat) {
                if(!this.isSelf && !_.get(this, 'purchase.conf.user_conf.shop_in_bid')) {
                    label = '我要竞标'
                }
            } else {
                label = '竞标名额已满'
            }
            return label
        },

        emptyTip() { // 竞拍为空时提示
            return this.isOpen ? '暂无竞标作品' : '无作品参与竞标'
        }
    },

    ready() {
        this.$on('restore', () => {
            this.setShareData({title: this.purchase.description, icon: this.purchase.pictures[0]}, true)
        })
    },
    route: {
        data({to}) {
            return this.$get(`mall/purchase/${to.params.id}`).then((data) => {
                this.purchase = data
                this.setShareData({title: data.description, icon: data.pictures[0]}, true)
            })
        }
    },
    methods: {
        chat(bid) {
            if(this.env.isApp) {
                this.action('chat', {id: bid.bidder_id, name: bid.shop.shop_name, product: bid.product_id})
            } else {
                window.location.href = this.config.download
            }
        },

        dismiss(bid) {
            this.action('keyboard', {placeholder: '淘汰理由(32字内)', limit: 32})
                .then(rejection => {
                    this.$put(`mall/bid/${bid.id}/neglect_bid`, {rejection})
                        .then(() => {
                            bid.neglect_flag = true
                            this.action('toast', {success: '1', text: '发送成功'})
                        })
                })
        },

        joinBid() {
            if(this.isOpen) {
                if(!this.env.isShare) {
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
                                text: '工作室或商家才可竞标，您可以联系客服',
                                labels: ['取消', '联系客服']
                            }).then((data) => {
                                if(data === '1') {
                                    this.action('kf', {product: ''})
                                }
                            })
                        } else if(!userInfo.shop_remain_bids) {
                            this.action('confirm', {
                                text: '您今天参与的竞标数已达上限（3次），明天再试吧',
                                labels: ['我知道了']
                            })
                        } else if (!userInfo.shop_remain_products) {
                            this.action('confirm', {
                                text: '您目前没有可以发布竞标的商品，可以发商品后再参与竞标',
                                labels: ['取消', '发商品']
                            }).then((data) => {
                                if(data === '1') {
                                    this.action('newJade')
                                }
                            })
                        } else {
                            this.action('newBid', {id: this.purchase.id, type: this.purchase.is_tob ? 'sale' : 'product'})
                        }
                    })
                } else {
                    window.location.href = this.config.download
                }
            }
        },
        remove(id) { //删除求购
            this.action('confirm', {
                text: '确定删除此求购？',
                labels: ['取消', '删除']
            }).then((data) => {
                if(data === '1') {
                    this.$delete(`mall/purchase/${id}`).then(() => {
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
