<style lang="stylus">
.opinion-list
    .opinion
        -webkit-box-align: start
        img
            height: 30px
            width: 56px
            display: block
            &.anonymous
                height: 68px
                width: 68px
                border-radius: 50%
</style>
<template lang="pug">
.opinion-list
    .opinion.flex.pdh(v-for="item in items")
        template(v-if="item.buyer")
            avatar.mgt-28(:user="item.buyer")
        template(v-else)
            img.anonymous.mgt-28(:src="'shop/anonymous.png' | qn")
        .mgl.pdv-28.flex-1(:class="{'bdt': $index > 0}")
            .fz-26 {{item.buyer ? item.buyer.nickname : '匿名用户'}}
            .fz-22.light.mgt-14 {{item.create_at | moment}}
            .flex.mgt-24
                img.mgr-8(:src="'shop/'+item.choice+'.png' | qn")
                .fz-26.gray {{item.product_title}}
            .fz-30.user-txt(:class="{'mgt-24': item.description}") {{item.description}}
            .reply.pd.fz-26.gray.user-txt.bg-light.dark.mgt-24(v-if="item.reply") 掌柜回复： {{item.reply.content}}
</template>
<script>
export default {
    name: 'opinion-list',

    props: {
        items: Array
    }
}
</script>