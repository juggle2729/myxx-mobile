<template>
    <div class="shopRecord">
        <ul>
            <li v-for="item in data">
                <p class="timer fz-24" style="font-weight: bold">推广时间: {{item.promotion_time.start_time | date 'yyyy/m/dd'}}-{{item.promotion_time.end_time | date 'yyyy/m/dd'}}</p>
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
    <empty v-if="!IsEmpty"></empty>
</template>
Empty
<script>
    import Empty from "component/Empty.vue"
    export default {
        data() {
            return {
                data: [],
                IsEmpty: 0
            }
        },
        components: {Empty},

        route: {
            data({from, to, next}) {
                    return this.$fetch
                    (`mall/promotion/my?scene=history&template_id=${to.params.id}`)
                        .then(resp => {
                            this.data = resp.data
                            this.IsEmpty = this.data.length
                        })
            }
        }
    }
</script>

<style lang="stylus">
    .shopRecord
       li
           padding    0 32px 0 32px
           border-bottom 0.5px solid #E8EAED
           box-sizing content-box
           .timer
                margin-top 47px
                margin-bottom 5px
           .content
               height 180px
               padding 0 49px
               display -webkit-box
               -webkit-box-align center
               -webkit-box-pack: justify;
               .contentnums
                    text-align center
               .conts
                    margin-top 20px
           .orderTime
                font-family PingFangSC-Medium
                margin-bottom 39px
                color #B3B3B3
</style>