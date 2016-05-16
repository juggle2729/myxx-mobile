<style lang="sass">
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
            }
            .detail {
                border-top: 2px #d9d9d9 solid;
                padding: 20px 0;
                margin-top: 46px;
                width: 100%;
                >div {
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
            margin: 30px 0 50px;
            input {
                border: 0;
                font-size: 30px;
                height: 110px;
                padding: 20px 20px 20px 40px;

                &[name='phone'] {
                    width: 100%;
                    border-bottom: 1px solid #c6c6c6;
                    border-radius: 0;
                }
                &[name='code'] {
                    width: 58%;
                    border-right: none;
                    margin-top: 1px;
                }
                &[type='button'] {
                    height: 90px;
                    width: 40%;
                    padding: 24px;
                    border: 1px solid #c6c6c6;
                    border-radius: 8px;
                    margin-right: 2%;
                }
            }
        }
        .confirm {
            width: 686px;
            height: 80px;
            font-size: 30px;
            line-height: 80px;
            margin: 0 auto;
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
</style>
<template>
    <div class="bidding-view bg-default">
        <div class="bidding-price bg-white">
            <div class="setting center">
                <span class="minus" :class="{'gray': product.price <= product.min_price}" @click="settingPrice('minus')">-</span>
                <span class="center price">
                    {{product.price}}
                </span>
                <span class="add" @click="settingPrice('add')">+</span>
            </div>
            <div class="gray font-26 center">我的出价</div>
            <div class="detail gray font-26 center clearfix">
                <div class="current-price">
                    当前价格<span>{{product.min_price}}</span>
                </div>
                <div class="price-range">
                    加价区间<span>{{product.range}}</span>
                </div>
            </div>
        </div>
        <div v-if="isFirstBid" class="form bg-white">
            <input type="text" v-model="phone" placeholder="请输入手机号">
            <input v-model="verifyCode"  type="text" placeholder="验证码"><input @click="getVerifyCode()" type="button" value="{{label}}">
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
                美玉秀秀平台仅提供技术支持，在实际拍卖过程中，平台不会参与买卖双方的付款、物流等交易环节。
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
                codeGeted: false,
                isFinish: false,
            };
        },
        ready() {
            this.$watch('phone + verifyCode + product.price', (n, o) => {
                if (this.phone && this.verifyCode && this.product.price > this.product.min_price) {
                    this.isFinish = true;
                } else {
                    this.isFinish = false;
                }
            });
        },
        route: {
            data({to}) {
                this.product.id = to.params.id;

                return this.$get(`mall/auctions/${this.product.id}/price`).then((data) => {
                    // 服务器返回的价格单位是分
                    this.product.price = data.current_price / 100;
                    this.product.min_price = data.current_price / 100;
                    this.product.range = data.bid_increment / 100;
                    this.isFirstBid = data.is_first_bid;
                });
            }
        },
        methods: {
            settingPrice(way) {
                if (typeof this.product.price !== 'number') {
                    this.product.price = Number(this.product.price);
                }
                if (way === 'minus' && this.product.price - this.product.range >= this.product.min_price) {
                    this.product.price = this.product.price - this.product.range;
                } else if (way === 'add') {
                    this.product.price = this.product.price + this.product.range;
                }
            },
            getVerifyCode() {
                if (!this.phone) {
                    this.action('toast', {success: 0, text: '未输入手机号'});
                    return;
                }
                if (!this.codeGeted) {
                    this.$get('common/sms/verify_code', {biz: 'auction_bid', phone: this.phone}).then((data) => {
                        let time = 60;
                        this.codeGeted = true;
                        let interval =  setInterval(() => {
                            if (time) {
                                this.label = `(${--time})`;
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
                        bid_price: this.product.price,
                        phone: this.phone,
                        verify_code: this.verifyCode
                    }).then((data) => {
                        this.action('toast', {success: 1, text: '出价成功'});
                        this.$router.go({name: 'auction', params: {id: this.product.id}});
                    });
                }
            }
        }
    }
</script>
