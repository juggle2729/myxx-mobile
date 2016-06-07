<style lang="sass">
    @import '~style/partials/var';
    .wechat-view {
        position: relative;
        height: 100%;
        .content {
            -webkit-box-orient: vertical;
            .warning {
                width: 160px;
                height: 160px;
                margin-bottom: 40px;
                background-image: url('#{$qn}/warning.png');
                background-size: 100% 100%;
            }
        }
    }
</style>
<template>
    <div class="wechat-view bg-light">
        <div class="content flex  center-vertical">
            <div class="warning">
            </div>
            <p class="font-30 gray">
                请在微信客户端打开链接
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WeChatView'
}
</script>
