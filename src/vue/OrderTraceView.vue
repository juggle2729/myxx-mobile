<style lang="sass">
.trace-view {
    min-height: 100%;
    .info {
        height: 134px;
        -webkit-box-align: start;
        padding: 24px 32px;
        line-height: 45px;
        .icon-logistics {
            margin-right: 20px;
        }
    }
}
</style>
<template>
<div class="trace-view">
    <div class="info font-30 border-bottom flex">
        <div class="icon-logistics"></div>
        <div>
            <div>物流公司: 顺丰速运</div>
            <div>运单编号: {{trace.express_no}}</div>
        </div>
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