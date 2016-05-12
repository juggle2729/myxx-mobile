<style lang="sass">
    .auctions-view {
        padding-bottom: 80px;
        padding-top: 1px;
        height: 100%;
        .auction {
            margin-top:20px;
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

    }
</style>
<template>
    <div class="auctions-view bg-default">
        <div class="auction  bg-white" v-for="auction in items" v-link="{name: 'auction', params: {id: auction.id}}">
            <div class="auction-info border-bottom flex">
                <img :src="config.img + auction.product_picture + '?imageView2'" @click="coverflow(auction.product_picture, 0)"/>
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
