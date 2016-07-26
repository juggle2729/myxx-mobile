<template>
<div class="user-follower-view bg-default">
    <div v-if="!items.isEmpty" class="separator"></div>
    <empty v-else title="暂无粉丝"></empty>
    <div class="user border-bottom bg-white flex" v-for="user in items">
        <div v-bg.sm="user.photo" class="avatar-120" v-link="user | profile"></div>
        <div class="flex-1" v-link="user | profile">
            <p class="font-30">{{user.nickname}}</p>
            <p v-if="user.title" class="font-26 light margin-top">{{user.title}}</p>
        </div>
        <follow :follow="user.follow" :user="user.id" has-border=true></follow>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
import Follow from 'component/Follow.vue';
export default {
    name: 'UserFollowingView',
    mixins: [paging],
    components: {
        Follow
    },
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
<style lang="sass">
.user-follower-view {
    .user {
        height: 180px;
        padding: 0 32px;
        .avatar-120 {
            margin-right: 64px;
        }
    }
}
</style>
