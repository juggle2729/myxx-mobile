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
    }
    .extra-action {
        width: 108px;
    }
}
</style>
<template>
<div class="social-bar font-26 gray flex">
    <div class="action" @click="toggleFavor">
        <i class="{{active ? 'red icon-favor-active' : 'icon-favor'}}"></i><span>{{total}}</span>
    </div>
    <div class="users flex flex-1" v-show="total">
        <div v-for="user in list">
            <div class="user" v-bg.sm="user.photo"></div>
        </div>
        <div v-if="total>7">
            <div class="more bg-red"></div>
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
    data() {
        return {};
    },
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
    methods: {
        toggleFavor() {
            console.debug(this.item);
            if (this.active) {
                this.$http.delete(`sns/posts/${this.id}/like`, (resp) => {
                    if (resp.status === 200) {
                        this.active = false;
                        this.total -= 1;
                        this.list.splice(0, 1);
                    } else {
                        this.toast(resp.message);
                    }
                });
            } else {
                this.$http.post(`sns/posts/${this.id}/like`, (resp) => {
                    if (resp.status === 200) {
                        this.active = true;
                        this.total += 1;
                        this.list.splice(0, 0, this.self);
                    } else {
                        this.toast(resp.message);
                    }
                });
            }
        }
    }
}
</script>