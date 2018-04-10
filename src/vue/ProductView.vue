<style lang="stylus">
bg($key)
    background-image url('//o0x80w5li.qnssl.com/product/' + $key + '.png?v1')
    background-size cover
    background-position left center
dark-6b()
    background-size 48px
    padding-top 52px
.product-view
    .title
        margin 41px 34px 0
        line-height 1.4
    .promise
        margin 15px 0 0 38px
    .text-item
        bg(promise)
        background-size 20px
        padding-left 30px
    .status-price
        margin 28px 32px 0
    .price:first-letter
        font-size 22px
    .user-txt
        margin 21px 31px 0
        line-height 1.5
    .prod-attr
        font-size 0
        padding 10px 32px 30px
        margin 32px 23px 0
        display flex
        flex-wrap wrap
        & > li
            padding-top 16px
            width 50%
            p
                display inline-block
                & + p
                    padding-left 36px
    .imgs
        margin 24px 23px 32px
        display flex
        flex-wrap wrap
    .img-item
        width calc((100% - 14px)/3)
        padding-top calc((100% - 14px)/3)
        margin-top 7px
        &.video:before
            background-size 48px
        &:not(:nth-child(3n + 1))
            margin-left 7px
    .shop-component
        margin 32px 23px 0
        background #f7f7f7
    .eight
        bg(eight-items)
        background-size 120px
        background-position center
        width 176px
        height 100%
    .mgt-36
        padding-top 40px
        .flex:first-child
            margin 0 35px
            border-radius 24px
            height 180px
            .separator
                width 1px
                height 110px
            .red-e6
                margin-left 39px
            .icon-enter
                width 10px
                height 15px
                position absolute
                top 50%
                right 37px
                transform translateY(-50%)
    .shop-product-title
        padding 49px 0 19px
        &:before, &:after
            content ""
            display inline-block
            width 10px
            height 1px
            background-color #393939
            position relative
            top -8px
        &:before
            margin-right 8px
        &:after
            margin-left 8px
    .products
        display flex
        flex-wrap wrap
        background #f7f7f7
        padding-bottom 113px
    .product-card
        width calc((100% - 15px) / 2)
        margin-top 15px
        &:not(:nth-child(2n + 1))
            margin-left 15px
    .bottom
        position fixed
        left 0
        bottom 0
        width 100%
        height 98px
        > *
            -webkit-box-pack:center;
            height 100%
        > :nth-child(1)
            padding-left 20px
        > :nth-child(2)
            padding-right 20px
        &.product-bottom
            > :nth-child(1), > :nth-child(2)
                width calc(100%/5)
            > :nth-child(3), > :nth-child(4)
                width calc(100% * 3/10)
        &.auction-bottom
            > :nth-child(1), > :nth-child(2)
                width 25%
            > :nth-child(3)
                width 50%
    .compete
        bg(compete)
        dark-6b()
        background-position calc(50% + 10px) 11px
    .order
        bg(order)
        dark-6b()
        background-position calc(50% - 9px) 11px

    /*css about auction    */
    .status-bar
        height 72px
        margin-top 12px
        .pdh-10
            line-height 28px
            color white
        &.preview, &.unpaid
            .pdh-10
                background-color #f1ab47
            .mgl-16
                color #f1ab47
        &.going
            .pdh-10
                background-color #e61717
            .mgl-16
                color #e61717
        &.fail,&.success
            .pdh-10
                background-color #888
            .mgl-16
                color #888
    .delay-explain, .delay-remind
        border-color #efefef
        .icon-enter
            width 14px
            height 24px
            transform translateY(-6px)
    .auction-price
        height 151px
        &.preview .current-price
            color #c6c6c6
        &.going, &.success
            .current-price
                color #e61717
        &.fail .current-price
            color #757575
        .separator
            width 1px
            height 72px
        .price-symbol:first-letter
            font-size 24px
    .auction-bids
        background #fafafa
        padding-top 16px
        min-height 320px
        .bdb, .bdt
            background transparent
</style>
<template lang="pug">
.product-view
    .title.fz-36.black-47.bold {{prod.title}}
    .flex.fz-24.yellow-f5.promise
        .text-item 担保交易
        .text-item.mgl-29 3天无理由退货
    .flex.status-price.red-e6(v-if="!isAuction")
        .fz-44.flex-1.bold(v-if="prod.auction") 拍卖中
        .fz-30.flex-1(v-if="!prod.auction && isSold") {{ prod.sell_status_editable ? '实体店已售出' : '已售出' }}
        .price.fz-44.flex-1(v-if="!prod.auction && !isSold") {{ prod.price | price }}
        .judge-product.fz-24.flex(v-if="self && self.is_platform_admin && !isAuction", v-link="{name: 'mall-judge', params: {type: 'pd', id: prod.id}}") 评判商品
    template(v-if="isAuction")
        .status-bar.flex.pdl-32.fz-20(:class="auction.status")
            .pdh-10(v-if="updating") 更新中
            .pdh-10(v-if="!updating") {{ statusText }}
            .mgl-16.fz-28(v-if="!(auction.status === 'fail' || auction.status === 'success')") {{ auctionTime }}
            .mgl-16.fz-28(v-if="auction.status === 'fail' || auction.status === 'success'") {{ endTime }}
        .delay-explain.line-height-72.pdh-32.bdb.flex.red(v-if="auction.delay_remind_text", v-link="{name: 'delay-records', params: {id: auction.id}}")
            .fz-22 {{ auction.delay_remind_text }}
            .flex-1
            icon(name="enter")
        .delay-remind.line-height-72.pdh-32.bdb.flex.red.fz-22(v-if="!auction.delay_remind_text && delayRemind") 最后5分钟，进入延时竞价周期
        .auction-price.flex.fz-22.bdt(:class="auction.status")
            .flex-1.center
                .current-title.dark-6b {{ currentTitle }}
                template(v-if="lodash.isString(currentPrice)")
                    .current-price.mgt-17.fz-40.bold {{ currentPrice }}
                template(v-if="lodash.isNumber(currentPrice)")
                    .current-price.mgt-17.fz-40.price-symbol.bold {{ currentPrice | price }}
            .separator.bdl
            .flex-1.center
                .start-title.dark-6b 起拍价
                .mgt-17.fz-40.price-symbol.bold(:class="auction.status === 'preview' ? 'yellow-f1' : 'gray-75'") {{ auction.upset_price | price }}
            .separator.bdl
            .flex-1.center
                .increase-title.dark-6b 加价幅度
                .mgt-17.fz-40.gray-75.bold.price-symbol {{ auction.bid_increment | price }}
        auction-bids(v-if='auction.id', :id='auction.id', :status='auction.status', :limit='3')
    .user-txt.fz-28.gray-5c(v-if="prod.detail") {{{prod.detail | input}}}
    ul.prod-attr.bg-gray-f7(v-if="attrs.length")
        template(v-for="attr in attrs")
            li.fz-24
                p.label.gray {{ attr.name }}
                p.black-47(v-if="attr.value") {{ attr.value }}
    .imgs
        .img-item.video(v-if="prod.video", @click.stop='play(prod.video)', v-bg='prod.video', query='vframe/jpg/offset/5/rotate/auto|imageView2/1/w/600/h/600/interlace/1')
        .img-item(v-bg.md="img", v-for="img in prod.pictures", @click="coverflow(prod.pictures, $index)")
    shop(:shop="prod.shop")
    .mgt-36.bdt.bg-gray-f7
        .flex.bg-white.bd.relative(@click="onPage('/help/eco-system')")
            .eight
            .separator.bdr
            .fz-34.red-e6 打造良性生态的8项举措
            icon.red-e6(name="enter")
        .fz-30.black.shop-product-title.center.bold 店铺商品
        .products.pdh-15
            product-card(v-for="item in items", :item="item")
    .bottom.product-bottom.flex.bdt.bg-white(v-if="!isAuction")
        .flex.compete.dark-6b.fz-22(@click="onPage('/auction/compete')") 参拍
        .flex.order.dark-6b.fz-22(@click="onPage('/order-list')") 订单
        deep-link.has-icon.flex.gray-5c.fz-28.bdl 联系商家
        template(v-if="prod.auction")
            .flex.bg-red-e6.white.fz-28(v-link="{name: 'auction', params: {id: prod.auction.id}}") 此商品正在拍卖 >
        template(v-if="!prod.auction && isSelling")
            .flex.bg-red-e6.white.fz-28(@click="onBuy()") 立即购买
        template(v-if="!prod.auction && !isSelling")
            deep-link.has-icon.flex.bg-gray-d6.white.fz-30 已售出
    .bottom.auction-bottom.flex.bdt.bg-white(v-if="isAuction")
        .flex.compete.dark-6b.fz-22(@click="onPage('/auction/compete')") 参拍
        .flex.order.dark-6b.fz-22(@click="onPage('/order-list')") 订单
        template(v-if="auction.status === 'going'")
            .flex.white.fz-30.bg-red-e6(@click="bidPrice") {{ operationText }}
        template(v-if="auction.status !== 'going'")
            deep-link.has-icon.flex.white.fz-30.bg-gray {{ operationText }}
    auction-bid-price(:show.sync="showBidPrice", :auction="auction")
</template>
<script>
import shareable from 'shareable'
import ProductCard from 'component/item/ProductCard.vue'
import Shop from 'component/Shop.vue'
import paging from 'paging'

// import about auction
import AuctionBidPrice from 'component/AuctionBidPrice.vue'
import AuctionBids from 'component/AuctionBids.vue'
import date from '../util/date'
import dateformat from 'dateformat'
const FIVE_MINUTES = 5 * 60 * 1000
export default {
    name: 'product-view',

    mixins: [shareable, paging],

    components: {
        ProductCard,
        Shop,
        AuctionBids,
        AuctionBidPrice
    },

    data() {
        return {
            prod: {
                owner: {},
                shop: {
                    coupons: []
                },
                is_faved: false,
                status: 'online',
                tags: [],
                banner: [],
                auction: {}
            },
            attrs: [],

            // data about auction
            auction: {},
            isAuction: false,
            statusUpdatedAt: '',
            bidTimeInterval: null,
            auctionTime: '',
            delayRemind: false,
            updating: false,
            showBidPrice: false
        }
    },

    computed: {
        isSold() {
            return this.prod.sell_status === 'sold'
        },

        isSelling() {
            return this.prod.sell_status==='selling'
        },

        params() {
            return {
                shop_id: this.prod.shop.id,
                order_by: 'new'
            }
        },

        paging() {
            return {
                path: 'mall/homepage/searches',
                list: 'products',
                params: this.params
            }
        },

        // computed about auction
        statusText() {
            switch (this.auction.status) {
                case 'preview':
                    return '预展中'
                case 'going':
                    return '拍卖中'
                case 'fail':
                case 'success':
                    return '拍卖已结束'
                default:
                    return '未支付'
            }
        },

        endTime() {
            if (this.auction.delay_count > 0) {
                return `${dateformat(this.auction.real_end_time, 'mm-dd HH:MM:ss')}
                        结束 (延时${this.auction.delay_count}次)`
            }
            return `${dateformat(this.auction.real_end_time, 'mm-dd HH:MM:ss')}结束`
        },

        currentTitle() {
            switch (this.auction.status) {
                case 'preview':
                case 'going':
                    return '当前价'
                case 'fail':
                case 'success':
                    return '结拍价'
                default:
                    return '当前价'
            }
        },

        currentPrice() {
            switch (this.auction.status) {
                case 'preview':
                    return '尚未开拍'
                case 'going':
                    // 当前价为0，默认显示起拍价
                    return this.auction.current_price || this.auction.upset_price || 0
                case 'fail':
                    return '已流拍'
                case 'success':
                    // 当前价为0，默认显示起拍价
                    return this.auction.current_price || this.auction.upset_price || 0
                default:
                    return '未支付'
            }
        },

        isEnd() {
            return this.auction.status === 'success' || this.auction.status === 'fail'
        },

        operationText() {
            switch (this.auction.status) {
                case 'preview':
                    return '拍卖尚未开始'
                case 'going':
                    return '出价'
                case 'fail':
                    return '已流拍'
                case 'success':
                    return '已结拍'
                default:
                    return '未支付'
            }
        }
    },

    route: {
        data({ to }) {
            if(!this.actionToApp(to)) {
                this.isAuction = this.$route.name === 'auction'
                if (this.isAuction) {
                    return this.$fetch('mall/auctions/'+ this.$route.params.id).then(auction => {
                        this.updateAuctionData(auction)
                    })
                } else {
                    return this.$fetch('mall/products/'+ this.$route.params.id).then(prod => {
                        _.update(prod, 'circle_size', size => size ? (this.env.version < 3.8 ? size/100 : size) : '')
                        this.setShareData(prod)
                        this.prod = prod
                        this.isSelf = _.get(this, 'self.id') == prod.owner.id

                        this.setAttributes(prod)
                    }, () => this.prod.status = '')
                }
            }
        }
    },

    methods: {
        onBuy() {
            if(this.isSelf) {
                this.action('toast', {success: 0, text: '您不能购买自己的商品'})
            } else {
                this.$router.go({ name: 'order-confirm', params: { id: this.$route.params.id } })
            }
        },

        onPage(path) {
            location.href = location.origin + path
        },

        setAttributes(prod) {
            this.attrs.length = 0
            this.attrs.push({
                name: '重量',
                value: (prod.weight || 0) + '克'
            }, ...prod.attrs.map(attr => {
                attr.value && (attr.value = attr.value.join(','))
                if (attr.value) {
                    attr.value = this.truncate(attr.value, /\d/.test(attr.value) ? 18 : 12)
                }
                return attr
            }))
        },

        // method about auction
        updateAuctionData(auction) {
            _.update(auction.product, 'circle_size', size => size ? (this.env.version < 3.8 ? size/100 : size) : '')
            this.setShareData(auction.product)
            this.auction = auction
            this.prod = auction.product
            this.statusUpdatedAt = auction.status_updated_at
            this.setAttributes(auction.product)

            if (_.includes(['preview', 'going'], this.auction.status)) {
                this.updateBidTime()
                this.bidTimeInterval && clearInterval(this.bidTimeInterval)
                this.bidTimeInterval = setInterval(() => {
                    this.auction.timestamp += 1000 // timestamp为服务器时间，用来进行倒计时
                    this.updateBidTime(this.bidTimeInterval)
                }, 1000)
            }
        },

        updateBidTime(bidTimeInterval) {
            let diffTime = ''
            if (this.auction.status === 'preview') {
                diffTime = date.diffNowTime(this.auction.start_time, true, this.auction.timestamp)
                if (diffTime) {
                    this.auctionTime = `距开始 ${diffTime}`
                } else {
                    bidTimeInterval && clearInterval(bidTimeInterval)
                    this.updating = true
                    this.auctionTime = '正在更新拍卖状态...'
                }
            } else if (this.auction.status === 'going') {
                diffTime = date.diffNowTime(this.auction.real_end_time, true, this.auction.timestamp)
                if (diffTime) {
                    this.auctionTime = `距结束 ${diffTime}`
                    this.auction.real_end_time - Date.now() <= FIVE_MINUTES && (this.delayRemind = true)
                } else {
                    bidTimeInterval && clearInterval(bidTimeInterval)
                    this.updating = true
                    this.auctionTime = '正在更新拍卖状态...'
                    this.delayRemind = false
                }
            }
        },

        bidPrice() {
            return this.$fetch(`mall/auctions/myb/margin_rule`).then(marginRules => {
                const lowPrice = this.auction.current_price ?
                    this.auction.current_price + this.auction.bid_increment : this.auction.upset_price
                if ((marginRules.over_amount &&
                        marginRules.over_amount - marginRules.auction_used_amount < lowPrice)
                    || marginRules.buyer_current_amount <= 0) {
                    this.$router.go({
                        name: 'pay-margin',
                        query: {
                            id: this.auction.id
                        }
                    })
                } else {
                    this.showBidPrice = true
                }
            })
        },

        checkAuctionStatus() {
            const checkUpdateInterval = setInterval(() => {
                this.$fetch('mall/auctions/'+ this.$route.params.id).then(auction => {
                    if (auction.status_updated_at !== this.statusUpdatedAt
                        || auction.real_end_time > this.auction.real_end_time) {
                        clearInterval(checkUpdateInterval)
                        this.updating = false
                        this.updateData(auction)
                        this.$broadcast('freshBids')
                    }
                    this.statusUpdatedAt = auction.status_updated_at
                })
            }, 1000)
        }
    },

    watch: {
        updating(newVal) {
            newVal && this.checkAuctionStatus()
        }
    },

    events: {
        bidDone(latestPrice) {
            this.auction.current_price = latestPrice
            this.$broadcast('freshBids')
        },

        refreshPrice(latestPrice) {
            this.auction.current_price = latestPrice
        }
    }
}
</script>
