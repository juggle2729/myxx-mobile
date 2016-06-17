<style lang="sass">
.receive-view {
    min-height: 100%;
    >div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
        .icon-checked {
            font-size: 120px;
            color: #09bb07;
        }
        .button > div {
            height: 72px;
            line-height: 72px;
            width: 200px;
            border: 1px solid #dcdcdc;
            border-radius: 8px;
            text-align: center;
            &:first-child {
                margin-right: 30px;
            }
        }
    }
    .success {
        margin: 40px 0 60px 0;
    }
}
</style>
<template>
<div class="receive-view center font-30">
    <div>
        <div class="icon-checked"></div>
        <div class="success">确认收货成功</div>
        <div class="button flex">
            <div @click="back">查看订单</div>
            <div @click="homepage">回首页</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'OrderReceiveView',
    route: {
        data() {
            this.action('action', {label: '完成'}).then(() => {
                this.action('back', {step: 1, refresh: true});
            });
        }
    },
    methods: {
        back() {
            this.action('back', {step: 1, refresh: true});
        },
        homepage() {
            this.action('mall');
        }
    }
}
</script>