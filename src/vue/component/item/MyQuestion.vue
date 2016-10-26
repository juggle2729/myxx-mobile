<style lang="stylus">
.my-question
    .img
        height: 148px
        width: 148px    
</style>
<template lang="pug">
    .my-question.bg-white
        .item.pdv.pdr-32.mgl-32.flex(v-for="item in items", :class="{'bdb': $index < (items.length - 1)}")
            .img(v-bg="item.entry.picture")
            .mgl.flex-1
                .fz-30.line-clamp-2.mgb-18 {{item.entry.description}}
                .fz-26.light {{item.entry.status}}个回答
</template>
<script>
import paging from 'paging'
export default {
    name: 'my-question',
    
    mixins: [paging],

    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/follow_list`,
                list: 'entries',
                params: {
                    target_type: 'jb'
                }
            }
        }
    }
}
</script>