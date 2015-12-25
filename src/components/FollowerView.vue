<template>
<div class="follower-view bg-default">
    <div class="separator-20"></div>
    <template v-for="user in userList">
        <div class="user border-bottom bg-white flex">
            <div v-bg.md="user.photo" class="avatar-120" v-link="{name: 'user-profile', params: { id: user.user_id}}"></div>
            <div class="info flex-1" v-link="{name: 'user-profile', params: {id: user.user_id}}">
                <p class="font-30">{{user.nickname}}</p>
                <p class="font-26 light" style="margin-top:8px;">{{user.role | role}}</p>
            </div>
            <button class="gray font-22 border-gray flex bg-white" v-if="user.follow && user.isNotSelf" @click="toggleFollow(user)">
                <span class="icon-followed">已关注</span>
            </button>
            <button class="red font-22 border-red flex bg-white" v-if="!user.follow && user.isNotSelf" @click="toggleFollow(user)">
                <span class="icon-follow">加关注</span>
            </button>
        </div>
    </template>
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
                    this.toast('取消关注成功');
                });
            } else {
                this.$post('users/follow/'+user.user_id)
                .then(() => {
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
                return this.$get('users/' + userid + '/fans_list', params)
                    .then((data) => {
                        data.entries.forEach((entry) => {
                            entry.isNotSelf = !(entry.user_id == this.$root.user.id);
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
            .icon-followed {
                width: 15px;
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
