<template>
    <div class="notfound-view">
        <div class="content">
            <div class="img center-horizontal"></div>
            <div class="text font-30">没有内容...(错误码:{{$route.query.status}})</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NoContentView',
    data() {
        return {
        };
    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.notfound-view {
    .content {
        position: relative;
        top: 118px;
        text-align: center;
        .img {
            width: 537px;
            height: 320px;
            background-image: url('#{$qn}/placeholder/notfound.png');
        }
        .text {
            margin-top: 118px;
        }
    }
}
</style>
