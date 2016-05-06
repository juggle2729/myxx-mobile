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
                p {
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
        <div class="auction  bg-white" v-for="auction in auctions">
            <div class="auction-info border-bottom flex">
                <img :src="config.img + auction.product_picture + '?imageView2'" @click="coverflow(info.pictures, $index)"/>
                <div class="auction-title info flex-1">
                    <p>{{auction.product_title}}</p>
                    <div class="flex">
                        <p class="auction-price font-30 {{color[$index]}} flex-1">￥{{auction.current_price}}</p>
                        <p class="auction-bid">{{auction.bid_count}}人出价</p>
                    </div>
                </div>
            </div>
            <div class="aution-status">
                <p>
                    <span class="font-30 icon-price {{color[$index]}}">{{dsc[$index]}}</span>
                    <span class="font-30 {{color[$index]}}" v-if="auction.status==='ongoing'">{{auction.end_time | moment}}结束</span>
                    <span class="font-30 {{color[$index]}}" v-if="auction.status==='waiting'">{{auction.start_time | moment}}开始</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AuctionsView',
    components: {

    },
    data() {
        return {
            auctions: [
                {
                    "id": 1,
                    "bid_count": 10,
                    "start_time": 1462525200000,
                    "end_time": 1462698000000,
                    "current_price": 12000,
                    "product_picture": '979275e8-9d70-4d57-891e-ed936b899b61',
                    "product_title": "俏色白玉籽料摆件，年年有余年年有余年年有余",
                    "status": 'ongoing',
                    "create_at": 1462525200000
                },
                {
                    "id": 2,
                    "bid_count": 5,
                    "start_time": 1462525200000,
                    "end_time": 1462698000000,
                    "current_price": 15000,
                    "product_picture": '979275e8-9d70-4d57-891e-ed936b899b61',
                    "product_title": "俏色白玉籽料摆件，年年有余",
                    "status": 'waiting',
                    "create_at": 1462525200000
                },
                {
                    "id": 2,
                    "bid_count": 5,
                    "start_time": 1462525200000,
                    "end_time": 1462698000000,
                    "current_price": 15000,
                    "product_picture": '979275e8-9d70-4d57-891e-ed936b899b61',
                    "product_title": "俏色白玉籽料摆件，年年有余",
                    "status": 'successful',
                    "create_at": 1462525200000
                },
                {
                    "id": 2,
                    "bid_count": 5,
                    "start_time": 1462525200000,
                    "end_time": 1462698000000,
                    "current_price": 15000,
                    "product_picture": '979275e8-9d70-4d57-891e-ed936b899b61',
                    "product_title": "俏色白玉籽料摆件，年年有余",
                    "status": 'failed',
                    "create_at": 1462525200000
                }
            ]
        };
    },
    computed: {
       color() {
           return this.auctions.map((auction) => {
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
           return this.auctions.map((auction) => {
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

    }
}
</script>
