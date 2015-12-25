<template>
<div class="homepage-view bg-default">
    <div class="separator-20"></div>
    <div class="account border-bottom bg-white">
        <div class="avatar-240 center-horizontal" v-bg.md="photo"></div>
        <p class="font-30 red center">{{nickname}}</p>
        <button v-if="!follow && isNotSelf" class="bg-red font-26 white center-horizontal" @click="toggleFollow">
            <span class="icon-like-active center"> 关注</span></button>
        <button v-if="follow && isNotSelf" class="bg-gray font-26 white center-horizontal" @click="toggleFollow">
            <span class="center">已关注</span></button>
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
    <div class="separator-20"></div>
    <div class="his border-bottom bg-white">
        <div class="row font-30 border-bottom" v-link="{name: 'user-like', params: {id: userId}}">
            <span class="red icon-like"></span>
            <span>TA的赞</span>
            <span class="icon-enter gray font-26"></span>
        </div>
        <div class="row font-30 border-bottom" v-link="{name: 'user-evaluation', params: {id: userId}}">
            <span class="red icon-eval"></span>
            <span>TA的鉴宝</span>
            <span class="icon-enter gray font-26"></span>
        </div>
        <div class="row font-30">
            <span class="red icon-store"></span>
            <span>{{has_shop ? 'TA的店铺' : 'TA没有店铺'}}</span>
            <span class="icon-enter gray font-26"></span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'HomePageView',
    data() {
        return {
            photo: null,
            role: 0,
            has_shop: false,
            nickname: '',
            has_website: false,
            fans_count: 0,
            topic_count: 0,
            follow_count: 0,
            follow: false,
            userId: 0,
            isNotSelf: false
        };
    },
    route: {
        data() {
            this.userId = this.$route.params.id;
            this.action('user')
                .then((resp) => {
                    if(resp){
                        let user = JSON.parse(resp);
                        this.$root.user = user;
                    } else {
                        this.$root.user = { token: 'f87e7796-9896-4a6f-997e-11b48aebd347', id: 6};
                    }
                });
            return this.$get('users/'+ this.userId +'/profile')
                .then((data) => {
                    this.isNotSelf = !(this.userId == this.$root.user.id);
                    this.$data = Object.assign(this.$data, data);
                });
        }
    },
    methods: {
        toggleFollow() {
            if (this.follow) {
                this.$delete('users/follow/'+ this.userId)
                    .then(() => {
                        this.follow = false;
                        this.toast('取消关注成功');
                    });
            } else {
                this.$post('users/follow/' + this.userId)
                    .then(() => {
                        this.follow = true;
                        this.toast('关注成功');
                    });
            }
        }
    }
}
</script>
<style lang="sass">
.homepage-view {
    height: 100%;
    .account {
        height: 420px;
        padding-top: 20px;
        > p {
            margin-top: 36px;
        }
        > button {
            margin-top: 20px;
            height: 44px;
            width: 124px;
            border-width: 0;
            border-radius: 22px;
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
    .his {
        padding-left: 32px;
        .row {
            padding-left: 0;
        }
    }
}
</style>
