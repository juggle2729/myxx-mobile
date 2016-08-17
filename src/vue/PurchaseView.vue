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
                border-radius: 100% / 30% 30% 100% 100%;
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
        .operation {
            height: 90px;
            line-height: 90px;
            border-radius: 8px;
            text-align: center;
            width: 48%;
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
            .price {
                margin-top: 20px;
            }
            .desc {
                padding: 28px 0 40px;
            }
        }
    }
    .empty-component {
        background-color: #efefef;
    }
}
</style>
<template lang="jade">
.purchase-view.bg-default(:class="{'share': env.isShare}")
    .purchase.bg-white
        header.flex
            avatar(:user="purchase.owner")
            .margin-left.font-30.gray.flex-1 {{purchase.owner.nickname}}
            .guarantee.font-22.gray.border-all(v-if="purchase.status !== 'np'")
                span.symbol.white ￥
                span 保证金已付
        .desc.font-30
            span.red 预算{{purchase.price_max | price}}左右
            |   {{purchase.description}}
        ul.medias.scrollable
            li(v-for="pic in purchase.pictures", track-by="$index", @click="coverflow(purchase.pictures, $index)")
                img(:src="config.img + pic + '?imageView2/2/h/450'")
        ul.tags.font-22
            li(v-for="att in purchase.attributes", track-by="$index") {{att}}
        div(v-if="purchase.status === 'np'")
            .flex.font-30
                .operation.margin-right.border-all(@click="delete(purchase.id)") 删除此求购
                .operation.white.bg-red(@click="action('pay', {id: purchase.id, price: deposit, type: 'purchase'})") 立即支付保证金
        div(v-else)
            .deadline.font-26.light(v-if="hasBidAuth")
                span.gray 距离竞标结束
                span.red(v-if="days") {{days}}
                span.light(v-if="days") 天
                span.red(v-if="hours || days") {{hours}}
                span.light(v-if="hours || days") 小时
                span.red(v-if="minutes || hours") {{minutes}}
                span.light(v-if="minutes || hours") 分
                span.red(v-if="second || minutes") {{second}}
                span.light(v-if="second || minutes") 秒
            .join.bg-gray.white.center.font-30(v-if="!isSelf", :class="{'bg-red': hasBidAuth}", @click="joinBid()") {{purchase.status === 'fn' ? '竞标期已结束' : (purchase.open_seat ? '我要竞拍' : '竞拍名额已满')}}
    .win.center(v-if="purchase.wins && purchase.wins.length > 0")
        header.font-26.gray 中标作品   {{purchase.win_count}}
        .items.bg-white.border-red(v-for="win in purchase.wins", v-link="{name: 'jade', params: {id: win.product.id}}")
            .img.avatar(v-bg="win.shop.logo")
            .win-count.font-22.light 近期中标{{win.shop.recent_win_count}}笔
            .name.font-26.gray {{win.shop.shop_name}}
            .img.jade(v-bg="win.product.first_picture")
                img(:src="'purchase/bid.png' | qn", alt="bid")
                span.font-26.white {{win.product.price | price}}
            .desc.font-30.omit-2 {{win.description}}
    .auction.center(v-if="purchase.bids && purchase.bids.length > 0")
        header.font-26.gray 竞标作品   {{purchase.bid_count}}
        .items.bg-white(v-for="bid in purchase.bids")
            div(v-link="{name: 'jade', params: {id: bid.product.id}}")
                .img.avatar(v-bg="bid.shop.logo")
                .win-count.font-22.light 近期中标{{bid.shop.recent_win_count}}笔
                .name.font-26.gray {{bid.shop.shop_name}}
                .img.jade(v-bg="bid.product.first_picture")
                    span.font-26.white {{win.product.price | price}}
                .price.red.font-30 竞标底价{{bid.ceil_price | price}}
                .desc.font-30.omit-2 {{bid.description}}
    empty(v-if="!purchase.bid_count", title="暂无竞标作品")
</template>
<script>
import Q from 'q';
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
        },
        deposit() {
            return Math.ceil(this.purchase.price_max/100)*0.03;
        },
        isSelf() {
            return _.get(this, 'self.id') == this.purchase.owner.id;
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
                this.timer(data.closed_at)();
                setInterval(this.timer(data.closed_at), 1000);
                this.setShareData({title: data.description}, true);
            });
        }
    },
    methods: {
        joinBid() {
            if(this.hasBidAuth) {
                if(!this.env.isShare) {
                    Q.promise(resolve => {
                        if(this.self) {
                            resolve();
                        } else {
                            this.action('login').then(resolve);
                        }
                    }).then(() => {
                        const userInfo = this.purchase.conf.user_conf;
                        if(!userInfo.add_product || userInfo.shop_audit_status === 'unaudited') {
                            this.action('toast', {text: '认证工作室或认证商家才可竞标，您可以联系客服认证'});
                        } else if(!userInfo.shop_remain_bids) {
                            this.action('toast', {text: '您今天参与的竞标数已达上限，明天再试吧'});
                        } else if (!userInfo.shop_remain_products) {
                            this.action('toast', {text: '您目前没有可以发布竞标的商品，可以发商品后再参与竞标'});
                        } else {
                            this.action('newBid', {id: this.purchase.id});
                        }
                    });
                } else {
                    window.location.href = this.config.download;
                }
            }
        },
        delete(id) { //删除求购
            this.$delete(`mall/purchase/${id}`).then(() => {
                this.action('back', {refresh: true});
            });
        },
        live() { // params目前没有确定
            if(_.get(this, 'self.id') == this.purchase.owner.id) {
                this.action('toast', {text: '等待native接口中~~'});
            } else {
                this.action('toast', {text: '只有求购者才能直播看货'});
            }
        },
        timer(end) {
            return () => {
                const remainHours = (end - Date.now())/(1000*60*60);
                this.days = Math.floor(remainHours/24);
                this.hours = Math.floor(remainHours%24);
                this.minutes = Math.floor((remainHours*60) % 60);
                this.second = Math.floor((remainHours*60*60) % 60);
            }
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
