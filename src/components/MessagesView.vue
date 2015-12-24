<template>
<div class="message-view">
    <div class="separator-20"></div>
    <div class="messages border-bottom">
        <div class="row font-34 border-bottom flex" v-link="{name: 'master-request'}">
            <span class="red icon-phone"></span>
            <span>系统通知</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-34 border-bottom flex" v-link="{name: 'feedback'}">
            <span class="red icon-eval"></span>
            <span>鉴宝</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-34 border-bottom flex" v-link="{name: 'about'}">
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
    .messages {
        padding-left: 32px;
        .row {
            height: 140px;
            > span:nth-of-type(2) {
                margin-left: 32px;
            }
        }
    }
    .icon-enter {
        transform: rotate(-90deg);
    }
}
</style>
