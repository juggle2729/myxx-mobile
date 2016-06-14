<style lang="sass">
    @import '~style/partials/mixin';
    @import '~style/partials/var';
    .user-view {
        min-height: 100%;
        .account {
            height: 392px;
            padding: 60px 0 32px;
            position: relative;
            .title {
                width: 100%;
                .avatar-180 {
                    margin: 0 auto 40px;
                    border: 1px white solid;
                }
                .flex-1 {
                    margin: 24px 0 32px;
                    >p span+span {
                         margin-left: 60px;
                    }
                }
            }
            .follow {
                position: absolute;
                top: 36px;
                right: 0;
                .button {
                    border-radius: 6px 0 0 6px;
                    span{
                        height: 56px;
                        border-width: 0;
                        text-align: center;
                        line-height: 56px;
                        padding-left: .5em;
                    }
                }
            }
        }

        .video-list, .placeholder {
            padding: 22px 32px 32px;
            position: relative;
            .arrival {
                position: absolute;
                top: 22px;
                right: 64px;
                z-index: 99;
                img {
                    height: 90px;
                    width: 70px;

                }
                &::before {
                     content: '新品';
                     font-size: 26px;
                     position: absolute;
                     right: 10px;
                     top: 28px;
                     color: white;
                     z-index: 999;
                 }
            }
            .video {
                height: 520px;
                background-position: center;
                background-size: contain;
                background-color: #000000;
                &::before {
                     background: transparent url('#{$qn}/icon/play.png') no-repeat center;
                     background-size: 120px 120px;
                }
            }
            .desc {
                height: 90px;
                line-height: 90px;
                padding: 0 94px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-shadow: 0 4px 10px #c6c6c6;
            }
            .switch {
                margin-top: 32px;
                justify-content: center;
                img {
                    height: 44px;
                    width: 44px;
                }
                span {
                    display: block;
                    margin: 10px 36px 0;
                }
            }
        }

        .placeholder .video {
            line-height: 520px;
            background-color: #c6c6c6;
            &::before {
                 content: '暂无新品视频';
                 background: transparent;
            }
        }

        .site {
            height: 86px;
            width: 100%;
            padding: 0 32px;
            .icon {
                width: 96px;
                height: 46px;
                line-height: 46px;
                text-align: center;
                border-radius: 4px;
                background-color: #77a153;
            }
        }

        .master {
            height: 114px;
            padding: 0 32px;
            .info {
                padding: 24px 0 20px 20px;
                .gray {
                    margin-top: 14px;
                }
            }
            .follow {
                padding: 18px 0 24px;
                .font-22 {
                    margin-bottom: 12px;
                }
                .button {
                    text-align: right;
                    span {
                        text-align: center;
                        display: inline-block;
                        border-radius: 6px;
                        width: 84px;
                        height: 36px;
                        line-height: 36px;
                    }
                }
                p {
                    clear: both;
                    span:not(:first-child) {
                        margin-left: 40px;
                    }
                }
            }
        }

        .tabs {
            height: 106px;
            width: 100%;
            padding-top: 20px;
            > div {
                color: #888888;
                p:first-child {
                    margin-bottom: 14px;
                }
                .line:not(:last-child) {
                    @include border(right, map-get($colors, 'border-light'));
                }
                .dash {
                    margin: 10px auto 6px;
                    width: 204px;
                    height: 6px;
                }
                &.v-link-active {
                    color: #cc3f4f;
                    .dash {
                        background-color: map-get($colors, 'bg-red');
                    }
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
                    .dash {
                        margin: 8px auto 6px;
                        width: 204px;
                        height: 6px;
                        background-color: map-get($colors, 'bg-red');
                    }
                }
            }
        }
        .content {
            position: relative;
        }
    }
</style>
<template>
    <div class="user-view" v-if="!$loadingRouteData">
        <div class="account center border-bottom" v-if="!isMaster">
            <div class="follow">
                <div v-if="!isSelf" :class="{'bg-red': !profile.follow, 'bg-gray': profile.follow}" class="button font-26 white" @click="toggleFollow(profile)">
                    <span v-if="profile.follow">已关注</span>
                    <span v-else="profile.follow" class="icon-follow">关注</span>
                </div>
            </div>
            <div class="title">
                <avatar :user="profile" :size="180" :is-self="$route.name === 'user'"></avatar>
                <div class="flex-1">
                    <p class="font-30 margin-bottom">{{profile.nickname}}</p>
                    <p class="font-26 gray">
                        <span>关注&nbsp;&nbsp;{{profile.follow_count}}</span>
                        <span>粉丝&nbsp;&nbsp;{{profile.fans_count}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="video-list"  v-if="isMaster && products.length > 0">
            <div class="arrival">
                <img :src="'user/arrival.png' | qn">
            </div>
            <div class="video" v-bg="products[index].video" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/h/450" @click="play(products[index].video, 'jade')"></div>
            <div class="desc font-26 bg-white center">{{products[index].title}}</div>
            <div class="switch flex">
                <img :src="leftIcon(index) | qn" @click="previous(index)">
                <span class="font-30">{{index + 1}}&nbsp;/&nbsp;{{products.length}}</span>
                <img :src="rightIcon(index) | qn" @click="next(index)">
            </div>
        </div>
        <div class="placeholder" v-if="isMaster && products.length === 0">
            <div class="video center font-34 primary"></div>
            <div class="desc bg-white"></div>
        </div>
        <div class="master border-bottom flex bg-white" v-if="isMaster">
            <avatar :user="profile" :is-self="$route.name === 'user'"></avatar>
            <div class="info flex-1">
                <p class="font-30">{{profile.nickname}}</p>
                <p class="font-26 gray">{{profile.titles.length? profile.titles[0].name:''}}</p>
            </div>
            <div class="follow font-26 gray">
                <div v-if="!isSelf" class="button font-22 center" @click="toggleFollow(profile)">
                    <span v-if="profile.follow" class="bg-gray white">已关注</span>
                    <span v-else="profile.follow" class="icon-follow bg-red white">关注</span>
                </div>
                <p><span>关注&nbsp;&nbsp;{{profile.follow_count}}</span><span>粉丝&nbsp;&nbsp;{{profile.fans_count}}</span></p>
            </div>
        </div>
        <div class="site flex font-26 bg-white border-bottom" v-if="profile.website_status" v-link="{name: 'master', params:{id: $route.params.id}}">
            <div class="icon white">人物志</div>
            <div class="flex-1 margin-left font-30">{{profile.website_interview_title}}</div>
            <div class="icon-enter"></div>
        </div>
        <div class="tabs bg-white flex font-26" :class="{'default': isDefaultView}">
            <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'jade'}, replace: true}" v-if="profile.shop_status">
                <div class="line">
                    <p align="center">{{profile.product_count}}</p>
                    <p align="center">商品</p>
                </div>
                <div class="dash"></div>
            </div>
            <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'story'}, replace: true}">
                <div class="line">
                    <p align="center">{{profile.topic_count}}</p>
                    <p align="center">视频</p>
                </div>
                <div class="dash"></div>
            </div>
            <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'evaluation'}, replace: true}">
                <div class="line">
                    <p align="center">{{profile.jianbao_count + profile.jianbao_request_count}}</p>
                    <p align="center">鉴宝</p>
                </div>
                <div class="dash"></div>
            </div>
        </div>
        <div class="content border-top">
            <!-- TODO use keep-alive -->
            <component :is="view" keep-alive transition-mode="out-in" transition="fade"></component>
        </div>
    </div>
</template>
<script>
import shareable from 'shareable';
import jade from './UserJade.vue';
import story from './UserStory.vue';
import evaluation from './UserEvaluation.vue';
export default {
    name: 'UserView',
    mixins: [shareable],
    components: {
        jade,
        story,
        evaluation
    },
    data() {
        return {
            titles: [],
            index: 0, // 视频从第一个开始
            isDefaultView: false,
            isMaster: false,
            view: undefined,
            profile: {},
            products: []
        }
    },
    computed: {
        isSelf() {
            return _.get(this, 'self.id') == this.profile.id;
        }
    },
    route: {
        canReuse({from, to}) {
            return from.name === to.name && from.params.id === to.params.id;
        },
        data({from, to, next}) {
            if(from.name !== to.name || from.params.id !== to.params.id) {// 初次进入个人主页
                this.$get(`users/${to.params.id}/profile|v2`)
                    .then((data) => {
                        this.profile = data;
                        this.isMaster = (this.profile.role === 4 || this.profile.role === 1 || this.profile.role === 8);
                        this.isDefaultView = ['story', 'jade', 'evaluation'].indexOf(to.params.tab) === -1;
                        this.view = this.isDefaultView ? (data.shop_status ? 'jade': 'story') : to.params.tab;
                        this.setShareData({id: data.id, name: data.nickname, photo: data.photo, isMaster: this.isMaster} , true);
                        if(this.isMaster) {
                            return this.$get(`mall/users/${to.params.id}/product_cards`);
                        } else {
                            next();
                        }
                    }).then((item) => {
                        this.products = item.products;
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
        toggleFollow(user) {
            if (user.follow) {
                this.$delete(`users/follow/${user.id}`)
                .then(() => {
                    user.follow = false;
                    this.action('toast', {success: 1, text: '已取消关注'});
                });
            } else {
                this.$post(`users/follow/${user.id}`)
                .then(() => {
                    user.follow = true;
                    this.action('toast', {success: 1, text: '已关注'});
                });
            }
        },
        next(index) {
            (index < this.products.length - 1) && this.index++;
        },
        previous(index) {
            (index > 0) && this.index--;
        },
        leftIcon(index) {
            return (index === 0) ? 'user/leftArrow_default.png' : 'user/leftArrow_active.png';
        },
        rightIcon(index) {
            return (index === (this.products.length - 1)) ? 'user/rightArrow_default.png' : 'user/rightArrow_active.png';
        }
    }
}
</script>
