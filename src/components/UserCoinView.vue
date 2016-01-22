<template>
<div class="usercoin-view bg-white">
    <div class="header">
        <div class="nums">
            <div class="wrap">
                <div class="icon"></div>
                <div class="white">15</div>
            </div>
        </div>
        <div class="font-26 center icon-what" v-link="{name: 'coin-rule'}"><i class="icon-coin-y"><span class="path1"></span><span class="path2"></span></i>金币是什么</div>
        <div class="buttons">
            <div class="font-30">充值</div>
            <div class="font-30" v-link="{name: 'coin-redeem'}">兑换</div>
        </div>
    </div>
    <div class="title font-30 border-bottom flex" @click="showChoice">
        <div class="center-horizontal">
            <span>全部收支</span>
            <img :src="'icon/arrow-down.svg' | qn">
        </div>
    </div>
    <div class="content">
        <div class="item flex">
            <div class="day font-22"><p>今天</p></div>
            <div class="icon font-34"><img :src="'coin/yellow-small.svg' | qn"></div>
            <div class="number font-34">+300</div>
            <div class="why font-30">金币充值</div>
        </div>
        <div class="separ"><div class="left border-right"></div></div>
        <div class="item flex">
            <div class="day font-22"><p></p></div>
            <div class="icon font-34"><img :src="'coin/yellow-small.svg' | qn"></div>
            <div class="number font-34">+500</div>
            <div class="why font-30">金币充值</div>
        </div>
        <div class="separ"><div class="left border-right"></div></div>
        <div class="item flex">
            <div class="day font-22"><p></p></div>
            <div class="icon font-34"><img :src="'coin/yellow-small.svg' | qn"></div>
            <div class="number font-34">+300</div>
            <div class="why font-30">金币充值</div>
        </div>
    </div>
    <div class="dialog" v-if="choice">
        <div id="talkbubble" class="items">
            <div class="font-30 white" style="background-color: #c6c6c6;">全部收支</div>
            <div class="font-30 white">收入</div>
            <div class="font-30 white">支出</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'UserCoinView',
    data() {
        return {
            coins: [],
            choice: false
        };
    },
    route: {
    },
    methods: {
        showChoice() {
            this.choice = !this.choice;
        }
    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.usercoin-view {
    .header {
        height: 446px;
        background-color: #3e99ef;
        padding: 128px 40px 0 40px;
        .nums {
            width: 100%;
            text-align: center;
            .wrap {
                display: inline-block;
                .icon {
                    display: inline;
                    background-image: url('#{$qn}/coin/yellow-big.svg');
                    background-position: center;
                    background-size: contain;
                    width: 60px;
                    height: 98px;
                    float: left;
                }
                .white {
                    display: inline;
                    margin-left: 26px;
                    font-size: 98px;
                }
            }
        }
        .font-26 {
            margin-top: 30px;
            color: #96d4fd;
        }
        .buttons {
            margin-top: 30px;
            text-align: center;
            position: relative;
            display: -webkit-box;
            .font-30 {
                width: 315px;
                height: 88px;
                background-color: #fff;
                color: #4eaeef;
                border-width: 0;
                border-radius: 44px;
                line-height: 88px;
            }
            > div {
                margin-right: 40px;
            }
        }
    }
    .title {
        height: 90px;
        width: 100%;
        img {
            margin-left: 15px;
            width: 25px;
        }
    }
    .content {
        margin-top: 40px;
        .item {
            padding: 20px 0;
            .day {
                color: #a6a6a6;
                text-align: right;
                padding-right: 36px;
                width: 150px;
            }
            .icon {
                > img {
                    width: 36px;
                }
            }
            .number {
                width: 160px;
                padding: 0 26px;
                color: #fac030;
            }
        }
     }
    .separ {
        height: 60px;
        .left {
            width: 167px;
            height: 100%;
        }
    }
    .dialog {
        position: fixed;
        top: 535px;
        left: 50%;
        margin-left: -135px;
        width: 270px;
        height: 296px;
        .items {
            padding: 12px 10px;
            text-align: center;
            top: 0;
            .white {
                margin-bottom: 12px;
                line-height: 74px;
                height: 74px;
                border-radius: 8px;
            }
        }
        #talkbubble {
            width: 270px;
            height: 270px;
            background: #585858;
            position: relative;
            -moz-border-radius:    10px;
            -webkit-border-radius: 10px;
            border-radius:         10px;
        }
        #talkbubble:before {
            content:"";
            position: absolute;
            bottom: 100%;
            left: 125px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 20px solid #585858;
        }
    }
}
</style>
