<style lang="sass">
    .auction-record-view {
        .title {
            height: 80px;
            line-height: 80px;
            padding: 0 32px;
            p:nth-child(2) {
                margin-right: 18px;
            }
            p:nth-child(3) {
                margin-right: 18px;
            }
        }
        .icon-enter {
            text-align: right;
            width: 480px;
        }
        .content {
            li {
                height: 80px;
                padding-left: 32px;
            }
            div[class^=avatar] {
                margin-right: 22px;
            }
            ul, .no-record {
                height: 240px;
            }
            .no-record {
                text-align: center;
            }
            .bidder-name {
                width: 130px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .bidder-status {
                width: 120px;
                text-align: center;
            }
            .bidder-time {
                width: 200px;
                text-align: center;
            }
            .bidder-price {
                width: 170px;
                text-align: right;
            }
        }
    }
</style>
<template>
    <div class="auction-record-view">
        <div class="content">
            <template v-if="items.length">
                <ul>
                    <li v-for="record in items" class="flex border-bottom font-26" :class="{red: !$index, gray: !!$index}">
                            <avatar :user="record.bidder" :size="50"></avatar>
                            <p class="bidder-name">{{record.bidder.name}}</p>
                            <p class="bidder-status">{{$index === 0 ? '领先' : '出局'}}</p>
                            <p class="bidder-time">{{record.create_at | moment}}</p>
                            <p class="bidder-price">￥{{record.bid_price / 100}}</p>
                    </li>
                </ul>
            </template>
            <template v-else>
                <div class="no-record">
                    <p class="font-26 light center-vertical">
                        暂无拍卖记录
                    </p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import paging from 'paging';
export default {
    name: 'AuctionRecordView',
    mixins: [paging],
    data(){
        return {
            id: 0
        };
    },
    computed: {
        paging() {
            return {
                path: `mall/auctions/${this.id}/records`,
                list: 'records',
                id: 'id',
                params: {
                    limit: 10
                }
            }
        }
    },
    route: {
        data({to}){
            this.id = to.params.id;
            return this.fetch();
        }
    }
}
</script>
