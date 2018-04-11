<template>
    <div class="shopNewSpread">
        <img src="https://o0x80w5li.qnssl.com/bg_newshop.png?v1" class="foot" alt="">
        <div class="spreadTop">
            <p class="spread fz-46">店铺正在推广中</p>
            <p class="spreadTime fz-30">剩余推广时间</p>
        </div>
        <div class="Remaining">
            <span class="fz-78">{{dealyTime | date 'dd'}}</span>
            <span class="fz-24">天</span>
            <span class="fz-78">{{dealyTime | date 'hh'}}</span>
            <span class="fz-24">时</span>
            <span class="fz-78">{{dealyTime | date 'MM'}}</span>
            <span class="fz-24">分</span>
        </div>
        <div class="detailInfo">
            <ul>
                <li><p class="txt fz-28">推广曝光</p><p class="fz-46">{{data.stats.current_product_view}}</p></li>
                <li><p class="txt fz-28">累计推广点击</p><p class="fz-46">{{data.stats.current_product_click}}</p></li>
                <li><p class="txt fz-28">昨日推广曝光</p><p class="fz-46">{{data.stats.yesterday_view}}</p></li>
                <li><p class="txt fz-28">昨日推广点击</p><p class="fz-46">{{data.stats.yesterday_click}}</p></li>
            </ul>
            <div class="levelLine"></div>
            <div class="verticalLine"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shop-new-spread",
        data() {
            return{
                newTime: new Date().getTime(),
                dealyTime:'',
                data: {}
            }
        },
        route: {
            // data({from, to, next}) {
            //     return this.$fetch(`mall/promotion/my?scene=history&template_id=${to.params.id}`)
            //         .then(resp => {
            //             this.data = resp.data[0];
            //             this.dealyTime = this.data[0].promotion_time.end_time - this.newTime;
            //         })
            // }
        }
    }
</script>

<style lang="stylus">
    .shopNewSpread
        width: 100%
        height: 100%
        background #2C66DB
        padding-top 147px
        .foot
            width 100%
            height 100%
            position fixed
            bottom 0
        .spreadTop
            text-align center
            color #FAFAFA
            .spread
                margin-bottom 29px
                font-family PingFangSC-Medium
            .spreadTime
                margin-bottom 125px
                font-family PingFangSC-Light
        .Remaining
            color #FAFAFA
            text-align center
            margin-bottom 136px
        .detailInfo
            width: 600px
            height: 520px
            margin 0 auto
            background-color #386FDD
            opacity 0.6
            position relative
            z-index 1111
            ul
                display flex
                -webkit-flex-wrap  wrap
                li
                    width: 50%
                    height: 260px
                    color #FAFAFA
                    z-index 111
                    p
                        text-align center
                    .txt
                        margin 90px 0 30px 0
            .levelLine
                position absolute
                left 0
                top 0
                right 0
                bottom 0
                margin auto
                width 1px
                height 420px
                background:rgba(250,250,250,1);
            .verticalLine
                position absolute
                left 0
                top 0
                right 0
                bottom 0
                margin auto
                width 520px
                height 1px
                background:rgba(250,250,250,1);
</style>