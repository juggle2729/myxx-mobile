<style lang="stylus">
@import '~style/partials/mixin'
bg($key)
    background-image url('//o0x80w5li.qnssl.com/live/' + $key + '.png')
    background-size cover
.live-view
    overflow hidden
    background #1a1a1a
    video
        object-fit cover !important
    .loading:before
        width 72px
        height @width
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
    .player
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background #1a1a1a
        z-index 1
    .placeholder
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        background #1a1a1a
        justify-content center
        z-index 2
        .hint.fz-42
            color #83838f
        .download-desc
            width 500px
            margin 10px auto 0
            font-size 28px
            line-height 1.4
            text-align center
        .download
            width 500px
            margin 54px auto 0
            .btn
                line-height 100px
                height 100px
                border-radius 50px
                font-size 36px
    .anchor-info
        position absolute
        top 22px
        left 10px
        padding 5px
        border-radius 45px
        max-width 90%
        background rgba(0, 0, 0, 0.2)
        height 90px
        z-index 5
        .avatar
            width 80px
            height 80px
            border-radius 50%
    .user-info
        flex-direction column
        align-items flex-start
    .join-count
        bg(browser_white)
        background-size 20px 16px
        padding-left 24px
        background-position left center
    .attention
        width 84px
        line-height 30px
        text-align center
        border-radius 15px
        margin-left 12px
        margin-right 26px
        position relative
        top -16px
        .btn
            background inherit
            display inline
        &.followed
            border(a, #ccc)
            color #ccc
        &.follow
            background-color white
            color #e61717
    .hint
        transform translate3d(0, -100px, 0)
        color #404040
    .im
        bg(im)
        position absolute
        bottom 20px
        left 30px
        width 80px
        height 80px
        z-index 5
    .definition
        bg(definition)
        position absolute
        bottom 20px
        left 141px
        width 80px
        height 80px
        color #fffefe
        padding-top 36px
        z-index 5
    .definition-select
        position absolute
        bottom 37px
        left 130px
        z-index 5
        width 100px
        height 533px
        background rgba(0, 0, 0, 0.8)
        border-radius 50px
        flex-direction column
        .flex-1
            color #6b6b6b
        .selected
            color #fffefe
            opacity 1
    .fade-leave, .fade-enter
        opacity 0
        transform translate3d(0, 120px, 0)
    .fade-transition
        transition all .2s ease-out
    .show-transition
        transition opacity .2s ease-out
    .show-leave, .show-enter
        opacity 0
    .messages
        position absolute
        left 10px
        bottom 138px
        width 512px
        max-height 540px
        overflow-y scroll
        overflow-x hidden
        z-index 5
        -webkit-overflow-scrolling touch
        &::-webkit-scrollbar
            display none
    .message
        display table
        padding 8px 17px
        background rgba(0, 0, 0, 0.2)
        line-height 1.4
        border-radius 29px
        &.system
            color #f2d84c
        &:not(.system)
            .message-user-name
                color #b8dd68
            .message-content
                color #fff
            .image-content
                color #6dcfd1
        & + .message
            margin-top 10px
    .auction-info
        position absolute
        bottom 34px
        right 10px
        z-index 5
        background rgba(0, 0, 0, 0.4)
        width 180px
        height 352px
        padding 15px 10px 11px
    .prod-picture
        width 100%
        height 120px
        align-items flex-end
    .bid-count
        width 100%
        line-height 30px
        background rgba(0, 0, 0, 0.4)
    .time-status
        justify-content center
        flex-direction column
        .ended, .preview
            width 100%
            line-height 50px
            background rgba(230, 23, 23, 0.3)
        .auction-bid
            width 100%
            line-height 50px
            background #e61717
        > :first-child
            color rgba(255, 255, 255, 0.6)
    .relative-product
        bg(relative_product)
        width 239px
        height 60px
        position absolute
        bottom 40px
        right 32px
        z-index 5
        > div
            right 16px
            top 50%
            transform translateY(-50%)
            width 30px
            line-height 30px
            background #f2d84c
            font-size 18px
            border-radius 15px
    .overlay
        width 100%
        background rgba(0, 0, 0, 0.4)
        height calc(200% / 7)
    .live-products
        position fixed
        top 0
        left 0
        z-index 6
        flex-direction column
        width 100%
        height 100%
        .products
            width 100%
            height calc(500% / 7)
            background white
        .product
            .mgl-21
                height 180px
                flex-direction column
                justify-content space-between
                align-items flex-start
        .title
            width 100%
            line-height 87px
    .product-list
        height calc(100% - 87px)
        overflow-y scroll
        -webkit-overflow-scrolling touch
        &::-webkit-scrollbar
            display none
    .product-img
        width 240px
        height 180px
    .purchase
        width 164px
        line-height 50px
        border-radius 25px
        &.sold, &.trading
            background #b3b3b3
    .justify-between
        justify-content space-between
        width 100%
    .product-price
        &:before
            content '￥'
            font-size 20px
            color #e61717
            display inline-block
            margin-right 6px
        &.fz-44:before
            font-size 26px
    .bids
        position absolute
        top 120px
        left 0
        z-index 5
        width 100%
    .bid
        width calc((100% - 50px) / 3)
        height 64px
        border-radius 32px
        background rgba(0, 0, 0, 0.2)
        & + .bid
            margin-left 8px
    .bidder-img
        width 60px
        height 60px
        border-radius 30px
        position relative
        z-index 2
    .bidder-name
        font-size 18px
        top 9px
        left 69px
    .bid-price
        bottom 6px
        right 22px
        font-size 26px
        &:before
            content '￥'
            font-size 18px
            color white
            display inline-block
    .bid-status
        width 70px
        line-height 24px
        text-align right
        bottom 6px
        left 38px
        z-index 1
        font-size 18px
        border-radius 12px
        background #3d3d3d
        padding-right 11px
        &.lead
            background #e61717
    .live-auction
        position fixed
        top 0
        left 0
        z-index 6
        flex-direction column
        width 100%
        height 100%
    .dialog-auction
        width 100%
        height calc(500% / 7)
        background white
        .title
            width 100%
            height 87px
            justify-content space-between
    .flex-column
        flex-direction column
    .fz-18
        font-size 18px
    .time-price-status
        height 140px
    .time
        width 156px
        height 100%
        justify-content center
        &.preview
            background #f5740a
        &.success, &.fail
            background #8f8f8f
        &.going
            background #e61717
    .price-status
        .flex-1
            flex-basis 0
            width 50%
        .flex-1:first-child
            align-items flex-start
    .symbol-wrapper
        align-items flex-end
    .content-wrapper
        height calc(100% - 87px)
        overflow-y scroll
        overflow-x hidden
        -webkit-overflow-scrolling touch
        &::-webkit-scrollbar
            display none
    .product-attribute
        padding 45px 0 58px 0
        > :first-child
            padding-left 67px
    .attribute
        margin-top 17px
        display inline-block
        width 50%
        &:nth-child(odd)
            padding-left 69px
    .attribute-list
        line-height 0
        margin-top 12px
    .product-description
        line-height 1.6
        padding 49px 37px 166px
        word-break break-all
        white-space pre-wrap
    .notification
        bg(notification)
        background-size 82px 83px
        background-position 21px center
        position absolute
        top 284px
        left 50%
        transform translate3d(-50%, 0, 0)
        width 459px
        min-height 120px
        word-break break-all
        border-radius 60px
        z-index 5
        background-color rgba(255, 255, 255, 0.7)
        justify-content center
        align-items flex-start
        padding-left 123px
        padding-right 20px
        :last-child
            line-height 1.2
    .play-button
        position fixed
        top 50%
        left 50%
        transform translate3d(-50%, -50%, 0)
        width 112px
        height 112px
        border-radius 50%
        z-index 6
        background-image url('//o0x80w5li.qnssl.com/icon/play.svg')
        background-size cover
    .swiper-outer
        width 100%
        height 72.5%
</style>
<template lang="pug">
.live-view.relative
    .play-button(v-if="showPlayButton", @click="startPlay()")
    .loading(v-if="showLoading || (!isReady && !isEnd && !isSuspend)")
    .player(v-if="!hasPlayback && isLive", id="J_prismPlayer", @click.stop="cancelDefinitionSelect()")
    .placeholder.flex(v-if="placeholder")
        .hint(:class="showDownload ? 'fz-42' : 'fz-28'")
            .center {{ placeholder[0] }}
            .mgt-10(:class="showDownload ? 'download-desc': ''") {{ placeholder[1] }}
            deep-link.download(v-if="showDownload") 下载美玉秀秀App
    .anchor-info.flex
        .avatar(v-bg.sm="live.user.photo || 'app/avatar.png'")
        .flex-1.flex.user-info.white.mgl-11
            .fz-28 {{ live.user.nickname }}
            .fz-20.mgt-12.join-count {{ joinCount || live.join_count }}
        deep-link.attention.fz-20.has-icon(:class="live.user.followed ? 'followed': 'follow'", :to="'/user/' + live.user.id") {{ live.user.followed ? '已关注': '关注' }}
    .bids.pdh-25.flex(v-if="auctionBids.length")
        .bid.relative.flex(v-for="bid in auctionBids")
            .bidder-img(v-bg.sm="bid.bidder.photo || 'app/avatar.png'")
            .bidder-name.absolute.white {{ bid.bidder.nickname | truncate 10 }}
            .white.absolute.bid-price {{ toYuan(bid.bid_price) }}
            .bid-status.absolute.white(:class="!$index ? 'lead' : ''") {{$index === 0 ? '领先' : '淘汰'}}
    .notification.flex.flex-column(v-if="messageNotification", transition='show')
        .fz-22.black-24 {{ messageNotification.title }}
        .fz-30.red-e6.mgt-10 {{ messageNotification.content }}
    .messages(v-if="imMessages && imMessages.length", @click.stop="cancelDefinitionSelect()")
        .wrapper
            .message.flex.fz-28(v-for="message in imMessages", :class="message.isSys ? 'system' : ''")
                span.message-user-name {{ (message.isSys ? '系统消息': message.user.name) + '：' }}
                span.message-content(:class="message.imageUri && 'image-content'", @click="previewImage(message.imageUri)") {{ message.imageUri ? '【图片】' : message.content }}
    .im(v-if="showPlayButton", @click="gotoDownload")
    .definition.fz-22.center(v-if="!hasPlayback && isLive", @click="showDefinitionSelect = !showDefinitionSelect") {{ definitions[definition] }}
    .auction-info.white(v-if="currentAuction", :class="currentAuction.status", @click="onAuctionDetail()")
        .fz-22.center - 当前拍品 -
        .prod-picture.mgt-13.flex(v-bg.md="currentAuction.product.first_picture")
            .center.fz-20.bid-count(v-if="currentAuction.bid_count > 0") {{ `出价：${currentAuction.bid_count}次` }}
        .time-status.flex.white
            template(v-if="currentAuction.status === 'success' || currentAuction.status === 'fail'")
                .fz-22.mgt-31 结束时间
                .fz-36.mgt-12 {{currentAuction.real_end_time | date 'HH:MM'}}
                .fz-30.mgt-24.ended.center 已结束
            template(v-if="currentAuction.status === 'going'")
                .fz-22.mgt-26 {{ currentAuction.delay_count ? ('延时' + currentAuction.delay_count + '次') : '倒计时' }}
                .fz-36.mgt-14 {{auctionCountDown}}
                .fz-30.mgt-30.auction-bid.center(@click="gotoDownload") 出价
            template(v-if="currentAuction.status === 'preview'")
                .fz-22.mgt-26 开拍时间
                .fz-36.mgt-14 {{currentAuction.start_time | date 'HH:MM'}}
                .fz-30.mgt-24.preview.center 尚未开拍
    .relative-product(v-if="live.live_type === 'other'", @click="showLiveProduct()")
        .red-e6.absolute.center {{ liveProducts.length }}
    .live-products.flex(v-if="showLiveProductDialog && liveProducts.length", transition= 'show')
        .overlay(@click="showLiveProductDialog = false")
        .products
            .fz-30.black-24.title.center.bdb 相关商品（{{liveProducts.length}}）
            .product-list
                .product.pd-39.flex.bdb(v-for="product in liveProducts", @click.stop="previewProductDetail($index)")
                    .product-img(v-bg.md="product.cover")
                    .mgl-21.flex.flex-1
                        .fz-30.gray-47 {{ product.title }}
                        .flex.justify-between
                            .red-e6.fz-32.product-price {{ toYuan(product.price) }}
                            .bg-red-e6.fz-28.white.center.purchase(:class="product.sell_status", @click.stop="purchase(product)") {{ product.sell_status === 'selling' ? '立即购买' : '已售出' }}
    .live-auction.flex(v-if="showAuctionDialog && dialogAuction", transition= 'show')
        .overlay(@click="showAuctionDialog = false")
        .dialog-auction
            .flex.title.pdh-30.fz-30.black-24
                .last(@click="lastAuction()") 上一件
                .auction-name {{'(' + (auctionIndex + 1) + '/' + specialAuction.auctions.length + ')'}} {{ dialogAuction.product.title | truncate 15}}
                .next(@click="nextAuction()") 下一件
            .content-wrapper
                .swiper-outer
                    custom-swiper(v-if='showSwiper', :item="dialogAuction.product", :type="'live'")
                .flex.time-price-status.bdb
                    .time.flex.white.flex-column(:class="dialogAuction.status")
                        template(v-if="dialogAuction.status === 'preview'")
                            .fz-22 开拍时间
                            .mgt-10.fz-36 {{ dialogAuction.start_time | date 'HH:MM' }}
                        template(v-if="dialogAuction.status === 'success' || dialogAuction.status === 'fail'")
                            .fz-32 {{ dialogAuction.status === 'success' ? '已结拍' : '已流拍' }}
                        template(v-if="dialogAuction.status === 'going'")
                            .fz-22 倒计时
                            .fz-36 {{ countDownTime(dialogAuction.real_end_time) }}
                    .price-status.flex.flex-1
                        .flex-1.flex.black-24.flex-column.mgl-41
                            .flex.symbol-wrapper
                                .fz-24 起拍价格
                                .fz-18 ￥
                                .fz-26 {{ toYuan(dialogAuction.upset_price) }}
                            .flex.mgt-13.symbol-wrapper
                                .fz-24 加价幅度
                                .fz-18 ￥
                                .fz-26 {{ toYuan(dialogAuction.bid_increment) }}
                        .flex-1.flex.flex-column.bdl(v-if="dialogAuction.status !== 'fail'")
                            template(v-if="dialogAuction.status === 'preview'")
                                .fz-24.black-24 当前价
                                .fz-36.mgt-8.yellow-f5 暂未开拍
                            template(v-if="dialogAuction.status === 'success'")
                                .fz-24.black-24 成交价
                                .mgt-8.black-24.flex.symbol-wrapper
                                    .fz-20 ￥
                                    .fz-42 {{ toYuan(dialogAuction.current_price) }}
                            template(v-if="dialogAuction.status === 'going'")
                                .fz-24.black-24 当前价
                                .mgt-8.red-e6.flex.symbol-wrapper
                                    .fz-20 ￥
                                    .fz-42 {{ toYuan(dialogAuction.current_price || dialogAuction.upset_price) }}
                .product-attribute.bg-gray-f7.bdb
                    .fz-24.gray-8f 商品属性
                    .attribute-list
                        .attribute.fz-28(v-for="attr in productAttributes")
                            span.gray-8f {{ attr.name }}
                            span.black-47(v-if="attr.value") {{ attr.value }}
                pre.product-description.fz-30.black-24(v-if="dialogAuction.product.detail") {{ dialogAuction.product.detail }}
    .live-auction.flex(v-if="showProductDialog && dialogProduct", transition= 'show')
        .overlay(@click="showProductDialog = false")
        .dialog-auction
            .flex.title.pdh-30.fz-30.black-24
                .last(@click="lastProduct()") 上一件
                .auction-name {{'(' + (productIndex + 1) + '/' + liveProducts.length + ')'}} {{ dialogProduct.title | truncate 15}}
                .next(@click="nextProduct()") 下一件
            .content-wrapper
                .swiper-outer
                    custom-swiper(v-if='showSwiper', :item="dialogProduct", :type="'live'")
                .flex.justify-between.pdh-42.time-price-status
                        .red-e6.fz-44.product-price {{ toYuan(dialogProduct.price) }}
                        .bg-red-e6.fz-28.white.center.purchase(:class="dialogProduct.sell_status", @click.stop="purchase(dialogProduct)") {{ dialogProduct.sell_status === 'selling' ? '立即购买' : '已售出' }}
                .product-attribute.bg-gray-f7.bdb
                    .fz-24.gray-8f 商品属性
                    .attribute-list
                        .attribute.fz-28(v-for="attr in productAttributes")
                            span.gray-8f {{ attr.name }}
                            span.black-47(v-if="attr.value") {{ attr.value }}
                pre.product-description.fz-30.black-24(v-if="dialogProduct.detail") {{ dialogProduct.detail }}
    .definition-select.flex.pdv-30(v-show="showDefinitionSelect", transition= 'fade')
        .fz-30.flex.flex-1(v-for="(key, value) in definitions", :class="key === definition ? 'selected': ''", @click="selectDefinition(key)") {{ value }}
</template>
<script>
import shareable from 'shareable'
import config from '../config'
import Q from 'q'
import CustomSwiper from "component/CustomSwiper.vue"
export default {
    name: 'live-view',
    mixins: [shareable],
    components: { CustomSwiper },
    data() {
        return {
            live: {
                status: '',
                pull_urls: {
                    lud: {}, // 超清
                    lhd: {}, // 高清
                    lsd: {}, // 标清
                    lld: {} // 流畅
                },
                user: {},
                playback_url: ''
            },
            isReady: true,
            isSuspend: false,
            isEnd: false,
            rongIM: {
                appKey: '',
                config: {
                    protobuf : "//cdn.ronghub.com/protobuf-2.2.8.min.js"
                },
                userId: 0,
                instance: null
            },
            player: null,
            imtoken: '',
            imMessages: [],
            imContainer: null,
            definition: 'lud', // 默认: 超清
            definitions: {
                lld: '流畅',
                lsd: '标清',
                lhd: '高清',
                lud: '超清'
            },
            showDefinitionSelect: false,
            specialAuction: null,
            currentAuction: null,
            auctionCountDown: '',
            auctionCountDownInterval: null,
            liveProducts: [],
            showLiveProductDialog: false,
            auctionBids: [],
            liveAuctions: {},
            showAuctionDialog: false,
            dialogAuction: null,
            auctionIndex: 0,
            showProductDialog: false,
            dialogProduct: {},
            productIndex: 0,
            cacheProducts: {},
            productAttributes: [],
            showSwiper: false, // 防止swiper缓存索引
            messageNotification: null,
            notificationShowTime: 3000,
            showPlayButton: false,
            showLoading: false,
            joinCount: 0
        }
    },

    computed: {
        placeholder() {
            if (this.isEnd) {
                return ['直播已结束', '进入美玉秀秀App，查看本场直播回放。还有更多精彩珠宝玉石相关直播哦~']
            } else if (this.isSuspend) {
                return ['主播离开一下', '精彩不断，不要走开']
            } else if(!this.isLive) {
                return ['直播尚未开始', '进入美玉秀秀App观看直播，更清晰更流畅，还能和主播零距离互动哦~']
            }
        },

        dialogAuctionId() {
            return this.specialAuction && this.specialAuction.auctions.map(auction => auction.id)[this.auctionIndex]
        },

        dialogProductId() {
            return this.liveProducts && this.liveProducts.map(product => product.id)[this.productIndex]
        },

        isLive() {
            return !!this.liveUrl()
        },

        hasPlayback() {
            return this.live && this.live.playback_url
        },

        imPictures() {
            return this.imMessages.filter(message => !!message.imageUri).map(message => message.imageUri)
        },

        showDownload() {
            return this.placeholder && /直播尚未开始|直播已结束/.test(this.placeholder[0])
        }
    },

    ready() {
        document.querySelector('#app').style.background = '#1a1a15'
    },

    route: {
        data({from, to, next}) {
            const liveGoProduct = this.$store.get('live-go-product')
            if (liveGoProduct) { // 刷新防止IM消息占线
                this.$store.remove('live-go-product')
                location.reload()
            } else {
                return this.$fetch('im/token').then(({ imtoken }) => {
                    return this.$fetch('live/live/'+ this.$route.params.id).then(live => {
                        this.setShareData(live)
                        this.live = live
                        this.imtoken = imtoken

                        // 只要有推流，才显示播放按钮
                        this.showPlayButton = this.env && this.env.isMobile && this.isLive

                        this.checkLiveData()
                        if (this.showPlayButton) { // 显示播放按钮的时候，才加载融云信息
                            this.loadRongIMChatMessage()
                        }
                        this.loadSpecialDetail()

                        // 检查是否为商品直播，并加载商品列表
                        if(!this.live.special_id) {
                            this.loadLiveProducts()
                        }
                    })
                })
            }
        },

        deactivate() {
            //断开连接，防止一直占线
            this.rongIM.instance && this.rongIM.instance.logout()
        }
    },

    methods: {
        paddingDate(str) {
            return _.padStart(str, 2, '0')
        },
        setMessageNotification(message) {
            const { content: { auction, bidder, delay_flag, delay_to, out_bid, bid_price, delay_duration, delay_count }, type } = message
            let delayTime = 0
            switch(type) {
                case 'start':
                    this.messageNotification = {
                        title: this.truncate(auction.product.title, 13),
                        content: '已开拍，可以出价了'
                    }
                    delayTime = this.notificationShowTime
                    break
                case 'bid':
                    let hasNotification = false
                    if (out_bid && out_bid.bidder && out_bid.bidder.id === this.self.id) { // 自己的出价信息
                        this.messageNotification = {
                            title: `您的出价被“${bidder.nickname}”超过`,
                            content: `当前最高出价￥${this.toYuan(bid_price)}`
                        }
                        hasNotification = true
                        delayTime = this.notificationShowTime
                    }

                    if (delay_flag) {
                        if (hasNotification) {
                            setTimeout(() => {
                                const endDate = new Date(delay_to)
                                this.messageNotification = {
                                    title: `最后${delay_duration}秒出价第${delay_count}次延时`,
                                    content: `结束时间 ${this.paddingDate(endDate.getHours())}:${this.paddingDate(endDate.getMinutes())}:${this.paddingDate(endDate.getSeconds())}`
                                }
                            }, this.notificationShowTime)
                            delayTime = this.notificationShowTime * 2
                        } else {
                            const endDate = new Date(delay_to)
                            this.messageNotification = {
                                title: `最后${delay_duration}秒出价第${delay_count}次延时`,
                                content: `结束时间 ${this.paddingDate(endDate.getHours())}:${this.paddingDate(endDate.getMinutes())}:${this.paddingDate(endDate.getSeconds())}`
                            }
                            delayTime = this.notificationShowTime
                        }
                    }
                    break
                case 'end':
                    if (auction.status === 'success') {
                        this.messageNotification = {
                            title: `${this.truncate(auction.product.title, 8)}已结拍`,
                            content: `恭喜“${auction.current_bidder.nickname}”成交价￥${this.toYuan(auction.current_price)}`
                        }
                        delayTime = this.notificationShowTime
                    }
                    break
            }

            if (delayTime > 0) {
                setTimeout(() => {
                    this.messageNotification = null
                }, delayTime)
            }
        },

        lastAuction() {
            this.auctionIndex--
            if (this.auctionIndex < 0) {
                this.auctionIndex = 0
                return
            }
            this.onAuctionDetail()
        },

        nextAuction() {
            this.auctionIndex++
            if (this.auctionIndex > this.specialAuction.auctions.length - 1) {
                this.auctionIndex = this.specialAuction.auctions.length - 1
                return
            }
            this.onAuctionDetail()
        },

        onAuctionDetail() {
            if (this.liveAuctions[this.dialogAuctionId]) {
                this.dialogAuction = this.liveAuctions[this.dialogAuctionId]
                this.generateAttributes(this.dialogAuction.product)
                this.showAuctionDialog = true
                this.showSwiper = false
                setTimeout(() => {
                    this.showSwiper = true
                }, 10)
                return
            }

            this.$fetch(`mall/auctions/${this.dialogAuctionId}`)
                .then(auction => {
                    this.liveAuctions[auction.id] = auction
                    this.dialogAuction = auction
                    this.generateAttributes(this.dialogAuction.product)
                    this.showAuctionDialog = true
                    this.showSwiper = false
                    setTimeout(() => {
                        this.showSwiper = true
                    }, 10)
                })
        },

        previewProductDetail(index) {
            this.productIndex = index
            this.onProductDetail()
        },

        lastProduct() {
            this.productIndex--
            if (this.productIndex < 0) {
                this.productIndex = 0
                return
            }
            this.onProductDetail()
        },

        nextProduct() {
            this.productIndex++
            if (this.productIndex > this.liveProducts.length - 1) {
                this.productIndex = this.liveProducts.length - 1
                return
            }
            this.onProductDetail()
        },

        onProductDetail() {
            if (this.cacheProducts[this.dialogProductId]) {
                this.dialogProduct = this.cacheProducts[this.dialogProductId]
                this.generateAttributes(this.dialogProduct)
                this.showProductDialog = true
                this.showSwiper = false
                setTimeout(() => {
                    this.showSwiper = true
                }, 10)
                return
            }

            this.$fetch(`mall/products/${this.dialogProductId}`)
                .then(product => {
                    this.cacheProducts[product.id] = product
                    this.dialogProduct = product
                    this.generateAttributes(this.dialogProduct)
                    this.showProductDialog = true
                    this.showSwiper = false
                    setTimeout(() => {
                        this.showSwiper = true
                    }, 10)
                })
        },

        generateAttributes(product) {
            this.productAttributes.length = 0
            this.productAttributes.push({
                name: '重量',
                value: product.weight + '克'
            }, ...product.attrs.map(attr => {
                attr.value && (attr.value = attr.value.join(','))
                if (attr.value) {
                    attr.value = this.truncate(attr.value, /\d/.test(attr.value) ? 18 : 12)
                }
                return attr
            }))
        },

        purchase(product) {
            if (product.sell_status !== 'selling') return
            document.querySelector('#app').style.background = 'inherit'

            this.$router.go({ name: 'order-confirm', params: { id: product.id } })
            this.showLiveProductDialog = false
            this.showProductDialog = false

            this.$store.set('live-go-product', true)
        },

        showLiveProduct() {
            this.showLiveProductDialog = true
        },

        loadLiveProducts() {
            this.$fetch(`live/products`, { live_id: this.live.id })
                .then(({ products }) => {
                    this.liveProducts = products
                })
        },

        loadSpecialDetail() {
            this.live.special_id && this.$fetch(`mall/auctions/special/${this.live.special_id}`)
                .then(specialAuction => {
                    this.specialAuction = specialAuction

                    const auctions = specialAuction.auctions
                    let targetAuction = auctions[auctions.length - 1]
                    for (let i = 0, len = auctions.length; i < len; i++) {
                        // 找出第一个还未结束的拍卖，包括预展中或者拍卖中的；否则，取最后一个
                        if (/preview|going/.test(auctions[i].status)) {
                            targetAuction = auctions[i]
                            this.auctionIndex = i
                            break
                        }
                    }
                    this.currentAuction = targetAuction

                    // 清除旧的定时器
                    this.clearAuctionCountDown()
                    this.checkAuctionCountDown()

                    // 加载出价记录
                    this.loadAuctionBids()
                })
        },

        clearAuctionCountDown() {
            if (this.auctionCountDownInterval) {
                clearInterval(this.auctionCountDownInterval)
                this.auctionCountDownInterval = null
            }
        },

        countDownTime(targetTime) {
            const diff = targetTime - this.live.timestamp

            const seconds = Math.ceil(diff / 1000)
            if (seconds <= 0) return ''

            const minutes = Math.floor(seconds / 60)
            return `${minutes > 0 ? minutes + '\'' : ''}${seconds % 60}"`
        },

        checkAuctionCountDown() {
            if (this.currentAuction) {
                if (this.currentAuction.status === 'going') {
                    // 拍卖中代码层面需要做倒计时，防止IM消息接收不到，状态不同步，且页面也会展示
                    this.auctionCountDown = this.countDownTime(this.currentAuction.real_end_time)
                    if (!this.auctionCountDown) {
                        this.loadSpecialDetail() // 如果倒计时结束，需要重新请求专场信息
                        this.clearAuctionCountDown()
                        return
                    }

                    if (!this.auctionCountDownInterval) {
                        this.auctionCountDownInterval = setInterval(() => {
                            this.live.timestamp += 1000
                            this.checkAuctionCountDown()
                        }, 1000)
                    }
                } else if (this.currentAuction.status === 'preview') {
                    // 预展中代码层面需要做倒计时，防止IM消息接收不到，状态不同步，但页面不展示
                    const countDownStr = this.countDownTime(this.currentAuction.start_time)
                    if (!countDownStr) {
                        this.loadSpecialDetail() // 如果倒计时结束，需要重新请求专场信息
                        this.clearAuctionCountDown()
                        return
                    }

                    if (!this.auctionCountDownInterval) {
                        this.auctionCountDownInterval = setInterval(() => {
                            this.live.timestamp += 1000
                            this.checkAuctionCountDown()
                        }, 1000)
                    }
                }
            }
            return ''
        },

        loadAuctionBids() {
            this.$fetch(`mall/auctions/${this.currentAuction.id}/bids`)
                .then(({ bids }) => {
                    this.auctionBids = bids.length > 3 ? bids.slice(0, 3) : bids
                })
        },

        previewImage(imageUri) {
            if(!imageUri) return
            this.coverflow(this.imPictures, _.indexOf(this.imPictures, imageUri))
        },

        selectDefinition(definition) {
            this.definition = definition
            this.cancelDefinitionSelect()
            this.player.loadByUrl(this.liveUrl())
        },

        cancelDefinitionSelect() {
            this.showDefinitionSelect = false
        },

        liveUrl() {
            if (!this.live.pull_urls || this.live.status !== 'going') return ''
            return this.env && this.env.isMobile ? this.live.pull_urls[this.definition].m3u8_url: this.live.pull_urls[this.definition].flv_url
        },

        checkLiveData() {
            if (this.hasPlayback || this.live.status === 'end') { // 已有回放
                this.isReady = true
                this.isEnd = true
                this.isSuspend = false
            } else if (this.isLive) {
                setTimeout(this.createPlayer, 100)
            } else { // 直播尚未开始
                this.isReady = true
                this.isEnd = false
                this.isSuspend = false
            }
        },

        startPlay() {
            if(this.hasPlayback) {
                this.play(this.live.playback_url)
            } else if (this.isLive) {
                this.isReady = false
                this.player && this.player.loadByUrl(this.liveUrl())
                this.showPlayButton = false
                this.showLoading = true
            }
        },

        createPlayer() {
            if (!this.player) {
                this.player = new Aliplayer({
                    id: 'J_prismPlayer',
                    autoplay: true,
                    isLive: this.isLive,
                    width: '100%',
                    height: '100%',
                    playsinline: true,
                    controlBarVisibility: 'hover',
                    useH5Prism:true,
                    source: this.liveUrl(),
                    x5_video_position: 'top',
                    x5_orientation: 'portraint',
                    x5_type: 'h5',
                    x5_fullscreen: true,
                    cover: config.img + this.live.picture,
                    showBuffer: false,
                    skinLayout: false
                })
            }

            this.player.on('liveStreamStop', () => {
                console.log('liveStreamStop')
                this.playerSuspend(true)
            })

            this.player.on('onM3u8Retry', () => {
                console.log('onM3u8Retry')
                this.playerSuspend()
            })

            this.player.on('play', () => {
                console.log('play')
                this.isReady = true
                this.isSuspend = false
                this.isEnd = false
                this.env && this.env.isIOS && (this.showPlayButton = false)
                this.showLoading = false
            })

            this.player.on('error', () => {
                console.log('error')
                this.playerSuspend(true)
            })
        },

        playerSuspend(reconnect = false) {
            this.isEnd = this.live.status === 'end'
            this.isSuspend = true
            this.isReady = false
            this.showPlayButton = true
            reconnect && !this.isEnd && this.player.loadByUrl(this.liveUrl())
        },

        loadRongIMChatMessage() {
            this.rongIM.appKey = !this.env || this.env.isTest ? 'z3v5yqkbvpuc0': 'uwd1c0sxdytj1'
            this.imtoken && this.live.chat_room_id && this.initRongIMInstance().then(instance => {
                instance.joinChatRoom(this.live.chat_room_id, 50, {
                    onSuccess: () => {
                        console.log("joinChatRoom Successfully");
                    },
                    onError: error => {
                        console.log("joinChatRoom:errorcode: " + error);
                    }
                })

            })
        },

        isNewMessage(message) {
            return message.sentTime > this.live.timestamp
        },

        initRongIMInstance() {
            return Q.promise(resolve => {
                RongIMLib.RongIMClient.init(this.rongIM.appKey, null, this.rongIM.config)

                // 直接初始化
                RongIMLib.RongIMEmoji.init()

                // 连接状态监听器
                RongIMClient.setConnectionStatusListener({
                    onChanged:  status => {
                        switch (status) {
                            case RongIMLib.ConnectionStatus["CONNECTED"]:
                                this.rongIM.instance = RongIMClient.getInstance()
                                resolve(this.rongIM.instance)
                                console.log("连接成功")
                                break;
                            case RongIMLib.ConnectionStatus["CONNECTING"]:
                                console.log("连接中")
                                break;
                            case RongIMLib.ConnectionStatus["DISCONNECTED"]:
                                console.log("当前用户主动断开链接")
                                break;
                            case RongIMLib.ConnectionStatus["NETWORK_UNAVAILABLE"]:
                                console.log("网络不可用")
                                break;
                            case RongIMLib.ConnectionStatus["CONNECTION_CLOSED"]:
                                console.log("未知原因，连接关闭")
                                break;
                            case RongIMLib.ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]:
                                console.log("用户账户在其他设备登录，本机会被踢掉线")
                                this.action('confirm', {
                                    text: '聊天室账户已在其他设备登录',
                                    labels: ['忽略', '重连']
                                }).then(choice => {
                                    choice === '1' && location.reload(true)
                                })
                                break;
                            case RongIMLib.ConnectionStatus["DOMAIN_INCORRECT"]:
                                console.log("当前运行域名错误，请检查安全域名配置")
                                break;
                        }
                    }
                })

                RongIMClient.setOnReceiveMessageListener({
                    // 接收到的消息
                    onReceived: imMessage => {
                        console.log(imMessage)
                        const { objectName, content: { content, imageUri, user, message} } = imMessage
                        switch (imMessage.messageType) {
                            case RongIMClient.MessageType.TextMessage:
                                this.imMessages.push({ content: RongIMLib.RongIMEmoji.symbolToEmoji(content), user })
                                break
                            case RongIMClient.MessageType.ImageMessage:
                                this.imMessages.push({ content, user, imageUri })
                                break
                            case RongIMClient.MessageType.UnknownMessage: // 自定义消息
                                const { auction, bidder, delay_flag, out_bid, bid_price, delay_duration } = message.content
                                const isNewMessage = this.isNewMessage(imMessage)
                                switch (objectName) {
                                    case 'AC:start': // 开拍
                                        this.imMessages.push({ isSys: true, content: `@所有人，${auction.product.title}已经开拍，可以参与竞价。` })

                                        if (isNewMessage) { // 新的拍品开始拍卖，需要更新拍品信息
                                            this.loadSpecialDetail()
                                            this.setMessageNotification({ content: message.content, type: 'start' })
                                        }
                                        break
                                    case 'AC:end': // 结束
                                        if (auction.status === 'success') {
                                            this.imMessages.push({ isSys: true,
                                                content: `@所有人，${auction.product.title}已经结拍，成交价${this.toYuan(auction.current_price)}，恭喜${auction.current_bidder.nickname}！` })
                                        } else {
                                            this.imMessages.push({ isSys: true, content: `@所有人，${auction.product.title}无人出价已流拍。` })
                                        }

                                        if (isNewMessage) { // 当前拍品结束，需要更新拍品信息
                                            this.loadSpecialDetail()
                                            this.setMessageNotification({ content: message.content, type: 'end' })
                                        }
                                        break
                                    case 'AC:bid': // 出价信息
                                        if (out_bid && out_bid.bidder && out_bid.bidder.id === this.self.id) { // 被超过人是自己的时候才显示
                                            this.imMessages.push({ isSys: true,
                                                content: `@${out_bid.bidder.nickname}，您的出价被${bidder.nickname}超过了，当前价${this.toYuan(bid_price)}` })
                                        }
                                        if (delay_flag) { // 延时提醒
                                            this.imMessages.push({ isSys: true, content: `@所有人，延时期有人出价，拍品结束时间延时${delay_duration}秒` })
                                        }

                                        if (isNewMessage) { // 有新的出价记录，需要更新出价列表
                                            this.loadSpecialDetail()
                                            this.setMessageNotification({ content: message.content, type: 'bid' })
                                        }
                                        break
                                    case 'LIVE_PRODUCT:count':
                                        if (message.content.count !== this.liveProducts.length && isNewMessage) { // 数字有变化且是新消息
                                            this.loadLiveProducts() // 重新加载商品信息
                                        }
                                        break
                                    case 'LIVE_JOIN:count':
                                        if (isNewMessage) { // 判断是否是新消息
                                            this.joinCount = message.content.count
                                        }
                                        break
                                }
                                break
                        }
                        setTimeout(() => {
                            if (!this.imContainer) this.imContainer = this.$el.querySelector('.messages')
                            if (!this.imContainer) return

                            const messages = this.imContainer.querySelectorAll('.message')
                            messages[messages.length - 1].scrollIntoView(true)
                        }, 200)
                    }
                })

                //开始链接
                RongIMClient.connect(this.imtoken, {
                    onSuccess: userId => {
                        this.rongIM.userId = userId
                        console.log("链接成功，用户id：" + userId)
                    },
                    onTokenIncorrect: () => {
                        console.log('token无效')
                    },
                    onError: errorCode => {
                        console.log('Connect Error~ ' + errorCode)
                    }
                })
            })
        }
    }
}
</script>