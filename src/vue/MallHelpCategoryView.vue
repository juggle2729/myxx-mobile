<style lang="stylus">
.mall-help-category-view
    .item
        height: 86px
        line-height: 86px
        margin-left: 32px
        padding-right: 32px
        &:last-child
            background: none
</style>
<template lang="jade">
.mall-help-category-view.bdb.bg
    .bg-white
        .item.flex.fz-26.bdb(v-for="item in problems[this.$route.params.category]", @click="action('open', {url: item.url})")
            .flex-1 {{item.title}}
            icon.gray(name="enter")
</template>
<script>
export default {
    name: 'MallHelpCategoryView',

    ready() {
        this.action('updateTitle', {text: this.titles[this.$route.params.category]})
    },

    data() {
        return {
            problems: {
                'service': [
                    {
                        title: '美玉秀秀服务宝是什么?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=1&sn=0f5b2dda8b6b4ea71dde6ca3e3b7f56b'
                    }, {
                        title: '美玉秀秀服务宝是如何保障交易的?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=2&sn=e586d5c1b173e3ff10ae9129f0264001'
                    }, {
                        title: '"五天退货"支持范围、处理流程及条件?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=3&sn=ed9941f5caafac854dfbc95bf717adbf'
                    }, {
                        title: '付款担保是什么?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=5&sn=d49ebcd3b156a9415417986cba799ffd'
                    }
                ],
                'guide': [
                    {
                        title: '如何确定订单?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000009&idx=1&sn=03e1699f31f28023e1ff9c86ca191d20'
                    }, {
                        title: '如何联系商家?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000009&idx=2&sn=e9c23a02ca9d2eaa4217a9fe04b13231'
                    }, {
                        title: '如何查看订单交易状态?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000009&idx=3&sn=3e2ee2e88d72008918722b2fd22a7fac'
                    }, {
                        title: '确认收货是什么意思?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000009&idx=4&sn=2da0d15d0b2c255a21eaa00828fd6e29'
                    }, {
                        title: '收到商品忘记确认收货了怎么办?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000009&idx=5&sn=1e90e4edf6a1fa53a6efe43b9e5ce451'
                    }, {
                        title: '如何取消订单?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000009&idx=6&sn=cd7f13caa832ac0e980d4e13277945ee'
                    }, {
                        title: '为什么订单自动取消了?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000009&idx=7&sn=471d47cfd8f45b0fa22ef71ea8872059'
                    }
                ],
                'payment': [
                    {
                        title: '付款方式有哪几种?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=1&sn=d09080bffdb2c01e309dd27446818f73'
                    }, {
                        title: '为什么已经支付了，但交易仍旧显示等待付款?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=2&sn=023167bc34026d48e5fd703759e1abb3'
                    }, {
                        title: '付款提示"付款失败"?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=3&sn=e27b76a055964b6767408361c40637f5'
                    }, {
                        title: '钱包里面待结算金额是什么意思?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=4&sn=8a8b6c3a130e2fa305ec109f0bd414cd'
                    }, {
                        title: '待结算金额什么时候可以提现?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=5&sn=38fe307a50a857b23af7a7322f5ae355'
                    }, {
                        title: '提现申请一般多久到账?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=6&sn=c3a0a9fa0f82a7ef6849769dd0c4f758'
                    }
                ],
                'logistics': [
                    {
                        title: '付款后一般多久发货?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=1&sn=ec9d5b9617aa5b23c4598fcd8033474b'
                    }, {
                        title: '发货后一般几天可以收到商品?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=3&sn=87cb987e7cd1c996ad6aa8bb1b035ffc'
                    }, {
                        title: '拍下商品后发现收货地址填错了，怎么办?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=2&sn=6b98bf4f1ed8a2986f8b54b09cdc935e'
                    }, {
                        title: '如何查看物流信息?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=4&sn=36aa71349c46f25ba424d4a8d9c4963b'
                    }, {
                        title: '商家发货后，为什么查看不到物流信息?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=5&sn=0f0fe57ab0c725da16ec276dbb863e68'
                    }, {
                        title: '商家不发货，买家可以申请退款吗?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=6&sn=bdd10eacd2f5fa4e49d4172335b6d552'
                    }, {
                        title: '商家不发货，交易会自动付款或者退款吗?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=7&sn=ed70474dc22991fc6a594b42ee2330d7'
                    }, {
                        title: '如何催促商家尽快发货?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000005&idx=8&sn=9a80e3fe4192535cb9fee2f4a993d90c'
                    }
                ],
                'receiving': [
                    {
                        title: '为什么一定要当面验货?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000006&idx=1&sn=400115e261bab073565fc180157c91be'
                    }, {
                        title: '商家发的货被买家拒签后，买家该如何操作?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000006&idx=2&sn=3e619851ef945ee9957832623083d6a7'
                    }, {
                        title: '收到的商品有问题，怎么办?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000006&idx=3&sn=c1e932e20bdb1ae9346d590c207b8e54'
                    }, {
                        title: '物流显示商品已被签收，但我没有收到货，怎么办?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000006&idx=4&sn=cbfe0a9a2ecb8227959fb0f55156aca4'
                    }, {
                        title: '快递公司不让我验货，怎么办?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000006&idx=5&sn=e60ea7976e58eef27f6596ddb66a00a9'
                    }
                ],
                'goods-return': [
                    {
                        title: '拍下的商品不想要了，但是商家已发货，怎么办?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000007&idx=1&sn=3b1b1c9045883ea07b01e0585f2ec232'
                    }, {
                        title: '如何申请退货?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000007&idx=2&sn=227145e4915c1c8b346ee659561587ec'
                    }, {
                        title: '如何申请退款?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000007&idx=3&sn=465699fa08af8044880a33f89e33c12a'
                    }, {
                        title: '超过5天退货时间了，还能申请退货吗?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000007&idx=4&sn=df13beb5e919c6458f8af09a402b99b2'
                    }, {
                        title: '申请退款后，钱款退回到哪里?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000007&idx=5&sn=c073305a329b30c4aea9dd8a48d3da70'
                    }, {
                        title: '退货时一定要保价吗？产生的费用由谁承担?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=2247483720&idx=2&sn=63b6854cef216a9118642bd011a926a7'
                    }, {
                        title: '商家同意退货了，我该如何将商品寄回去?',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=2247483720&idx=3&sn=11daca6c456445776a60186b29029463'
                    }
                ],
                'argue': [
                    {
                        title: '商品描述不符的争议处理',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000008&idx=1&sn=d41338b209fda80d9e97ef4f6945c847'
                    }, {
                        title: '签收问题的争议处理',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000008&idx=2&sn=a70701f8cbfdddfddd11aed575d2cf00'
                    }, {
                        title: '退货问题的争议处理',
                        url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000008&idx=3&sn=918a5b73a497ff98dfc4852934e22e06'
                    }
                ]
            },
            titles: {
                'service': '服务宝',
                'guide': '购物指南',
                'payment': '付款和提现',
                'logistics': '发货和物流',
                'receiving': '收货和验货',
                'goods-return': '退货售后',
                'argue': '争议处理'
            }
        }
    }
}
</script>`1
