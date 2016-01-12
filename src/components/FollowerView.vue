<template>
<div class="follower-view bg-default">
    <div v-if="total" class="separator"></div>
    <empty-page v-else title="你还没有粉丝"></empty-page>
    <div class="user border-bottom bg-white flex" v-for="user in userList">
        <div v-bg.md="user.photo" class="avatar-120" v-link="{name: 'user-profile', params: { id: user.user_id}}"></div>
        <div class="flex-1" v-link="{name: 'user-profile', params: {id: user.user_id}}">
            <p class="font-30">{{user.nickname}}</p>
            <p class="font-26 light margin-top">{{user.role | role}}</p>
        </div>
        <div v-if="user.follow && !user.isSelf" class="font-22 gray border-red follow flex" @click="toggleFollow(user)"><i class="icon-followed flex"></i><span class="flex">已关注</span></div>
        <div v-if="!(user.follow || user.isSelf)" class="font-22 red border-light follow flex" @click="toggleFollow(user)"><i class="icon-follow flex"></i><span class="flex">加关注</span></div>
    </div>
    <div class="loadmore center font-22 gray" v-if="hasMore">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
</div>
</template>
<script>
import EmptyPage from './EmptyPage.vue';
export default {
    name: 'Selffollower',
    data() {
        return {
            userList: [],
            hasMore: true,
            loading: true,
            total: 0
        };
    },
    components: {
        EmptyPage
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    methods: {
        toggleFollow(user) {
            if (user.follow) {
                this.$delete(`users/follow/${user.user_id}`)
                .then(() => {
                    user.follow = false;
                    this.action('toast', {success: 1, text: '已取消关注'});
                });
            } else {
                this.$post(`users/follow/${user.user_id}`)
                .then(() => {
                    user.follow = true;
                    this.action('toast', {success: 1, text: '已关注'});
                });
            }
        },
        fetch() {
            const limit = 10;
            const userid = this.$route.params.id;
            let offset = this.userList.length;
            if (this.loading) {
                this.loading = false;
                const params = {offset, limit};
                return this.$get(`users/${userid}/fans_list`, params)
                    .then((data) => {
                        this.total = data.total;
                        data.entries.forEach((entry) => {
                            entry.isSelf = (this.self ? entry.user_id == this.self.id : false);
                            this.userList.push(entry);
                        });
                        this.loading = true;
                        if (data.entries.length < limit) {
                            this.hasMore = false;
                            this.loading = false;
                        }
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
.follower-view {
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
    .loadmore {
        height: 68px;
        > img {
            width: 120px;
            height: 68px;
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
