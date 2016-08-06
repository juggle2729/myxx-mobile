<style lang="sass">
.pay-offline-view {
    .instruction {
        .tip {
            margin: 50px 0;
            line-height: 40px;
        }
        .contact {
            margin-bottom: 40px;
            img {
                width: 80px;
                height: 80px;
            }
        }
    }
    .order {
        padding-left: 50px;
        .item {
            height: 112px;
            line-height: 112px;
        }
        .customer {
            padding: 36px 0;
            .tel {
                margin: 28px 0;
            }
            .address {
                margin-right: 50px;
                line-height: 1.2;
            }
        }
    }
    .operation {
        padding: 50px;
        p {
            line-height: 1.3;
            margin-bottom: 50px;
        }
        .button {
            border-radius: 6px;
            height: 72px;
            line-height: 72px;
        }
    }
}
</style>
<template>
    <div class="pay-offline-view">
        <div class="instruction center">
            <div class="tip font-32">大额支付支持银行转账交易<br>请联系客服</div>
            <div class="contact flex">
                <div class="flex-1 border-right font-26 gray">
                    <img :src="'service/online.svg' | qn" alt="online-service" class="margin-bottom"><p>在线客服</p>
                </div>
                <div class="flex-1 font-26 gray">
                    <img :src="'service/tel.svg' | qn" alt="tel-service" class="margin-bottom"><p>电话客服</p>
                </div>
            </div>
        </div>
        <div class="separator-20-no"></div>
        <div class="order font-30">
            <div class="item border-bottom">订单金额<span class="red font-36 margin-left">￥5000</span></div>
            <div class="item border-bottom">订单编号<span class="gray margin-left">123212121</span></div>
            <div class="customer">
                <p>胡锡涛</p><p class="tel">15071352286</p>
                <div class="address omit-2 font-26 gray">湖北省武汉市江夏区 当代国际花园 国际九区 比弗利 10-1</div>
            </div>
        </div>
        <div class="separator-20-no"></div>
        <div class="operation font-30">
            <p>转账时请备注您的联系电话，我们收到货款后会第一时间与您确认后续事宜。</p>
            <div class="flex">
                <div class="margin-right button flex-1 border-gray center">订单详情</div>
                <div class="button flex-1 border-gray center">回首页</div>
            </div>
        </div>
    </div>
</template>