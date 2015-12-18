<template>
<div class="following-view">
    <template v-for="user in userList">
        <div class="user border-bottom bg-white flex">
            <div v-bg.md="user.photo" class="avatar-120" v-link="{name: 'user-profile', params: {id: user.user_id}}"></div>
            <div class="info flex-1" v-link="{name: 'user-profile', params: {id: user.user_id}}">
                <p class="font-30">{{user.nickname}}</p>
                <p class="font-26 light" style="margin-top:8px;">{{user.role | role}}</p>
            </div>
            <button class="gray font-22 border-gray flex bg-white" v-if="user.follow && user.isNotSelf" @click="toggleFollow(user)">取消关注</button>
            <button class="red font-22 border-red flex bg-white" v-if="!user.follow && user.isNotSelf" @click="toggleFollow(user)">
                <img src="/static/images/profile/follow.png">
                <p>加关注</p>
            </button>
        </div>
    </template>
    <div class="loadmore center font-22 gray">
        <img v-show="hasMore" src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
        <span v-show="!hasMore" class="center-vertical">没有了</span>
    </div>
</div>
</template>
<script>
export default {
    name: 'SelfFollowing',
    methods: {
        toggleFollow(user) {
            if (user.follow) {
                this.$http.delete(`users/follow/`+user.user_id)
                .success((resp) => {
                    user.follow = false;
                    this.toast('取消关注成功');
                });
            } else {
                this.$http.post(`users/follow/`+user.user_id)
                .success((resp) => {
                    user.follow = true;
                    this.toast('关注成功');
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
                return this.$http
                    .get('users/' + userid + '/follow_list', params)
                    .success(({data}) => {
                        data.entries.forEach((entry) => {
                            entry.isNotSelf = !(entry.user_id == this.self.user_id);
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
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    }
}
</script>
<style lang="sass">
.following-view {
    .user {
        height: 180px;
        width: 100%;
        padding: 0 32px;
        position: relative;
        .info {
            margin-left: 64px;
        }
        button {
            width: 112px;
            height: 40px;
            border-radius: 8px;
            border-width: 1px;
            border-style: solid;
            > img {
                width: 20px;
                height: 20px;
                margin-left: 8px;
            }
            > p {
                display: inline;
                margin-left: 8px;
            }
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
