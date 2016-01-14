<template>
<div class="homepage-view bg-default">
    <div class="separator"></div>
    <div class="account border-bottom bg-white">
        <div class="avatar-240 center-horizontal" v-bg.sm="photo"></div>
        <p class="font-30 red center">{{nickname}}</p>
        <button v-if="!(follow || isSelf)" class="bg-red font-26 white center-horizontal" @click="toggleFollow">
            <span class="icon-like-active center"> 关注</span></button>
        <button v-if="follow && !isSelf" class="bg-gray font-26 white center-horizontal" @click="toggleFollow">
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
        <div class="row font-30" :class="{'border-bottom': has_shop}"v-link="{name: 'user-evaluation', params: {id: userId}}">
            <span class="red icon-eval"></span>
            <span>TA的鉴宝</span>
            <span class="icon-enter gray font-26"></span>
        </div>
        <div class="row font-30" v-if="has_shop">
            <span class="red icon-store"></span>
            <span>TA的店铺</span>
            <span class="icon-enter gray font-26"></span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'HomePageView',
    route: {
        data() {
            this.userId = this.$route.params.id;
            return this.$get('users/'+ this.userId +'/profile')
                .then((data) => {
                    this.isSelf = (this.self && this.self.id == this.userId);
                    this.$data = data;
                });
        }
    },
    methods: {
        toggleFollow() {
            if (this.follow) {
                this.$delete('users/follow/'+ this.userId)
                    .then(() => {
                        this.follow = false;
                        this.action('toast', {success: 1, text: '取消关注成功'});
                    });
            } else {
                this.$post('users/follow/' + this.userId)
                    .then(() => {
                        this.follow = true;
                        this.action('toast', {success: 1, text: '关注成功'});
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
