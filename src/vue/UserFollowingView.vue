<style lang="stylus">
.user-following-view
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
.user-following-view.bg(:class="{'bg-white': items.isEmpty}")
    .user.bdb.bg-white.flex(v-for='user in items')
        avatar(:user='user', :size='120')
        .flex-1.mgl(v-link='user | profile')
            p.fz-30 {{user.nickname}}
            p.fz-26.light.mgt(v-if='user.title') {{user.title}}
        icon-follow(:follow='user.follow', :user='user.id', :has-border='true')
    partial(name='load-more', v-if='items.hasMore')
    empty(v-if='items.isEmpty', title='暂无关注')
</template>
<script>
import paging from 'paging'

export default {
    name: 'UserFollowingView',
    mixins: [paging],

    data() {
        return {
            emptyTitle: '你还没有关注'
        }
    },
    computed: {
        currentUserId() {
            return _.get(this, 'self.id')
        },
        paging() {
            return {
                path: 'users/'+ this.$route.params.id +'/follow_list',
                list: 'entries',
                params: {
                    limit: 10
                }
            }
        }
    }
}
</script>
