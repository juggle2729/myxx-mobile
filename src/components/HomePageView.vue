<template>
<div class="homepage-view">
    <div class="account border-bottom flex">
        <div class="avatar-240" v-bg.md="photo"></div>
        <p class="font-30 red">{{nickname}}</p>
        <button v-if="!follow && isNotSelf" class="bg-red font-26 white icon-like-active" @click="toggleFollow">关注</button>
        <button v-if="follow && isNotSelf" class="bg-default font-26 white" @click="toggleFollow">已关注</button>
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
        <div v-link="{name: 'follower', params: {id: userId }}" class="border-right">
            <p class="font-30" align="center">{{fans_count}}</p>
            <p class="font-26 gray" align="center">粉丝</p>
        </div>
    </div>
    <div class="separator" style="height:30px"></div>
    <div class="his border-bottom">
        <div class="row font-30 border-bottom" v-link="{name: 'user-like', params: {id: userId}}">
            <span class="red icon-like"></span>
            <span>TA的赞</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-30 border-bottom" v-link="{name: 'user-evaluation', params: {id: userId}}">
            <span class="red icon-eval"></span>
            <span>TA的鉴宝</span>
            <span class="icon-enter gray"></span>
        </div>
        <div class="row font-30">
            <span class="red icon-store"></span>
            <span>{{has_shop ? 'TA的店铺' : 'TA没有店铺'}}</span>
            <span class="icon-enter gray"></span>
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
            topic_count: 1,
            follow_count: 2,
            follow: false,
            userId: 0,
            isNotSelf: false
        };
    },
    route: {
        data() {
            this.userId = this.$route.params.id;
            return this.$get('users/'+ this.userId +'/profile')
                .then((data) => {
                    this.isNotSelf = !(this.userId == this.self.user_id);
                    this.$data = Object.assign(this.$data, data);
                });
        }
    },
    methods: {
        toggleFollow() {
            if (this.follow) {
                this.toast('已关注');
            } else {
                this.$post(`users/follow/` + this.userId)
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
    .account {
        flex-direction: column;
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
    .icon-enter {
        transform: rotate(-90deg);
    }
}
</style>
