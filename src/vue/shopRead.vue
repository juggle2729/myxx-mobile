<template>
    <div class="page">
        <div class="content black_47 fz-30 pdt-50 pdl-36 pdr-26">
           <ul>
               <li>
                   <div class="fz-30 bold">入驻要求</div>
                   <div>1.商家须遵守平台“三天无理由退货”的规定，不得无故拒绝退货申请。</div>
                   <div>2.商品必须保证货真价实，如实描述，不得欺骗消费者</div>
                   <div>3.不得使用违规手段刷单、刷评价，严重违反者关闭店铺。</div>
                   <div>4.重视并尊重平台用户，及时回复私信并文明待人。</div>
               </li>
               <li>
                   <div class="fz-30 bold">交易贴士</div>
                   <div>1.商家需在24小时内发货，如有异常应与买家主动联系邴谢尚发货时间。查看平台交易规则>></div>
                   <div>2.买家申请退货后，买家只用承担退货运费，无需承担商家发货运费。查看平台退货规则>></div>
                   <div>3.买家付款后，钱款将进入由银行监管的第三方账户，交易成功后商家方可提现。查看平台提现规则>></div>
                   <div>4.商家开通这个权限就不会漏掉买家私信了。查看并进行设置>></div>
                   <div>5.商家这样发布商品将获得更好的曝光和推广。查规范看平台商品发布规范>></div>
               </li>
               <li>
                   <div class="fz-30 bold">收费规则</div>
                   <div>1.开店0费用</div>
                   <div>2.通过直播或专场拍卖产生的订单平台收取6%的技术服务费。<span @click="open">了解详情>></span></div>
                   <div>2..除直播或专场拍卖产生的订单之外的所有订单征收0.6%的支付通道费，这部分费用由微信和支付宝收取。<span @click="open">了解详情>></span></div>
               </li>
               <li>
                   <div class="fz-30 bold">开店入驻流程</div>
                   <div>注册——填写开店信息——初审通过——上传商品（至少20件）——复审通过——成功入驻</div>
               </li>
           </ul>
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
        open() {
            this.action('open', {url: "https://cms.meiyuxiuxiu.com/2018/03/04/charge/"})
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
        background-color #F7F9FC
        box-sizing border-box
        padding-bottom 128px
        .content
            line-height 1.8
            font-family "微软雅黑"
            li
                margin-bottom 20px
                div
                    line-height 1.6
                    span 
                        color blue

        .button
            position fixed
            width 100%
            height 136px
            bottom 0
            display -webkit-box
            -webkit-box-pack center
            padding-top 28px
            background #f7f9fc
            border-top 1px solid #e8eaed
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

