<style lang="stylus">
.opinion-list
    .opinion
        -webkit-box-align: start
        .opinion
            height: 30px
            width: 56px
            display: block
        .anonymous
            display: block
            height: 68px
            width: 68px
            border-radius: 50%
        .reply
            height: 48px
            line-height: 48px
            width: 144px
            border-radius: 6px
        .btn
            width: 140px
            height: 70px
            line-height: 70px
            text-align: center
            border-radius: 6px
</style>
<template lang="pug">
.opinion-list.bg-white
    .opinion.flex.pdh(v-for="item in items")
        template(v-if="item.buyer")
            avatar.mgt-28(:user="item.buyer")
        template(v-else)
            img.anonymous.mgt-28(:src="'shop/anonymous.png' | qn")
        .mgl.pdv-28.flex-1(:class="{'bdt': $index > 0}", @click="seller ? action('orderDetail', {id: item.order_no}) : ''")
            .flex
                .flex-1
                    .fz-26 {{item.buyer ? item.buyer.nickname : '匿名用户'}}
                    .fz-22.light.mgt-14 {{item.create_at | moment}}
                .reply.center.bd-gray.fz-26(v-if="!isChat && seller && !item.reply && item.description && !item.is_timeout", @click.stop="action('replyOpinion', {id: item.id})") 回复评价
                .btn.bd.fz-26(v-if="isChat", @click.stop="action('chat', {id: item.buyer_id, name: item.buyer.nickname, product: item.product_id})") 联系买家
            .flex.mgt
                img.opinion.mgr-8(:src="'shop/'+item.choice+'.png' | qn")
                .flex-1.fz-26.gray.line-clamp-1 {{item.product_title}}
            .fz-30.user-txt(:class="{'mgt-18': item.description}") {{item.description}}
            .pd.fz-26.gray.user-txt.bg-light.dark.mgt-16(v-if="item.reply") 掌柜回复： {{{item.reply.reply_content | content}}}
    empty(v-if="items.isEmpty", title="暂无评价")
</template>
<script>
export default {
    name: 'opinion-list',

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
    }
}
</script>