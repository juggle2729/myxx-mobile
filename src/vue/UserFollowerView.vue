<template>
<div class="user-follower-view bg-default" :class="{'bg-white': items.isEmpty}">
    <div class="user border-bottom bg-white flex" v-for="user in items">
        <avatar :user="user" :size="120"></avatar>
        <div class="flex-1" v-link="user | profile">
            <p class="font-30">{{user.nickname}}</p>
            <p v-if="user.title" class="font-26 light margin-top">{{user.title}}</p>
        </div>
        <follow :follow="user.follow" :user="user.id" :has-border=true></follow>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <empty v-if="items.isEmpty" title="暂无粉丝"></empty>
</div>
</template>
<script>
import paging from 'paging';
import Avatar from 'component/Avatar.vue';
import Follow from 'component/Follow.vue';
export default {
    name: 'UserFollowingView',
    mixins: [paging],
    components: {
        Follow,
        Avatar
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
    padding-top: 20px;
    position: relative;
    .empty-component {
        position: absolute;
        width: 100%;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .user {
        height: 180px;
        padding: 0 32px;
        .avatar-120 {
            margin-right: 64px;
        }
    }
}
</style>
