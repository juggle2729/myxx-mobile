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
    .third-line
        margin-left 72px
    .empty-component
        height 50%
    .judge
        background-image url('//o0x80w5li.qnssl.com/judge.png')
        background-size 30px
        padding-left 36px
</style>
<template lang="pug">
.mall-supervise-view
    .total.flex.pdt-50
        .flex.flex-1.bdr.pdl-40
            .fz-26.gray-6b 已推荐优质店铺（家）
            .fz-48.black-24.mgt-28.bold {{ items.goodTotal || 0 }}
        .flex.flex-1.pdl-40
            .fz-26.gray-6b 已举报违规商品（个）
            .fz-48.black-24.mgt-28.bold {{ items.badTotal || 0 }}
    .mgt-50.mgl-40.red-f2.fz-20 感谢您对美玉秀秀的支持，为消费者建立一个买玉最放心平台
    .tabs.fz-30.flex.bd
        .tab.bdr.flex-1.center(@click="onTabChange('undo')", :class="status === 'undo' ? 'red-e6' : 'gray-8f'") 待评判
        .tab.flex-1.center(@click="onTabChange('done')", :class="status === 'done' ? 'red-e6' : 'gray-8f'") 监督记录
    .hr.bdv
    template(v-for="item in items")
        .item.flex.mgh-32.fz-26.column
            .first-line.flex.bdb
                .gray-b3 平台邀请您评判{{ item.target_type === 'sh' ? '店铺' : '商品' }}
                .red-e6.judge(v-if="!isJudged", v-link="{name: 'mall-judge', params: { type: item.target_type, id: item.target_id }}") 评判{{ item.target_type === 'sh' ? '店铺' : '商品' }}
                .gray-b3.fz-22(v-else) {{ item.create_at | date 'yyyy-m-dd H:MM' }}
            .second-line.flex.pdv-24
                .photo.md(v-bg="item.target_type === 'sh' ? item.entry.logo : item.entry.first_picture", :class="item.target_type")
                .flex.column.mgl-23.fz-30
                    .black-47.mgb-20 {{ item.target_type === 'sh' ? item.entry.shop_name : item.entry.title }}
                    .gray-8f(v-if="item.target_type === 'sh'") {{  item.entry.address }}
                    .gray-8f.price(v-else) {{  item.entry.price | price }}
            .third-line.pdt-26.pdb-49.bdt(v-if="isJudged")
                .flex.fz-26
                    .gray-8f 评判为：
                    .black-24 {{ item.desc }}
                .flex.fz-26.mgt-15
                    .gray-8f 评判为：
                    .black-24 已处理，感谢您对商城的贡献！
        .hr.bdv
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