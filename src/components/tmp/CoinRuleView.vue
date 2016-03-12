<template>
<div class="coin-rule-view bg-default">
    <div class="title gray">金币的用处</div>
    <div class="item bg-white border-top flex" v-link="{name: 'coin-use'}">
        <div class="left">
            <div class="img" :style="{backgroundImage: 'url('+config.www+'/coin/avatar-user.svg)'}"></div>
            <div class="txt">普通用户</div>
        </div>
        <div class="right flex-1">
            <p class="font-22 light">可以用金币:</p>
            <p class="font-26">· 进行鉴赏打赏<br>· 获得玉石买手顾问</p>
        </div>
        <span class="icon-enter"></span>
    </div>
    <div class="item bg-white border-top flex" v-link="{name: 'coin-redeem'}">
        <div class="left">
            <div class="img" :style="{backgroundImage: 'url('+config.www+'/coin/avatar-master.svg)'}"></div>
            <div class="txt">大师用户</div>
        </div>
        <div class="right flex-1">
            <p class="font-22 light">可以用金币:</p>
            <p class="font-26">· 兑换VIP大师官网<br>· 微信公众号打理<br>· 兑换美玉秀<br>· 广告宣传</p>
        </div>
        <span class="icon-enter"></span>
    </div>
    <div class="title border-vertical gray">如何赚取金币</div>
    <div class="font-30 bg-white">
        <div class="row">
            <span class="icon-edit red"></span>
            <div class="content flex border-bottom">
                <span>完善用户资料</span>
                <span class="add">+10</span>
                <span class="font-26 gray complete">已完成100%</span>
            </div>
        </div>
        <div class="row">
            <span class="icon-site red"></span>
            <div class="content flex border-bottom">
                <span>开通官网</span>
                <span class="add">+12</span>
                <span class="font-26 gray complete">已完成100%</span>
            </div>
        </div>
        <div class="row">
            <span class="icon-store red"></span>
            <div class="content flex">
                <span>开通店铺</span>
                <span class="add">+12</span>
                <span class="font-26 gray complete">已完成100%</span>
            </div>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="font-30 bg-white border-bottom">
        <div class="row">
            <span class="icon-phone red"></span>
            <div class="content flex border-bottom">
                <span>邀请好友注册</span>
                <span class="add">+5</span>
                <span class="font-26 gray complete"></span>
            </div>
        </div>
        <div class="row">
            <span class="icon-eval red"></span>
            <div class="content flex border-bottom">
                <span>大师鉴定</span>
                <span class="add">+1</span>
                <span class="font-26 gray complete">每日上限3次</span>
            </div>
        </div>
        <div class="row">
            <span class="icon-search red"></span>
            <div class="content flex border-bottom">
                <span>发布</span>
                <span class="add">+10</span>
                <span class="font-26 gray complete">每日上限5次</span>
            </div>
        </div>
        <div class="row">
            <span class="icon-share red"></span>
            <div class="content flex">
                <span>分享</span>
                <span class="add">+1</span>
                <span class="font-26 gray complete">每日上限3次</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'CoinRuleView',
    data() {
        return {
        };
    }
}
</script>
<style lang="sass">
.coin-rule-view {
    .title {
        font-size: 26px;
        padding: 20px 0;
        text-align: center;
    }
    .item {
        height: 262px;
        width: 100%;
        position: relative;
        display: -webkit-box;
        .left {
            width: 310px;
            text-align: center;
            padding: 30px 96px 0 64px;
            .img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
            }
            .txt {
                padding: 20px 0;
                font-size: 22px;
            }
        }
        .right {
            .font-22 {
                margin-bottom: 18px;
            }
            .font-26 {
                line-height: 38px;
            }
        }
        .icon-enter {
            font-size: 26px;
            padding-right: 32px;
        }
    }
    .row {
        height: 88px;
        width: 100%;
        line-height: 88px;
        padding: 0 32px;
        .content {
            margin-left: 58px;
            height: 100%;
            .add {
                position: absolute;
                left: 460px;
                top: 50%;
                margin-top: -15px;
                color: #62b900;
            }
            .complete {
                position: absolute;
                left: 560px;
                top: 50%;
                margin-top: -13px;
            }

        }
        .red {
            position: absolute;
            left: 32px;
            top: 32px;
        }
    }
}
</style>
