<style lang="stylus">
.my-user
    .item
        height: 168px
        img
            display: block
            height: 30px
            width: 30px
</style>
<template lang="jade">
.my-user(:class="{'bg-white': !items.isEmpty}")
    .item.mgl-32.pdr-32.flex(v-for="item in items", :class="{'bdb': $index < (items.length - 1)}", v-link="{name: 'user', params: {id: item.entry.id}}")
        avatar(:user="item.entry", :size="120")
        .mgl-24.flex-1
            .flex
                .fz-30 {{item.entry.nickname}}
                img.mgl-8(v-if="item.entry.vip_flag", :src="'profile/'+item.entry.role+'.png' | qn")
            .fz-26.gray.mgt-16 {{item.entry.title || '普通用户'}}
        icon-follow(:target="item.entry.id", :follow="true", :has-border="true")
    empty(v-if="items.isEmpty")
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