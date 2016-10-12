<style lang="stylus">
.bid-item
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
        border-bottom: 26px solid white
</style>
<template lang="pug">
.bid-item.bg-white(v-link="{name: 'jade', params: {id: bid.product.id}}")
    img.mark(v-if="mark", :src="mark | qn")
    header.flex
        .logo(v-bg="bid.shop.logo")
        .fz-26.gray {{bid.shop.shop_name}}
        lv.flex-1.pdl-10.pdb-10(:lv="bid.shop.level")
        .win-count.fz-22.gray(v-if="bid.shop.recent_win_count") 近期中标{{bid.shop.recent_win_count}}笔
    main
        .img(v-bg="bid.product.first_picture")
            .sale-mark.fz-30.white(v-if="bid.product.is_tob") 清仓
            price-tag.price-mark.fz-26.white.pdh-14(label="原价", :cents="bid.product.price")
        .fz-30.pdt-24.user-txt
            span {{bid.description}}
    footer.flex
        price-tag.fz-30.red(v-if="won", label="成交价", :cents="price")
        template(v-else)
            template(v-if="self && self.id===bid.bidder_id")
                price-tag.fz-30.red(label="竞标价", :cents="price")
                .btn-change.fz-26.bg-red.white.mgl-20.pdh-24(v-if="isOpen", @click.stop="setPrice(bid)") 改价
            template(v-else)
                price-tag.fz-30(label="竞标价", :cents="bid.origin_ceil_price", :class="{'red': !bid.ceil_price, 'gray': bid.ceil_price}")
                price-tag.fz-30.red(v-if="bid.ceil_price", label="新竞标价", :cents="price")
    .operations.bdt.flex(v-if="isSelf")
        .btn.fz-26.bd-gray(@click.stop="chat(bid)") 私聊
        template(v-if="isOpen && isSelf && !won")
            .flex-1 &nbsp;
            template(v-if="bid.like_status==='normal'")
                .btn.fz-26.bd-gray(@click.stop="setReason(bid, 'like')")
                    i.icon-success.yellow
                    span 备选
                .btn.fz-26.bd-gray(@click.stop="setReason(bid, 'reject')")
                    span.red ✕
                    span.inline-block.pdl-10 淘汰
    .reason.fz-26.bg.gray.user-txt(v-if="bid.status!=='win' && bid.reason") {{bid_status[bid.like_status]}}原因：{{bid.reason}}
</template>
<script>
import lv from 'component/Lv.vue'
export default {
    name: 'bid-item',

    components: {lv},

    data() {
        return {
                bid_status: {
                    'like': '备选',
                    'reject': '淘汰',
                    'normal': ''
                }
            }
    },

    props: {
        bid: Object,
        status: String,
        isSelf: Boolean
    },

    computed: {
        won() {
            return this.bid.status === 'win'
        },

        price() {
            return this.won ? (this.bid.order_price || this.bid.ceil_price) : (this.bid.ceil_price || this.bid.origin_ceil_price)
        },

        isOpen() {
            return this.status !== 'fn' && this.status !== 'np'
        },

        mark() {
            const status = this.won ? 'win' : this.bid.like_status !=='normal' ? this.bid.like_status : ''
            return status && `purchase/bid/${status}.png`
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
            this.action('chat', {id: bid.bidder_id, name: bid.shop.shop_name, product: bid.product_id})
        }
    }
}
</script>
