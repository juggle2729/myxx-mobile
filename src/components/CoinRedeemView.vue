<template>
<div class="coin-redeem-view bg-white">
    <template v-for="item in items">
        <div class="el">
            <div class="separator-20"></div>
            <div class="content" v-link="{name: 'coin-redeem-detail', params: {id: $index}}">
                <div class="img"></div>
                <div class="text">
                    <p class="font-26">{{item.title}}</p>
                    <p class="font-30 red"><span class="price">{{item.price}}</span>金币</p>
                </div>
            </div>
        </div>
    </template>
</div>
</template>
<script>
export default {
    name: 'CoinRedeemView',
    data() {
        return {
            items: [
                {
                    title: 'VIP官网/1个月',
                    price: '500'
                },
                {
                    title: 'VIP官网/1年',
                    price: '5000'
                },
                {
                    title: '微信公众号打理',
                    price: '5000'
                },
                {
                    title: '美玉秀1个',
                    price: '300'
                }
            ]
        };
    },
    route: {

    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.coin-redeem-view {
    .el {
        .content {
            padding: 32px;
            .img {
                height: 418px;
                background-image: url('#{$qn}/coin/vip-big.png');
            }
            .text {
                padding-top: 32px;
            }
            .font-30 {
                margin-top: 14px;
                .price {
                    font-size: 36px;
                    margin-right: 12px;
                }
            }
        }
    }
}
</style>
