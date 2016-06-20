<style lang="sass">
    .add-auction-view {
        .title {
            padding: 32px 32px 20px 32px;
        }
        .jade-detail {
            height: 146px;
            padding: 18px 32px 18px 32px;
            border-top: 1px solid #d9d9d9;
            border-bottom: 1px solid #d9d9d9;
            .jade-img {
                width: 110px;
                height: 110px;
                background-size: 100% 100%;
            }
            .jade-content {
                margin-left: 18px;
                p:first-child {
                    margin-bottom: 18px;
                }
            }
        }
        .auction-detail {
            border-top: 1px solid #d9d9d9;
            border-bottom: 1px solid #d9d9d9;
            .wrapper {
                padding-left: 32px;
            }
            label {
                line-height: 86px;
            }
            input {
                display: block;
                // width: 430px;
                height: 84px;
                border: 0px;
                text-align: right;
                &::-webkit-input-placeholder {
                    color: #c6c6c6;
                }
            }
            .auction-price {
                input {
                    width: 490px;
                    margin-right: 30px;
                }
            }
            .auction-range {
                div.select {
                    margin-right: 30px;
                }
                select {
                    border: 0;
                    background: transparent;
                    outline: none;
                    //剔除 select 默认样式
                    -webkit-appearance: none;
                    & > option:first-child {
                        color: #c9c9c9;
                    }
                }
                .icon-enter-slim {
                    margin-left: -50px;
                }
            }
            .auction-price, .auction-range {
                height: 86px;
                -webkit-box-pack: justify;
            }
            .auction-time {
                height: 180px;
                & > div {
                    width: 50%;
                    text-align: center;
                }
                .start, .end {
                    p:first-child {
                        margin-bottom: 28px;
                    }
                    p:last-child {
                        margin-left: 50px;
                    }
                    span {
                        margin-left: 15px;
                        margin-top: 1px;
                    }
                    .icon-down-slim {
                        margin-left: 10px;
                        position: relative;
                        top: 3px;
                    }
                }
            }
        }
        .other {
            padding: 42px 32px;
            .button {
                width: 686px;
                height: 80px;
                border-radius: 8px;
            }
            .instruction {
                padding: 42px 18px 50px 18px;
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
    <div class="add-auction-view bg-light">
        <div class="title bg-default font-26 gray">
            商品信息
        </div>
        <div class="jade-detail bg-white flex">
            <div class="jade-img" v-bg="info.pictures[0]"></div>
            <div class="jade-content flex-1">
                <p class="font-30">
                    {{info.title}}
                </p>
                <p class="font-30 red">
                    {{info.price | price }}
                </p>
            </div>
        </div>
        <div class="title bg-default font-26 gray">
            拍卖信息
        </div>
        <div class="auction-detail bg-white">
            <div class="wrapper">
                <div class="flex border-bottom auction-price">
                    <p class="font-30">起拍价格</p>
                    <input type="number" v-model="price" number class="font-30" placeholder="请输入起拍价格，0代表0元起拍">
                </div>
                <div class="flex border-bottom auction-range">
                    <p class="font-30">加价幅度</p>
                    <div class="flex font-30">
                        <!-- <input type="select" v-model="unit" number class="font-30" placeholder="单次加价的最小金额"> -->
                        <div class="select">
                            <select class="font-30" v-model="unit" dir="rtl" :class="{'light': unit === '单次加价的最小金额'}">
                                <option dir="rtl" selected disabled="disabled">单次加价的最小金额</option>
                                <option>50</option>
                                <option>100</option>
                                <option>200</option>
                                <option>300</option>
                                <option>600</option>
                                <option>800</option>
                                <option>1000</option>
                                <option>3000</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="auction-time bg-white flex font-30">
                <div class="start" @click.stop="setBeginTime()">
                    <p>开始时间</p>
                    <p class="font-34 light">
                        <span :class="{red: beginTime}">
                            <template v-if="beginTime">
                                {{beginTime | moment}}
                            </template>
                            <template v-else>
                                尚未选择
                            </template>
                        </span>
                        <span class="icon-down-slim red"></span>
                    </p>
                </div>
                <div class="end" @click.stop="setEndTime()">
                    <p>结束时间</p>
                    <p class="font-34 light">
                        <span :class="{red: endTime}">
                            <template v-if="endTime">
                                {{endTime | moment}}
                            </template>
                            <template v-else>
                                尚未选择
                            </template>
                        </span>
                        <span class="icon-down-slim red"></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="other bg-default">
            <div @click="confirm()" class="button flex font-30 white" :class="{'bg-red': isFinish, 'bg-disable': !isFinish}">
                <p class="center-horizontal">
                    生成拍卖
                </p>
            </div>
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
import dateformat from 'dateformat';
export default {
    name: 'AddAuctionView',
    data() {
        return {
            id: 0,
            price: '',
            unit: '',
            beginTime: '',
            endTime: '',
            info: {
                pictures: []
            },
            isFinish: false
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/products/${to.params.id}`).then((data) => {
                this.id = to.params.id;
                this.info = data;
            });
        }
    },
    ready() {
        this.$watch('price + unit + beginTime + endTime', function(n, o){
            if (this.price !== '' && this.unit && this.beginTime && this.endTime) {
                this.isFinish = true;
            } else {
                this.isFinish = false;
            }
        });
    },
    methods: {
        confirm() {
            if (this.isFinish) {
                if (this.beginTime < (new Date()).getTime()) {
                    this.action('toast', {success: 0, text: '开始时间不应早于当前时间'});
                    return;
                } else if (this.beginTime >= this.endTime) {
                    this.action('toast', {success: 0, text: '结束时间不应早于开始时间'});
                    return;
                }
                if (_.isSafeInteger(this.price)) {
                    // 确认框无客户端接口，直接调用web
                    this.$root.popup = {
                        handler: 'affirmAuction',
                        title: this.info.title,
                        img: this.info.pictures[0],
                        origin: this.price,
                        unit: this.unit,
                        beginTime: this.beginTime,
                        endTime: this.endTime,
                        cb: (params) => {
                            this.submit().then((data) => {
                                this.$router.go({
                                    name: 'auctionShare',
                                    params: {
                                        id: data.id
                                    }
                                });
                            });
                        }
                    };
                } else {
                    this.action('toast', {success: '0', text: '请填写正确的起拍价格，不能包含小数点和特殊符号'});
                    return;
                }
            }
        },
        submit() {
            return this.$post('mall/auctions', {
                product_id: this.id,
                upset_price: this._priceFormat(this.price),
                bid_increment: this._priceFormat(this.unit),
                start_time: this._dateFormat(this.beginTime),
                end_time: this._dateFormat(this.endTime)
            });
        },
        setBeginTime() {
            this.$root.popup = {
                handler: 'datetime',
                timestamp: this.beginTime ? this.beginTime : this._getTime(),
                cb: (date) => {
                    window.scroll(0,0);
                    this.beginTime = +date;
                    // 清除popup
                    this.$root.popup.handler = undefined;
                }
            };
        },
        setEndTime() {
            this.$root.popup = {
                handler: 'datetime',
                timestamp: this.endTime ? this.endTime : this._getTime(),
                cb: (date) => {
                    window.scroll(0,0);
                    this.endTime = +date;
                    // 清除popup
                    this.$root.popup.handler = undefined;
                }
            };
        },
        _getTime() {
            let date = new Date(),
                minutes = date.getMinutes();
            // 调整当前时间的分钟数可以被 5 整除
            return date.setMinutes(minutes + (5 - minutes%5));
        },
        _dateFormat(msec) {
            if (!msec || typeof +msec !== 'number') {
                return '';
            }
            return dateformat(new Date(+msec), 'yyyy-m-dd H:MM');
        },
        _priceFormat(price) {
            if (typeof +price !== 'number') {
                return null;
            }
            return price * 100;
        }
    }
}
</script>
