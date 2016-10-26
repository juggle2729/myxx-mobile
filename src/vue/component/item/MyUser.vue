<style lang="stylus">
.my-user
    .item
        height: 168px
</style>
<template lang="pug">
    .my-user.bg-white
        .item.mgl-32.pdr-32.flex(v-for="item in items", :class="{'bdb': $index < (items.length - 1)}")
            avatar(:user="item.entry")
            .mgl-24.flex-1
                .fz-30 {{item.entry.nickname}}
                .fz-26.gray.mgt-16 {{item.entry.title || '普通用户'}}
                .fz-26.light.flex.mgt-16
                    .mgr-36 帖子数 {{item.entry.follow_count}}
                    div 粉丝数 {{item.entry.fans_count}}
            icon-follow(:user="item.entry.id", :follow="true", :has-border="true")
</template>
<script>
import paging from 'paging'
export default {
    name: 'my-user',

    mixins: [paging],
    
    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/follow_list`,
                list: 'entries',
                params: {
                    target_type: 'us'
                }
            }
        }
    }
}
</script>