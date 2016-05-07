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
                input {
                    font-size: 80px;
                    margin: 0 60px;
                    width: 290px;
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

                    span:before {
                        content: '¥';
                        margin-right: 8px;
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
        .content {
            margin: 42px 50px;
            .title {
                font-size: 30px;
                color: #393939;
                padding: 0 0 30px 0;
                display: -webkit-box;
                -webkit-box-align: center;
                &:before, &:after {
                    display: block;
                    content: '';
                    width: 20px;
                    height: 2px;
                    background: #888888;
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    -ms-flex: 1;
                    flex: 1;
                }
                &:before {
                    margin: 0 16px 0 160px;
                }
                &:after {
                     margin: 0 160px 0 16px;
                }
            }
            p {
                font-size: 30px;
                color: #888888;
                padding-bottom: 30px;
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
                <input type="text" v-model="product.price" class="center">
                <span class="add" @click="settingPrice('add')">+</span>
            </div>
            <div class="gray font-26 center">我的出价</div>
            <div class="detail gray font-26 center clearfix">
                <div class="current-price">
                    当前价格<span>{{product.price}}</span>
                </div>
                <div class="price-range">
                    加价区间<span>{{product.range}}</span>
                </div>
            </div>
        </div>
        <div class="form bg-white">
            <input type="text" name="phone" placeholder="请输入手机号">
            <input name="code"  type="text" placeholder="验证码"><input type="button" value="获取验证码">
        </div>
        <div class="confirm white bg-red center bold">确认出价</div>
        <div class="content">
            <div class="title center">微信拍卖出价须知</div>
            <p>1.通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具</p>
            <p>1.通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具通过微信拍卖工具</p>
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
                    range: 1
                }
            };
        },
        route: {
            data({to}) {
                this.product.id = to.params.id;
                this.product.min_price = Number(to.params.price);
                this.product.price = Number(to.params.price);
                this.product.range = Number(to.params.range);
                return Q(true);
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
            }
        }
    }
</script>