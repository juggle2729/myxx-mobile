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
            button {
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
                <img :src="user.photo | img" v-link="{ name: 'homepage', params: { id: user.user_id }}"/>
                <div class="info" v-link="{ name: 'homepage', params: { id: user.userId }}">
                    <p class="font-30 txt-primary">{{user.nickname}}</p>
                    <p class="font-26 light" style="margin-top:8px;">{{user.title}}</p>
                </div>
                    <button class="gray font-22 border-gray" v-if="user.followed" @click="toggleFollow(user)">取消关注</button>
                    <button class="red font-22 border-red" v-if="!user.followed" @click="toggleFollow(user)" style="display: flex;align-items: center;">
                        <img src="/static/images/profile/follow.png" >
                        <p>加关注</p>
                    </button>
            </div>
        </template>
    </div>
</template>
<script>
    const roles = ['普通用户', '商家', '藏家', '大师', '权威'];
    export default {
        name: 'SelfFollowing',
        methods: {
            toggleFollow(user) {
                if (user.followed) {
                    // this.$http.delete(`users/follow/`+user.user_id, (resp) => {
                    //     if(resp.status === 200) {
                    //         user.followed = false;
                    //         this.toast('取消关注成功');
                    //     } else if(resp.status === 605) {
                    //         this.toast(resp.message);
                    //         this.action('login');
                    //     }
                    // });
                    user.followed = false;
                    this.toast('取消关注成功');
                } else {
                    // this.$http.post(`users/follow/`+user.user_id, (resp) => {
                    //     if(resp.status === 200) {
                    //         user.followed = true;
                    //         this.toast('关注成功');
                    //     } else if(resp.status === 605) {
                    //         this.toast(resp.message);
                    //         this.action('login');
                    //     }
                    // });
                    user.followed = true;
                    this.toast('关注成功');
                }
            }
        },
        data() {
            return {
                userList: []
            };
        },
        route: {
            data({ to }) {
                const userId = to.query.id || 1;
                return this.$http
                    .get('users/my_follow')
                    .success(function(resp) {
                        resp.data.entries.forEach((entry) => {
                            entry.title = roles[entry.role];
                            entry.followed = true;
                            this.userList.push(entry);
                        });
                        // this.userList = resp.data.entries.map((entry) => {
                        //     entry.title = roles[entry.role];
                        //     entry.followed = true;
                        //     return entry;
                        // });
                        // this.userList = resp.data.entries;
                        // for(var x in resp.data.entries){
                        //     this.userList[x].title = roles[resp.data.entries[x].role];
                        //     this.userList[x].followed = true;
                        // }
                        // for(var entry of resp.data.entries){
                        //     entry.title = roles[entry.role];
                        //     entry.followed = true;
                        //     this.userList.push(entry);
                        // }
                    });
            }
        }
    }
</script>
