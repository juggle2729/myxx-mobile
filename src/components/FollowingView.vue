<style lang="sass">
    .following {
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
                margin-left: 60px;
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
                > img {
                    width: 20px;
                    height: 20px;
                    margin-left: 8px;
                }
                > p {
                    margin-left: 0;
                    display:inline;
                    margin-left: 8px;
                }
            }
        }
    }
</style>
<template>
    <div class="following">
        <template v-for="user in userList">
            <div class="user border-bottom">
                <img :src="user.photo | img" v-link="{ name: 'homepage', params: { id: user.userId }}"/>
                <div class="info" v-link="{ name: 'homepage', params: { id: user.userId }}">
                    <p class="font-30 txt-primary">{{user.nickname}}</p>
                    <p class="font-22 txt-gray" style="margin-top:8px;">{{user.title}}</p>
                </div>
                <button v-if="user.followed" @click="toggleFollow(user)" style="border-color: #595959;color:#595959;">取消关注</button>
                <button v-if="!user.followed" @click="toggleFollow(user)" style="display: flex;align-items: center;">
                    <img src="/static/images/profile/follow.png" >
                    <p>加关注</p>
                </button>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        name: 'SelfFollowing',
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
                userList: [{
                    nickname: '徐太宇',
                    photo: '',
                    email: 'abc@qq.com',
                    title: '普通用户',
                    type: '用户',
                    userId: 5,
                    followed: true
                }, {
                    nickname: '许七',
                    photo: '',
                    email: 'abc@qq.com',
                    title: '工艺大师',
                    type: '用户',
                    userId: 3,
                    followed: true
                }, {
                    nickname: '二胡卵子',
                    photo: '',
                    email: 'abc@qq.com',
                    title: '工艺大师',
                    type: '用户',
                    userId: 4,
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
