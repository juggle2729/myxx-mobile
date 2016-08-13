<style lang="sass">
.purchase-view {
    &.share {
        padding-bottom: 112px;
    }
    .purchase {
        padding: 36px 32px;
        .guarantee {
            height: 48px;
            line-height: 48px;
            border-radius: 6px;
            padding: 0 12px;
            .symbol {
                height: 30px;
                width: 24px;
                border-radius: 30% 30% 100% 100%;
                background-color: #7ec3fd;
                margin-right: 5px;
            }
        }
        .desc {
            margin: 36px 0;
            word-wrap: break-word;
        }
        .medias {
            li {
                margin-right: 10px;
            }
            img {
                height: 4rem;
            }
        }
        .tags {
            margin: 24px 0 32px 0;
            li {
                display: inline-block;
                color: #c6c6c6;
                background-color: #f5f5f5;
                border-radius: 12px;
                padding: 8px 12px;
                margin-right: 16px;
            }
        }
        .deadline .red {
            margin: 0 5px;
        }
        .join {
            height: 90px;
            line-height: 90px;
            border-radius: 8px;
            margin-top: 36px;
        }
    }
    .auction, .win {
        padding: 60px 0 40px;
        .items {
            margin: 74px 24px 0;
            border-radius: 12px;
            position: relative;
            .avatar {
                height: 68px;
                width: 68px;
                border-radius: 6px;
                position: absolute;
                top: -34px;
                left: 45%;
                box-shadow: 0 0 0 6px white;
                margin-bottom: 14px;
            }
            .win-count {
                text-align: right;
                padding: 24px 24px 0 0;
            }
            .jade {
                height: 280px;
                width: 280px;
                margin: 30px auto 0;
                position: relative;
                span {
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                }
                img {
                    height: 144px;
                    width: 144px;
                    border-radius: 50%;
                    position: absolute;
                    top: -52px;
                    right: -52px;
                    z-index: 999;
                }
            }
            .desc {
                padding: 44px 0 40px;
            }
            .social {
                height: 100px;
                line-height: 48px;
                .live {
                    color: #389d00;
                    .icon-live {
                        transform: scale(1.5);
                    }
                }
            }
        }
    }
}
</style>
<template lang="jade">
.purchase-view.bg-default(:class="{'share': env.isShare}")
    .purchase.bg-white
        header.flex
            avatar(:user="purchase.owner")
            .margin-left.font-30.gray.flex-1 {{purchase.owner.nickname}}
            .guarantee.font-22.gray.border-all
                span.symbol.white ￥
                span 保证金已付
        .desc.font-30
            span.red 预算{{purchase.price_max | price}}左右
            |   {{purchase.description}}
        ul.medias.scrollable
            li(v-for="pic in purchase.pictures", track-by="$index")
                img(:src="config.img + pic + '?imageView2/2/h/450'")
        ul.tags.font-22
            li(v-for="att in purchase.attributes", track-by="$index") {{att}}
        .deadline.font-26.light(v-if="hasBidAuth")
            span.gray 距离竞标结束
            span.red {{days}} 天
            span.red {{hours}} 小时
            span.red {{minutes}} 分
            span.red {{second}} 秒
        .join.bg-gray.white.center.font-30(:class="{'bg-red': hasBidAuth}", @click="joinBid()") {{purchase.status === 'fn' ? '竞标期已结束' : (purchase.open_seat ? '我要竞拍' : '竞拍名额已满')}}
    .win.center
        header.font-26.gray 中标作品   {{purchase.win_count}}
        .items.bg-white.border-red(v-for="win in purchase.wins", v-link="{name: 'jade', params: {id: win.product.id}}")
            .img.avatar(v-bg="win.shop.logo")
            .win-count.font-22.light 近期中标{{win.shop.recent_win_count}}笔
            .name.font-26.gray {{win.shop.shop_name}}
            .img.jade(v-bg="win.product.first_picture")
                img(:src="'purchase/bid.png' | qn", alt="bid")
                span.font-26.white {{win.product.price | price}}
            .desc.font-30.omit-2 {{win.description}}
    .auction.center
        header.font-26.gray 竞标作品   {{purchase.bid_count}}
        .items.bg-white(v-for="bid in purchase.bids")
            div(v-link="{name: 'jade', params: {id: bid.product.id}}")
                .img.avatar(v-bg="bid.shop.logo")
                .win-count.font-22.light 近期中标{{bid.shop.recent_win_count}}笔
                .name.font-26.gray {{bid.shop.shop_name}}
                .img.jade(v-bg="bid.product.first_picture")
                    span.font-26.white {{win.product.price | price}}
                .desc.font-30.omit-2
                    span.red 竞标底价{{bid.ceil_price | price}}
                    | {{bid.description}}
            .social.border-top.flex.font-30
                .flex-1.border-right.live
                    span.icon-live(@click="live()")
                    span 直播看货
                .flex-1
                    like(:count="bid.like_count", :target="bid.id", :type="110", :active="bid.liked")
    empty(v-if="!purchase.bid_count", title="暂无竞标作品")
</template>
<script>
import like from 'component/Like.vue';
import shareable from 'shareable';
export default {
    name: 'PurchaseView',
    mixins: [shareable],
    components: {
        like
    },
    computed: {
        hasBidAuth() {
            return this.purchase.open_seat && this.purchase.status !== 'fn';
        }
    },
    data() {
        return {
            days: '',
            hours: '',
            minutes: '',
            second: '',
            purchase: {
                owner: {}
            },
            win: {
                shop: {},
                product: {}
            },
            bid: {
                shop: {},
                product: {}
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/purchase/${to.params.id}`).then((data) => {
                this.purchase = data;
                this.timer(data.paid_at, data.closed_at);
                this.setShareData({title: data.description}, true);
            });
        }
    },
    methods: {
        joinBid() {
            if(this.hasBidAuth) {
                if(!this.env.isShare) {
                    this.action('toast', {text: '等待native接口中~~'});
                } else {
                    window.location.href = this.config.download;
                }
            }
        },
        live() { // params目前没有确定
            if(_.get(this, 'self.id') == this.purchase.owner.id) {
                this.action('toast', {text: '等待native接口中~~'});
            } else {
                this.action('toast', {text: '只有求购者才能直播看货'});
            }
        },
        timer(begin, end) {
            const remainHours = (1471940270000 - Date.now())/(1000*60*60);
            this.days = remainHours/24 < 1 ? '00' : Math.floor(remainHours/24);
            this.hours = remainHours%24 < 1 ? '00' : Math.floor(remainHours%24);
            this.minutes = (remainHours*60) % 60 < 1 ? '00' : Math.floor((remainHours*60) % 60);
            this.second = (remainHours*60*60) % 60 < 1 ? '00' : Math.floor((remainHours*60*60) % 60);
            // improve 待验证
            // let d = 1471940270000 - Date.now();
            // console.log(d);
            // const arr = [['天', 24*60*60], ['小时', 60*60], ['分钟', 60], ['秒', 1]];
            // const diff = arr
            //     .filter(([,v]) => v <= d)
            //     .map(([k, v], i, arr) => Math.floor((i ? d%arr[i-1][1] : d)/v) + k)
            //     .join(',');
            // console.log(diff);
        }
    }
}
</script>
