<style lang="sass">
.trace-view {
    min-height: 100%;
    .basic {
        height: 134px;
        padding: 0 50px;
        .img {
            height: 100px;
            width: 100px;
        }
    }
    .info {
        padding: 0 32px 0 112px;
        position: relative;
        .circle {
            position: absolute;
            top: 32px;
            left: 40px;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            z-index: 99;
            background-color: #888888;
        }
        .timeline {
            position: absolute;
            left: 50px;
            width: 1px;
            height: 100%;
            background-color: #888888;
        }
        .route {
            padding: 32px 0;
            &:first-child {
                line-height: 1.5;
            };
        }
        .first-circle {
            background-color: #09bb07;
            left: 38px;
            width: 26px;
            height: 26px;
            box-shadow: 0 0 0 3px rgba(9, 187, 7, 0.3);
        }
        .first-line {
            margin-top: 32px;
        }
    }
}
</style>
<template>
<div class="trace-view">
    <div class="basic font-30 border-bottom flex">
        <div class="flex-1">
            <div>顺丰速运</div>
            <div class="margin-top">运单号 {{trace.express_no}}</div>
        </div>
        <div class="img" v-bg="trace.image" @click="coverflow([trace.image])"></div>
    </div>
    <div v-for="item in trace.routes" class="info">
        <div class="circle" :class="{'first-circle': $index < 1}"></div>
        <div class="timeline" :class="{'first-line': $index < 1}"></div>
        <div class="route font-30 border-bottom">
            <div class="margin-bottom">{{item.remark}}</div>
            <div>{{item.datetime}}</div>
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