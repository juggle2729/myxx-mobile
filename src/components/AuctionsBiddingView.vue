<style lang="sass">
@import '../styles/partials/var';
    .bidding-view {
        .bidding-price {
            .setting {
                padding-top: 66px;
                margin-bottom: 30px;
                width: 100%;
                color: #cc3f4f;
                span {
                    display: inline-block;
                    height: 114px;
                    line-height: 114px;
                }
                .price {
                    font-size: 80px;
                    margin: 0 60px;
                    min-width: 290px;
                    height: 110px;
                    border: 2px #d9d9d9 solid;
                    border-radius: 8px;
                }
                .minus, .add {
                    position: relative;
                    top: 8px;
                }
            }
            .detail {
                border-top: 1px #d9d9d9 solid;
                padding: 20px 0;
                margin-top: 46px;
                width: 100%;
                > div {
                    float: left;
                    height: 50px;
                    width: 50%;
                    line-height: 50px;

                    span {
                        margin-left: 20px;
                    }

                    &:not(:last-child) {
                         background-image: linear-gradient(270deg, #d9d9d9 51%, transparent 51%);
                         background-position: right center;
                         background-repeat: no-repeat;
                         background-size: 1px 100%;
                         padding-right: 1px;
                    }
                }
            }
        }

        .form {
            margin: 30px 0 50px 0;
            & > div {
                padding: 0 50px;
                height: 100px;
                input {
                    display: block;
                }
                input[type=tel], input[type=text] {
                    height: 98px;
                    border: 0px;
                }
                input[type=tel] {
                    width: 100%;
                }
                input[type=button] {
                    padding: 10px;
                    min-width: 136px;
                    height: 72px;
                    border: 1px solid #c9c9c9;
                    background: none;
                    border-radius: 8px;
                    color: #393939;
                }
            }
            .code {
                -webkit-box-pack: justify;
            }
        }
        .confirm {
            width: 686px;
            height: 80px;
            font-size: 30px;
            line-height: 80px;
            margin: 30px auto;
            border-radius: 8px;
        }
        .instruction {
            padding: 42px 50px 50px 50px;
            p:first-child {
                text-align: center;

            }
            p {
                margin-bottom: 30px;
                line-height: 44px;
            }
        }
    }
    .wechat-view {
        position: relative;
        height: 100%;
        .content {
            -webkit-box-orient: vertical;
            .warning {
                width: 160px;
                height: 160px;
                margin-bottom: 40px;
                background-image: url('#{$qn}/warning.png');
                background-size: 100% 100%;
            }
        }
    }
</style>
<template>
    <div class="bidding-view bg-default" v-if="env.isWechat">
        <div class="bidding-price bg-white">
            <div class="setting center">
                <span class="minus icon-subtract font-44" :class="{'gray': product.price <= product.min_price + product.range}" @click="settingPrice('minus')"></span>
                <span class="center price">
                    {{product.price}}
                </span>
                <span class="add icon-add font-44" @click="settingPrice('add')"></span>
            </div>
            <div class="gray font-26 center">我的出价</div>
            <div class="detail gray font-26 center clearfix">
                <div class="current-price">
                    当前价格<span>￥{{product.min_price}}</span>
                </div>
                <div class="price-range">
                    加价区间<span>￥{{product.range}}</span>
                </div>
            </div>
        </div>
        <div v-if="isFirstBid" class="form bg-white">
            <div class="border-bottom">
                <input  v-if="disabled" type="tel" class="font-30" v-model="phone"  disabled="disabled" name="phone">
                <input  v-else type="tel" v-model="phone" class="font-30" placeholder="请输入手机号" name="phone">
            </div>
            <div class="border-bottom flex code">
                <input v-model="verifyCode"  type="text" class="font-30" maxlength="4" maxlength="4" placeholder="验证码" name="code">
                <input @click="getVerifyCode()" type="button" class="font-22" value="{{label}}">
            </div>
        </div>
        <div class="confirm white center bold" :class="{'bg-red': isFinish, 'bg-disable': !isFinish}" @click="submit()">确认出价</div>
        <div class="content instruction font-30">
            <p>
                —&nbsp;微信拍卖工具使用须知&nbsp;—
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
        </div>
    </div>
    <div v-else class="wechat-view bg-light">
        <div class="content flex  center-vertical">
            <div class="warning">
            </div>
            <p class="font-30 gray">
                请在微信客户端打开链接
            </p>
        </div>
    </div>
</template>
<script>
    import Q from 'q';
    export default {
        name: 'bidding',
        data() {
            return {
                product: {
                    id: 0,
                    price: 0,
                    min_price: 0,
                    range: 1
                },
                isFirstBid: true,
                phone: '',
                verifyCode: '',
                label: '获取验证码',
                codeGeted: false,      // 是否已经获取了验证码
                isFinish: false,       // 表单是否完成
                disabled: false
            };
        },
        ready() {
            this.$watch('phone + verifyCode + product.price', (n, o) => {
                if (this.isFirstBid) {
                    this.isFinish = this.phone
                        && this.verifyCode
                        && this.product.price > this.product.min_price;
                } else {
                    this.isFinish = this.product.price > this.product.min_price ? true : false;
                }
            });
        },
        route: {
            data({to}) {
                this.product.id = to.params.id;

                return this.$get(`mall/auctions/${this.product.id}/price`).then((data) => {
                    // 服务器返回的价格单位是分
                    this.product.price = (data.current_price + data.bid_increment) / 100;
                    this.product.min_price = data.current_price / 100;
                    this.product.range = data.bid_increment / 100;
                    this.isFirstBid = data.is_first_bid;
                });
            }
        },
        methods: {
            settingPrice(way) {
                if (typeof this.product.price !== 'number') {
                    this.product.price = +this.product.price;
                }
                if (way === 'minus' && this.product.price - this.product.range >= this.product.min_price + this.product.range) {
                    this.product.price = this.product.price - this.product.range;
                } else if (way === 'add') {
                    this.product.price = this.product.price + this.product.range;
                }
            },
            getVerifyCode() {
                if (!this.codeGeted) {
                    if (!this.phone) {
                        this.action('toast', {success: 0, text: '未输入手机号'});
                        return;
                    } else if (!/^1\w{10}$/.test(this.phone)) {
                        this.action('toast', {success: 0, text: '手机号不合法'});
                        return;
                    }
                    this.disabled = true;   // disable 手机号
                    this.$get('common/sms/verify_code', {biz: 'auction_bid', phone: this.phone}).then((data) => {
                        let time = 60;
                        this.codeGeted = true;
                        let interval =  setInterval(() => {
                            if (time) {
                                this.label = `验证码已发送(${--time})`;
                            } else {
                                this.label = '获取验证码';
                                this.codeGeted = false;
                                clearInterval(interval);
                            }
                        }, 1000);
                    });
                }
            },
            submit() {
                if (this.isFinish) {
                    this.$post(`mall/auctions/${this.product.id}/records`, {
                        bid_price: this.product.price * 100,
                        phone: this.isFirstBid ? this.phone : '',
                        verify_code: this.isFirstBid ? this.verifyCode : ''
                    }).then((data) => {
                        this.action('toast', {success: 1, text: '出价成功'});
                        setTimeout(() => {
                            this.$router.go({name: 'auction', params: {id: this.product.id}});
                        }, 2000);
                    }).catch((message) => {
                        this.action('toast', {success: 0, text: message});
                        // 更新当前出价
                        this.$get(`mall/auctions/${this.product.id}/price`).then((data) => {
                            this.product.price = (data.current_price + data.bid_increment) / 100;
                            this.product.min_price = data.current_price / 100;
                        });
                    });
                }
            }
        }
    }
</script>
