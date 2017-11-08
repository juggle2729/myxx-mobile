<style lang="stylus">
.mall-supervise-view
    .total
        .flex-1
            flex-direction column
            -webkit-box-align start
    .tabs
        width 400px
        height 80px
        border-radius 40px
        margin 60px auto 24px
    .first-line
        -webkit-box-pack justify
        width 100%
        height 90px
    .column
        flex-direction column
    .photo
        width 120px
        height 120px
        &.sh
            border-radius 24px
    .price:first-letter
        font-size 22px
    .second-line
        width 100%
        .column
            -webkit-box-align start
        > .flex
            width calc(100% - 143px)
    .third-line
        margin-left 143px
        width calc(100% - 143px)
    .empty-component
        height 50%
    .judge
        background-image url('//o0x80w5li.qnssl.com/judge.png')
        background-size 30px 100%
        height 30px
        padding-left 36px
    .desc
        line-height 1.3
        margin-right 82px
    .address
        line-height 1.3
    .result
        -webkit-box-align start
        .gray-8f
            margin-top 4px
</style>
<template lang="pug">
.mall-supervise-view.bg-gray-f7
    .bg-white
        .total.flex.pdt-50
            .flex.flex-1.bdr.pdl-40
                .fz-26.gray-6b 总共评判店铺（家）
                .fz-48.black-24.mgt-28.bold {{ items.goodTotal || 0 }}
            .flex.flex-1.pdl-40
                .fz-26.gray-6b 总共评判商品（个）
                .fz-48.black-24.mgt-28.bold {{ items.badTotal || 0 }}
        .mgt-50.mgl-40.red-f2.fz-20 感谢您为玉石行业的健康发展添砖加瓦，一起出力构建良性的行业生态！
        .tabs.fz-30.flex.bd
            .tab.bdr.flex-1.center(@click="onTabChange('undo')", :class="status === 'undo' ? 'red-e6' : 'gray-8f'") 待评判
            .tab.flex-1.center(@click="onTabChange('done')", :class="status === 'done' ? 'red-e6' : 'gray-8f'") 监督记录
        .hr(:class="items.length ? 'bdv' : 'bdt'")
        template(v-for="(index, item) in items")
            .item.flex.mgh-32.fz-26.column(:class="index === items.length - 1 ? 'bdb': ''", v-link="{name: item.target_type === 'sh' ? 'shop': 'product', params: { id: item.target_id }}")
                .first-line.flex.bdb
                    .gray-b3 {{ status === 'undo' ? '平台邀请您评判' : '您评判了' }}{{ item.target_type === 'sh' ? '店铺' : '商品' }}
                    .red-e6.judge.flex(v-if="!isJudged", v-link="{name: 'mall-judge', params: { type: item.target_type, id: item.target_id }}") 评判{{ item.target_type === 'sh' ? '店铺' : '商品' }}
                    .gray-b3.fz-22(v-else) {{ item.create_at | date 'yyyy-m-dd H:MM' }}
                .second-line.flex.pdv-24
                    .photo.md(v-bg="item.target_type === 'sh' ? item.entry.logo : item.entry.first_picture", :class="item.target_type")
                    .flex.column.mgl-23.fz-30.mgr-32
                        .black-47.mgb-20 {{ item.target_type === 'sh' ? item.entry.shop_name : item.entry.title }}
                        .gray-8f.fz-26.address(v-if="item.target_type === 'sh'") {{  item.entry.address }}
                        .gray-8f.price(v-else) {{  item.entry.price | price }}
                .third-line.pdt-26.pdb-49.bdt(v-if="isJudged")
                    .flex.fz-26.result
                        .gray-8f 评判为：
                        .black-24.desc {{ item.desc }}
                    .flex.fz-26.mgt-15(v-if="item.status === 'pd'")
                        .gray-8f 美玉秀秀客服：
                        .black-24 已处理，感谢您对商城的贡献！
            .hr.bdv(v-if="items.length > 1 && index !== items.length - 1")
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
export default {
    name: 'mall-supervise-view',
    mixins: [ paging ],
    data() {
        return {
            status: 'undo'
        }
    },

    route: {
        activate({ to, from, next }) {
            if (!_.isEmpty(from)) this.fetch(true) // 在回退到当前页面时，需要刷新列表
            next()
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/judgement',
                params: {
                    status: this.status
                },
                specials: ['goodTotal', 'badTotal']
            }
        },

        isJudged() {
            return this.status === 'done'
        }
    },

    methods: {
        onTabChange(status) {
            this.status = status
            this.paging.params.status = status
            this.fetch(true)
        }
    }
}
</script>