<style lang="sass">
.social-bar {
    height: 80px;
    .action {
        padding-left: 12px;
        padding-right: 32px;
    }
    .users {
        > div {
            width: percentage(1/7);
            padding: 15px;
            /*background-color: rgba(tomato, .2);*/
        }
        .user, .more {
            width: 100%;
            padding-top: 100%;
            border-radius: 50%;
            background-size: cover;
        }
        .user {
            background-image: url('http://7xp1h7.com2.z0.glb.qiniucdn.com/placeholder-avatar.svg');
        }
        .more {
            background-image: url('http://7xp1h7.com2.z0.glb.qiniucdn.com/more.svg');
        }
    }
    .extra-action {
        width: 108px;
    }
}
</style>
<template>
<div class="social-bar font-26 gray flex">
    <div class="action" @click="like">
        <i class="{{active ? 'red icon-like-active' : 'icon-like'}}"></i><span>{{total}}</span>
    </div>
    <div class="users flex flex-1" v-show="total">
        <div v-for="user in list">
            <div class="user" v-link="user | profile" v-bg.sm="user.photo"></div>
        </div>
        <div v-if="total>7" v-link="{name: 'likes', params: {type: type, id: id}}">
            <div class="more"></div>
        </div>
    </div>
    <div class="hint flex-1" v-show="!total">
        位置已经留好，就等你来点赞
    </div>
    <slot>x</slot>
</div>
</template>
<script>
export default {
    name: 'SocialBar',
    props: {
        id: {
            required: false,
            default: -1
        },
        type: {
            default: 1
        },
        total: {
            default: 0
        },
        list: {
            default() {
                return [];
            }
        },
        active: {
            default: false
        }
    },
    computed: {
        likeApi() {
            return `users/target/${this.id}/type/${this.type}/like`;
        }
    },
    methods: {
        like() {
            if (this.active) {
                this.$delete(this.likeApi).then(() => {
                    this.active = false;
                    this.total -= 1;
                    this.list.forEach((item, index, list) => {
                        if(item.id == this.self.id) {
                            list.splice(index, 1);
                        }
                    });
                });
            } else {
                this.$post(this.likeApi).then(() => {
                    this.active = true;
                    this.total += 1;
                    this.list.splice(0, 0, this.self);
                });
            }
        }
    }
}
</script>
