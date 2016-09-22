<style lang="stylus">
@import '~style/partials/mixin'
.auction-view
    padding-bottom: 146px
    .status
        line-height: 72px
        &.auctioning
            background: #389d00
        &.preview
            background: #2170c1
        &.successful
            background: #393939
    .play-btn
        border(a, #fff)
        width: 200px
        right: 28px
        top: -84px
        line-height: 60px
        border-radius: 6px
        background: rgba(0, 0, 0, 0.5)
    .arrow-right
        width: 0
        height: 0
        border-top: 15px solid transparent
        border-bottom: 15px solid transparent
        border-left: 25px solid #fff
        font-size: 0
        line-height: 0
        vertical-align: super
    .shop-info
        line-height: 120px
        height: 120px
        padding: 0 32px
        .photo
            width: 80px
            height: 80px
            border-radius: 6px
        .icon-down-slim
            transform: rotate(270deg)
    .detail
        padding: 44px 32px 36px
        .desc
            line-height: 40px
    .tag
        padding: 8px 12px
        border-radius: 6px
        font-size: 20px
    .tag + .tag
        margin-left: 16px
    .bid
        .top
            height: 86px
            padding: 0 32px
        .list
            padding-left: 24px
            .list-item
                height: 120px
                padding-left: 24px
            .list-item:not(:first-child)
                padding-right: 80px
            .list-item:not(:last-child)
                border-bottom: 0.5px dashed #d9d9d9
            .list-item.leading
                .name
                    color: #389d00
                .fz-40
                    color: #389d00
    .leading-txt
        width: 60px
        height: 34px
        line-height: 34px
        background: #389d00
        vertical-align: 8px
    .icon-refresh
        font-size: 28px
    .no-data
        line-height: 124px
    .level-comp
        transform: translateY(-6px)
        img
            width: 47px
            height: 41px
    .opers
        .flex-2
            line-height: 98px
            height: 98px
            &.active
                background: #ea8f23
            &.end
                background: #b2b2b2
        [class^=icon-]
            display: block
            margin-bottom: 6px
        .flex-1
            padding: 17px 0
    .bottom
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        z-index: 1
        & .price
            background-color: #f2f2f2
            height: 48px
            padding: 0 36px
    .alarm.active
        color: #cc3f4f
    .offer-area
        position: fixed
        bottom: 0
        left: 0
        width: 100%
        z-index: 2
        height: 0
        transition: height .3s
        &.active
            height: 338px
        & .price
            background-color: #f2f2f2
            height: 60px
            padding: 0 36px
        .latest
            color: #ea8f23
        .area
            height: 180px
        .minus, .add
            width: 80px
            height: 80px
            line-height: 54px
            border-radius: 8px
            display: inline-block
        .minus
            background: #f0f0f0
        .add
            background: #ea8f23
        .offer
            height: 98px
            line-height: 98px
            background: #ea8f23
</style>
<template lang="jade">
.auction-view(@click="closeOffer()")
    slider(:ids="auction.product.pictures", :height="slideHeight")
    .status.fz-30.white.center.relative(:class="itemClass(auction.status)")
        .play-btn.absolute.center(v-if="auction.product.video", @click="play(auction.product.video)")
            span.arrow-right.center-v.mgr-12
            span 播放视频
        template(v-if="auction.status === 'auctioning'")
            span 距结束
            countdown(:msecs="auction.end_time")
        template(v-if="auction.status === 'preview'")
            span 距开始
            countdown(:msecs="auction.start_time")
        template(v-if="auction.status === 'successful'")
            span 已结拍
    .shop-info.flex(v-link="{name: 'shop', params: {id: auction.shop.id}}")
        .flex.flex-1
            .photo(v-bg='auction.shop.logo')
            .name.mgl-20.fz-30.gray {{auction.shop.shop_name}}
            lv.flex-1.mgl-20(:lv="auction.shop.level || 0")
        .block.icon-down-slim.fz-30.light
    .hr
    .detail.fz-30
        .title {{auction.product.title}}
        .desc.gray.mgt-32 {{auction.product.detail}}
        .tags.flex.mgt-32
            .tag.gray.bg-light(v-for="tag in auction.product.tags") {{tag.name}}
    .hr
    .bid
        .top.flex.bdb
            .fz-26.gray.flex-1 出价 {{items.length}}
            .oper.flex(@click="refresh()")
                .icon-refresh.center-v
                .fz-26.mgl-16 刷新
        .list(v-if="items.length")
            .list-item.flex(v-for="item in items", :class="{'leading': !$index}")
                .flex.flex-1
                    avatar(:user="item.bidder", :size="68")
                    .flex-1.mgl-20
                        .name.fz-30 {{item.bidder.nickname}}
                        .date.fz-22.light.mgt-10 {{item.create_at | date 'm月dd日 H:MM'}}
                .fz-40(:class="{'gray': $index}")
                    span.unit.fz-30 ￥
                    span {{item.bid_price/1000}}
                    span.leading-txt.white.fz-22.inline-block.center.mgl-22(v-if='!$index') 领先
        .no-data.fz-30.light.center(v-if="!items.length") {{auction.status === 'preview' ? '等待开拍': '暂无出价'}}
    .bottom
        .price.flex.fz-22.gray.bg-light
            .flex-1 起拍价 {{auction.upset_price | price}}
            div 加价幅度 {{auction.bid_increment | price}}
        .opers.bg-white.flex
            .flex-1.center(@click="chat()")
                .icon-contact.fz-34.light
                .fz-22.gray 私信
            .flex-1.bdl.center.alarm(@click="alarm()", :class="{'active': auction.has_remind}")
                .icon-alarm.fz-34(:class="{'light': !auction.has_remind}")
                .fz-22(:class="{'gray': !auction.has_remind}") 提醒
            .flex-2.fz-30.white.center(@click.stop="onOperation()", :class="operClass()")
                template(v-if="auction.has_paid_margin && auction.status === 'auctioning'")
                    span 我要出价
                template(v-if="auction.has_paid_margin && auction.status === 'preview'")
                    span 保证金已付
                template(v-if="!auction.has_paid_margin")
                    .fz-28.white.mgt-18 我要参加
                    .fz-22.white.mgt-10 (保证金{{auction.margin | price}})
                template(v-if="auction.status === 'successful' && !auction.has_win")
                    span 已结拍
                template(v-if="auction.status === 'successful' && auction.has_win")
                    span 立即购买
    .offer-area(:class="{'active': showOffer}", @click.stop="openOffer()")
        .price.flex.fz-22.gray.bg-light
            .flex-1 起拍价 {{auction.upset_price | price}}
            .flex-1 当前价 {{auction.current_price | price}}
            div 加价幅度 {{auction.bid_increment | price}}
        .area.center.bg-white
            .center-v
                span.minus(@click.stop="minus()")
                    span.fz-30.light.icon-subtract
                span.fz-40.latest.mgh-48 {{latestPrice | price}}
                span.add(@click.stop="add()")
                    span.fz-30.white.icon-add
        .offer.center.fz-30.white(@click.stop="confirm()") 确定出价
</template>
<script>
import shareable from 'shareable'
import paging from 'paging'

import countdown from 'component/Countdown.vue'
import Slider from 'component/Slider.vue'
import Lv from 'component/Lv.vue'
export default {
    name: 'auction-view',
    mixins: [shareable, paging],
    components: {Slider, countdown, Lv},
    data() {
        return {
            auction: {
                product: {},
                shop: {}
            },
            id: '',
            latestPrice: 0,
            showOffer: false
        }
    },
    computed: {
        slideHeight() {
            return window.innerWidth + 'px'
        },
        paging() {
            return {
                path: `mall/auctions/${this.$route.params.id}/bids`,
                list: 'bids'
            }
        },
        isOwnAuction() {
            return this.auction.shop.owner && this.self && this.auction.shop.owner.id === this.self.id
        }
    },
    route: {
        data({ to }) {
            this.id = to.params.id
            return this.loadAuction()
        }
    },
    methods: {
        itemClass(status) {
            return {
                preview: status === 'preview',
                auctioning: status === 'auctioning',
                successful: status === 'successful'
            }
        },
        operClass() {
            return {
                'bg-gray': this.isOwnAuction,
                active: (!this.isOwnAuction && this.auction.status !== 'successful') ||
                    (this.auction.status === 'successful' && this.auction.has_win),
                end: this.auction.status === 'successful' && !this.auction.has_win
            }
        },
        refresh() {
            this.fetch(true)
        },
        onOperation() {
            // 赢得拍卖，且已经结拍
            if(this.auction.has_win && this.auction.status === 'successful') {
                this.action('orderConfirm', {product: this.auction.product.id})
            } else if(!this.auction.has_paid_margin) { // 未支付保证金
                this.action('pay', {id: this.id, price: this.auction.margin, type: 'auction'})
            } else if(this.auction.status === 'auctioning'){ // 已经支付保证金，且开始拍卖
                this.openOffer()
            }
        },
        minus() {
            if(this.latestPrice <= this.auction.current_price) {
                return
            }
            this.latestPrice -= this.auction.bid_increment
        },
        add() {
            this.latestPrice += this.auction.bid_increment
        },
        confirm() {
            this.$post(`mall/auctions/${this.id}/bids`, {
                bid_price: this.latestPrice
            }).then(() => {
                this.loadAuction(() => this.closeOffer())
            }, () => this.closeOffer())
        },
        loadAuction(callback) {
            return this.$fetch(`mall/auctions/${this.id}`).then(data => {
                this.auction = data
                this.latestPrice = this.auction.current_price

                this.setShareData({
                    title: this.auction.product.title,
                    name: !!this.self ? this.self.nickname : '',
                    pictures: this.auction.product.pictures
                }, true)

                _.isFunction(callback) && callback()
            })
        },
        openOffer() {
            this.showOffer = true
        },
        closeOffer() {
            this.showOffer = false
        },
        chat() {
            this.action('chat', {
                id: this.auction.shop.owner.id,
                name: this.auction.shop.owner.nickname,
                product: this.auction.product.id
            })
        },
        alarm() {
            if(!this.auction.has_remind) {
                this.$post(`mall/auctions/${this.id}/remind`).then(() => this.auction.has_remind = true)
            } else {
                this.$delete(`mall/auctions/${this.id}/remind`).then(() => this.auction.has_remind = false)
            }
        }
    }
}
</script>
