<style lang="sass">
.trace-view {
    min-height: 100%;
    .info {
        height: 134px;
        padding: 28px 32px 0;
        div {
            margin: 18px 0 0 46px;
        }
    }
}
</style>
<template>
<div class="trace-view">
    <div class="info font-30 border-bottom">
        <span class="icon-logistics gray"></span>
        <span>物流公司: 顺丰速运</span>
        <div>运单编号: {{trace.express_no}}</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'OrderTraceView',
    data() {
        return {
            trace: {}
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/express`, {
                order_no: to.params.id
            }).then((trace) => {
                    return {trace};
                })
        }
    }
}
</script>