<template>
<div class="user-view">
    <div class="account flex" v-bg="profile.background_img">
        <div class="title flex">
            <div class="avatar-90" v-bg.sm="profile.photo" @click="coverflow(0)"></div>
            <div class="white flex-1">
                <p class="font-30 margin-bottom"><span>{{profile.nickname}}</span><span class="font-26">{{profile.titles.length? profile.titles[0].name:''}}</span></p>
                <p class="font-26">
                    <span v-link="{name:'user-following', params: {id: $route.params.id}}">关注&nbsp;&nbsp;{{profile.follow_count}}</span>
                    <span v-link="{name:'user-follower', params: {id: $route.params.id}}">粉丝&nbsp;&nbsp;{{profile.fans_count}}</span>
                </p>
            </div>
            <div class="button bg-white font-26 red" v-if="!(profile.follow || isSelf)" @click="toggleFollow">
                <span class="icon-follow">关注</span>
            </div>
            <div class="button font-26 white bg-disable" v-if="profile.follow && !isSelf" @click="toggleFollow">
                <span>已关注</span>
            </div>
        </div>
    </div>
    <div class="site flex font-26 border-bottom bg-white" v-if="profile.website_status" v-link="{name: 'master', params:{id: $route.params.id}}">
        <div class="icon bg-red white">官网</div>
        <div class="flex-1 red margin-left font-30">{{profile.website_interview_title}}</div>
        <div class="icon-enter"></div>
    </div>
    <div class="tabs bg-white flex border-bottom" :class="{'default': isDefaultView}">
        <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'jade'}}" v-if="profile.shop_status">
            <p class="font-30" align="center">{{profile.products_count}}</p>
            <p class="font-26" align="center">{{profile.role > 3 ? '作品': '商品'}}</p>
        </div>
        <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'story'}}">
            <p class="font-30" align="center">{{profile.topic_count}}</p>
            <p class="font-26" align="center">晒宝</p>
        </div>
        <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'evaluation'}}">
            <p class="font-30" align="center">{{profile.jianbao_count + profile.jianbao_request_count}}</p>
            <p class="font-26" align="center">鉴宝</p>
        </div>
    </div>
    <div class="content">
        <!-- TODO use keep-alive -->
        <component :is="view" transition-mode="out-in" transition="fade"></component>
    </div>
</div>
</template>
<script>
import jade from './UserJade.vue'
import story from './UserStory.vue'
import evaluation from './UserEvaluation.vue'
export default {
    name: 'UserView',
    components: {
        jade,
        story,
        evaluation
    },
    data() {
        return {
            titles: [],
            isDefaultView: false,
            view: undefined,
            profile: {
                titles: []
            }
        }
    },
    created() {
        return this.$get(`users/${this.$route.params.id}/profile|v2`)
            .then((data) => {
                this.profile = data;
                this.isSelf = _.get(this, 'self.id') == this.$route.params.id;
                if(!this.view) {
                    this.view = data.shop_status ? 'jade': 'story';
                }
                this.setShareData('profile', {id: data.id, name: data.nickname, photo: data.photo} , true);
            });
    },
    route: {
        data({from, to, next}) {
            this.isDefaultView = ['story', 'jade', 'evaluation'].indexOf(to.params.tab) === -1;
            if(!this.isDefaultView) {
                this.view = to.params.tab;
            }
            setTimeout(next, 1000); //添加延时，hack全局loading
        }
    },
    methods: {
        toggleFollow() {
            if (this.profile.follow) {
                this.$delete(`users/follow/${this.$route.params.id}`)
                    .then(() => {
                        this.profile.follow = false;
                        this.action('toast', {success: 1, text: '取消关注成功'});
                    });
            } else {
                this.$post(`users/follow/${this.$route.params.id}`)
                    .then(() => {
                        this.profile.follow = true;
                        this.action('toast', {success: 1, text: '关注成功'});
                    });
            }
        },
        coverflow(index=0) {
            if(this.profile.photo) {
                this.action('coverflow', {ids: [this.profile.photo], index});
            }
        }
    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.user-view {
    height: 100%;
    .account {
        height: 630px;
        padding: 20px 32px;
        background-size: cover;
        -webkit-box-align: end;
        .title {
            width: 100%;
            .avatar-90 {
                border: 1px white solid;
            }
            .flex-1 {
                margin-left: 30px;
                >p span+span {
                    margin-left: 50px;
                }
            }
            .button {
                height: 56px;
                width: 117px;
                border-width: 0;
                border-radius: 10px;
                text-align: center;
                line-height: 56px;
            }
        }

    }
    .site {
        height: 120px;
        width: 100%;
        padding-left: 40px;
        padding-right: 10px;
        .icon {
            width: 82px;
            height: 46px;
            line-height: 46px;
            text-align: center;
            border-radius: 5px;
        }
    }
    .tabs {
        height: 100px;
        width: 100%;
        padding: 18px 0;
        > div {
            color: #888888;
            p:last-child {
                margin-top: 10px;
            }
            &:not(:last-child) {
                background-image: linear-gradient(270deg, #efefef 51%, transparent 51%);
                background-position: right center;
                background-repeat: no-repeat;
                background-size: 1px 100%;
                padding-right: 1px;
            }
            &.v-link-active {
                color: #cc3f4f;   
            }
        }
        > div:first-child:nth-last-child(2), > div:first-child:nth-last-child(2) ~ div {
            width: 50%;
        }
        > div:first-child:nth-last-child(3), > div:first-child:nth-last-child(3) ~ div {
            width: percentage(1/3);
        }
        &.default {
            > div:first-child {
                color: #cc3f4f;
            }
        }
    }
    .content {
        position: relative;
        height: 50%;
    }
}
</style>
