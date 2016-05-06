<style lang="sass">
    @import '../styles/partials/var';
    .user-view {
        padding-bottom: 100px;
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
                    height: 56px;
                    width: 112px;
                    border-width: 0;
                    border-radius: 6px 0 0 6px;
                    text-align: center;
                    line-height: 56px;
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
                background-size: cover;
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
                    float: right;
                    border-radius: 6px;
                    width: 84px;
                    height: 36px;
                    line-height: 36px;
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
                    background-image: linear-gradient(270deg, #efefef 51%, transparent 51%);
                    background-position: right center;
                    background-repeat: no-repeat;
                    background-size: 1px 100%;
                    padding-right: 1px;
                }
                &.v-link-active {
                    color: #cc3f4f;
                    .dash {
                        margin: 8px auto 6px;
                        width: 204px;
                        height: 6px;
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
    <div class="user-view bg-default">
        <div class="account center border-bottom" v-if="!profile.special">
            <div class="follow">
                <div class="button bg-red font-26 red" @click="download()">
                    <span class="icon-follow white">关注</span>
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
        <div class="video-list"  v-if="profile.special && products.length > 0" v-for="(index, item) in products" :class="{'hide': (index !== number)}">
            <div class="arrival">
                <img :src="'user/arrival.png' | qn">
            </div>
            <div class="video" v-bg="item.video" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/h/450" @click="play(item.video, 'jade')"></div>
            <div class="desc font-26 bg-white center">{{item.title}}</div>
            <div class="switch flex">
                <img :src="leftIcon(index) | qn" @click="previous(index)">
                <span class="font-30">{{index + 1}}&nbsp;/&nbsp;{{products.length}}</span>
                <img :src="rightIcon(index) | qn" @click="next(index)">
            </div>
        </div>
        <div class="placeholder" v-if="profile.special && products.length === 0">
            <div class="video center font-34 primary"></div>
            <div class="desc bg-white"></div>
        </div>
        <div class="master border-bottom flex bg-white" v-if="profile.special">
            <avatar :user="profile" :is-self="$route.name === 'user'"></avatar>
            <div class="info flex-1">
                <p class="font-30">{{profile.nickname}}</p>
                <p class="font-26 gray">{{profile.titles.length? profile.titles[0].name:''}}</p>
            </div>
            <div class="follow font-26 gray">
                <div class="button bg-red font-22 red" @click="download()">
                    <span class="icon-follow white">关注</span>
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
                    <p align="center">{{profile.role > 3 ? '作品': '商品'}}</p>
                </div>
                <div class="dash bg-red"></div>
            </div>
            <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'story'}, replace: true}">
                <div class="line">
                    <p align="center">{{profile.topic_count}}</p>
                    <p align="center">晒宝</p>
                </div>
                <div class="dash bg-red"></div>
            </div>
            <div v-link="{name: 'user', params: {id: $route.params.id, tab: 'evaluation'}, replace: true}">
                <p align="center">{{profile.jianbao_count + profile.jianbao_request_count}}</p>
                <p align="center">鉴宝</p>
                <div class="dash bg-red"></div>
            </div>
        </div>
        <div class="content border-top bg-default">
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
import Avatar from './Avatar.vue';
export default {
    name: 'UserView',
    mixins: [shareable],
    components: {
        jade,
        story,
        evaluation,
        Avatar
    },
    data() {
        return {
            titles: [],
            number: 0, // 视频从第一个开始
            isDefaultView: false,
            view: undefined,
            profile: {},
            products: []
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
                        this.profile.special = (this.profile.role === 4 || this.profile.role === 1 || this.profile.role === 8);
                        // this.isSelf = _.get(this, 'self.id') == this.$route.params.id;
                        this.isDefaultView = ['story', 'jade', 'evaluation'].indexOf(to.params.tab) === -1;
                        if(this.isDefaultView) {
                            this.view = data.shop_status ? 'jade': 'story';
                        } else {
                            this.view = to.params.tab;
                        }
                        this.setShareData({id: data.id, name: data.nickname, photo: data.photo, isMaster: this.profile.special} , true);
                        if(this.profile.special) {
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
        download() {
            location.href = this.config.download;
        },
        next(index) {
            (index < this.products.length - 1) && this.number++;
        },
        previous(index) {
            (index > 0) && this.number--;
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
