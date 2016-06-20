<template>
    <div class="nocontent-view">
        <div class="content">
            <div class="img center-horizontal"></div>
            <div class="text font-30">内容不存在...</div>
        </div>
    </div>
</template>
<style lang="sass">
@import '~style/partials/var';
.nocontent-view {
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
