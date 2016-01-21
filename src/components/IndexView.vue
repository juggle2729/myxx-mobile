<template>
<div class="index-view bg-default padding">
    <div class="font-30 center">{{host}}</div>
    <ul>
        <li class="tab">首页</li>
        <li class="font-26 border-top padding center">
            <a href="/evaluations/time">鉴宝/最新 - evaluations/time</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/evaluations/popularity">鉴宝/最热 - evaluations/popularity</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/stories/time">话题/最新 - stories/time</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/stories/popularity">话题/最热 - stories/popularity</a>
        </li>
        <li class="tab">发现</li>
        <li class="font-26 border-top padding center">
            <a href="/masters">官网秀 - masters</a>
        </li>
        <li class="tab">消息</li>
        <li class="font-26 border-top padding center">
            <a href="/messages">消息 - messages</a>
        </li>
        <li class="tab">我的</li>
        <li class="font-26 border-top padding center">
            <a href="/profile">个人中心 - profile</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/profile/2">个人主页 - profile/:id</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/masters">官网秀 - masters</a>
        </li>
        <li class="tab">设置</li>
        <li class="font-26 border-top padding center">
            <a href="/about">关于美玉秀秀 - about</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="/feedback">意见反馈 - feedback</a>
        </li>
        <li class="tab">打开Native</li>
        <li class="font-26 border-top padding center">
            <a href="myxx://">美玉秀秀</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="myxx://web/%2Fevaluation%2F1">鉴宝1</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="myxx://web/%2Fstory%2F23">话题23</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="myxx://web/%2Fjade%2F2">宝贝2</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="myxx://web/%2Fmaster%2F1%2Fhome%3Ftitle%3D%25E8%25B5%25B5%25E5%2585%25B0-%25E5%25AE%2598%25E7%25BD%2591">大师官网1</a>
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
