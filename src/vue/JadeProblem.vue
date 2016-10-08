<style lang="stylus">
.jade-problem
    .problem
        padding: 32px
        .bg-red
            height: 8px
            width: 8px
            border-radius: 50%
            margin-right: 12px
        .desc
            line-height: 1.5
            margin: 20px 0 50px 0
            .tip
                line-height: 1.5
        .help
            margin: 0 auto
            margin-bottom: 50px
</style>
<template lang="jade">
.jade-problem.bg
    .bg-white.problem
        .flex
            .bg-red
            .fz-30 担保交易
        .desc.gray.fz-30 顾客付款后，所付钱款由美玉秀秀平台暂时保管，顾客收到商品后，点击确认收货，且在签收之日起5日内没有申请退货，钱款才会转移给商家。
        .flex
            .bg-red
            .fz-30 物流和验货
        .desc.gray.fz-30
            | 1. 商品的配送由商家负责，物流统一为顺丰速运并且保价运输。
            br
            |             2. 顾客收到商品后，请务必当面验货，检查所购商品有无破损，是否和平台描述一致，如商品有严重破损或其他明显质量问题，请拍照记录并拒绝签收。
        .flex
            .bg-red
            .fz-30 5天退货
        .desc.gray.fz-30
            | 1. 自签收之日起5日内，商品无损坏且不影响二次销售的，商家承诺为顾客退货。
            br
            |             2. 请您在退货时务必使用顺丰速运，并且选择保价的方式配送。
            br
            |             3. 关于保价的金额和退货运费的支付方式，请您务必与商家协商沟通，达成一致，如果您没有与商家协商，默认的处理方案如下:
            br
            .tip.gray.fz-30
                | 1）退货的运费及保价费由您承担，请不要使用到付的形式退货。
                br
                |                     2）商家发货的运费及保价费由商家承担，您无需支付这笔费用。
                br
                |                     3）如果双方就退货以及退货导致的运费和保价费未能达成一致，由平台协商仲裁解决。
        .help.red.fz-30.center(v-link="{name: 'mall-help'}")
            span 查看帮助
</template>
