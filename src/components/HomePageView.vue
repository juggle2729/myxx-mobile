<template>
<div class="homepage-view">
    <div class="account flex">
        <div class="title flex">
            <div class="avatar-90" v-bg.sm="profile.photo"></div>
            <div class="white flex-1">
                <p class="font-30 margin-bottom"><span>{{profile.nickname}}</span><span class="font-26">{{profile.titles.length? profile.titles[0].name:''}}</span></p>
                <p class="font-26">
                    <span v-link="{name:'following', params: {id: $route.params.id}}">关注&nbsp;&nbsp;{{profile.follow_count}}</span>
                    <span v-link="{name:'follower', params: {id: $route.params.id}}">粉丝&nbsp;&nbsp;{{profile.fans_count}}</span>
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
        <div class="flex-1 red margin-left">{{profile.website_interview_title}}</div>
        <div class="icon-enter"></div>
    </div>
    <div class="community bg-white flex border-bottom">
        <div v-link="link('jade')" class="border-right three" v-if="profile.shop_status" :class="{'red': isActive('jade')}">
            <p class="font-30" align="center">{{profile.products_count}}</p>
            <p class="font-26" :class="{'gray': !isActive('jade')}" align="center">{{profile.role > 3 ? '作品': '商品'}}</p>
        </div>
        <div v-link="link('story')" class="border-right" :class="{'three': profile.shop_status, 'two': !profile.shop_status, 'red': isActive('story')}">
            <p class="font-30" align="center">{{profile.topic_count}}</p>
            <p class="font-26" :class="{'gray': !isActive('story')}" align="center">晒宝</p>
        </div>
        <div v-link="link('evaluation')"  :class="{'three': profile.shop_status, 'two': !profile.shop_status, 'red': isActive('evaluation')}">
            <p class="font-30" align="center">{{profile.jianbao_count + profile.jianbao_request_count}}</p>
            <p class="font-26" :class="{'gray': !isActive('evaluation')}" align="center">鉴宝</p>
        </div>
    </div>
    <div class="content">
        <component :is="currentView" :id="$route.params.id" :role="profile.role" :params="params" :from-params="fromParams" transition="fade"
                   transition-mode="out-in"></component>
    </div>
</div>
</template>
<script>
import jadeView from './HomePageJade.vue'
import storyView from './HomePageStory.vue'
import evaluationView from './HomePageEvaluation.vue'
export default {
    name: 'HomePageView',
    components: {
        jadeView,
        storyView,
        evaluationView
    },
    data() {
        return {
            titles: [],
            tab: 'story',
            profile: {
                titles: []
            },
            currentView: ''
        }
    },
    route: {
        data({to}) {
            to.query.tab && (this.tab = to.query.tab);
            return this.$get(`users/${this.$route.params.id}/profile`)
                .then((data) => {
                    this.profile = data;
                    this.isSelf = (this.self && this.self.id == this.$route.params.id);
                    this.currentView = to.query.tab? to.query.tab + 'View': (data.shop_status? 'jadeView': 'storyView');
                    this.tab = this.currentView.replace('View', '');
                    this.setShareData('profile', {id: data.id, name: data.nickname, photo: data.photo} , true);
                });
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
        coverflow(index) {
            if(this.profile.photo != '') {
                this.action('coverflow', {ids: [this.profile.photo], index: 0});
            } else {
                console.log('头像为空');
            }
        },
        link(tab) {
            const linkObj = {
                name: 'user-profile',
                replace: true,
                params: { id: this.$route.params.id },
                query: _.merge({}, this.$route.query, {
                    tab: tab,
                    replace: true
                })
            };
            return linkObj;
        },
        isActive(tab) {
            return tab === this.tab;
        }
    }
}
</script>
<style lang="sass">
@import '../styles/partials/var';
.homepage-view {
    height: 100%;
    .account {
        height: 630px;
        padding: 20px 32px;
        background-image: url('#{$qn}/homepage/top.png');
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
    .community {
        height: 100px;
        width: 100%;
        padding: 18px 0;
        .two {
            width: 50%;
            p + p {
                margin-top: 10px;
            }
        }
        .three {
            width: 33.3%;
            p + p {
                margin-top: 10px;
            }
        }
    }
    .content {
        position: relative;
        height: 50%;
    }
}
</style>
