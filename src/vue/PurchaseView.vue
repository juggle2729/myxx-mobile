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
            padding-bottom: 28px
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
                .level-comp
                    display: block
                    img
                        height: 40px
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
                    .price-mark
                        position: absolute
                        bottom: 0
                        right: 0
                        height: 56px
                        background-color: rgba(0, 0, 0, .6)
                        z-index: 9
                .desc
                    padding: 24px 0
            footer
                height: 88px
                padding: 0 24px
                .btn-change
                    line-height: 44px
                    border-radius: 6px
                .price-tag.gray
                    text-decoration: line-through
                    font-size: 30px
                    margin-right: 20px
            .operations
                padding: 28px 24px
                .btn
                    border-radius: 6px
                    width: 140px
                    line-height: 60px
                    text-align: center
                    &:first-child
                        width: 120px
                    + .btn
                        margin-left: 20px
            .reason
                margin: 0 24px
                padding: 20px 24px
                border-radius: 6px
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
        .join.bg-gray.white.center.fz-30(v-if="btnTxt", :class="{'bg-red': isOpen}", @click="addBid()") {{btnTxt}}
    .bids(v-if="purchase.total_count > 0")
        header.center.fz-26.gray
            span 竞标作品 {{purchase.total_count}}
            span.win-count(v-if="purchase.win_count") 中标作品 {{purchase.win_count}}
        .item.bg-white(v-for="bid in items", v-link="{name: 'jade', params: {id: bid.product.id}}")
            img.mark(v-if="bid.status==='win'", :src="'purchase/winned.png' | qn")
            header.flex
                .logo(v-bg="bid.shop.logo")
                .fz-26.gray {{bid.shop.shop_name}}
                lv.flex-1.pdl-10.pdb-10(:lv=5)
                .win-count.fz-22.gray(v-if="bid.shop.recent_win_count") 近期中标{{bid.shop.recent_win_count}}笔
            main
                .img(v-bg="bid.product.first_picture")
                    .sale-mark.fz-30.white(v-if="bid.product.is_tob") 清仓
                    price-tag.price-mark.fz-26.white.pdh-14(label="原价", :cents="bid.product.price")
                .desc.fz-30.user-txt
                    span {{bid.description}}
            footer.flex
                template(v-if="self && self.id===bid.bidder_id")
                    price-tag.fz-36.red(label="竞标价", :cents="bid.ceil_price")
                    .btn-change.fz-26.bg-red.white.mgl-20.pdh-24(@click.stop="setPrice(bid)") 改价
                template(v-else)
                    price-tag.fz-36(label="竞标价", :cents="bid.origin_ceil_price", :class="{'red': !bid.ceil_price, 'gray': bid.ceil_price}")
                    price-tag.fz-36.red(v-if="bid.ceil_price", label="新竞标价", :cents="bid.ceil_price")
                .status.fz-30.flex-1.txt-right(v-if="!isSelf && bid_status[bid.like_status]", :class="{'red': bid.like_status==='reject', 'yellow': bid.like_status==='like'}") 已{{bid_status[bid.like_status]}}
            .operations.bdt.flex(v-if="isSelf")
                .btn.fz-26.bd-gray(@click.stop="chat(bid)") 私聊
                template(v-if="isOpen && isSelf && bid.status!=='win'")
                    .flex-1 &nbsp;
                    template(v-if="bid.like_status==='normal'")
                        .btn.fz-26.bd-gray(@click.stop="setReason(bid, 'like')")
                            i.icon-success.yellow
                            span 备选
                        .btn.fz-26.bd-gray(@click.stop="setReason(bid, 'reject')")
                            span.red ✕
                            span.inline-block.pdl-10 淘汰
                    .btn.fz-26.bd.gray(v-else) 已{{bid_status[bid.like_status]}}
            .reason.fz-26.bg.gray.user-txt(v-if="bid.status!=='win' && bid.reason") {{bid_status[bid.like_status]}}原因：{{bid.reason}}
    empty(v-if="paid && !purchase.total_count", :title="emptyTip")
</template>
<script>
import Q from 'q'
import like from 'component/Like.vue'
import lv from 'component/Lv.vue'
import countdown from 'component/Countdown.vue'
import paging from 'paging'
import shareable from 'shareable'
export default {
    name: 'PurchaseView',
    mixins: [paging, shareable],
    components: {
        like,
        lv,
        countdown
    },

    data() {
        return {
            purchase: {
                owner: {}
            },
            bid_status: {
                'like': '备选',
                'reject': '淘汰',
                'normal': ''
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
        setPrice(bid) {
            this.$root.popup = {
                bid,
                handler: 'setPrice',
                cb: this._changePrice
            }
        },

        _changePrice(bid, ceil_price) {
            console.log('cb for changePrice', ceil_price, this)
            this.$put('mall/bid/' + bid.id, {ceil_price})
                .then(resp => {
                    bid.ceil_price = ceil_price
                    this.action('toast', {success: '1', text: '改价成功!'})
                })
        },

        setReason(bid, status) {
            this.$root.popup = {
                handler: 'keyboard',
                placeholder: status==='like' ? '请输入备选理由' : '请输入淘汰理由',
                limit: 32,
                cb: reason => {
                    this._changeLikeStatus(bid, status, reason)
                }
            }
        },

        _changeLikeStatus(bid, like_status, reason) {
            this.$put(`mall/bid/${bid.id}/like_status`, {like_status, reason})
                .then(() => {
                    bid.like_status = like_status
                    bid.reason = reason
                    this.action('toast', {success: '1', text: '发送成功'})
                })
        },

        chat(bid) {
            if(this.env.isApp) {
                this.action('chat', {id: bid.bidder_id, name: bid.shop.shop_name, product: bid.product_id})
            } else {
                window.location.href = this.config.download
            }
        },

        addBid() {
            if(this.env.isShare) {
                window.location.href = this.config.download
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
                            text: '申请开通店铺才能参入竞标，添加官网微信客服申请：jmyb66',
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
