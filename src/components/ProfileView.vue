<template>
<div class="profile-view bg-default">
    <div class="separator"></div>
    <div class="account bg-white border-bottom flex" @click="action('profile')">
        <div class="avatar-120" v-bg.sm="photo"></div>
        <div class="user flex-1">
            <p class="font-30">{{nickname}}</p>
            <p class="font-26 gray">{{role | role}}</p>
        </div>
        <span class="icon-enter font-26 gray flex"></span>
    </div>
    <div class="community bg-white flex">
        <div v-link="{name: 'user-story', params: {id: userId}}" class="border-right">
            <p class="font-30" align="center">{{topic_count}}</p>
            <p class="font-26 gray" align="center">话题</p>
        </div>
        <div v-link="{name: 'following', params: {id: userId }}" class="border-right">
            <p class="font-30" align="center">{{follow_count}}</p>
            <p class="font-26 gray" align="center">关注</p>
        </div>
        <div v-link="{name: 'follower', params: {id: userId }}">
            <p class="font-30" align="center">{{fans_count}}</p>
            <p class="font-26 gray" align="center">粉丝</p>
        </div>
    </div>
    <div class="separator-40"></div>
    <div class="rows">
        <div class="row bg-white font-30 border-bottom" v-link="{name: 'user-evaluation', params: {id: userId}}">
            <span class="red icon-eval"></span>
            <span class="">我的鉴宝</span>
            <span class="icon-enter gray font-26"></span>
        </div>
        <div class="row bg-white font-30" v-link="{name: 'user-like', params:{id: userId}}">
            <span class="icon-like red"></span>
            <span>我的赞</span>
            <span class="icon-enter gray font-26"></span>
        </div>
    </div>
    <div class="separator-40"></div>
    <div class="rows">
        <div class="row bg-white font-30 border-bottom" v-link="{name: 'shop-request', params: {id: userId}}">
            <span class="icon-store red"></span>
            <span>{{has_shop ? '我的店铺' : '申请开通店铺'}}</span>
            <span class="icon-enter gray font-26"></span>
        </div>
        <div class="row bg-white font-30" v-link="{name: 'site-request', params: {id: userId}}">
            <span class="icon-site red"></span>
            <span>{{has_website ? '我的官网' : '申请开通官网'}}</span>
            <span class="icon-enter gray font-26"></span>
        </div>
    </div>
    <div class="separator-40"></div>
    <div class="row bg-white font-30 border-bottom" @click="action('settings')">
        <span class="red icon-settings"></span>
        <span>设置</span>
        <span class="icon-enter gray font-26"></span>
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
                        return this.$get(`users/${user.id}/profile`)
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
