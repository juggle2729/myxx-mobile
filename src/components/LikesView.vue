<template>
<div class="likes-view bg-default">
    <div class="separator"></div>
    <div class="user flex border-bottom bg-white" v-for="user in users">
        <div class="avatar-120" v-bg.md="user.photo" v-link="{name: 'user-profile', params: { id: user.id}}"></div>
        <div class="flex-1" v-link="{name: 'user-profile', params: { id: user.id}}">
            <div class="font-30">{{user.name}}</div>
            <div class="font-26 light margin-top">{{user.role | role}}</div>
        </div>
        <div v-if="user.is_followed" class="font-22 gray border-red follow icon-followed" @click="toggleFollow(user)" @click="toggleFollow(user)">已关注</div>
        <div v-else class="font-22 red border-light follow icon-follow" @click="toggleFollow(user)">加关注</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'LikesView',
    data() {
        return {
            id: 0,
            type: 0,
            users: []
        };
    },
    route: {
        canReuse() {
            return false;
        },
        data({to}) {
            this.id = to.params.id;
            this.type = to.params.type;
            this.fetch();
        }
    },
    events: {
        scrollToBottom(e) {
          this.fetch();
        }
    },
    methods: {
        toggleFollow(user) {
            if (user.is_followed) {
                this.$delete('users/follow/'+user.id)
                .then(() => {
                    user.is_followed = false;
                    this.action('toast', {success: 1, text: '已取消关注'});
                });
            } else {
                this.$post('users/follow/'+user.id)
                .then(() => {
                    user.is_followed = true;
                    this.action('toast', {success: 1, text: '已关注'});
                });
            }
        },
        fetch: (function() {
            const limit = 10;
            let loading = false;
            return function() {
                let offset = this.users.length;
                if(loading) {
                    return console.debug('skip!!!!!!!!');
                }
                console.debug('fetch', offset);
                loading = true;
                const params = {limit, offset};
                return this.$get(`users/target/${this.id}/type/${this.type}/likers`, params).then((data) => {
                        this.users.splice(this.users.length, 0, ...data.users);
                        this.total = data.total;
                        loading = false;
                        if (data.users.length < limit) {
                            this.hasMore = false;
                        }
                    });
            }
        })()
    }
}
</script>
<style lang="sass">
.likes-view {
    height: 100%;
    .user {
        height: 180px;
        padding: 24px 32px;
        .avatar-120 {
            margin-right: 64px;
        }
        .follow {
            padding: 5px;
            border: 2px solid;
            border-radius: 8px;
            width: 112px;
            height: 40px;
        }
    }
}
</style>
