<style lang="stylus">
.wallet-detail-view
    &.pdt-84
        padding-top 84px
    &.cover
        height 100%
    .select
        width 100%
        top 0
        z-index 99
        .arrow-icon
            margin-left 10px
            img
                width 28px
                height 28px
    .select, li
        height 84px
        line-height 84px
        padding 0 51px 0 47px
    .mgl-62
        margin-left 62px
    .select-list
        top 84px
        z-index 9
        width 100%
        height calc(100% - 84px)
        background rgba(0, 0, 0, 0.3)
    .bill-item:last-child
        border-bottom 1px solid #ededed
</style>
<template  lang="pug">
.wallet-detail-view.bg(:class="{'cover': showTargetTypeList || showFlowTypeList, 'pdt-84': !items.isEmpty}")
    .select.flex.fz-26.bdb.gray-8f.bg-white.fixed
        .center.flex
            div 收支类型:
            .mgl-32.flex(@click="toggleTargetType")
                span {{ targetType.value }}
                .arrow-icon
                    img(:src="(showTargetTypeList ? 'arrow-upward.png' : 'arrow-downward.png') | qn")
        .flex-1
        .center.flex
            div 收支方式:
            .mgl-62.flex(@click="toggleFlowType")
                span {{ flowType.value }}
                .arrow-icon
                    img(:src="(showFlowTypeList ? 'arrow-upward.png' : 'arrow-downward.png') | qn")
    .select-list.fixed(v-if="showTargetTypeList || showFlowTypeList", @click.self="touchBlank")
        ul.bg-white
            li.fz-26.bdb(v-for="item in options", @click="toggleType(item)", :class="(showTargetTypeList ? targetType.key === item.key : flowType.key === item.key) ? 'red-e6' : 'black-47'") {{ item.value }}
    .mgt-22
        template(v-for="item in items")
            bill-item(:item="item")
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
import BillItem from 'component/item/Bill.vue'
export default {
    name: 'wallet-detail-view',
    mixins: [ paging ],
    components: { BillItem },

    data() {
        return {
            targetType: {},
            flowType: {},
            targetTypeList: [
                {key: 'all', value: '全部'},
                {key: 'prd', value: '商品订单'},
                {key: 'pcs', value: '求购竞标'},
                {key: 'rwd', value: '赞赏'},
                {key: 'acm', value: '拍卖保证金'},
                {key: 'avm', value: '拍卖违约金'},
                {key: 'wtd', value: '提现'},
            ],
            flowTypeList: [
                {key: 'all', value: '全部'},
                {key: 'income', value: '收入'},
                {key: 'expense', value: '支出'}
            ],
            options: [],
            showTargetTypeList: false,
            showFlowTypeList: false
        }
    },

    computed: {
        paging() {
            return {
                path: 'balance/bills',
                list: 'entries',
                params: {
                    target_type: (this.$route.params.target_type === 'all' ? null : this.$route.params.target_type),
                    flow_type: (this.$route.params.flow_type === 'all' ? null : this.$route.params.flow_type)
                }
            }
        }
    },

    ready() {
        this.targetType = this.targetTypeList.filter(item => {
            return item.key === this.$route.params.target_type
        })[0]

        this.flowType = this.flowTypeList.filter(item => {
            return item.key === this.$route.params.flow_type
        })[0]
    },

    methods: {
        touchBlank() {
             this.showTargetTypeList = false
             this.showFlowTypeList = false
        },

        toggleTargetType() {
            this.showFlowTypeList = false
            this.showTargetTypeList = !this.showTargetTypeList
            this.showTargetTypeList && (this.options = this.targetTypeList)
        },

        toggleFlowType() {
            this.showTargetTypeList = false
            this.showFlowTypeList = !this.showFlowTypeList
            this.showFlowTypeList && (this.options = this.flowTypeList)
        },

        toggleType(item) {
            if (this.showTargetTypeList) {
                this.targetType = item
                this.showTargetTypeList = false
            } else {
                this.flowType = item
                this.showFlowTypeList = false
            }
            this.paging.params.target_type = this.targetType.key === 'all' ? null : this.targetType.key
            this.paging.params.flow_type = this.flowType.key === 'all' ? null : this.flowType.key
            this.fetch(true)
        }
    }
}
</script>