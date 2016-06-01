<style lang="sass">
@import '../styles/partials/var';
    .auctions-view {
        height: 100%;
        .border-none {
            border: 0px;
        }
        .auction {
            .auction-info {
                padding: 18px 32px;
                img {
                    width: 110px;
                    height: 110px;
                    margin-right:12px;
                }
                .auction-title {
                    color: #393939;
                    p {
                        font-size: 30px;
                        line-height: 50px;
                    }
                    .auction-price {

                    }
                    .auction-bid {
                        font-size: 26px;
                        color: #888888;
                    }
                }
            }
            .aution-status {
                height: 80px;
                & > div {
                    margin-left: 32px;
                    span {
                        vertical-align: middle;
                    }
                }
            }
        }
        .empty {
            margin-top: 120px;
            position: relative;
            height: 100%;
            .empty-img {
                margin-bottom: 40px;
                width: 160px;
                height: 160px;
                background-image: url('//o0x80w5li.qnssl.com/placeholder/empty.png');
                background-size: 100% 100%;
            }
            .instruction {
                padding: 42px 50px 50px 50px;
                p:first-child {
                    text-align: center;

                }
                p {
                    margin-bottom: 20px;
                    line-height: 44px;
                }
            }
        }
    }
</style>
<template>
    <div class="auctions-view bg-default">
        <template v-if="items.length">
            <div class="auction  bg-white" v-for="auction in items" v-link="{name: 'auction', params: {id: auction.id}}">
                <div class="separator-20 border-bottom-none"></div>
                <div class="auction-info border-bottom flex">
                    <img :src="config.img + auction.product_picture + '?imageView2'"/>
                    <div class="auction-title info flex-1">
                        <p>{{auction.product_title}}</p>
                        <div class="flex">
                            <p class="auction-price font-30 {{color[$index]}} flex-1">{{auction.current_price | price}}</p>
                            <p class="auction-bid">{{auction.bid_count}}人出价</p>
                        </div>
                    </div>
                </div>
                <div class="aution-status">
                    <div class="flex center-vertical font-30">
                        <p class="icon-clock {{color[$index]}}"></p>
                        <p class="{{color[$index]}} margin-right">{{dsc[$index]}}</p>
                        <p class="{{color[$index]}}" v-if="auction.status==='ongoing'">{{auction.end_time | moment}}结束</p>
                        <p class="{{color[$index]}}" v-if="auction.status==='waiting'">{{auction.start_time | moment}}开始</p>
                    </div>
                </div>
            </div>
            <div class="separator-20 border-none"></div>
        </template>
        <!-- <partial v-else name="empty-page"></partial> -->
        <div v-else class="empty bg-white">
            <div class="empty-img center-horizontal"></div>
            <div class="center font-30 gray">暂无数据</div>
            <article class="instruction font-30">
                <p>
                    <span class="gray">—</span>&nbsp;微信拍卖工具使用须知&nbsp;<span class="gray">—</span>
                </p>
                <p class="gray">
                    1.通过微信拍卖工具，可以将美玉秀秀中的商品转化为拍卖品，好友登录微信账号可以参与拍卖。目前拍卖工具只能在微信中使用。
                </p>
                <p class="gray">
                    2.拍卖过程中的出价为虚拟出价，出价人并未实际付款，具体商品的付款和后续交易需要买卖双方自行协商。
                </p>
                <p class="gray">
                    3.微信出价需要验证手机号，拍卖结果将以短信的方式告知，如果拍卖成功，商品所有者将通过手机号与竞拍者取得联系。
                </p>
                <p class="gray">
                    4.美玉秀秀平台仅提供技术支持，在实际拍卖过程中，平台不会参与买卖双方的付款、物流等交易环节。
                </p>
            </article>
        </div>
    </div>
</template>
<script>
import paging from 'paging';
export default {
    name: 'AuctionsView',
    mixins: [paging],
    data() {
        return {
            user_id: 0,
        };
    },
    computed: {
        paging(){
            return {
                path: 'mall/auctions',
                list: 'auctions',
                params: {
                    user_id: this.user_id
                },
                limit: 10,
            }
        },
        color() {
           return this.items.map((auction) => {
                       if(auction.status === 'ongoing') {
                           return 'red';
                       }else if(auction.status === 'waiting') {
                           return 'green';
                       }else {
                           return 'gray';
                       }
                   });

       },
       dsc() {
           return this.items.map((auction) => {
                       if(auction.status === 'ongoing') {
                           return '进行中';
                       }else if(auction.status === 'waiting') {
                           return '尚未开始';
                       }else if(auction.status === 'successful') {
                           return '已结束，拍卖已成交';
                       }else {
                           return '已流拍';
                       }
                    });
       }
    },
    route: {
        data({to}) {
            this.user_id = to.params.id;
            return this.fetch();
        }
    }
}
</script>
