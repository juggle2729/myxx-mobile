<template>
<div class="message-view bg-default">
    <div class="separator"></div>
    <div class="messages border-bottom bg-white">
        <div class="row font-34 border-bottom flex">
            <span class="red icon-alarm"></span>
            <span>系统通知</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-34 border-bottom flex">
            <span class="red icon-eval"></span>
            <span>鉴宝</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-34 border-bottom flex">
            <span class="red icon-comment"></span>
            <span>评论</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-34 flex">
            <span class="red icon-like"></span>
            <span>赞</span>
            <span class="icon-enter gray"></span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'MessageView',
}
</script>
<style lang="sass">
.message-view {
    height: 100%;
    .messages {
        padding-left: 32px;
        .row {
            height: 140px;
            > span:nth-of-type(2) {
                margin-left: 32px;
            }
        }
    }
}
</style>
