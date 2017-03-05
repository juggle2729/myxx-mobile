<style lang="stylus">
.opinion-list
    .opinion
        -webkit-box-align: start
</style>
<template lang="pug">
.opinion-list
    .opinion.flex.pdt-28.pdh(v-for="item in items")
        avatar(:user="item.buyer")
        .mgl.pdb-28.flex-1(:class="{'bdt': $index > 0}")
            .fz-26 {{item.buyer.nickname}}
            .fz-22.light.mgt-14 {{item.create_at | moment}}
            .flex
                img.mgr-8(:src="")
                .fz-26.gray.mgb-24 {{item.product.title}}
            .fz-30.user-txt {{item.description}}
            .reply.pd.fz-26.gray.user-txt.bg-light.dark.mgt-24(v-if="item.reply") 掌柜回复： {{item.reply.replay_content}}
</template>
<script>
export default {
    name: 'opinion-list',

    props: {
        items: Array
    }
}
</script>