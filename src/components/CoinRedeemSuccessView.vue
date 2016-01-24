<template>
<div class="coin-redeem-success-view bg-white">
    <div class="top">
        <div class="img center-horizontal"></div>
        <p class="font-34">兑换成功!</p>
        <p class="font-26 gray">工作人员将在两个工作日内与您联系</p>
    </div>
    <div class="font-26">
        <div class="txt gray">您已成功兑换</div>
        <div class="content border-all">
            <div class="left"></div>
            <div class="right">
                <div class="font-30">VIP官网／一个月</div>
                <div class="detail gray">可使用<br>使用期限</div>
                <div class="red"><span class="price">500</span>金币</div>
            </div>
        </div>
        <div class="txt gray">剩余金币<span class="price">485</span></div>
    </div>
    <div class="button border-red font-30 red">返回</div>
</div>
</template>
<script>
export default {
    name: 'CoinRedeemSuccessView',
    data() {
        return {
        };
    },
    route: {

    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.coin-redeem-success-view {
    padding: 32px;
    min-height: 100%;
    .top {
        height: 500px;
        text-align: center;
        padding-top: 100px;
        .img {
            height: 150px;
            width: 150px;
            border-radius: 50%;
            background-image: url('#{$qn}/coin/success.svg');
        }
        > p{
            margin-top: 50px;
        }
    }
    .content {
        height: 244px;
        padding: 24px;
        .left {
            float: left;
            width: 196px;
            height: 196px;
            margin-right: 40px;
            background-image: url('#{$qn}/coin/vip-small.svg');
            background-position: center;
            background-size: contain;
        }
        .right {
            .detail {
                margin-top: 17px;
                margin-bottom: 33px;
                line-height: 40px;
            }
            .price {
                margin-left: 0;
                margin-right: 12px;
            }
        }
    }
    .price {
        font-size: 36px;
        color: #cc3f4f;
        margin-left: 12px;
    }
    .txt {
        padding: 40px 0;
    }
    .button {
        height: 90px;
        width: 100%;
        line-height: 90px;
        text-align: center;
        border-radius: 10px;
    }
}
</style>
