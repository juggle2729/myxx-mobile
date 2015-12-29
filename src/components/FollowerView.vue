<template>
<div class="follower-view bg-default">
    <div class="separator-20"></div>
        <div class="user border-bottom bg-white flex" v-for="user in userList">
            <div v-bg.md="user.photo" class="avatar-120" v-link="{name: 'user-profile', params: { id: user.user_id}}"></div>
            <div class="flex-1" v-link="{name: 'user-profile', params: {id: user.user_id}}">
                <p class="font-30">{{user.nickname}}</p>
                <p class="font-26 light margin-top">{{user.role | role}}</p>
            </div>
            <div v-if="user.follow && user.isNotSelf" class="font-22 gray border-red follow icon-followed" @click="toggleFollow(user)">已关注</div>
            <div v-if="!user.follow && user.isNotSelf" class="font-22 red border-light follow icon-follow" @click="toggleFollow(user)">加关注</div>
        </div>
    <div class="loadmore center font-22 gray" v-show="hasMore">
        <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
    </div>
</div>
</template>
<script>
export default {
    name: 'Selffollower',
    data() {
        return {
            userList: [],
            hasMore: true,
            loading: true
        };
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    methods: {
        toggleFollow(user) {
            if (user.follow) {
                this.$delete('users/follow/'+user.user_id)
                .then(() => {
                    user.follow = false;
                    this.action('toast', {success: 0, text: '取消关注成功'});
                });
            } else {
                this.$post('users/follow/'+user.user_id)
                .then(() => {
                    user.follow = true;
                    this.action('toast', {success: 0, text: '关注成功'});
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
                return this.$get('users/' + userid + '/fans_list', params)
                    .then((data) => {
                        data.entries.forEach((entry) => {
                            entry.isNotSelf = !(entry.user_id == this.self.id);
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
}
</style>
