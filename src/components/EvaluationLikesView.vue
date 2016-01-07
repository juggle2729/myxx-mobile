<style lang="sass">
.evaluation-likes-view {
    .user {
        padding: 24px 32px;
        .avatar {
            margin-right: 24px;
        }
    }
}
</style>
<template>
<div class="evaluation-likes-view">
    <div class="separator-20"></div>
    <div class="user flex border-bottom" v-for="user in users">
        <div class="avatar" v-bg.sm="user.photo"></div>
        <div class="flex-1">
            <div class="font-30">{{user.name}}</div>
            <div class="font-26 gray margin-top">{{user.role | role}}</div>
        </div>
        <div class="font-26">+加关注</div>
    </div>
</div>
</template>
<script>
import config from '../config';
export default {
    name: 'EvaluationLikesView',
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
            return this.fetch();
        }
    },
    events: {
        scrollToBottom(e) {
          this.fetch();
        }
    },
    methods: {
        // /sns/posts/{post_id}/like/users
        // /sns/results/{result_id}/like/users
        fetch: (function() {
            const limit = 2;
            let loading = false;
            return function() {
                let offset = this.users.length;
                if(loading) {
                    return console.debug('skip!!!!!!!!');
                }
                console.debug('fetch', offset);
                loading = true;
                const params = {};
                return this.$get(`sns/posts/${this.id}/like/users`, params).then((data) => {
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
