<style lang="sass">
    @import '../styles/mixins/_border.scss';
    @import '../styles/partials/_var.scss';
    .jade_detail {
        .separator-20.last {
            padding-bottom: 128px; // the height of social action bar
        }
        .avatar {
            height: 72px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .video {
            position: relative;
            background-size: cover;
            background-position: center;
            &::after {
                content: '';
                background-position: center;
                background-repeat: no-repeat;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                background-size: 120px;
                mix-blend-mode: overlay;
                background-image: url('/static/images/icon/ico_video.png');
            }
        }
        .jade {
            margin: 32px;
            .header {
                display: -webkit-box;
                -webkit-box-align: center;
                h3 {
                    font-size: 30px;
                }
                p {
                    margin-top: 12px;
                    font-size: 22px;
                    color: #c6c6c6;
                    .gutter {
                        margin: 0 16px;
                        color: #d9d9d9;
                    }
                }
            }
            .desc {
                margin: 32px 0;
                font-size: 30px;
                color: #393939;
            }
            .video {
                width: 100%;
                padding-top: percentage(1/1.3);
            }
            .images {
                font-size: 0;
                margin: 5px -5px -5px;
                > li {
                    display: inline-block;
                    position: relative;
                    width: 338px;
                    padding: percentage(1/2.6) 0 0;
                    margin: 5px;
                    background-size: cover;
                    background-position: center;
                }
            }
        }
        .evaluation-summary {
            @include border(map-get($colors, 'border-primary'),
            bottom);
            font-size: 22px;
            color: #888888;
            margin: 0 32px;
            height: 80px;
            line-height: 80px;
        }
        .evaluation {
            margin: 32px;
            .header {
                display: -webkit-box;
                -webkit-box-align: center;
                height: 120px;
                > div {
                    -webkit-box-flex: 1;
                }
                h3 {
                    font-size: 30px;
                    color: #393939;
                    span {
                        display: inline-block;
                        height: 36px;
                        line-height: 36px;
                        border-radius: 5px;
                        padding: 0 12px;
                        margin-left: 16px;
                        font-size: 22px;
                        color: white;
                        background-color: #e79016;
                    }
                }
                p {
                    font-size: 22px;
                    color: #888888;
                    margin-top: 12px;
                }
                .moments {
                    font-size: 22px;
                    color: #c6c6c6;
                    margin-top: 0;
                }
            }
            .result {
                display: -webkit-box;
                -webkit-box-pack: justify;
                -webkit-box-align: stretch;
                background-color: #f9f9f9;
                border: 1px solid #d9d9d9;
                font-size: 30px;
            }
            .video {
                width: 343px;
                padding-top: 343px;
                &::after {
                    background-size: 60px;
                }
            }
            .desc {
                display: -webkit-box;
                position: relative;
                -webkit-box-orient: vertical;
                -webkit-box-pack: center;
                -webkit-box-align: start;
                width: 343px;
                .txt {
                    -webkit-box-flex: 1;
                    position: relative;
                    > p {
                        width: 343px;
                        position: absolute;
                        text-align: center;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
                .social {
                    height: 80px;
                    line-height: 80px;
                    width: 343px;
                    border-top: 1px solid #d9d9d9;
                    font-size: 22px;
                    .favor {
                        width: 50%;
                        display: inline-block;
                        text-align: center;
                        border-right: 1px solid #d9d9d9;
                    }
                    .comment {
                        color: #d9d9d9;
                        width: 50%;
                        display: inline-block;
                        text-align: center;
                    }
                }
            }
        }
        .evaluation-btn {
            margin: 32px;
            button {
                font-size: 30px;
                color: white;
                background-color: #cc3f4f;
                height: 80px;
                width: 100%;
                border-radius: 10px;
                border: 0;
                cursor: pointer;
            }
        }
        .comments {
            margin: 32px;
            .header {
                @include border(map-get($colors, 'border-primary'),
                bottom);
                display: -webkit-box;
                -webkit-box-align: center;
                -webkit-box-pack: justify;
                height: 80px;
                font-size: 22px;
                .count {
                    color: #c9c9c9;
                }
                .comment-btn {
                    color: #cc3f4f;
                }
            }
        }
        li {
            margin-bottom: 8px;
            .author {
                display: -webkit-box;
                -webkit-box-align: center;
                height: 108px;
                h3 {
                    font-size: 26px;
                    color: #33a1c9;
                }
                .moments {
                    font-size: 22px;
                    color: #c6c6c6;
                    margin-top: 12px;
                }
            }
            .desc {
                font-size: 30px;
                color: #393939;
                .name {
                    color: #33a1c9;
                }
            }
        }
        .social-actions {
            @include border(map-get($colors, 'border-primary'),
            top);
            position: fixed;
            z-index: 9;
            bottom: 0;
            width: 100%;
            height: 98px;
            line-height: 98px;
            font-size: 26px;
            color: #888888;
            > span {
                display: inline-block;
                width: 50%;
                text-align: center;
                &:first-of-type {
                    @include border(map-get($colors, 'border-primary'),
                    right);
                }
            }
        }
    }
</style>
<template>
    <div class="jade_detail">
        <div class="jade">
            <div class="header">
                <img class="avatar" :src="detail.applier.photo | img" alt="author">
                <div>
                    <h3>{{detail.applier.name}}</h3>
                    <p>
                        <span>{{detail.create_at | moment}}</span>
                        <span class="gutter">|</span>
                        <span>{{detail.click}}人浏览</span>
                    </p>
                </div>
            </div>
            <p class="desc">
                {{detail.description}}
            </p>
            <div class="video clickable" @click="play(detail.video)" v-bind:style="{backgroundImage: 'url(http://7xo88d.media1.z0.glb.clouddn.com/' + detail.video+ '?vframe/jpg/offset/2/w/540/h/540/rotate/90/)'}"></div>
            <ul class="images">
                <li v-for="picture in detail.pictures" track-by="$index" class="img" :style="{backgroundImage: 'url(http://7xo8aj.com2.z0.glb.qiniucdn.com/' + picture + ')'}">{{picture}}</li>
            </ul>
        </div>
        <div class="separator-20"></div>
        <p class="evaluation-summary">
            大师鉴定{{detail.results ? detail.results.length : 0}}
        </p>
        <div v-for="result in detail.results" class="evaluation">
            <div class="header">
                <img class="avatar" :src="result.identifier.photo | img'" alt="author">
                <div>
                    <h3>{{result.identifier.name}}
                        <span>个人官网</span>
                    </h3>
                    <p>浙江省工艺美术大师</p>
                </div>
                <p class="moments">{{result.create_at | moment}}</p>
            </div>
            <div class="result">
                <div class="video clickable" @click="play(result.video)" v-bind:style="{backgroundImage: 'url(http://7xo88d.media1.z0.glb.clouddn.com/' + result.video+ '?vframe/jpg/offset/2/w/540/h/540/rotate/90/)'}"></div>
                <div class="desc">
                    <div class="txt">
                        <p>鉴宝结果：
                            <span :class="{'txt-red': result.result=='真货' }">{{result.result}}</span>
                            <span v-if="result.value_min">
                                <br>
                                <br>
                                <span>估价：{{result.value_min | money}}~{{result.value_max | money}}</span>
                            </span>
                        </p>
                    </div>
                    <div class="social">
                        <span @click="toggleThumb(result.id)" class="favor clickable"><i class="{{result.isLike ? 'txt-red icon-thumb-active' : 'icon-thumb'}}"></i>{{result.like}}</span>
                        <!--remove space-->
                        <span @click="comment(result.identifier.id)" class="comment"><i class="icon-comment"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="!detail.results.length" class="txt-center txt-gray font-26 margin-top">还没有大师来鉴定</div>
        <div class="evaluation-btn">
            <button class="clickable" v-if="detail.identifiable" @click="evaluate">我来鉴定</button>
        </div>
        <div class="separator-20"></div>
        <div class="comments">
            <div class="header">
                <div class="count">评论{{comments.total}}</div>
                <div @click="comment" class="clickable comment-btn"><i class="icon-comment"></i>我要评论</div>
            </div>
            <ul>
                <li v-for="c in comments.list">
                    <div class="author">
                        <img class="avatar" :src="c.reply_from.photo | img'" alt="author">
                        <div>
                            <h3 class="clickable" @click="comment(c.reply_from.id)">{{c.reply_from.nickname}}</h3>
                            <p class="moments">{{c.create_at | moment}}</p>
                        </div>
                    </div>
                    <div class="desc">
                        <span v-if="c.reply_to" class="label">回复
                            <span @click="comment(c.reply_to.id)" class="name clickable">{{c.reply_to.nickname}}</span>:</span>
                        <span>{{c.content}}</span>
                    </div>
                </li>
                <li v-show="!comments.list.length" class="txt-center txt-gray font-26 margin-top">还没有人评论</li>
                <li id="more" class="txt-gray txt-center font-26">{{comments.hasMore ? '加载更多。。。' : '没有了'}}</li>
            </ul>
        </div>
        <div class="separator-20 last"></div>
        <div class="social-actions bg-white animated" :class="{'slide-in-up': scroll.down, 'slide-out-down': !scroll.down }">
            <span @click="toggleFollow" class="clickable"><i class="{{detail.isFollowed ? 'icon-favor-active txt-red' : 'icon-favor'}}"></i>关注({{detail.follow}})</span>
            <span @click="share" class="clickable"><i class="icon-share"></i>分享</span>
        </div>
    </div>
</template>
<script>
    let Promise = require('es6-promise').Promise;
    export default {
        name: 'EvaluationDetailView',
        data() {
            return {
                detail: {
                    'click': 0,
                    'applier': {
                        'photo': '',
                        'name': '',
                        'id': 1
                    },
                    'create_at': '',
                    'status': 2,
                    'identifiable': false,
                    'comment': 13,
                    'description': '',
                    'isFollowed': true,
                    'pictures': [],
                    'isMaster': true,
                    'id': 1,
                    'follow': 3,
                    'results': [],
                    'video': 'a5ad0094-487a-4d3f-ae8a-499ec2354e5e'
                },
                comments: {
                    total: 0,
                    list: [],
                    loading: false,
                    hasMore: true
                },
                scroll: {
                    down: false,
                    up: false
                }
            };
        },
        route: {
            activate(transition) {
                const {
                    to, next
                } = transition;
                return this.$http
                    .get(`jianbao/applies/${to.params.id}`)
                    .success(detail => {
                        console.debug('detail', detail.data);
                        this.detail = detail.data;
                        // transition.next();
                    });

                // return Promise.all([getDetail, this._loadComments(to.params.id)]);
            }
        },
        methods: {
            _loadComments: (function() {
                let offset = 0;
                const limit = 5;
                return function(jadeId) {
                    if (this.comments.loading) {
                        return false;
                    }
                    this.comments.loading = true;
                    return this.$http.get(`jianbao/applies/${jadeId}/comments?offset=${offset}&limit=${limit}`, function(resp) {
                        this.comments.list.splice(this.comments.list.length - 1, 0, ...resp.data.comments);
                        this.comments.total = resp.data.total;
                        offset = offset + limit;
                        if (resp.data.comments.length < limit || offset > resp.data.total) {
                            this.comments.hasMore = false;
                        } else {
                            this.comments.loading = false;
                        }
                    });
                };
            })(),
            play(videoId) {
                this.action('play', 'http://7xo88d.media1.z0.glb.clouddn.com/' + videoId);
            },
            toggleThumb(resultId) {
                const result = this.detail.results.filter(r => r.id === resultId).pop();
                if (result.isLike) {
                    this.$http.delete(`jianbao/results/${resultId}/like`, (resp) => {
                        if (resp.status === 200) {
                            result.isLike = false;
                            result.like = result.like - 1;
                        } else {
                            this.toast(resp.message);
                        }
                    });
                } else {
                    this.$http.post(`jianbao/results/${resultId}/like`, (resp) => {
                        if (resp.status === 200) {
                            result.isLike = true;
                            result.like = result.like + 1;
                        } else {
                            this.toast(resp.message);
                        }
                    });
                }
            },
            toggleFollow() {
                if (this.detail.isFollowed) {
                    this.$http.delete(`jianbao/applies/${jadeId}/follows`, (resp) => {
                        if (resp.status === 200) {
                            this.detail.isFollowed = false;
                            this.detail.follow = this.detail.follow - 1;
                        } else if (resp.status === 605) {
                            this.toast(resp.message);
                            this.action('login');
                        }
                    });
                } else {
                    this.$http.post(`jianbao/applies/${jadeId}/follows`, (resp) => {
                        if (resp.status === 200) {
                            this.detail.isFollowed = true;
                            this.detail.follow = this.detail.follow + 1;
                        } else if (resp.status === 605) {
                            this.toast(resp.message);
                            this.action('login');
                        }
                    });
                }
            },
            share() {
                this.toast('分享');
                this.action('share', {
                    'title': '分享标题',
                    'icon': 'bar',
                    'desc': '分享描述',
                    'url': 'http://www.baidu.com'
                });
            },
            comment(userId) {
                this.toast(typeof userId === 'number' ? '回复' : '评论');
            },
            evaluate() {
                this.toast(this.detail.isMaster ? '鉴宝' : '菜鸟不能鉴宝');
            }
        }
    }
</script>
