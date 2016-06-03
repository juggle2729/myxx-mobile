<style lang='sass'>
.index-view {
    color: #2196F3;
    li {
        font-size: 34px;
        padding: .5em 1em;
        &.tab {
            font-size: 40px;
            background-color: tomato;
            color: white;
            display: inline-block;
        }
    }
}
</style>
<template>
<div class="index-view bg-default">
    <ul>
        <li class="tab">首页</li>
        <li>
            <a href="/evaluations">鉴宝列表 - evaluations</a>
        </li>
        <li>
            <a href="/stories">晒宝列表 - stories</a>
        </li>
        <li class="tab">发现</li>
        <li>
            <a href="/masters">官网秀 - masters</a>
        </li>
        <li>
            <a href="/lessons">公开课 - lessons</a>
        </li>
        <li class="tab">标签</li>
        <li>
            <a href="/tag/certificate/242">标签 - tags</a>
        </li>
        <li class="tab">订单</li>
        <li>
            <a href="/order/affirm/188/">确认订单 - order/affirm/:productId/:addressId</a>
        </li>
        <li>
            <a href="/order/160520185535031891">订单详情页-重复使用请手动在此修改订单号 --> order/:id</a>
        </li>
        <li>
            <a href="/order/receive/160520185535031891">确认收货成功 --> order/receive/:id</a>
        </li>
        <li>
            <a href="/order/address">收货地址列表 - order/address/:id</a>
        </li>
        <li>
            <a href="/wallet">我的钱包 - wallet</a>
        </li>
        <li>
            <a href="/wallet-detail/expects">明细 - wallet-detail/expects</a>
        </li>
        <li>
            <a href="/instructions">帮助 - instructions</a>
        </li>
        <li class="tab">我的</li>
        <li>
            <a href="/profile">个人中心 - profile</a>
        </li>
        <li>
            <a href="/user/2">个人主页 - user/:id</a>
        </li>
        <li class="tab">设置</li>
        <li>
            <a href="/about">关于美玉秀秀 - about</a>
        </li>
        <li>
            <a href="/feedback">意见反馈 - feedback</a>
        </li>
        <li class="tab">分享相关</li>
        <li class="font-26">客户端须在分享url的基础上要加上相应参数，参考<a class="red" href="http://wiki.jimhuang.cn/dokuwiki/doku.php?id=dev_team:dev_sub_team_server:myxx_console_api:operation_log">运营数据统计接口</a></li>
        <li>
            <a href="/master/1016">大师官网 - master/:id</a>
        </li>
        <li>
            <a href="/evaluation/528">鉴宝 - evaluation/:id</a>
        </li>
        <li>
            <a href="/story/521">晒宝 - story/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/jade/35">商品 - jade/:id</a>
        </li>
        <li class="tab">拍卖</li>
        <li class="font-26 border-top padding center">
            <a href="/auction/1">拍卖预览 - auction/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/auctions/1">我的微信拍卖列表 - auctions/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/auction/10/bidding">我要出价 - /auction/:id/bidding</a>
        </li>
        <li class="tab">个人主页</li>
        <li class="font-26 border-top padding center">
            <a href="/user/1023">个人主页 - user/:id</a>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'Index',
    ready() {
        // const total = 600 + Math.floor(Math.random()*600);
        // const duration = Math.floor(Math.random()*100);
        // const key = 'ONLINE';
        // let online = _.toNumber(localStorage.getItem(key));
        // if(online < total) {
        //     this.$post('log/heartbeats', {duration})
        //         .then(() => {
        //             localStorage.setItem(key, online+duration);
        //         });
        // }
    }
}
</script>
