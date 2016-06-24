<style lang="sass">
@import '~style/partials/_mixin.scss';
@import '~style/partials/_var.scss';
.instructions-view {
    min-height: 100%;
    padding-bottom: 22px;
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
                <div>常见问题</div>
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
                    <div class="{{item.icon}} gray"></div><div>{{item.title}}</div>
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
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=2&sn=e586d5c1b173e3ff10ae9129f0264001&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#wechat_redirect'
                }, {
                    title: '付款方式有哪几种?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000004&idx=1&sn=d09080bffdb2c01e309dd27446818f73&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#wechat_redirect'
                }, {
                    title: '为什么一定要当面验货?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000006&idx=1&sn=400115e261bab073565fc180157c91be&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#rd'
                }, {
                    title: '"五天退货"支持范围、处理流程及条件',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000003&idx=3&sn=ed9941f5caafac854dfbc95bf717adbf&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#wechat_redirect'
                }, {
                    title: '商城商品的品质有保证吗?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000015&idx=1&sn=e783c3f473b0b1804c72982c7db02a44&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#rd'
                }, {
                    title: '物流的方式是怎么样的?',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000015&idx=2&sn=b5680031cd802db76254f3f375d5642b&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#rd'
                }
            ],
            classification: [
                {
                    id: 'service',
                    title: '服务宝',
                    icon: 'icon-help-service'
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
                    icon: 'icon-help-verify'
                }, {
                    id: 'goods-return',
                    title: '退货售后',
                    icon: 'icon-help-return'
                }, {
                    id: 'argue',
                    title: '争议处理',
                    icon: 'icon-help-list'
                }
            ],
            clause: [
                {
                    title: '消费者服务保障协议',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000011&idx=1&sn=91906e3f892f51960a6cc1aa35549d67&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#rd'
                }, {
                    title: '商家诚信交易协议',
                    url: 'http://mp.weixin.qq.com/s?__biz=MzI3MjMyODIzOQ==&mid=100000010&idx=1&sn=27483ddec48986a215296c67ec8d879a&scene=0&previewkey=Cmkx9DKVnFqm4yg89gWpCcNS9bJajjJKzz%2F0By7ITJA%3D#rd'
                }
            ]
        }
    },
    methods: {
        go(url) {
            this.action('open', {url});
        }
    }
}
</script>
