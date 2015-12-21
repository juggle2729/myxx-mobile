<style lang="sass">
.likes-view {
    .user {
        padding: 24px 32px;
        .avatar {
            margin-right: 24px;
        }
    }
    .follow {
        padding: 5px;
        border: 2px solid red;
        border-radius: 5px;
    }
    .unfollow {
        padding: 5px;
        border: 2px solid gray;
        border-radius: 5px;
    }
}
</style>
<template>
<div class="likes-view">
    <div class="separator"></div>
    <div class="user flex border-bottom" v-for="user in users">
        <div class="avatar" v-bg.sm="user.photo"></div>
        <div class="flex-1">
            <div class="font-30">{{user.name}}</div>
            <div class="font-26 gray margin-top">{{user.role | role}}</div>
        </div>
        <div v-if="user.is_followed" class="font-22 gray unfollow">+已关注</div>
        <div v-else class="font-22 gray follow">+加关注</div>
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
                        this.users.splice(this.users.length - 1, 0, ...data.users);
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