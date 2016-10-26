<style lang="stylus">
.my-collection
    .item
        height: 188px
        .img
            height: 148px
            width: 148px    
</style>
<template lang="pug">
    .my-collection.bg-white
        .item.mgl-32.pdr-32.flex(v-for="item in items", :class="{'bdb': $index < (items.length - 1)}")
            .img(v-bg="item.entry.cover")
            .mgl
                .fz-34.mgb-16 {{item.entry.name}}
                .fz-26.gray.mgb-24 {{item.entry.author.nickname}}
                .fz-26.gray 关注 {{item.entry.followed_count}}
</template>
<script>
import paging from 'paging'
export default {
    name: 'my-collection',
    
    mixins: [paging],

    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/follow_list`,
                list: 'entries',
                params: {
                    target_type: 'cl'
                }
            }
        }
    }
}
</script>