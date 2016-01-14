<style lang="sass">
@import '../styles/partials/var';
.master-home-view {
    overflow-x: hidden;
    .personal-info {
        background: url("#{$qn}/cover.png") no-repeat;
        background-size: cover;
    }

    .attention {
        padding-top: 32px;
        text-align: right;
        .content {
            float: right;
        }

        .status {
            width: 152px;
            line-height: 54px;
            border-radius: 54px;
            margin-right: -22px;
            padding-right: 46px;
        }

        .icon-follow {
            line-height: 54px;
            padding-right: 0;
            vertical-align: -0.04rem;
        }

        .count {
            margin-top: 16px;
            margin-right: 24px;
        }
    }

    .base-info {
        margin-top: 45px;
        text-align: center;
        padding: 0 62px 50px;
        .name {
            margin-top: 36px;
        }
    }

    .head {
        margin: 0 auto;
        border-radius: 180px;
        border: 6px solid white;
    }

    .titles {
        margin-top: 36px;
    }

    .title:not(:first-child) {
        margin-top: 20px;
    }

    .brief {
        line-height: 38px;
        margin-top: 44px;
    }

    .link-detail {
        margin: 24px auto 0;
        width: 200px;
        height: 60px;
        line-height: 60px;
        border-radius: 4px;
        opacity: 0.3;
    }

    .dynamic-info {
        padding-bottom: 96px;
    }

    .dynamic-list {
        padding: 0 24px;
    }

    .dynamic-item:not(:first-child) {
        margin-top: 22px;
    }

    .dynamic-item {
        border-radius: 10px;
        padding-top: 25px;

        .person {
            padding-left: 20px;
            display: -webkit-box;
        }

        .name-time {
            margin-left: 20px;
            margin-top: -6px;
        }

        .time {
            margin-top: 12px;
        }

        .description {
            margin: 24px 20px;
            line-height: 42px;
        }
/*
        .video {
            height: 540px;
            background-repeat: no-repeat;
            background-size: cover;
        }*/

        .social-bar {
            border-radius: 8px;
        }

        .eval {
            height: 548px;
            background-size: cover;
            background-position: center;
            position: relative;
            .result {
                padding: 12px 0 9px 19px;
                width: 240px;
                height: 45px;
                position: relative;
                border-radius: 25px;
                left: 25px;
                top: 25px;
                background-color: rgba(80, 80, 80, .5);
            }
            .svg {
                position: absolute;
                right: 20px;
                top: 25px;
                width: 62px;
                height: 40px;
                border-radius: 25px;
                background-color: rgba(80, 80, 80, .5);
                > img {
                    width: 28px;
                }
            }
        }
    }

    .medias {
        .media {
            vertical-align: top;
            display: inline-block;
            width: percentage(1/3);
            padding-top: percentage(1/3);
            border: thick solid white;
            background-size: cover;
            background-position: center;
        }
        .media:first-child:nth-last-child(4) ~ .media:nth-of-type(2) {
            margin-right: percentage(1/3);
        }
        .unique {
            width: 100%;
            padding-top: 60%;
            background-size: cover;
        }
    }

    .result-item {
        margin-left: 20px;
        .person {
            float: left;
            padding-left: 0;
            padding-top: 4.5%;
        }

        .name-time {
            margin-left: 20px;
            margin-top: -6px;
        }

        .time {
            margin-top: 12px;
        }

        .status {
            float: right;
            padding-right: 20px;
            * {
                line-height: 110px;
            }
        }
    }
}
</style>
<template>
    <div class="master-home-view bg-default">
        <div class="personal-info" :class="{'bottom-blank': dynamicTotal <= 0}">
            <div class="border-vertical">
                <div class="attention clearfix" v-show="!!masterBaseData">
                    <div class="content white">
                        <div class="font-26 status" @click="followMaster" :class="[masterBaseData.follow ? 'bg-gray' : 'bg-red']">
                            <span class="font-30" :class="[masterBaseData.follow ? '' : 'icon-follow']"></span>
                            {{masterBaseData.follow ? '已关注' : '关注'}}
                        </div>
                        <div class="count font-22 gray">粉丝 {{masterBaseData.fans_count || 0}}</div>
                    </div>
                </div>
                <div class="base-info">
                    <div class="head avatar-180" v-bg.sm="masterBaseData.photo"></div>
                    <div class="name font-30">{{masterBaseData.name}}</div>
                    <div class="titles" v-if="masterBaseData && masterBaseData.titles">
                        <div class="title font-26 gray" v-for="title in masterBaseData.titles | limitBy 3">
                            {{title.name}}
                        </div>
                    </div>
                    <div class="brief font-26 gray" v-text="briefDesc"></div>
                    <div class="link-detail white font-26 bg-black"
                         v-link="{name: 'master-special', params: {id: masterBaseData.id}, query: {replace: true}}">查看详情</div>
                </div>
            </div>
        </div>
        <div class="dynamic-info" :class="{'bottom-blank': dynamicTotal > 0}" v-show="dynamicTotal > 0">
            <div class="line-title font-22 gray">
                <div class="line"></div>
                <span class="text gray">动态</span>
                <div class="line"></div>
            </div>
            <div class="dynamic-list">
                <div class="dynamic-item bg-white" v-for="dynamic in dynamics"
                     v-link="{name: dynamic.event_type === 'jianbao_add' ? 'evaluation' : (dynamic.event_type === 'topic_add' ? 'story' : ''), params: {id: dynamic.event.post_id}}">
                    <div class="person">
                        <div class="photo avatar-50" v-bg.sm="dynamic.event.user.photo"></div>
                        <div class="name-time">
                            <div class="font-26">{{dynamic.event.user.name}}</div>
                            <div class="time font-22 light">{{dynamic.event.create_at | moment}}</div>
                        </div>
                    </div>
                    <div class="description font-30">{{(dynamic.event.description || dynamic.event.content) | truncate 62}}</div>
                    <div v-if="dynamic.event_type === 'jianbao_add'">
                        <!-- <div class="media video" @click.stop="play(dynamic.event.video)" v-bg.lg="dynamic.event.picture"></div> -->
                        <div class="eval" v-bg.lg="dynamic.event.picture">
                            <div class="result white font-22" v-if="dynamic.event.results.length">
                                <i class="icon-eval"></i><span class="">已有{{dynamic.event.results.length}}位大师鉴定</span>
                            </div>
                            <div class="svg flex">
                                <img :src="'video.svg' | qn" class="flex center-horizontal">
                            </div>
                        </div>
                    </div>

                    <div v-if="dynamic.event_type === 'topic_add'">
                        <div class="medias">
                            <div class="unique" v-if="dynamic.event.media.length === 1" @click.stop="coverflow(dynamic.event.media, 0)" v-bg.lg="dynamic.event.media[0].id"></div>
                            <template v-else="dynamic.event.media.length !== 1">
                                <template v-for="media in dynamic.event.media">
                                    <div class="media picture" @click.stop="coverflow(dynamic.event.media, $index)" v-if="media.type==='picture'" v-bg.md="media.id"></div>
                                    <div class="media play" @click.stop="play(media.id)" v-if="media.type==='video'" v-bg.video="media.id"></div>
                                </template>
                            </template>
                        </div>
                    </div>
                    <social-bar :id="dynamic.event.post_id" :type="likeType(dynamic.event_type)" :active="dynamic.event.liked"
                                :total="dynamic.event.like" :list="dynamic.event.likes" class="border-top social bg-white">
                        <div class="border-left gray extra-action center" v-link="{name: 'evaluation', params: {id: dynamic.event.post_id}}">
                            <i class="icon-comment"></i><span>{{dynamic.event.comment}}</span>
                        </div>
                    </social-bar>
                </div>
            </div>
            <div class="no-more light font-22 center" v-show="!hasMore">没有更多了</div>
        </div>
        <partial name="load-more" v-show="hasMore"></partial>
        <master-tab :master-info="masterBaseData" :current-tab="'master-home'"></master-tab>
    </div>
</template>
<script>
    import masterMixin from '../mixins/MasterMixin.vue';
    import SocialBar from './SocialBar.vue';

    export default {
        name: 'MasterHomeView',
        components: { SocialBar },
        mixins: [masterMixin],
        data() {
            return {
                hasMore: true,
                dynamics: [],
                dynamicTotal: 0,
                following: false,
                briefLimit: 45
            };
        },
        computed: {
            briefDesc() {
                const briefDesc = this.masterBaseData && this.masterBaseData.brief ? this.masterBaseData.brief : '';
                if (briefDesc) {
                    return briefDesc.length > this.briefLimit ? briefDesc.substr(0, this.briefLimit) + '...' : briefDesc;
                }
                return '';
            }
        },
        methods: {
            followMaster() {
                if (this.following) {
                    return;
                }

                this.following = true;
                if (this.masterBaseData.follow) {
                    this.$delete(`users/follow/${this.masterBaseData.id}`, {}).then((data) => {
                        this.following = false;
                        this.masterBaseData.follow = false;
                        this.masterBaseData.fans_count -= 1;

                        localStorage.setItem('mastersBaseData', JSON.stringify(this.masterBaseData));
                    }).catch(() => {
                        this.following = false;
                    });
                } else {
                    this.$post(`users/follow/${this.masterBaseData.id}`, {}).then((data) => {
                        this.following = false;
                        this.masterBaseData.follow = true;
                        this.masterBaseData.fans_count += 1;

                        localStorage.setItem('mastersBaseData', JSON.stringify(this.masterBaseData));
                    }).catch(() => {
                        this.following = false;
                    });
                }
            },
            play(id) {
                this.action('play', {id});
            },
            coverflow(medias, index) {
                let ids = medias.filter(media => media.type==='picture')
                    .map(media => media.id);
                this.action('coverflow', {ids, index});
            },
            likeType(eventType) {
                if (eventType === 'jianbao_add') {
                    return 10;
                } else if (eventType === 'topic_add') {
                    return 30;
                } else {
                    return 40;
                }
            },
            loadMasterOtherData: function() {
                return this.fetchMasterDynamicInfo();
            },
            fetchMasterDynamicInfo: (function () {
                const limit = 5;
                let loading = false;
                return function() {
                    let offset = this.dynamics.length;
                    if(loading || !this.hasMore) {
                        return console.debug('master dynamics skip!!!!!!!!');
                    }

                    console.debug('fetch dynamics info', 'master' + this.id);
                    loading = true;
                    const params = {offset, limit};

                    return this.$get(`sites/${this.id}/timeline`, params).then((data) => {
                        this.dynamics.splice(this.dynamics.length, 0, ...data.events);
                        this.dynamics = this.dynamics.filter((item) => item.event_type !== 'jianbao_result');
                        this.dynamicTotal = data.total;
                        loading = false;
                        if (data.events.length < limit || offset + limit >= data.total) {
                            this.hasMore = false;
                        }
                    });
                }
            })()
        },
        events: {
            scrollToBottom(e) {
                this.fetchMasterDynamicInfo();
            }
        }
    };
</script>
