<style lang="stylus">
.trace-view
    min-height: 100%
    .basic
        height: 134px
        padding: 0 50px
        .img
            height: 100px
            width: 100px
    .info
        padding: 0 32px 0 112px
        position: relative
        .circle
            position: absolute
            top: 32px
            left: 40px
            height: 20px
            width: 20px
            border-radius: 50%
            z-index: 99
            background-color: #888888
        .timeline
            position: absolute
            left: 50px
            width: 1px
            height: 100%
            background-color: #888888
        .route
            padding: 32px 0
            &:first-child
                line-height: 1.5
        .first-circle
            background-color: #09bb07
            left: 38px
            width: 26px
            height: 26px
            box-shadow: 0 0 0 3px rgba(9, 187, 7, 0.3)
        .first-line
            margin-top: 32px
</style>
<template lang="jade">
.trace-view
    .basic.fz-30.bdb.flex
        .flex-1
            div 顺丰速运
            .mgt 运单号 {{trace.express_no}}
        .img(v-bg='trace.image', @click='coverflow([trace.image])')
    .info(v-for='item in trace.routes')
        .circle(:class="{'first-circle': $index < 1}")
        .timeline(:class="{'first-line': $index < 1}")
        .route.fz-30.bdb
            .margin-bottom {{item.remark}}
            div {{item.datetime}}
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