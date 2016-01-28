<template>
<div class="following-view bg-default">
    <div v-if="!items.isEmpty" class="separator"></div>
    <partial v-else name="empty-page"></partial>
    <div class="user border-bottom bg-white flex" v-for="user in items">
        <div v-bg.sm="user.photo" class="avatar-120" v-link="user | profile"></div>
        <div class="flex-1" v-link="user | profile">
            <p class="font-30">{{user.nickname}}</p>
            <p class="font-26 light margin-top">{{user.role | role}}</p>
        </div>
        <template v-if="user.id != currentUserId">
            <div v-if="user.follow" class="font-22 gray border-red follow flex" @click="toggleFollow(user)"><i class="icon-followed flex"></i><span class="flex">已关注</span></div>
            <div v-else="!user.follow" class="font-22 red border-light follow flex" @click="toggleFollow(user)"><i class="icon-follow flex"></i><span class="flex">加关注</span></div>
        </template>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'FollowingView',
    mixins: [PagingMixin],
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
    },
    methods: {
        toggleFollow(user) {
            if (user.follow) {
                this.$delete(`users/follow/${user.id}`)
                .then(() => {
                    user.follow = false;
                    this.action('toast', {success: 1, text: '已取消关注'});
                });
            } else {
                this.$post(`users/follow/${user.id}`)
                .then(() => {
                    user.follow = true;
                    this.action('toast', {success: 1, text: '已关注'});
                });
            }
        }
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    }
}
</script>
<style lang="sass">
.following-view {
    height: 100%;
    .user {
        height: 180px;
        padding: 0 32px;
        .avatar-120 {
            margin-right: 64px;
        }
        .follow {
            padding: 5px;
            width: 112px;
            height: 40px;
            border-radius: 8px;
            border: 1px solid;
        }
    }
    .icon-follow, .icon-followed {
        padding-right: 5px;
        &  + span {
            vertical-align: text-top;
        }
    }
}
</style>
