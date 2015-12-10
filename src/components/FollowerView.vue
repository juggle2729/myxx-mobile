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
                color: #cc3f4f;
                font-size: 22px;
                background-color: #fff;
                border-color: #cc3f4f;
                border-radius: 8px;
                border-width: 4px;
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
            display: flex;
            align-items: center;
            padding-left: 32px;
        }
    }
</style>
<template>
    <div class="follower">
        <div v-if="newList">
            <div class="separ separator-40">
                <p class="font-26 txt-black">新的粉丝</p>
            </div>
            <template v-for="user in newList">
                <div class="user border-bottom">
                    <img :src="user.photo | img" v-link="{ name: 'homepage', params: { id: user.userId }}"/>
                    <div class="info" v-link="{ name: 'homepage', params: { id: user.userId }}">
                        <div>
                            <p class="font-30 txt-primary">{{user.nickname}}</p>
                            <p class="font-26 light" style="margin-top:12px;">{{user.title}}</p>
                        </div>
                    </div>
                    <button v-if="user.followed" @click="toggleFollow(user)" style="border-color: #595959;color:#595959;">
                        <img src="/static/images/profile/unfollow.png" >
                        <p>已关注</p>
                    </button>
                    <button v-if="!user.followed" @click="toggleFollow(user)" style="display:flex;">
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
                    <img :src="user.photo | img" v-link="{ name: 'homepage', params: { id: user.userId }}"/>
                    <div class="info" v-link="{ name: 'homepage', params: { id: user.userId }}">
                        <div>
                            <p class="font-30 txt-primary">{{user.nickname}}</p>
                            <p class="font-26 light" style="margin-top:8px;">{{user.title}}</p>
                        </div>
                    </div>
                    <button v-if="user.followed" @click="toggleFollow(user)" style="border-color: #595959;color:#595959;">
                        <img src="/static/images/profile/unfollow.png" >
                        <p>已关注</p>
                    </button>
                    <button v-if="!user.followed" @click="toggleFollow(user)" >
                        <img src="/static/images/profile/follow.png" >
                        <p>加关注</p>
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Selffollower',
        methods: {
            toggleFollow(user) {
                if (user.followed) {
                    user.followed = !user.followed;
                    this.toast('取消关注成功');
                } else {
                    user.followed = !user.followed;
                    this.toast('关注成功');
                }
            }
        },
        data() {
            return {
                newList: [{
                    nickname: '新徐太宇',
                    photo: '',
                    title: '普通用户',
                    type: '用户',
                    userId: 8,
                    followed: false
                }, {
                    nickname: '许七',
                    photo: '',
                    title: '工艺大师',
                    type: '用户',
                    userId: 9,
                    followed: false
                }, {
                    nickname: '二胡卵子',
                    photo: '',
                    title: '工艺大师',
                    type: '用户',
                    userId: 4,
                    followed: true
                }],
                oldList: [{
                    nickname: '老徐太宇',
                    photo: '',
                    title: '普通用户',
                    type: '用户',
                    userId: 5,
                    followed: true
                }, {
                    nickname: '许七',
                    photo: '',
                    title: '工艺大师',
                    type: '用户',
                    userId: 6,
                    followed: false
                }, {
                    nickname: '二胡卵子',
                    photo: '',
                    title: '工艺大师',
                    type: '用户',
                    userId: 7,
                    followed: false
                }]
            };
        }
        // ,
        // route: {
        //     data({
        //         to
        //     }) {
        //         const userId = to.query.id || 1;
        //         return this.$http
        //             .get('')
        //             .success(function(resp) {
        //             });
        //     }
        // }
    }
</script>
