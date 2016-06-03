<style lang="sass">
@import '../styles/partials/_mixin.scss';
@import '../styles/partials/_var.scss';
.instructions-view {
    min-height: 100%;
    padding-bottom: 20px;
    .title {
        height: 86px;
        line-height: 86px;
        padding: 0 32px;
        .line {
            width: 6px;
            height: 30px;
            margin-right: 14px;
        }
        .more{
            margin-left: 12px;
        }
    }
    .item {
        height: 86px;
        line-height: 86px;
        margin-left: 32px;
        padding-right: 32px;
        &:not(:last-child) {
            @include border(bottom);
        }
    }
    .container {
        display: inline-block;
        width: 100%;
    }
    .category {
        @include border(right-bottom);
        display: inline-block;
        height: 200px;
        line-height: 200px;
        width: 25%;
        padding-top: 51px;
        [class^='icon-'] {
            padding-right: 0;
            font-size: 50px;
            margin-bottom: 22px;
        }
    }
}
</style>
<template>
    <div class="instructions-view bg-default">
        <div class="bg-white border-bottom margin-bottom">
            <div class="title flex font-30 red border-bottom">
                <div class="line bg-red"></div>
                <div class="flex-1">常见问题</div>
                <div class="gray font-26 flex">更多<div class="more icon-enter red"></div></div>
            </div>
            <div class="item flex font-26" v-for="item in problems" @click="go(item.url)">
                <div class="flex-1">{{item.title}}</div>
                <div class="icon-enter gray"></div>
            </div>
        </div>
        <div class="margin-bottom">
            <div class="title flex font-30 red border-vertical bg-white">
                <div class="line bg-red"></div>
                <div>问题分类</div>
            </div>
            <div class="font-26 container">
                <div class="category center bg-white" v-for="item in classification" v-link="{name: 'instruction', params: {id: item.id}}">
                    <div class="{{item.icon}}"></div><div>{{item.title}}</div>
                </div>
            </div>
        </div>
        <div class="bg-white border-bottom">
            <div class="title flex font-30 red border-vertical">
                <div class="line bg-red"></div>
                <div>条款和协议</div>
            </div>
            <div class="item flex font-26" v-for="item in clause" @click="go(item.url)">
                <div class="flex-1">{{item.title}}</div>
                <div class="icon-enter gray"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'HelpView',
    data() {
        return {
            problems: [
                {
                    title: '美玉秀秀服务宝是如何保障交易的?',
                    url: 'http://www.baidu.com'
                }, {
                    title: '付款担保是什么?',
                    url: ''
                }, {
                    title: '为什么一定要当面验货?',
                    url: ''
                }, {
                    title: '收到的货物和商品描述不一致, 怎么办?',
                    url: ''
                }, {
                    title: '拍下的商品不想要了, 但是卖家已发货, 怎么办?',
                    url: ''
                }, {
                    title: '"七天无理由退货"支持范围、处理流程及条件?',
                    url: ''
                }
            ],
            classification: [
                {
                    id: 'service',
                    title: '服务宝',
                    icon: 'icon-service'
                }, {
                    id: 'guide',
                    title: '购买指南',
                    icon: 'icon-guide'
                }, {
                    id: 'payment',
                    title: '付款和提现',
                    icon: 'icon-payment'
                }, {
                    id: 'logistics',
                    title: '发货和物流',
                    icon: 'icon-logistics'
                }, {
                    id: 'receiving',
                    title: '收货和验货',
                    icon: 'icon-receiving'
                }, {
                    id: 'goods-return',
                    title: '退货售后',
                    icon: 'icon-goods-return'
                }, {
                    id: 'argue',
                    title: '争议处理',
                    icon: 'icon-argue'
                }
            ],
            clause: [
                {
                    title: '消费者服务保障协议',
                    url: 'http://www.baidu.com'
                }, {
                    title: '商家诚信交易协议',
                    url: ''
                }
            ]
        }
    },
    methods: {
        go(url) {
            location.href = url;
        }
    }
}
</script>