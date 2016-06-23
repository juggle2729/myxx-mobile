<style lang="sass">

    .auction-view {
        @each $status,$color in (waiting: #2eb41c, ongoing: #cc3f4f, successful: #888888, failed: #888888) {
            .#{$status} {
                background-color: $color;
            }
            .font-#{$status} {
                color: $color;
            }
        }
        .auction-video {
            height: 576px;
        }
        .banner {
            height: 72px;
            line-height: 72px;
            padding: 0 32px;
            p:nth-child(1) {
                margin-right: 16px;
            }
            p:nth-child(2) {
                margin-right: 44px;
            }
        }
        .titles {
            padding: 36px 32px 32px 32px;
            .title {
                margin-bottom: 32px;
                line-height: 1.5;
            }
            .button {
                width: 160px;
                height: 64px;
                border-radius: 8px;
            }
        }
        .records {
            .title {
                height: 80px;
                line-height: 80px;
                padding: 0 32px;
                & > div > p:nth-child(2) {
                    margin-right: 18px;
                }
                & > div > p:nth-child(3) {
                    margin-right: 18px;
                }
                -webkit-box-pack: justify;
            }
            .icon-enter-slim {
                text-align: right;
                padding: 0px;
                margin: 0px;
            }
            .content {
                padding-left: 32px;
                li {
                    height: 80px;
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
        .master {
            height: 144px;
            padding: 32px;
            .avatar-90 {
                position: relative;
                bottom: 4px;
                margin-right: 20px;
            }
            .icon-enter {
                position: relative;
                bottom: -2px;
                margin-left: 14px;
                margin-right: -12px;
            }
            .master-name {
                margin-bottom: 14px;
            }
            .icon-enter-slim {
                position: relative;
                top: 1px;
                margin-left: 16px;
                padding: 0px;
            }
        }
        .detail-title {
            height: 72px;
            text-align: center;
            p {
                line-height: 72px;
            }
        }
        .detail {
            ul {
                padding-left: 32px;
                li {
                    height: 80px;
                    p:first-child {
                        margin-right: 180px;
                    }
                }
            }
            .detail-content {
                padding: 32px;
                line-height: 56px;
            }
            img {
                width: 100%
            }
        }
    }
</style>
<template>
    <div class="auction-view">
        <div class="auction-video video" v-bg="info.video" @click="play(info.video)" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750"></div>
        <div class="banner font-30 white flex" :class="info.status">
            <p class="icon-clock"></p>
            <template v-if="info.status === 'waiting'">
                <p>尚未开始</p>
                <p>{{info.start_time | moment}}开始</p>
            </template>
            <template v-if="info.status === 'ongoing'">
                <p>进行中</p>
                <p>{{info.end_time | moment}}结束</p>
            </template>
            <template v-if="info.status === 'successful'">
                <p>已结束，拍品已成交</p>
            </template>
            <template v-if="info.status === 'failed'">
                <p>已结束，拍品已流拍</p>
            </template>
        </div>
        <div class="titles">
            <div class="title font-32">{{info.title}}</div>
            <div class="flex margin-top">
                <p class="red font-32 flex-1"><span class="gray margin-right">当前价:</span><span class="font-40" :class="'font-' + info.status">￥{{info.current_price / 100}}</span></p>
                <div v-if="info.status === 'ongoing' && env.isWechat" v-link="{name: 'bidding', params: {id: info.id}}" class="button bg-red flex font-30 white"><div class="center-horizontal">我要出价</div></div>
                <div v-else class="button bg-disable flex font-30 white"><div class="center-horizontal">我要出价</div></div>
            </div>
        </div>
        <div class="separator-20"></div>
        <div class="records">
            <div class="title flex border-bottom font-26" v-link="{name: 'actionRecord', parmas: {id: info.id}}">
                <div class="flex">
                    <p class="gray icon-record"></p>
                    <p class="gray">拍卖记录</p>
                    <p class="gray">|</p>
                    <p class="light">{{records.length}}条</p>
                </div>
                <p class="gray icon-enter-slim"></p>
            </div>
            <div class="content">
                <template v-if="records.length">
                    <ul>
                        <li v-for="record in records" class="flex border-bottom font-26" :class="{red: !$index, gray: !!$index}" v-if="$index < 3">
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
        <div class="separator-20"></div>
        <div class="master flex border-bottom" v-link="{name: 'auctions', params: {id: info.owner.id}}">
                <avatar :user="info.owner" :size="90"></avatar>
                <div class="flex-1">
                    <p class="font-32 master-name">{{info.owner.name}}</p>
                    <p class="font-26 gray">{{info.owner.title}}</p>
                </div>
                <div class="red font-26 flex">
                    <span>更多拍卖</span><span class="icon-enter-slim gray"></span>
                </div>
        </div>
        <div class="detail-title bg-default border-bottom">
            <p class="font-26 light">
                —&nbsp;拍品信息&nbsp;—
            </p>
        </div>
        <div class="detail">
            <ul>
                <li class="flex font-26 border-bottom">
                    <p class="label gray">分类</p>
                    <p class="flex-1">{{info.category | tree}}</p>
                </li>
                <li class="flex font-26 border-bottom">
                    <p class="label gray">重量</p>
                    <p class="flex-1">{{info.weight}}g</p>
                </li>
                <li class="flex font-26 border-bottom">
                    <p class="label gray">尺寸</p>
                    <p class="flex-1">{{info.size}}</p>
                </li>
            </ul>
            <div class="detail-content font-30">
                {{info.detail}}
            </div>
            <div v-for="img in info.pictures" >
              <img :src="config.img + img + '?imageView2'" @click="coverflow(info.pictures, $index)"/>
            </div>
        </div>
    </div>
</template>
<script>
import shareable from 'shareable';
export default {
    name: 'AuctionView',
    mixins: [shareable],
    data() {
        return {
            info: {
                id: 0,
                owner: {},
                status: '',
                current_price: 0
            },
            records: {}
        }
    },
    ready() {
        this.$on('restore', () => {
            this.setShareData(this.info, true);
        });
    },
    route: {
        data({to}){
            return this.$get(`mall/auctions/${to.params.id}`).then((data) => {
                this.info = data;
                this.setShareData(data, true);
                this.$get(`mall/auctions/${to.params.id}/records`).then((data) => {
                    this.records = data.records;
                });
            });
        }
    }
}
</script>
