<template>
<div class="profile-view bg-default">
    <div class="separator"></div>
    <div class="account bg-white border-bottom flex" v-link="self | profile">
        <div class="avatar-120" v-bg.sm="photo"></div>
        <div class="user flex-1">
            <p class="font-30">{{nickname}}</p>
            <p class="font-26 gray">{{role | role}}</p>
        </div>
        <span class="font-26 red flex">进入个人主页<i class="icon-enter gray margin-left"></i></span>
    </div>
    <div class="community bg-white flex">
        <div v-link="{name: 'user-like', params: {id: self.id}}" class="border-right">
            <p class="font-30" align="center">{{like_count || 0}}</p>
            <p class="font-26 gray" align="center">我的赞</p>
        </div>
        <div v-link="{name: 'user-following', params: {id: self.id}}" class="border-right">
            <p class="font-30" align="center">{{follow_count}}</p>
            <p class="font-26 gray" align="center">关注</p>
        </div>
        <div v-link="{name: 'user-follower', params: {id: self.id}}">
            <p class="font-30" align="center">{{fans_count}}</p>
            <p class="font-26 gray" align="center">粉丝</p>
        </div>
    </div>
    <div class="separator-40"></div>
    <div class="rows">
        <div class="row bg-white font-30 border-bottom" @click="action('profile')">
            <span class="red icon-edit"></span>
            <span class="">编辑资料</span>
            <span class="icon-enter gray font-26"></span>
        </div>
    </div>
    <div class="separator-40"></div>
    <div class="rows">
        <div class="row bg-white font-30 border-bottom" v-link="{name: 'user-evaluation', params: {id: self.id}}">
            <span class="red icon-eval"></span>
            <span>我的鉴宝</span>
            <span class="icon-enter gray font-26"></span>
        </div>
        <div class="row bg-white font-30" v-link="{name: 'user-story', params: {id: self.id}}">
            <span class="icon-story red"></span>
            <span>我的晒宝</span>
            <span class="icon-enter gray font-26"></span>
        </div>
    </div>
    <div class="separator-40"></div>
    <div class="rows">
        <div class="row bg-white font-30 border-bottom" v-link="{name: shop_status ? 'user' : 'apply-shop', params:{id: self.id}}">
            <span class="icon-store red"></span>
            <span>{{shop_status ? '我的店铺' : '申请开通店铺'}}</span>
            <span class="icon-enter gray font-26"></span>
        </div>
        <div class="row bg-white font-30" v-link="{name: website_status ? 'master' : 'apply-site', params:{id: self.id}}">
            <span class="icon-site red"></span>
            <span>{{website_status ? '我的官网' : '申请开通官网'}}</span>
            <span class="icon-enter gray font-26"></span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Profile',
    data() {
        return {
        };
    },
    route: {
        data() {
            return this.action('user')
                .then((user) => {
                    if(user) {
                        return this.$get(`users/${user.id}/profile|v2`)
                            .then((data) => {
                                this.$data = data;
                                this.userId = user.id;
                            });
                    } else {
                        return this.action('login');
                    }
                });
        }
    }
}
</script>
<style lang="sass">
.profile-view {
    height: 100%;
    .account {
        height: 200px;
        padding: 0 32px;
        position: relative;
        .user {
            margin-left: 30px;
            > p:nth-of-type(2) {
                margin-top: 16px;
            }
        }
    }
    .community {
        height: 120px;
        width: 100%;
        padding: 25px 0;
        > div {
            width: 33.3%;
            > p:nth-of-type(2) {
                margin-top: 14px;
            }
        }
    }
    .rows {
        padding-left: 0;
        .row {
            padding-left: 32px;
            background-position: 32px 100%;
        }
    }
}
</style>
