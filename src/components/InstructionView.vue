<style lang="sass">
.instruction-view {
    .item {
        height: 86px;
        line-height: 86px;
        margin-left: 32px;
        padding-right: 32px;
        &:last-child {
            background: none;
         }
    }
}
</style>
<template>
    <div class="instruction-view border-bottom">
        <div class="item flex font-26 border-bottom" v-for="item in problems[this.$route.params.id]" @click="go(item.url)">
            <div class="flex-1">{{item.title}}</div>
            <div class="icon-enter gray"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'InstructionView',
    ready() {
        this.updateTitle(this.titles[this.$route.params.id]);
    },
    data() {
        return {
            problems: {
                'service': [
                    {
                        title: '美玉秀秀服务宝是什么?',
                        url: 'http://www.baidu.com'
                    }, {
                        title: '美玉秀秀服务宝是如何保障交易的?',
                        url: ''
                    }, {
                        title: '"七天无理由退货"支持范围、处理流程及条件?',
                        url: ''
                    }, {
                        title: '付款担保是什么?',
                        url: ''
                    },
                ],
                'guide': [
                    {
                        title: '如何确定订单?',
                        url: ''
                    }, {
                        title: '如何联系商家?',
                        url: ''
                    }, {
                        title: '如何查看订单交易状态?',
                        url: ''
                    }, {
                        title: '确认收货是什么意思?',
                        url: ''
                    }, {
                        title: '收到商品忘记确认收货了怎么办?',
                        url: ''
                    }, {
                        title: '如何取消订单?',
                        url: ''
                    }, {
                        title: '为什么订单自动取消了?',
                        url: ''
                    }
                ],
                'payment': [
                    {
                        title: '付款方式有哪几种?',
                        url: ''
                    }, {
                        title: '为什么已经支付了，但交易仍旧显示等待付款?',
                        url: ''
                    }, {
                        title: '付款提示"付款失败"?',
                        url: ''
                    }, {
                        title: '钱包里面待结算金额是什么意思?',
                        url: ''
                    }, {
                        title: '待结算金额什么时候可以提现?',
                        url: ''
                    }, {
                        title: '提现申请一般多久到账?',
                        url: ''
                    }
                ],
                'logistics': [
                    {
                        title: '付款后一般多久发货?',
                        url: ''
                    }, {
                        title: '发货后一般几天可以收到商品?',
                        url: ''
                    }, {
                        title: '拍下商品后发现收货地址填错了，怎么办?',
                        url: ''
                    }, {
                        title: '如何查看物流信息?',
                        url: ''
                    }, {
                        title: '商家发货后，为什么查看不到物流信息?',
                        url: ''
                    }, {
                        title: '商家不发货，买家可以申请退款吗?',
                        url: ''
                    }, {
                        title: '商家不发货，交易会自动付款或者退款吗?',
                        url: ''
                    }, {
                        title: '如何催促商家尽快发货?',
                        url: ''
                    }
                ],
                'receiving': [
                    {
                        title: '为什么一定要当面验货?',
                        url: ''
                    }, {
                        title: '商家发的货被买家拒签后，买家该如何操作?',
                        url: ''
                    }, {
                        title: '收到的商品有问题，怎么办?',
                        url: ''
                    }, {
                        title: '物流显示商品已被签收，但我没有收到货，怎么办?',
                        url: ''
                    }, {
                        title: '快递公司不让我验货，怎么办?',
                        url: ''
                    }
                ],
                'goods-return': [
                    {
                        title: '拍下的商品不想要了，但是商家已发货，怎么办?',
                        url: ''
                    }, {
                        title: '如何申请退货?',
                        url: ''
                    }, {
                        title: '如何申请退款?',
                        url: ''
                    }, {
                        title: '超过7天退货时间了，还能申请退货吗?',
                        url: ''
                    }, {
                        title: '申请退款后，钱款退回到哪里?',
                        url: ''
                    }
                ],
                'argue': [
                    {
                        title: '商品描述不符的争议处理',
                        url: ''
                    }, {
                        title: '签收问题的争议处理',
                        url: ''
                    }, {
                        title: '退货问题的争议处理',
                        url: ''
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
    },
    methods: {
        go(url) {
            location.href = url;
        }
    }
}
</script>