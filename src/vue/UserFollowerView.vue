<style lang="stylus">
.user-follower-view
    padding-top: 20px
    position: relative
    .empty-component
        position: absolute
        width: 100%
        top: 45%
        left: 50%
        transform: translate(-50%, -50%)
    .user
        height: 180px
        padding: 0 32px
        .avatar-120
            margin-right: 64px
</style>
<template lang="jade">
.user-follower-view.bg(:class="{'bg-white': items.isEmpty}")
    .user.bdb.bg-white.flex(v-for='user in items')
        avatar(:user='user', :size='120')
        .flex-1.mgl(v-link='user | profile')
            p.fz-30 {{user.nickname}}
            p.fz-26.light.margin-top(v-if='user.title') {{user.title}}
        follow(:follow='user.follow', :user='user.id', :has-border='true')
    partial(name='load-more', v-if='items.hasMore')
    empty(v-if='items.isEmpty', title='暂无粉丝')
</template>
<script>
import paging from 'paging'
export default {
    name: 'UserFollowingView',
    mixins: [paging],

    data() {
        return {
            emptyTitle: '你还没有粉丝'
        }
    },
    computed: {
        paging() {
            return {
                path: 'users/'+ this.$route.params.id +'/fans_list',
                list: 'entries',
                params: {
                    limit: 10
                }
            }
        }
    }
}
</script>
