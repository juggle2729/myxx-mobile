<style lang="sass">
    .master-home-view {
        overflow-x: hidden;
        .personal-info {
            background-size: 100% 100%;
        }

        .attention {
            padding-top: 32px;
            text-align: right;
            .content {
                width: 144px;
                float: right;
                line-height: 54px;
                border-radius: 54px;
                margin-right: -24px;
                padding-right: 44px;
                padding-top: 5px;
            }
            .icon-like {
                padding-right: 0;
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
            }

            .video {
                height: 540px;
                background-repeat: no-repeat;
                background-size: cover;
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

            .icon-followed {
                background: #56b937;
                border-radius: 24px;
                padding-right: 0;
                vertical-align: text-top;
                margin-right: -10px;
            }
        }
    }
</style>
<template>
    <div class="master-home-view bg-default">
        <div class="personal-info" :class="{'bottom-blank': dynamicTotal <= 0}" v-bg.lg="masterBaseData.background_img">
            <div class="border-vertical">
                <div class="attention font-26 clearfix">
                    <div class="content bg-red white">
                        <span class="icon-like"></span>
                        <span class="count">{{masterBaseData.fans_count || 0}}</span>
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
                    <div class="brief font-26 gray">{{masterBaseData.brief}}</div>
                    <div class="link-detail white font-26 bg-black"
                         v-link="{name: 'master-special', params: {id: masterBaseData.id}, query: {title: masterBaseData.name + '-官网'}}">查看详情</div>
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
                <div class="dynamic-item bg-white" v-for="dynamic in dynamics">
                    <div class="person">
                        <div class="photo avatar-50" v-bg.sm="dynamic.event.user.photo"></div>
                        <div class="name-time">
                            <div class="font-26">{{dynamic.event.user.name}}</div>
                            <div class="time font-22 light">{{dynamic.event.create_at | moment}}</div>
                        </div>
                    </div>
                    <div class="description font-30">{{(dynamic.event.description || dynamic.event.content) | truncate 62}}</div>
                    <div v-if="dynamic.event_type === 'jianbao_add'">
                        <div class="media video" @click="play(dynamic.event.video)" v-bg.lg="dynamic.event.picture"></div>
                        <div class="result-list" v-if="dynamic.event.results.length > 0">
                            <div class="result-item clearfix" :class="[dynamic.event.results.length > 1 && $index !== dynamic.event.results.length - 1 ?
                            'border-bottom' : '']" v-for="result in dynamic.event.results">
                                <div class="person">
                                    <div class="photo avatar-50" v-link="result.identifier | profile" v-bg.sm="result.identifier.photo"></div>
                                    <div class="name-time">
                                        <div class="font-26">{{result.identifier.name}}</div>
                                        <div class="time font-22 light">{{result.identifier.title || '国家级大师'}}</div>
                                    </div>
                                </div>
                                <div class="status">
                                    <span class="icon-followed font-22 white"></span>
                                    <span class="text font-22">{{result.result}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="dynamic.event_type === 'topic_add'">
                        <div class="medias">
                            <div class="unique" v-if="dynamic.event.media.length === 1" v-bg.lg="dynamic.event.media[0].id"></div>
                            <template v-else="dynamic.event.media.length !== 1">
                                <template v-for="media in dynamic.event.media">
                                    <div class="media picture" @click="coverflow(dynamic.event.media, $index)" v-if="media.type==='picture'" v-bg.md="media.id"></div>
                                    <div class="media play" @click="play(media.id)" v-if="media.type==='video'" v-bg.video="media.id"></div>
                                </template>
                            </template>
                        </div>
                    </div>
                    <social-bar :id="dynamic.event.post_id" :type="likeType(dynamic.event_type)" :active="dynamic.event.liked"
                                :total="dynamic.event.like" :list="dynamic.event.likes" class="border-top social bg-white">
                        <div class="center border-left gray extra-action" v-link="{name: 'evaluation', params: {id: dynamic.event.post_id}}">
                            <i class="icon-comment"></i><span>{{dynamic.event.comment}}</span>
                        </div>
                    </social-bar>
                </div>
            </div>
            <div class="no-more light font-22 center" v-show="!hasMore">没有更多了</div>
            <div v-show="hasMore" class="loadmore center font-22 gray padding-vertical">
                <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
            </div>
        </div>
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
                dynamicTotal: 0
            };
        },
        methods: {
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
                this.fetchMasterDynamicInfo();
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
                        if (data.events.length < limit) {
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
