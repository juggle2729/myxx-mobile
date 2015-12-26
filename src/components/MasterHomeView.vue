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
            .title {
                line-height: 66px;
                text-align: center;
                position: relative;
                .line {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 36px;
                    height: 1px;
                    margin-top: -1px;
                    border-bottom: 2px solid #888888;
                }
                .line.before {
                    margin-left: -68px;
                }
                .line.after {
                    margin-left: 32px;
                }
                .text {
                    padding: 0 12px;
                }
            }
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
                margin-bottom: 20px;
            }

            .like-comment {
                line-height: 86px;
                padding: 18px 25px;

                .like {
                    float: left;
                }

                .icon, .count {
                    vertical-align: 18px;
                }

                .like-list {
                    display: inline-block;
                    margin-left: 28px;
                }

                .comment {
                    padding-left: 28px;
                    line-height: 48px;
                    float: right;
                }
            }
        }

        .no-more {
            margin-top: 32px;
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
                    <div class="titles">
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
            <div class="title font-22 gray">
                <div class="line before"></div>
                <span class="text gray">动态</span>
                <div class="line after"></div>
            </div>
            <div class="dynamic-list">
                <div class="dynamic-item bg-white" v-for="dynamic in dynamics">
                    <div v-if="dynamic.event_type === 'jianbao_add'">
                        <div class="person">
                            <div class="photo avatar-50" v-bg.sm="dynamic.event.user.photo"></div>
                            <div class="name-time">
                                <div class="font-26">{{dynamic.event.user.name}}</div>
                                <div class="time font-22 light">{{dynamic.event.create_at | moment}}</div>
                            </div>
                        </div>
                        <div class="description font-30">{{dynamic.event.description}}</div>
                        <div class="media video" @click="play(dynamic.event.video)" v-bg.video="dynamic.event.video"></div>
                        <div class="like-comment border-top clearfix">
                            <div class="like font-22">
                                <span class="icon" :class="[dynamic.event.liked ? 'icon-like-active' : 'icon-like', dynamic.event.liked ? 'red' : 'gray']"></span>
                                <span class="count" :class="[dynamic.event.liked ? 'red' : 'gray']">{{dynamic.event.like}}</span>
                                <div class="like-list" v-show="dynamic.event.likes.length > 0">
                                    <div class="like-item avatar-50" v-for="like in dynamic.event.likes" v-link="like | profile" v-bg.sm="like.photo"></div>
                                </div>
                            </div>
                            <div class="comment font-22 gray border-left">
                                <span class="icon-comment"></span>
                                <span class="comment-count">{{dynamic.event.comment}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="dynamic.event_type === 'topic_add'">
                        <span class="font-30">topic_add</span>
                    </div>
                    <div v-if="dynamic.event_type === 'jianbao_result'">
                        <span class="font-30">jianbao_result</span>
                    </div>
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
    export default {
        name: 'MasterHomeView',
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
