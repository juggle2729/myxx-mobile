<style lang="stylus">
@import '~style/partials/var'
@import '~style/partials/mixin'
.auction-view
    position: relative
    padding-top 100px
    .status-bar
        height 72px
        .bold
            line-height 40px
            border-radius 4px
        &.preview, &.unpaid
            background-color #f1ab47
            .bold
                color: #f1ab47
        &.going
            background-color #e61717
            .bold
                color: #e61717
        &.fail,&.success
            background-color #888
            .bold
                color: #888
    .delay-explain, .delay-remind
        border-color #efefef
        .icon-enter
            width 14px
            height 24px
            transform translateY(-6px)
    .titles
        .header
            padding 36px 32px 0
            .flex > *
                border-radius 20px
                line-height 40px
            .official
                background url('//o0x80w5li.qnssl.com/icon/official_auction.png') no-repeat 16px 5px
                background-size 30px 30px
                margin-right 5px
            .margin
                background url('//o0x80w5li.qnssl.com/auction/gurantee-2.png') no-repeat 8px -2px
                background-size 40px 40px
                margin-right 5px
            .price
                height 144px
                &.preview .current-price
                    color #c6c6c6
                &.going, &.success
                    .current-price
                        color #e61717
                &.fail .current-price
                    color #393939
                .separator
                    width 1px
                    height 72px
        .guarantee
            line-height: 0
            position: relative
            img
                // height: 97px
                width: 100%
            .icon-enter
                height: 24px
                width: 12px
                position: absolute
                right: 32px
                top: 36px
    .master
        height: 72px
        line-height: 72px
        .name
            height: 72px
            line-height: 72px
        img
            display: block
            height: 26px
            width: 26px
    .shop
        height: 144px
        padding: 0 32px
        .img
            height: 100px
            width: 100px
            border-radius: 6px
            margin-right: 20px
        .name
            width: 380px
            .line-clamp
                line-height: 1.2
        .address
            max-width: 92%
            font-size: 0.34rem
        img
            width 44px
            height @width
            margin-bottom 8px
        .center
            width 100px
        .level-comp
            width 144px
            height 33px
            img
                width 100%
                height 100%
    .guarantee .icon-enter
        color: #f1ab47
    .placeholder
        height: 110px
    .float-box
        border(t, #d9d9d9)
        bottom 0
        height 98px
        width 100%
        .shop-btn, .alarm-btn
            font-size 22px
            flex-direction column
            .btn
                font-size: 22px
            [class^='icon-'], [class*=' icon-']
                padding: 0
                height: 1.6em
                width: @height
        .separator
            width 1px
            height 100%
            border(r, #d9d9d9)
        > div:last-child
            line-height 98px
        &.third
            > .flex-1
                width 25%
            > .flex-3
                width 75%
        &.second
            > .flex-1
                width 25%
            > .flex-2
                width 50%
    .prod-attr
        header
            height 90px
            line-height @height
        ul
            font-size 0
            padding 10px 32px 30px
            & > li
                padding-top 20px
                display inline-block
                width 50%
                p
                    display inline-block
                    & + p
                        padding-left 32px
    .prod-detail
        padding-top: 6px
        .img
            line-height: 0  /*暂时修复图片下面多出一部分空白的问题*/
            img
                width: 100%
                &:not(:last-child)
                    margin-bottom: 6px
    .prod-banner
        font-size 0
        .banner
            background-size 100%
            position relative
            text-align center
            a
                background-color white
                color #e61717
                font-size 26px
                font-weight bold
                height 90px
                line-height @height
                border-radius 8px
                position absolute
                left 50%
                transform translate3d(-50%, 0, 0)
                bottom 46px
                display inline-block
                width 90%
                width calc(100% - 64px)
    .prod-related
        .recommends > a
            margin: 0 0 20px 15px
        .tag-title
            line-height 90px
        .tags
            padding 0 20px 28px
            font-size 0
            .tag
                display inline-block
                line-height 68px
                border-radius 8px
                & + .tag
                    margin-left 20px
    .auction:after
        content '>'
        margin-left 8px
        position relative
        bottom 2px
    .wechat-code
        img
            max-width 100%
    .alarm-desc
        line-height 1.5
</style>
<template lang="pug">
.auction-view(v-if="auction.id")
    auction-header-menu(v-bind:number="goodsNumber")
    custom-swiper(:item="prod")
    .status-bar.flex.pdl-32.fz-26(:class="auction.status")
        .bold.pdh-12.bg-white(v-if="updating") 更新中
        .bold.pdh-12.bg-white(v-if="!updating") {{ statusText }}
        .white.mgl-16(v-if="!(auction.status === 'fail' || auction.status === 'success')") {{ auctionTime }}
        .white.mgl-16(v-if="auction.status === 'fail' || auction.status === 'success'") {{ endTime }}
    .delay-explain.line-height-72.pdh-32.bdb.flex.red(v-if="auction.delay_remind_text", v-link="{name: 'delay-records', params: {id: auction.id}}")
        .fz-22 {{ auction.delay_remind_text }}
        .flex-1
        icon(name="enter")
    .delay-remind.line-height-72.pdh-32.bdb.flex.red.fz-22(v-if="!auction.delay_remind_text && delayRemind") 最后5分钟，进入延时竞价周期
    .titles.bg-white
        .header
            .title.fz-32 {{ prod.title }}
            .flex.fz-22.gray.mgt-30.mgb-24
                .official.pdl-49.pdr-19.bd(v-if="auction.product.shop.is_official_shop") 官方拍卖
                .margin.pdl-49.pdr-19.bd 保证金已付
                .mail.pdh-19.bd(v-if="auction.free_shipping") 包邮
                .flex-1.txt-right.gray-b3 {{ auction.click_count }}人围观
            .price.flex.fz-22(:class="auction.status")
                .flex-1.center
                    .current-title {{ currentTitle }}
                    template(v-if="lodash.isString(currentPrice)")
                        .current-price.mgt-12.fz-36.bold {{ currentPrice }}
                    template(v-if="lodash.isNumber(currentPrice)")
                        .current-price.mgt-12.fz-36.bold {{ currentPrice | price }}
                .separator.bdl
                .flex-1.center
                    .start-title 起拍价
                    .bold.fz-36.mgt-12.fz-36.bold(:class="auction.status === 'preview' ? 'yellow-f1' : ''") {{ auction.upset_price | price }}
                .separator.bdl
                .flex-1.center
                    .increase-title 加价幅度
                    .mgt-12.fz-36.bold {{ auction.bid_increment | price }}
        .guarantee(@click="$root.popup = {handler: 'guarantee'}")
            img(:src="'product/term.png?v1' | qn")
            icon.fz-26(name="enter")
    .hr
    auction-bids(v-if='auction.id', :id='auction.id', :status='auction.status', :limit='3')
    .hr
    .shop.bg-white.flex.detail(v-link="{name: 'shop', params: {id: prod.shop.id}}")
        .img(v-bg='prod.shop.logo')
        .flex-1
            .fz-30.flex.mgb-12.name
                .line-clamp {{prod.shop.shop_name}}
                .brand-shop.mgl-10(v-if="prod.shop.brand_shop")
            .fz-26.gray.flex
                icon(name="location")
                div(:class="{'address': prod.shop.pd_count_today, 'line-clamp-1': prod.shop.pd_count_today}") {{prod.shop.locale_name}}
        .center
            .fz-30.red {{prod.shop.auction_count}}
            .fz-22.gray.mgt-14 正在拍卖
    .hr
    .prod-attr
        header.fz-26.gray.pdh-32.bdb 商品属性
        ul
            template(v-for="attr in attrs")
                li.fz-26(v-if="prod[attr.k]")
                    p.label.gray {{attr.l}}
                    p {{prod[attr.k].name || prod[attr.k]}}{{attr.u}}
    .hr
    .prod-detail.bg-white
        .pd-32.user-txt.fz-30(v-if="prod.detail") {{{prod.detail | input}}}
        .img
            img(:src="config.img + img + '?imageView2/0/w/750'", v-for="img in prod.pictures", @click="coverflow(prod.pictures, $index)")
    .prod-banner
        template(v-for="banner in banners")
            .hr
            .banner(:style="banner.style")
                a(v-if="banner.title", href="/help/eco-system") {{banner.title}}
    .hr
    .prod-related(v-if="related.length")
        .tag-title.fz-26.gray.pdl-20 相关推荐
        .recommends.bg.pdt(v-if="related.length")
            product-card(v-for="item in related", :item="item")
            deep-link(v-if="env.isShare") 没找到感兴趣的，打开美玉秀秀看看吧！
    .bg.placeholder
    .float-box.flex.fixed.fz-30.bg-white(:class="isEnd ? 'third' : 'second'")
        .flex.flex-1.alarm-btn(v-if="!isEnd", :class="auction.reminded ? 'red' : 'gray'", @click="toggleAlarm")
            icon.fz-32(:name="auction.reminded ? 'alarmed' : 'alarm'")
            .mgt-6 {{ auction.reminded ? '已设置提醒' : '设置提醒' }}
        .separator(v-if="!isEnd")
        .white.fz-30.center(:class="[auction.status === 'going' ? 'bg-red' : 'bg-gray', isEnd ? 'flex-3' : 'flex-2']", @click="bidPrice") {{ operationText }}
    auction-bid-price(:show.sync="showBidPrice", :auction="auction")
    download-dialog(:show.sync="showContact")
        <!--.fz-36.center 参拍提醒-->
        p.mgt-40.alarm-desc 长按识别二维码，或微信搜索"美玉秀秀"后关注美玉秀秀公众号，即可及时收到参拍提醒
        .img.wechat-code.mgt-40.pd-20.bd-gray-e6
            img(src="//o0x80w5li.qnssl.com/auction/wechatQRcode.png")
</template>
<script>
import shareable from 'shareable'
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
import CustomSwiper from "component/CustomSwiper.vue";
import AuctionBids from 'component/AuctionBids.vue'
import ProductCard from 'component/item/ProductCard.vue'
import AuctionBidPrice from 'component/AuctionBidPrice.vue'
import date from '../util/date'
import DownloadDialog from 'component/DownloadDialog.vue'
import dateformat from 'dateformat'
const FIVE_MINUTES = 5 * 60 * 1000
export default {
    name: 'auction-view',
    mixins: [shareable],
    components: {AuctionHeaderMenu, CustomSwiper, AuctionBids, ProductCard, AuctionBidPrice, DownloadDialog },

    data() {
        return {
            auction: {
                product: {
                    owner: {},
                    shop: {},
                    tags: [],
                    banner: [],
                    auction: {}
                },
                reminded: false
            },
            related: [],
            showBidPrice: false,
            attrs: [
                {k: 'material', l: '产状'},
                {k: 'weight', l: '重量', u: '克'},
                {k: 'category', l: '分类'},
                {k: 'size', l: '尺寸', u: 'mm'},
                {k: 'circle_size', l: '圈口', u: 'mm'},
                {k: 'skin', l: '皮色'},
                {k: 'variety', l: '种类'},
                {k: 'place', l: '产地'},
                {k: 'certificate', l: '证书'},
                {k: 'gift_to', l: '赠送对象'},
                {k: 'gift_when', l: '赠送场合'},
                {k: 'theme', l: '题材'},
                {k: 'moral', l: '寓意'},
                {k: 'genre', l: '流派'}
            ],
            auctionLoadDone: false, // 拍卖数据是否加载完成
            relatedLoadDone: false, // 推荐数据是否加载完成
            showContact: false,
            auctionTime: '',
            delayRemind: false,
            updating: false,
            statusUpdatedAt: '',
            bidTimeInterval: null,
            goodsNumber: 3,
        }
    },

    computed: {
        banners() {
            return this.prod.banner.map(b => {
                return {
                    ...b,
                    style: {
                        paddingTop: b.height / b.width * 100  + '%',
                        backgroundImage: `url('${this.config.img + b.image}_750')`
                    }
                }
            })
        },

        prod() {
            return this.auction.product
        },

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

    ready() {
        this.$fetch(`mall/auctions/${this.$route.params.id}/rmd`).then(resp => {
            this.related = resp.products
            this.relatedLoadDone = true
            this.checkLeavePosition()
        })
    },

    route: {
        data({ to }) {
            if(!this.actionToApp(to)) {
                return this.$fetch('mall/auctions/'+ this.$route.params.id).then(auction => {
                    this.updateData(auction)
                })
            }
        }
    },

    methods: {
        checkLeavePosition() {
            if (!this.relatedLoadDone || !this.auctionLoadDone) {
                return
            }
            this.checkDetailLeavePosition();
        },

        toggleAlarm() {
            this[this.auction.reminded ? '$delete' : '$post'](`mall/auctions/myb/${this.$route.params.id}/remind`)
                .then(() => {
                    this.auction.reminded = !this.auction.reminded
                    if (this.auction.reminded) {
                        this.showContact = true
                    } else {
                        this.action('toast', {
                            success: 1,
                            text: '取消提醒成功'
                        })
                    }
                })
        },

        bidPrice() {
            if (this.auction.status !== 'going') {
                return
            }
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

        updateData(auction) {
            _.update(auction.product, 'circle_size', size => size ? (this.env.version < 3.8 ? size/100 : size) : '')
            this.setShareData(auction.product)
            this.auction = auction
            this.auctionLoadDone = true
            this.statusUpdatedAt = auction.status_updated_at
            this.checkLeavePosition()

            if (_.includes(['preview', 'going'], this.auction.status)) {
                this.updateBidTime()
                this.bidTimeInterval && clearInterval(this.bidTimeInterval)
                this.bidTimeInterval = setInterval(() => {
                    this.auction.timestamp += 1000 // timestamp为服务器时间，用来进行倒计时
                    this.updateBidTime(this.bidTimeInterval)
                }, 1000)
            }
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