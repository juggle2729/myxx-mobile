<template>
<div class="coin-redeem-detail bg-white">
    <div class="separator-20"></div>
    <div class="img"></div>
    <div class="content">
        <div class="top">
            <div class="name">
                <p class="font-34">{{items[id].title}}</p>
                <p class="font-30 red margin-top"><span class="price">{{items[id].price}}</span>金币</p>
            </div>
            <div class="nut red border-red font-30">VIP官网示例</div>
        </div>
        <div class="item font-26">
            <div class="title gray border-bottom">兑换详情</div>
            <div class="detail">可以换取VIP官网，时间期限为1个月。<br>VIP官网可以更好的展现大师&商家的风采，我们有更多的专属定制服务。</div>
        </div>
        <div class="item font-26">
            <div class="title gray border-bottom">兑换须知</div>
            <div class="detail">确认兑换后，工作人员将在两个工作日内联系您，为您量身定制VIP官网。</div>
        </div>
        <div class="button bg-red font-30 white" @click="dialog=true">
            确认兑换
        </div>
    </div>
    <div class="confirm bg-white font-30" v-if="dialog">
        <div class="top font-30 border-bottom">
            <p>兑换将消耗<span class="red">500金币</span>，确认继续吗？</p>
            <p class="gray font-26">当前拥有金币 <span class="font-30 red">985</span></p>
        </div>
        <div class="bottom">
            <div class="no border-right" @click="cancel">取消</div>
            <div class="yes" @click="okay">确定</div>
        </div>
    </div>
    <div class="background" v-if="dialog"></div>
</div>
</template>
<script>
export default {
    name: 'CoinRedeemDetailView',
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
            ],
            id: 0,
            total: 10000,
            dialog: false
        };
    },
    route: {
    },
    created() {
        this.id = this.$route.params.id;
    },
    methods: {
        okay() {
            this.total -= this.items[this.id].price;
            console.log('okay');
            this.$route.router.go({name:'coin-redeem-success', params: {id: this.id}});
        },
        cancel() {
            this.dialog = false;
            console.log('cancel');
        }
    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.coin-redeem-detail {
    .img {
        height: 458px;
        background-image: url('#{$qn}/coin/vip-big.png');
    }
    .content {
        padding: 32px;
        .top {
            height: 86px;
            .name {
                float: left;
                .price {
                    font-size: 40px;
                }
            }
            .nut {
                float: right;
                height: 74px;
                width: 236px;
                text-align: center;
                line-height: 74px;
                border-radius: 10px;
            }
        }
        .item {
            padding-top: 64px;
            .title {
                padding-bottom: 24px;
            }
            .detail {
                padding-top: 18px;
                line-height: 38px;
            }
        }
        .button {
            margin-top: 64px;
            height: 90px;
            width: 100%;
            text-align: center;
            line-height: 90px;
            border-radius: 10px;
        }
    }
    .confirm {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-left: -277px;
        margin-top: -150px;
        width: 554px;
        height: 300px;
        overflow: hidden;
        border-radius: 10px;
        text-align: center;
        z-index: 999;
        .top {
            height: 210px;
            padding-top: 22px;
            > p {
                margin-top: 50px;
            }
        }
        .bottom {
            height: 90px;
            padding: 12px 0;
            .yes {
                line-height: 66px;
                display: inline;
                float: left;
                width: 50%;
                height: 100%;
                color: #62b900;
            }
            .no {
                line-height: 66px;
                display: inline;
                float: left;
                width: 50%;
                height: 100%;
            }
        }
    }
    .background {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        background-color: rgba(0, 0, 0, .6);
    }
}
</style>
