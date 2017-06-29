<style lang="stylus">
.shop-credit-view
    .light-green
        color: #09bb07
    .symbol
        vertical-align: 3px
    .line-clamp-2
        width: 0%
        line-height: 1.2
    .icon-enter
        height: 22px
        width: 22px
        vertical-align: -1px
</style>
<template lang="pug">
.shop-credit-view
    .fz-30.bdb.pd-32(v-for='item in items', v-link="item.violation_id ? {name: 'shop-violation', params: {id: item.violation_id}} : ''")
        .flex.fz-22.gray
            .flex-1 {{item.relate_desc}}
            div {{item.create_at | date 'yyyy-m-dd hh:MM'}}
        .flex.mgt-40
            .flex-2.line-clamp-2 {{item.remark}}
            .flex-1.red.fz-30.txt-right(:class="{'light-green': item.point_value > 0}")
                span.symbol(v-if="item.point_value > 0") +
                span {{item.point_value}}分
            icon.mgl-10.gray(name="enter", v-if="item.violation_id")
</template>
<script>
import paging from 'paging'
export default {
    name: 'shop-credit-view',

    mixins: [paging],

    ready() {
        this.showAction()
        this.$on('restore', this.showAction)
    },

    computed: {
        paging() {
            return {
                path: 'mall/shop/points',
                list: 'points'
            }
        }
    },

    methods: {
        showAction() {
            this.action('action', {label: '等级说明'}).then(() => {
                this.$router.go({name: 'shop-level', params: {id: this.$route.params.id}})
            })
        }
    }
}
</script>