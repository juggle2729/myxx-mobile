<template>
    <div class="shopRecord">
        <ul>
            <li>
                <p class="timer fz-24">推广时间: 2018/03/14-2018/03/21</p>
                <div class="content">
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计推广商品</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计商品曝光</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计商品点击</p>
                    </div>
                </div>
                <p class="orderTime fz-20">购买日期: 2018/03/25</p>
            </li>
            <li>
                <p class="timer fz-24">推广时间: 2018/03/14-2018/03/21</p>
                <div class="content">
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计推广商品</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计商品曝光</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计商品点击</p>
                    </div>
                </div>
                <p class="orderTime fz-20">购买日期: 2018/03/25</p>
            </li>
            <li>
                <p class="timer fz-24">推广时间: 2018/03/14-2018/03/21</p>
                <div class="content">
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计推广商品</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计商品曝光</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">123</p>
                        <p class="fz-24 conts">累计商品点击</p>
                    </div>
                </div>
                <p class="orderTime fz-20">购买日期: 2018/03/25</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus">
    .shopRecord
        li
            padding    0 74px 0 32px
            border-bottom 1px solid #E8EAED
            box-sizing content-box
            .timer
                margin-top 47px
                margin-bottom 5px
            .content
                height 180px
                display flex
                align-items: center
                -webkit-justify-content space-around
                .contentnums
                    text-align center
                .conts
                    margin-top 20px
            .orderTime
                font-family PingFangSC-Medium
                margin-bottom 39px
</style>