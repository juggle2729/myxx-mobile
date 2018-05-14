<template>
    <div>
        <div class="step1">
            <p class="black-47 fz-32 bold mgt-48 mgb-14">第一步 转账至官方账号（银行卡或支付宝)</p>
            <p class="gray-b3 fz-22" style="line-height: 1.4">长按账户信息可复制，如果出现单笔限额，您可以分多次转账，总金额为订单总额即可</p>
        </div>
        <div class="bank pdl-30 pdr-30" @click="selectBank">
            <img src="//o0x80w5li.qnssl.com/pay/abc.png" alt="" class="mgr-10">
            <div class="payTitle">
                <div class="span"><span class="black-24 fz-32 bold">银行账号</span><span class="office fz-20 mgl-13">官方账号</span></div>
                <div class="gray-b3 fz-22 mgt-11">支持柜台、网银、ATM转账</div>
            </div>
            <icon class="pdh-30" :name="payType === 'bk' ? 'checked' : 'uncheck'" ></icon>
        </div>
        <div class="detail mgl-30 mgr-30 mgt-18 pdl-39 pdr-39" @click="selectBank" :class="payType === 'bk'? 'bg-f5': ''">
            <div style="height: 30px"><span class="gray-b3 fz-26 mgr-35 key">户名(姓名)</span>  <span class="fz-26 dark-6b bold">{{data[0].name}}</span></div>
            <div style="height: 30px"><span class="gray-b3 fz-26 mgr-35 key">账号(卡号)</span>  <span class="fz-26 dark-6b bold">{{data[0].bank_account}}</span></div>
            <div style="height: 30px"><span class="gray-b3 fz-26 mgr-35 key">开户银行</span>  <span class="fz-26 dark-6b bold">{{data[0].bank_name}}</span></div>
        </div>
        <div class="bank pdl-30 pdr-30 mgt-56" @click="selectZfb">
            <img src="//o0x80w5li.qnssl.com/pay/zfb.png" alt="" class="mgr-10">
            <div class="payTitle">
                <div class="span"><span class="black-24 fz-32 bold">支付宝</span><span class="office fz-20 mgl-13">官方账号</span></div>
                <div class="gray-b3 fz-22 mgt-11">支持支付宝转账至支付宝</div>
            </div>
            <icon class="pdh-30" :name="payType === 'ap' ? 'checked' : 'uncheck'"></icon>
        </div>
        <div class="detail mgl-30 mgr-30 mgt-18 pdl-39 pdr-39 zfb" @click="selectZfb" :class="payType === 'ap'? 'bg-f5': ''">
            <div style="height: 30px"><span class="gray-b3 fz-26 key_ap">帐户名</span>  <span class="fz-26 bold dark-6b">{{data[1].name}}</span></div>
            <div style="height: 30px"><span class="gray-b3 fz-26 key_ap">账号</span>  <span class="fz-26 bold dark-6b">{{data[1].bank_account}}</span></div>
        </div>
        <div class="next  bold mgl-54 mgr-54 fz-36 " :class="payType ? 'nexted': ''" @click="toPayInfo">
            下一步
        </div>
    </div>
</template>

<script>

    export  default  {
        data() {
            return {
                payType:'',
                selected: true,
                data:[]
            }
        },
        created() {
            this.getAccount()
        },
        methods: {
            getAccount() {
                this.$fetch(`balance/official_account`).then(res => {
                    this.data = res.accounts
                })
            },
            selectBank() {
                this.payType = 'bk';
                this.selected = false;
                if(this.payType == 'bk' && this.selected) {
                    this.payType = ''
                }
            },
            selectZfb() {
                this.payType = 'ap';
                this.selected = false;
                if(this.payType == 'ap' && this.selected) {
                    this.payType = ''
                }
            },
            toPayInfo() {
                if(this.payType) {
                    this.$router.go({name: 'pay-info',params: { order: this.$router._currentRoute.path.slice(13),accountType: this.payType }})
                }
            }
        }
    }
</script>

<style lang="stylus">
    .step1
        padding-left 40px
        padding-right 50px
        margin-bottom 60px
    .bank
        display -webkit-box
        /*-webkit-box-pack start*/
        height 80px
        img
            display block
            width 80px
            height 80px
        .payTitle
            position relative
            display -webkit-box
            -webkit-box-orient vertical
            height: 80px
            margin-top -5%
            span
                vertical-align bottom
            .office
                display inline-block
                width: 95px
                height: 27px
                text-align center
                line-height 27px
                vertical-align bottom
                background rgba(237,242,252,1)
                color #2c66db
        .icon
            position absolute
            right: 20px
            width: 108px
    .detail
        height: 230px
        background rgba(247,249,252,1)
        border-radius 24px
        display -webkit-box
        -webkit-box-orient vertical
        div
            .key
                display inline-block
                width: 128px
            .key_ap
                display inline-block
                width 80px
                margin-right 88px
    .zfb
        height: 168px
    .bg-f5
        background rgba(245,252,245,1)
    .next
        color #fff
        background rgba(232,232,232,1)
        border-radius 40px
        height: 80px
        text-align center
        line-height 80px
        margin-top 96px
    .nexted
        color #fff
        background rgba(230,23,23,1)
</style>