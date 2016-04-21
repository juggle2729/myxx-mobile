<template>
<div class="index-view bg-default padding">
    <div class="font-30 center">{{host}}</div>
    <ul>
        <li class="tab">首页</li>
        <li class="font-26 border-top padding center">
            <a href="/evaluations">鉴宝列表 - evaluations</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/stories">晒宝列表 - stories</a>
        </li>
        <li class="tab">发现</li>
        <li class="font-26 border-top padding center">
            <a href="/masters">官网秀 - masters</a>
        </li>
        <li class="tab">我的</li>
        <li class="font-26 border-top padding center">
            <a href="/profile">个人中心 - profile</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/user/2">个人主页 - user/:id</a>
        </li>
        <li class="tab">设置</li>
        <li class="font-26 border-top padding center">
            <a href="/about">关于美玉秀秀 - about</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/feedback">意见反馈 - feedback</a>
        </li>
        <li class="tab">分享相关</li>
        <li class="font-26">客户端须在分享url的基础上要加上相应参数，参考<a class="red" href="http://wiki.jimhuang.cn/dokuwiki/doku.php?id=dev_team:dev_sub_team_server:myxx_console_api:operation_log">运营数据统计接口</a></li>
        <li class="font-26 border-top padding center">
            <a href="/master/1016">大师官网 - master/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/evaluation/528">鉴宝 - evaluation/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/story/521">晒宝 - story/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/jade/138">商品 - jade/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/user/1023">个人主页 - user/:id</a>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'Index',
    data() {
        return {
            host: location.href
        };
    },
    created() {
    }
}
</script>

<style lang='sass'>
.index-view {
    color: #2196F3;
    li {
        padding: 20px 0;
        &.tab {
            font-size: 40px;
            color: tomato;
        }
    }
}
</style>
