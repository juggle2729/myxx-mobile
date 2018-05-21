<template>
    <div class="page  pdl-36 pdr-26">
        <div class="content black_47 fz-30 pdt-50">
            <p>· 开通30天内新店铺专享，助力开单</p>
            整体提升店铺商品曝光，最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有1次购买机会整体提升店铺商品曝光，
            最适合新店铺的推广方式一个店铺只有有长期1次购买机会。
        </div>
        <div class="button">
            <div class="disagree fz-30 txt-center" @click="back">不同意</div>
            <div v-if="this.timer === 0" class="agreed fz-30 txt-center" @click="goRequestShop">我已阅读，并同意</div>
            <div v-else class="agree fz-30 txt-center" @click="goRequestShop">({{timer}})我已阅读，并同意</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            timer: 7,
            si: ''
        }
    },
    ready() {
        this.startTimer()
    },
    methods:{
        startTimer() {
            let self = this;
            this.si = setInterval(function () {
                if(self.timer === 0){
                    clearInterval(si)
                }
                self.timer--;
            }, 1000);
        },
        back() {
            this.action('back', {step: "1"})
        },
        goRequestShop() {
            if(this.timer === 0) {
                this.action('applyStore')
            }
        }
    }
}
</script>

<style lang="stylus">
    .page
        width: 100%
        height: 100%
        background-color #F7F9FC
        .content
            line-height 1.8
            font-family PingFang SC
            p
                line-height 1.8
        .button
            position fixed
            bottom 40px
            display -webkit-box
            -webkit-box-pack center
            .disagree
                width: 190px
                height: 80px
                line-height 80px
                color #e61717
                border 1px solid #e61717
                border-radius 40px
            .agreed
                width: 460px
                height: 80px
                margin-left 20px
                line-height 80px
                background rgba(230,23,23,1)
                border-radius 40px
                color #fff
            .agree
                width: 460px
                height: 80px
                margin-left 20px
                line-height 80px
                background rgba(232,232,232,1)
                border-radius 40px
                color #fff
</style>

