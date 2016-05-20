<style lang="sass">
.receive-view {
    min-height: 100%;
    >div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -100%);
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
        <div class="icon-comment font-34 red"></div>
        <div class="success">确认收货成功</div>
        <div class="button flex">
            <div v-link="{name: 'order', params: { id: this.$route.params.id}}">查看订单</div>
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
                this.$router.go({name: 'order', params: {id: this.$route.params.id}});
            });
        }
    },
    methods: {
        homepage() {
            this.action('toast', {text: 'native --> homepage homepage homepage'});
        }
    }
}
</script>