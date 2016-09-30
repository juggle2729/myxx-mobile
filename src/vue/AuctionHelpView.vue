<style lang="stylus">
.auction-help-view
    padding: 0 32px 234px
    p
        margin-top: 32px
        font-size: 28px
        color: #888
        font-weight: normal
        line-height: 45px
        word-break: break-all
    h5
        margin-top: 40px
        font-size: 30px
        font-weight: bolder
        counter-reset: section
    h6
        margin-top: 32px
        font-size: 28px
        font-weight: normal
        &:before
            counter-increment: section
            content: counter(section) "、"
    span:before
        content: ''
        background: #cc3f4f
        width: 8px
        height: 8px
        display: inline-flex
        border-radius: 50%
        margin-right: 20px
        transform: translate3d(0, -7px, 0)
</style>
<template lang="pug">
.auction-help-view
    h5
        span 我要怎么参拍？
        h6 参拍资格
            p 缴纳保证金之后即可参加拍卖。
        h6 保证金
            p 为保证拍卖顺利进行，参加拍卖需缴纳相应的保证金。拍卖结束后，保证金将原路退回到付款账户。
        h6 操作
            p 进入拍卖专区后您可以查看拍品详情。在拍卖详情页面点击“参与拍卖”支付保证金。成功支付保证金之后即可进行出价。
    h5
        span 结拍方式
        p 拍卖即将结束的5分钟内，如果有新的出价，系统会在当前出价时间上自动延长5分钟时间：如拍卖时间为21：00：00点结束，拍卖即将结束时（如提示时间为20：57：59），系统将自动延长5分钟，拍卖结束时间延长到21：02：59，但如果在这5分钟内不断有新的出价，系统会再次延长5分钟的竞价时间，直到没有新的出价。
    h5
        span 拍下后怎么付款?
        p 当您拍下一件拍品后，在拍卖详情页点击“立即购买”，填写或者选择收货地址后即可下单，下单成功后您即可付款。下单成功后，您可在美玉秀秀APP内“我的”-“我的订单”内查看详情并付款。
        h6 付款方式
            p 目前接受支付宝/微信支付。若遇大额交易显示超过限额，请选择大额支付方式付款。
        h6 付款期限
            p 需24小时内下单并付款，否则系统将判定为跑单违约。将会影响您下次参与拍卖。
    h5
        span 到手不喜欢/有问题怎么办？
        p 到货五天内没有因您个人的原因有任何更改、损坏，美玉秀秀拍卖及送拍商家共同承诺支持五天无理由退货。（买方承担来回费用）
    h5
        span 跑单处理
        p 未在规定付款期限内付款的买受人将被认定为跑单，所有跑单用户将被没收保证金。多次跑单账号将被系统封禁，请您谨慎出价，看准了再出手。
</template>
<script>
    export default {
        name: 'auction-help-view'
    }
</script>