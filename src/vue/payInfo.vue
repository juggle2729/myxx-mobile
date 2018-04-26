<template>
    <div>
        <div class="step2">
            <p class="black-47 fz-32 bold mgt-48 mgb-14">第二步 填写您的转账信息</p>
            <p class="gray-b3 fz-22">如果出现单笔限额，您可以分多次转账，总金额为订单总额即可</p>
        </div>
        <div class="payDetail">
            <div><span class="fz-30 dark-6b">汇款人</span> <input class="placeholder" type=text placeholder="请输入" v-model="remitter_name	" style="border-style:none"></div>
            <div><span class="fz-30 dark-6b">手机号码</span> <input class="placeholder" type=text placeholder="请输入" v-model="remitter_phone" style="border-style:none"></div>
            <div><span class="fz-30 dark-6b">汇款金额</span> <input class="placeholder price" type=text placeholder="¥ 请输入" v-model="amount" style="border-style:none"></div>
            <div class="line"></div>
            <div><span class="fz-30 dark-6b">订单号</span> <p class="black-24 fz-30">{{order_no}}</p></div>
        </div>
        <div class="account  mgl-54 mgr-54 fz-36 " :class="remitter_name && remitter_phone && amount ? 'accounted':'' " @click="transfer_confirm">
            已完成转账, 提交
        </div>
        <div class="prompt" v-show="prompted">
            <div class="message">
                <div class="top pdt-47 pdb-47 pdl-40 pdr-40 fz-32 black-24">请确认您转账的账号是官方银行账号，并已成功转账</div>
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
                this.$post(`balance/transfer_to_official`, {
                    remitter_name: this.remitter_name,
                    remitter_phone: this.remitter_phone,
                    amount: this.amount,
                    order_no: this.order_no ,
                    account_type: this.account_type
                }).then(_ => {
                    this.$router.go({name: 'pay-submit',params:{order: this.order_no}})
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
            height 0.5px
            background:rgba(232,234,237,1);
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
            &:before, &:after
                content "¥"
                width 28px
                height 28px
                display inline-block
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
                border-bottom  1px solid #E8EAED
                line-height 1.4
                font-family SourceHanSansCN-Regular
            .bottom
                display -webkit-box
                -webkit-box-pack center
                div
                    width 50%
                    height: 85px
                    display -webkit-box
                    -webkit-box-pack center
                    -webkit-box-orient vertical
                    text-align center
                    box-sizing border-box
                    &:last-of-type
                        color #e61717
                        border-left 1px solid #E8EAED
</style>