<style lang="stylus">
.opinion-list
    .opinion
        -webkit-box-align: start
        .opinion
            height: 30px
            width: 56px
            vertical-align: 13px
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
</style>
<template lang="pug">
.opinion-list.bg-white
    .opinion.flex.pdh(v-for="item in items")
        template(v-if="item.buyer")
            avatar.mgt-28(:user="item.buyer")
        template(v-else)
            img.anonymous.mgt-28(:src="'shop/anonymous.png' | qn")
        .mgl.pdt-28.pdb-22.flex-1(:class="{'bdt': $index > 0}", @click="action('orderDetail', {id: item.order_no})")
            .flex
                .flex-1
                    .fz-26 {{item.buyer ? item.buyer.nickname : '匿名用户'}}
                    .fz-22.light.mgt-14 {{item.create_at | moment}}
                .reply.center.bd-gray.fz-26(v-if="seller && !item.reply && item.description && !item.timeout", @click.stop="action('replyOpinion', {id: item.id})") 回复评价
            .flex.mgt
                img.opinion.mgr-8(:src="'shop/'+item.choice+'.png' | qn")
                .flex-1.fz-26.gray.line-clamp-1 {{item.product_title}}
            .fz-30.user-txt(:class="{'mgt-18': item.description}") {{item.description}}
            .pd.fz-26.gray.user-txt.bg-light.dark.mgt-24(v-if="item.reply") 掌柜回复： {{{item.reply.reply_content | content}}}
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
        }
    }
}
</script>