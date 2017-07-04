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
                margin-bottom: 10px
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
            width: 100%
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
                line-height: 56px
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
    .support
        > .flex
            height: 100px
        .btn
            line-height: 60px
            border-radius: 6px
        .tag
            display: inline-block
            background-color: #f5f5f5
            border-radius: 6px
            padding: 8px 12px
            margin: 16px 16px 0 0
        .comment
            &.flex
                -webkit-box-align: start
            &:last-of-type
                padding-bottom: 40px
</style>
<template  lang="pug">
.bid-item.bg-white(v-link="{name: 'product', params: {id: bid.product.id}, query: {referer: 'goods_bid'}}")
    img.mark(v-if="mark", :src="mark | qn")
    header.flex
        .logo(v-bg="bid.shop.logo")
        .fz-26.gray {{bid.shop.shop_name}}
        .win-count.fz-22.gray(v-if="bid.shop.recent_win_count") 近期中标{{bid.shop.recent_win_count}}笔
    main
        .img(v-bg.lg="bid.product.first_picture")
            .sale-mark.fz-30.white(v-if="bid.product.is_tob") 清仓
            .price-mark.fz-26.white.pdh-14 原价 {{bid.product.price | price}}
        .fz-30.pdt-24.user-txt
            span {{bid.description}}
    footer.flex
        .fz-30.red(v-if="won") 成交价 {{price | price}}
        template(v-else)
            template(v-if="self && self.id===bid.bidder_id")
                .fz-30.red 竞标价 {{price | price}}
                .btn-change.fz-26.bg-red.white.mgl-20.pdh-24(v-if="isOpen", @click.stop="setPrice(bid)") 改价
            template(v-else)
                .price-tag.fz-30(:class="{'red': !bid.ceil_price, 'gray': bid.ceil_price}") 竞标价 {{bid.origin_ceil_price | price}}
                .fz-30.red(v-if="bid.ceil_price") 新竞标价 {{price | price}}
    .operations.bdt.flex(v-if="isSelf")
        .btn.fz-26.bd-gray(@click.stop="chat(bid)") 私聊
        template(v-if="isOpen && isSelf && !won")
            .flex-1 &nbsp;
            template(v-if="bid.like_status==='normal'")
                .btn.fz-26.bd-gray(@click.stop="setReason(bid, 'like')")
                    icon.yellow(name="success")
                    span 备选
                .btn.fz-26.bd-gray(@click.stop="setReason(bid, 'reject')")
                    span.red ✕
                    span.inline-block.pdl-10 淘汰
    .reason.fz-26.bg.gray.user-txt(v-if="bid.status!=='win' && bid.reason") {{bid_status[bid.like_status]}}原因：{{bid.reason}}
    .support.fz-26.pdh-24.bdt
        .flex
            .flex-1.gray {{bid.supports.count ? "有" + bid.supports.count + "位玉友支持" : "暂无玉友支持"}}
            .btn.bg-red.white.pdh-28(v-if="canSupport", @click.stop="gotoSupport") 支持该作品
            .fz-26.gray(v-if="bid.supports.supported") 已支持
        .comments.bdt(v-if="bid.supports.count")
            .tag.fz-22.gray.bg-light(v-for="tag in bid.supports.tags") {{tag.name}}({{tag.count}})
            .comment.flex.pdt-28(v-for="comment in bid.supports.comments")
                avatar(:user="comment.user", :size="50")
                .fz-26.pdl-16.gray.user-txt.pdr-32.pdt-6 {{comment.user.nickname}}：{{comment.comment}}
            .more.fz-26.red.center.pdv-40(v-if="bid.supports.count>1 && $route.name!=='bid'", v-link="{name: 'bid', params: {id: bid.id}}")
                span 查看全部支持理由
                icon.fz-22(name="enter")
</template>
<script>
export default {
    name: 'bid-item',

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
        },

        canSupport() {
            return !this.bid.supports.supported && this.isOpen && !this.isSelf && !(this.self && this.self.id == this.bid.bidder_id)
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
        },

        gotoSupport() {
            if(this.self) {
                this.$router.go({name: 'support-bid', params: {id: this.bid.id}})
            } else {
                this.action('login')
            }
        }
    }
}
</script>
