<template>
<div class="index-view bg-default padding">
    <div class="font-30 center">{{host}}</div>
    <ul>
        <li class="font-26 border-top padding center">
            <a href="#!/featured">精选 - featured</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="#!/evaluation?tab=time">鉴宝/最新 - evaluation?tab=time</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="#!/evaluation?tab=popularity">鉴宝/最热 - evaluation?tab=popularity</a>
        </li>
        <li class="font-26 border-top padding center">
            <a href="#!/story">话题 - story</a>
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
}
</style>