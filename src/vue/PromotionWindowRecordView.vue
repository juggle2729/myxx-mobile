<template>
    <div class="shopRecord">
        <ul>
            <li v-for="item in data">
                <p class="timer fz-24">推广时间: {{item.promotion_time.start_time | date 'yyyy/m/dd'}}-{{item.promotion_time.end_time | date 'yyyy/m/dd'}}</p>
                <div class="content">
                    <div>
                        <p class="fz-42 contentnums">{{item.stats.product_count}}</p>
                        <p class="fz-24 conts">累计推广商品</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">{{item.stats.all_view}}</p>
                        <p class="fz-24 conts">累计商品曝光</p>
                    </div>
                    <div>
                        <p class="fz-42 contentnums">{{item.stats.all_click}}</p>
                        <p class="fz-24 conts">累计商品点击</p>
                    </div>
                </div>
                <p class="orderTime fz-20">购买日期: {{item.create_at| date 'yyyy/m/dd'}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                data: [

                ]
            }
        },
        route: {
            data({from, to, next}) {
                return this.$fetch(`mall/promotion/my?scene=history&template_id=${to.params.id}`)
                    .then(resp => {
                        this.data = resp.data
                    })
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