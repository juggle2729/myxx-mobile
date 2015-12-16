<style lang="sass">
.follower {
    .user {
            display: flex;
            align-items: center;
            height: 180px;
            width: 100%;
            padding-left: 32px;
            position: relative;
            background-color: #ffffff;
            > img {
                height: 120px;
                width: 120px;
                border-radius: 50%;
            }
            .info {
                margin-left: 64px;
            }
            > button {
                position: absolute;
                right: 32px;
                top: 50%;
                margin-top: -20px;
                width: 112px;
                height: 40px;
                background-color: #fff;
                border-radius: 8px;
                border-width: 1px;
                border-style: solid;
                display:flex;
                align-items: center;
                > img {
                    width: 20px;
                    margin-left: 8px;
                }
                > p {
                    margin-left: 0;
                    display:inline;
                    margin-left: 8px;
                }
            }
        }
        .separ {
            padding-left: 32px;
            padding-top: 20px;
            height: 52px;
        }
    }
</style>
<template>
    <div class="follower">
        <div v-if="newList">
            <div class="separ bg-default border-bottom">
                <p class="font-26 gray">新的粉丝</p>
            </div>
            <template v-for="user in newList">
                <div class="user">
                    <img :src="user.photo | img" v-link="{ name: 'homepage', params: { id: user.user_id }}"/>
                    <div class="info" v-link="{ name: 'homepage', params: { id: user.user_id }}">
                        <div>
                            <p class="font-30">{{user.nickname}}</p>
                            <p class="font-26 light" style="margin-top:12px;">{{user.title}}</p>
                        </div>
                    </div>
                    <button class="gray font-22 border-gray" v-if="user.follow" @click="toggleFollow(user)">
                        <img src="/static/images/profile/unfollow.png" >
                        <p>已关注</p>
                    </button>
                    <button class="red font-22 border-red" v-if="!user.follow" @click="toggleFollow(user)" >
                        <img src="/static/images/profile/follow.png" >
                        <p>加关注</p>
                    </button>
                </div>
            </template>
            <div class="separator-20"></div>
        </div>
        <div v-if="oldList">
            <template v-for="user in oldList">
                <div class="user border-bottom">
                    <img :src="user.photo | img" v-link="{ name: 'homepage', params: { id: user.user_id }}"/>
                    <div class="info" v-link="{ name: 'homepage', params: { id: user.user_id }}">
                        <div>
                            <p class="font-30">{{user.nickname}}</p>
                            <p class="font-26 light" style="margin-top:8px;">{{user.title}}</p>
                        </div>
                    </div>
                    <button class="gray font-22 border-gray" v-if="user.follow" @click="toggleFollow(user)">
                        <img src="/static/images/profile/unfollow.png" >
                        <p>已关注</p>
                    </button>
                    <button class="red font-22 border-red" v-if="!user.follow" @click="toggleFollow(user)">
                        <img src="/static/images/profile/follow.png" >
                        <p>加关注</p>
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    const roles = ['普通用户', '商家', '藏家', '大师', '权威'];
    export default {
        name: 'Selffollower',
        methods: {
            toggleFollow(user) {
                if (user.follow) {
                    this.$http.delete(`users/follow/`+user.user_id, (resp) => {
                        if(resp.status === 200) {
                            user.follow = false;
                            this.toast('取消关注成功');
                        } else if(resp.status === 605) {
                            this.toast(resp.message);
                            this.action('login');
                        }
                    });
                } else {
                    this.$http.post(`users/follow/`+user.user_id, (resp) => {
                        if(resp.status === 200) {
                            user.follow = true;
                            this.toast('关注成功');
                        } else if(resp.status === 605) {
                            this.toast(resp.message);
                            this.action('login');
                        }
                    });
                }
            }
        },
        data() {
            return {
                newList: [{
                    nickname: '新徐太宇',
                    photo: '',
                    title: '普通用户',
                    user_id: 8,
                    follow: false
                }],
                oldList: [{
                    nickname: '老徐太宇',
                    photo: '',
                    title: '普通用户',
                    user_id: 5,
                    follow: false
                }]
            };
        },
        route: {
            data({to}) {
                const userId = to.query.id || 1;
                return this.$http
                    .get('users/my_fans')
                    .success(function(resp) {
                        resp.data.entries.forEach((entry) => {
                            entry.title = roles[entry.role];
                            this.oldList.push(entry);
                        });
                    });
            }
        }
    }
</script>
