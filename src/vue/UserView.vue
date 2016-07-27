<style lang="sass">
@import '~style/partials/var';
    .user-view {
        padding-bottom: 98px;
        .banner {
            position: relative;
            padding: 12px 0 50px;
            background-image: url('#{$qn}/user/banner.png');
            .margin-top {
                margin-top: 20px;
            }
            .left, .right {
                position: absolute;
                height: 72px;
                width: 72px;
                &.left {
                    left: 12px;
                }
                &.right {
                    right: 12px;
                }
            }
            .avatar-120 {
                margin: 48px auto 36px;
                box-shadow: 0 0 0 4px rgba(136, 136, 136, 0.3);
            }
            .record {
                span {
                    padding: 0 30px;
                }
            }
        }
        .tabs {
            height: 100px;
            > div {
                line-height: 40px;
                &.active {
                    color: #cc3f4f;
                }
            }
            &.default > div:first-child {
                color: #cc3f4f;
            }
        }
        .tabs-fixed {
            will-change: visibility;
            position: fixed;
            visibility: hidden;
            width: 100%;
            z-index: 999;
        }
        .footer {
            height: 98px;
            line-height: 60px;
            width: 100%;
            position: fixed;
            bottom: 0;
            z-index: 999;
            > div {
                -webkit-box-flex: 1;
                text-align: center;
                line-height: 60px;
            }
            .follow-component {
                font-size: 30px;
                color: #888888;
                height: 60px;
            }
            .button {
                border-radius: 6px;
                line-height: 72px;
                margin-right: 14px;
                .icon-enter {
                    position: relative;
                    top: 3px;
                }
            }
        }
    }
</style>
<template>
    <div class="user-view">
        <div class="tabs tabs-fixed flex font-30 border-bottom bg-white" :class="{'default': isDefaultView}">
            <div class="flex-1 center border-right" v-if="user.has_homepage" :class="{'active': $route.params.tab === 'home'}"@click="go('home')">主页</div>
            <div class="flex-1 center border-right" :class="{'active': $route.params.tab === 'story'}" @click="go('story')">帖子</div>
            <div class="flex-1 center" :class="{'active': $route.params.tab === 'evaluation'}" @click="go('evaluation')">鉴宝</div>
        </div>
        <div class="banner img center bg-default">
            <img :src="'user/left.png' | qn" class="left" alt="left">
            <img :src="'user/right.png' | qn" class="right" alt="right">
            <avatar :user="user" :size="120"></avatar>
            <p class="font-30">{{user.nickname}}</p>
            <div class="font-26 gray record margin-top">
                <span class="follow border-right">关注: {{user.follow_count}}</span><span>粉丝数: {{user.fans_count}}</span>
            </div>
            <p class="gray font-26 margin-top" v-if="user.title">美玉认证: {{user.title}}</p>
        </div>
        <div class="tabs tabs-static flex font-30 border-bottom bg-white" :class="{'default': isDefaultView}">
            <div class="flex-1 center border-right" v-if="user.has_homepage" :class="{'active': $route.params.tab === 'home'}"@click="go('home')">主页</div>
            <div class="flex-1 center border-right" :class="{'active': $route.params.tab === 'story'}" @click="go('story')">帖子</div>
            <div class="flex-1 center" :class="{'active': $route.params.tab === 'evaluation'}" @click="go('evaluation')">鉴宝</div>
        </div>
        <div class="tab-content">
            <component :is="view" keep-alive transition-mode="out-in" transition="fade"></component>
        </div>
        <div class="footer flex border-top bg-white" v-if="!isSelf">
            <follow :user="user.id" :follow="user.is_followed" :has-border="false"></follow>
            <share class="border-left"></share>
            <div v-if="user.has_homepage" class="button bg-red white font-30" v-link="{name: 'shop', params: {id: user.shop_id}}">进入{{config.shop[user.shop_type]}}<span class="icon-enter"></span></div>
        </div>
    </div>
</template>
<script>
import shareable from 'shareable';
import home from './UserHome.vue';
import story from './UserStory.vue';
import evaluation from './UserEvaluation.vue';
import follow from 'component/Follow.vue';
import share from 'component/Share.vue';
export default {
    name: 'UserView',
    mixins: [shareable],
    components: {
        home,
        story,
        evaluation,
        follow,
        share
    },
    data() {
        return {
            user: {
                id: 0
            },
            isDefaultView: false,
            view: undefined
        }
    },
    ready() {
        this.staticTabs = this.$el.querySelector('.tabs-static');
        this.fixedTabs = this.$el.querySelector('.tabs-fixed');
        const tabContent = this.$el.querySelector('.tab-content');
        // FIXME: 采用css解决方案
        // tab内容最小高度为 window高度 - tabs高度 - $el的底部padding
        tabContent.style.minHeight = `calc(${window.innerHeight-this.staticTabs.clientHeight}px - ${window.getComputedStyle(this.$el)['padding-bottom']})`;
    },
    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.user.id;
        }
    },
    route: {
        canReuse({from, to}) {
            return from.name === to.name && from.params.id === to.params.id;
        },
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) { // 初次进入个人主页
                this.$get(`users/${to.params.id}/profile`)
                    .then((user) => {
                        this.user = user;
                        this.isDefaultView = ['home', 'story', 'evaluation'].indexOf(to.params.tab) === -1;
                        this.view = this.isDefaultView ? (this.user.has_homepage ? 'home': 'story') : to.params.tab;
                        this.action('updateTitle', {text: `${user.nickname}的个人主页`});
                        this.setShareData({id: user.id, name: user.nickname, photo: user.photo} , true);
                        next();
                    });
            } else { // 个人主页内部跳转
                this.isDefaultView = false;
                this.view = to.params.tab;
                next();
            }
        }
    },
    methods: {
        go(tab) {
            (this.$route.params.tab !== tab) && this.$router.replace(`/user/${this.user.id}/${tab}`);
        }
    },
    events: {
        scroll() {
            if(!this.env.isWechat) {
                this.fixedTabs.style.visibility = window.scrollY - this.staticTabs.offsetTop > 0 ? 'visible' : 'hidden';
            }
        }
    }
}
</script>
