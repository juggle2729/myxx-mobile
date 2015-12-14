<style lang="sass">
.evaluation-detail {
    padding-bottom: 95px;
    > div:not(.social-actions) {
        padding: 24px 32px;
    }
    .header {
        .user {
            display: -webkit-box;
            -webkit-box-align: center;
        }
        .desc {
            margin: 30px 0 0;
        }
    }
    .media {
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
    .results {
        .result {
            .header {
                display: -webkit-box;
                -webkit-box-align: center;
                height: 120px;
                .master {
                    -webkit-box-flex: 1;
                }
                .site-mark {
                    display: inline-block;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 5px;
                    padding: 0 12px;
                    margin-left: 16px;
                }
            }
            .card {
                display: -webkit-box;
                -webkit-box-pack: justify;
                -webkit-box-align: stretch;
            }
            .video {
                width: 343px;
                padding-top: 343px;
                &::after {
                    background-size: 60px;
                }
            }
            .conclusion {
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
                    }
                }
                .social {
                    height: 80px;
                    line-height: 80px;
                    width: 343px;
                    .favor {
                        width: 50%;
                        display: inline-block;
                    }
                    .comment {
                        width: 50%;
                        display: inline-block;
                    }
                }
            }
        }
    }
    .evaluation-btn {
        margin: 32px;
        button {
            height: 80px;
            width: 100%;
            border-radius: 10px;
            border: 0;
            cursor: pointer;
        }
    }
    .comments {
        .header {
            display: -webkit-box;
            -webkit-box-align: center;
            -webkit-box-pack: justify;
            height: 80px;
        }
        li {
            .author {
                display: -webkit-box;
                -webkit-box-align: center;
                height: 108px;
            }
        }
    }

    .social-actions {
        position: fixed;
        z-index: 9;
        bottom: 0;
        width: 100%;
        height: 98px;
        line-height: 98px;
        > span {
            display: inline-block;
            width: 50%;
        }
    }
}
.clone {
    position: absolute;
    background-color: red;
    background-size: contain;
    background-position: center;
    transition: none;
    &.enlarge {
        transition: all .3s ease;
        /*background-size: contain;*/
    }
}
</style>
<template>
<div class="evaluation-detail">
    <div class="header">
        <div class="user">
            <div class="avatar" v-bg.sm="apply.applier.photo"></div>
            <div class="margin-left">
                <div class="font-26">{{apply.applier.name}}</div>
                <div class="padding-top font-22 gray">
                    <span>{{apply.create_at | moment}}</span><span class="padding-vertical">|</span><span>{{apply.click}}人浏览</span>
                </div>
            </div>
        </div>
        <div class="desc font-30">{{apply.description}}</div>
    </div>
    <div class="media">
        <div class="video" @click="play(apply.video)" v-bg.video="apply.video"></div>
        <ul class="images"><li @click="enlarge" v-for="picture in apply.pictures" class="img" v-bg.md="picture"></li></ul>
    </div>
    <div class="separator"></div>
    <div class="comments">
        <div class="header border-bottom font-22">
            <div>评论{{comments.total}}</div>
            <div @click="comment" class="red"><i class="icon-comment"></i>我要评论</div>
        </div>
        <ul>
            <li class="margin-bottom" v-for="c in comments.list">
                <div class="author">
                    <div class="avatar margin-right" v-bg.sm="c.reply_from.photo" alt="{{c.reply_from.nickname}}"></div>
                    <div>
                        <h3 class="font-26 blue" @click="comment(c.reply_from.id)">{{c.reply_from.nickname}}</h3>
                        <p class="font-22 light margin-top">{{c.create_at | moment}}</p>
                    </div>
                </div>
                <div class="font-30 light">
                    <span v-if="c.reply_to" class="label">回复<span @click="comment(c.reply_to.id)" class="blue">{{c.reply_to.nickname}}</span>:</span>
                    <span>{{c.content}}</span>
                </div>
            </li>
            <li v-show="!comments.list.length" class="center light font-26 margin-top">还没有人评论</li>
        </ul>
    </div>
    <div class="separator"></div>
    <div class="results">
        <div class="font-30 light border-bottom padding-vertical">大师鉴定 {{apply.results ? apply.results.length : 0}}</div>
        <div v-for="result in apply.results" class="result">
            <div class="header">
                <div class="avatar" v-bg.sm="result.identifier.photo"></div>
                <div class="master padding-left">
                    <h3 class="font-30 light">{{result.identifier.name}}<span class="site-mark font-22 bg-yellow white">个人官网</span></h3>
                    <p class="font-22 gray margin-top">浙江省工艺美术大师</p>
                </div>
                <div class="font-22 light">{{result.create_at | moment}}</div>
            </div>
            <div class="card bg-gray border-all font-30">
                <div class="video" @click="play(result.video)" v-bg.video="result.video"></div>
                <div class="conclusion">
                    <div class="txt">
                        <p class="center-vertical center">鉴宝结果：<span :class="{'red': result.result=='真货' }">{{result.result}}</span>
                        <span v-if="result.value_min"><br><br><span>估价：{{result.value_min | money}}~{{result.value_max | money}}</span></span></p>
                    </div>
                    <div class="social border-top font-22">
                        <span @click="toggleThumb(result.id)" class="favor center border-right"><i class="{{result.isLike ? 'red icon-thumb-active' : 'icon-thumb'}}"></i>{{result.like}}</span><!--remove space--><span @click="comment(result.identifier.id)" class="comment center light"><i class="icon-comment"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="!apply.results.length" class="center light font-26 margin-top">还没有大师来鉴定</div>
        <div class="evaluation-btn">
            <button class="white bg-red font-30" @click="evaluate">我来鉴定</button>
        </div>
    </div>
    <div class="separator"></div>
    <div class="comments">
        <div class="header border-bottom font-22">
            <div>评论{{comments.total}}</div>
            <div @click="comment" class="red"><i class="icon-comment"></i>我要评论</div>
        </div>
        <ul>
            <li class="margin-bottom" v-for="c in comments.list">
                <div class="author">
                    <div class="avatar margin-right" v-bg.sm="c.reply_from.photo" alt="{{c.reply_from.nickname}}"></div>
                    <div>
                        <h3 class="font-26 blue" @click="comment(c.reply_from.id)">{{c.reply_from.nickname}}</h3>
                        <p class="font-22 light margin-top">{{c.create_at | moment}}</p>
                    </div>
                </div>
                <div class="font-30 light">
                    <span v-if="c.reply_to" class="label"><span @click="comment(c.reply_to.id)" class="blue">{{c.reply_to.nickname}}</span>:</span>
                    <span>{{c.content}}</span>
                </div>
            </li>
            <li v-show="!comments.list.length" class="center light font-26 margin-top">还没有人评论</li>
        </ul>
    </div>
    <div class="separator last"></div>
    <div class="social-actions bg-white border-top font-26 gray">
        <span class="center border-right" @click="toggleFollow"><i class="{{apply.isFollowed ? 'icon-favor-active red' : 'icon-favor'}}"></i>关注({{apply.follow}})</span><span @click="share" class="center"><i class="icon-thumb"></i>分享</span>
    </div>
</div>
</template>
<script>
import config from '../config';
export default {
    name: 'EvaluationDetailView',
    data() {
        return {
            apply: {
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
                list: [],
                total: 0
            }
        };
    },
    route: {
        data({to}) {
            const applyId = to.params.id;
            const getApply = this.$http.get(`jianbao/applies/${applyId}`);
            this.$http.get(`jianbao/applies/${applyId}/comments?offset=0&limit=5`)
                .success(comments => {
                    this.comments.list = comments.data.comments;
                    this.comments.total = comments.data.total;
                    getApply.success(apply => {
                        console.debug('apply', apply.data);
                        this.apply = apply.data;
                    });
                });
            return getApply;
        }
    },
    methods: {
        enlarge() {
            this.toast('查看大图');
        },
        play(videoId) {
            this.action('play', 'http://7xo88d.media1.z0.glb.clouddn.com/' + videoId);
        },
        toggleThumb(resultId) {
            const result = this.apply.results.filter(r => r.id === resultId).pop();
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
            if (this.apply.isFollowed) {
                this.$http.delete(`jianbao/applies/${jadeId}/follows`, (resp) => {
                    if(resp.status === 200) {
                        this.apply.isFollowed = false;
                        this.apply.follow = this.apply.follow - 1;
                    } else if(resp.status === 605) {
                        this.toast(resp.message);
                        this.action('login');
                    }
                });
            } else {
                this.$http.post(`jianbao/applies/${jadeId}/follows`, (resp) => {
                    if(resp.status === 200) {
                        this.apply.isFollowed = true;
                        this.apply.follow = this.apply.follow + 1;
                    } else if(resp.status === 605) {
                        this.toast(resp.message);
                        this.action('login');
                    }
                });
            }
        },
        share() {
            this.toast('分享');
        },
        comment(userId) {
            this.toast(typeof userId === 'number' ? '回复' : '评论');
        },
        evaluate() {
            this.toast(this.apply.isMaster ? '鉴宝' : '菜鸟不能鉴宝');
        }
    }
}
</script>
