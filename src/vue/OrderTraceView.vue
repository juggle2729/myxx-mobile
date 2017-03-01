<style lang="stylus">
.trace-view
    min-height: 100%
    .basic
        height: 184px
        margin-bottom: 60px
        .img
            height: 120px
            width: 120px
    .info
        margin: 0 32px 0 82px
        box-sizing: content-box
        border-left: 1px solid #efefef
        &.new::before
            background-color: #cc3f4f
        &::before
            content: ''
            border: 8px solid white
            display: block
            background-color: #d9d9d9
            height: 20px
            width: 20px
            border-radius: 50%
            margin: 5px 0 0 -17px
        &.flex
            -webkit-box-align: start
        .route
            padding: 0 0 60px 68px
</style>
<template lang="jade">
.trace-view
    .basic.fz-30.bdb.flex.pdh-32
        .img(v-bg='trace.image', holder="true", @click='coverflow([trace.image])')
        .flex-1.mgl
            div 物流公司：{{trace.company}}
            .mgt 物流单号：{{trace.express_no}}
    .info.flex(v-for='item in trace.routes', :class="{'new': $index < 1}")
        .route.flex-1
            .mgb.user-txt.fz-26(:class="{'red bold': $index < 1}") {{item.remark}}
            .fz-22.gray(:class="{'red bold': $index < 1}") {{item.datetime}}
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
            return this.$fetch(`mall/express`, {
                    order_no: to.params.id
                }).then((trace) => {
                    return {trace}
                })
        }
    }
}
</script>