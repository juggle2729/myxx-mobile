<template>
<div class="user-following-view bg-default">
    <div v-if="!items.isEmpty" class="separator"></div>
    <empty v-else title="暂无关注"></empty>
    <div class="user border-bottom bg-white flex" v-for="user in items">
        <div v-bg.sm="user.photo" class="avatar-120" v-link="user | profile"></div>
        <div class="flex-1" v-link="user | profile">
            <p class="font-30">{{user.nickname}}</p>
            <p class="font-26 light margin-top">{{user.role | role}}</p>
        </div>
        <follow v-if="self && self.id !=user.id" :follow="user.follow" :user="user.id"></follow>
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
            emptyTitle: '你还没有关注'
        }
    },
    computed: {
        currentUserId() {
            return _.get(this, 'self.id');
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
    },
    route: {
        data() {
            return this.fetch();
        }
    }
}
</script>
<style lang="sass">
.user-following-view {
    .user {
        height: 180px;
        padding: 0 32px;
        .avatar-120 {
            margin-right: 64px;
        }
    }
}
</style>
