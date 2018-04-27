<template>
    <div>
        <div class="step2">
            <p class="black-47 fz-32 bold mgt-48 mgb-14">第二步 填写您的转账信息</p>
            <p class="gray-b3 fz-22">如果出现单笔限额，您可以分多次转账，总金额为订单总额即可</p>
        </div>
        <div class="payDetail">
            <div><span class="fz-30 dark-6b">汇款人</span> <input class="placeholder fz-30 bold" type=text placeholder="请输入" v-model="remitter_name	" style="border-style:none"></div>
            <div><span class="fz-30 dark-6b">手机号码</span> <input class="placeholder fz-30 bold" type=text placeholder="请输入" v-model="remitter_phone" style="border-style:none"></div>
            <div class="price"><span class="fz-30 dark-6b">汇款金额</span> <p class="fz-32 black-24 bold1 bold">¥ &nbsp</p> <input class="placeholder price bold fz-30" type=text placeholder="请输入" v-model="amount" style="border-style:none;width:120px;padding-left: 15px"></div>
            <div class="line"></div>
            <div><span class="fz-30 dark-6b">订单号</span> <p class="black-24 fz-30 bold">{{order_no}}</p></div>
        </div>
        <div class="account  mgl-54 mgr-54 fz-36 bold" :class="remitter_name && remitter_phone && amount ? 'accounted':'' " @click="transfer_confirm">
            已完成转账, 提交
        </div>
        <div class="prompt" v-show="prompted">
            <div class="message">
                <div class="top pdt-47 pdb-47 pdl-40 pdr-20 fz-32 black-24">请确认您转账的账号是官方银行账号，并已成功转账</div>
                <div class="bottom">
                    <div class="fz-30 black-24" @click="prompted=false">取消</div>
                    <div class="fz-30" @click='transfer_toPayInfo'>是的,我已转账</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pay-info",
        data() {
            return {
                remitter_name:'',
                remitter_phone:'',
                amount:'',
                order_no:'',
                account_type:'',
                prompted: false
            }
        },
        ready(){
            this.order_no = this.$router._currentRoute.path.slice(10,-3)
            this.account_type = this.$router._currentRoute.path.slice(-2)
            console.log(this.account_type)
        },
        route: {
            data({from, to, next}) {
                // console.log(to.params)
                return to.params
            }
        },
        methods: {
            transfer_confirm() {
                if(this.remitter_name && this.remitter_phone && this.amount) {
                    this.prompted = true
                }
            },
            transfer_toPayInfo() {
                this.prompted = false;
                this.$post(`balance/transfer_to_official`, {
                    remitter_name: this.remitter_name,
                    remitter_phone: this.remitter_phone,
                    amount: this.amount,
                    order_no: this.order_no ,
                    account_type: this.account_type
                }).then(response => {
                    this.$router.go({name: 'pay-sumbit',params:{order: this.order_no}})
                })
            }
        }
    }
</script>

<style lang="stylus">
    .step2
        padding-left 40px
        padding-right 50px
        margin-bottom 120px
    .payDetail
        padding-left 94px
        padding-right 81px
        .line
            width 100%
            height 1px
            background:rgba(232,234,237,.6);
            margin-top 47px
        span
            display inline-block
            width: 120px
            margin-right 20px
        p
            display inline-block
        div
            display -webkit-box
            -webkit-box-pack justify

        .price
           position relative
           .bold1
               position absolute
               left: 160px
               top: 36px
               z-index 111

    .account
        color #fff
        background rgba(232,232,232,1)
        border-radius 40px
        height: 80px
        text-align center
        line-height 80px
        margin-top 105px
    .accounted
        color #fff
        background rgba(230,23,23,1)
    .prompt
        width: 100%
        height: 100%
        position fixed
        z-index 111
        top: 0
        background rgba(0,0,0,.6)
        .message
            width: 618px
            height: 273px
            position absolute
            left: 0
            top: 0
            right: 0
            bottom: 0
            margin auto
            background rgba(255,255,255,1)
            .top
                border-bottom  0.5px solid #E8EAED
                line-height 1.4
                font-family SourceHanSansCN-Regular
            .bottom
                display -webkit-box
                -webkit-box-pack center
                div
                    width 50%
                    height: 90px
                    display -webkit-box
                    -webkit-box-pack center
                    -webkit-box-orient vertical
                    text-align center
                    box-sizing border-box
                    &:last-of-type
                        color #e61717
                        border-left 0.5px solid #E8EAED
</style>