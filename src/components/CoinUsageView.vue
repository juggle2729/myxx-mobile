<template>
<div class="coin-use-view bg-white">
    <div class="separator-20"></div>
    <div class="item font-30">
        <div class="img" :style="{backgroundImage: 'url('+config.www+'/coin/use-x.svg)'}"></div>
        <div class="right">
            <div class="title red">鉴宝打赏</div>
            <p class="detail font-26">有玉石需要鉴定？<br>大师鉴定后，可以进行鉴宝打赏！</p>
        </div>
    </div>
    <div class="item font-30">
        <div class="img" :style="{backgroundImage: 'url('+config.www+'/coin/use-y.svg)'}"></div>
        <div class="right">
            <div class="title red">玉石买手顾问</div>
            <p class="detail font-26">不知道该买什么？<br>和大师建立紧密的一对一关系<br>解决您赏玉、购玉的关键点疑问！</p>
            <p class="remark font-22 gray">【准备中———敬请期待！】</p>
        </div>
    </div>
    <div class="item font-30">
        <div class="img" :style="{backgroundImage: 'url('+config.www+'/coin/use-y.svg)'}"></div>
        <div class="right">
            <div class="title red">广告&置顶</div>
            <p class="detail font-26">你有宣传自己的需求么？<br>高点击的banner广告、社区话题置顶<br>帮助你解决需求，让你人气爆棚</p>
            <p class="remark font-22 gray">【准备中———敬请期待！】</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'CoinUsageView',
    data() {
        return {
        };
    },
    route: {
    }
}
</script>
<style lang="sass">
.coin-use-view {
    min-height: 100%;
    .item {
        padding: 0 64px;
        margin-top: 100px;
        width: 100%;
        height: 150px;
        position: relative;
        display: -webkit-box;
        .img {
            height: 150px;
            width: 150px;
        }
        .right {
            margin-left: 50px;
            .detail {
                margin-top: 26px;
                line-height: 38px;
            }
            .remark {
                margin-top: 24px;
            }
        }

    }
}
</style>
