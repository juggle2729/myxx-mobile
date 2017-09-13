<style lang="stylus">
.opinion-list
    .opinion
        border-color #ededed
        -webkit-box-align start
        .comment
            height 30px
            width 56px
            display block
        .product
            border-color #ededed
            .img
                width 50px
                height @width
        .anonymous
            display block
            height 68px
            width 68px
            border-radius 50%
        .user-txt
            line-height 1.5
        .reply
            height 50px
            line-height 50px
            width 180px
            border-radius 50px
        .btn
            width 140px
            height 70px
            line-height 70px
            text-align center
            border-radius 6px
        .marks-comp
            .tag
                margin 10px 10px 0 0
        .arrow
            width 0
            height 0
            border 16px
            border-color transparent transparent #f7f7f7 transparent
            border-style dashed dashed solid dashed
            top -28px
            left 32px
        &:last-child
            border 0
</style>
<template lang="pug">
.opinion-list.bg-white(:class="{ 'pdh-36': !items.isEmpty }")
    .opinion.flex.pdt-36.pdb-20.bdb(v-for="item in items")
        template(v-if="item.buyer")
            avatar(:user="item.buyer")
        template(v-else)
            img.anonymous(:src="'shop/anonymous-4.1.png' | qn")
        .mgl.flex-1(@click="go(item)")
            .flex
                .fz-26.flex-1.black-24.bold {{ item.buyer ? item.buyer.nickname : '匿名用户' }}
                .fz-20.gray-b3 {{ item.create_at | moment }}
            .flex.mgt-16.fz-24.gray-8f
                .product-comment.flex
                    span 商品评价：
                    .red-f2(v-if="item.choice === 'good'") 好评
                    .green-6d(v-if="item.choice === 'normal'") 中评
                    .gray-8f(v-if="item.choice === 'bad'") 差评
                .shop-comment.flex.mgl-28
                    span 商家服务：
                    .red-f2(v-if="item.shop_choice === 'good'") 好评
                    .green-6d(v-if="item.shop_choice === 'normal'") 中评
                    .gray-8f(v-if="item.shop_choice === 'bad'") 差评
            .fz-30.user-txt.black-47(:class="{'mgt-22': item.description}") {{ item.description }}
            .pdv-26.pdl-28.fz-26.black-47.user-txt.bg-gray-f7.dark.mgt-22.relative(v-if="item.reply")
                span 商家回复： {{{ item.reply.reply_content | content }}}
                .arrow.absolute
            marks.mgt-10(:tags="item.tags", inner="true", v-if="item.tags", :class="{'mgt': items.tags}")
            .product.pdv-10.bd.mgt-22.flex(v-if="!isChat")
                .img.mgl-20(v-bg="item.order_item.cover")
                .title.fz-20.dark-6b.mgl-20.line-clamp-1.line-height-50 {{ item.product_title }}
            .reply.center.bd-black-24.black-24.fz-26.mgt-24(v-if="!isChat && seller && !item.reply && item.description && !item.is_timeout", @click.stop="action('replyOpinion', {id: item.id})") 回复评价
            .btn.bd.fz-26.mgt-24(v-if="isChat", @click.stop="action('chat', {id: item.buyer_id, name: item.buyer.nickname, product: item.product_id})") 联系买家
    empty(v-if="items.isEmpty")
</template>
<script>
import Marks from 'component/Marks.vue'
export default {
    name: 'opinion-list',
    components: { Marks },

    props: {
        items: Array
    },

    computed: {
        seller() {
            return this.$route.name === 'user-comment'
        },

        // 3.1之前版本显示 ”联系卖家“，之后版本显示 ”回复评价“
        isChat() {
            return this.env.version < '3.1'
        }
    },

    methods: {
        go(item) {
            this.seller ? this.action('orderDetail', {id: item.order_no}) : this.$router.go({name: 'product', params: {id: item.product_id}})
        }
    }
}
</script>