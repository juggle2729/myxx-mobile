<style lang="sass">
.evaluation-detail {
    padding-bottom: 80px;
    .header, .images, .results, .comments {
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
    .result {
        .result-header {
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
        .play {
            padding-top: 250px;
            &::after {
                background-size: 60px;
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

    .social {
        padding: 0 32px;
        position: fixed;
        z-index: 9;
        bottom: 0;
        width: 100%;
    }
    .w-50 {
        width: 50%;
    }
}
</style>
<template>
<div class="evaluation-detail">
    <div class="header">
        <div class="user">
            <div class="avatar" v-bg.sm="evaluation.user.photo"></div>
            <div class="margin-left">
                <div class="font-26">{{evaluation.user.name}}</div>
                <div class="padding-top font-22 gray">
                    <span>{{evaluation.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{evaluation.click}}人浏览</span>
                </div>
            </div>
        </div>
        <div class="desc font-30">{{evaluation.description}}</div>
    </div>
    <ul class="images"><li class="img" v-for="picture in evaluation.pictures" v-bg.md="picture"></li><li class="play" @click="play(evaluation.video)" v-bg.video="evaluation.video"></li></ul>
    <div class="separator"></div>
    <div class="results">
        <div class="font-30 light border-bottom padding-vertical">大师鉴定 {{evaluation.results.length}}</div>
        <div class="result" v-for="result in evaluation.results">
            <div class="result-header">
                <div class="avatar" v-bg.sm="result.identifier.photo"></div>
                <div class="master padding-left">
                    <h3 class="font-26">{{result.identifier.name}}<span class="site-mark font-22 bg-yellow white">个人官网</span></h3>
                    <p class="font-22 gray margin-top">{{result.identifier.title}}</p>
                </div>
                <div class="font-22 light">{{result.create_at | moment}}</div>
            </div>
            <div class="flex bg-gray border-all font-30">
                <div class="play w-50" @click="play(result.video)" v-bg.video="result.video"></div>
                <div class="center w-50">
                    鉴宝结果：<span :class="{'red': result.result=='真货' }">{{result.result}}</span>
                    <span v-if="result.value_min"><br><br><span>估价：{{result.value_min | money}}~{{result.value_max | money}}</span></span>
                </div>
            </div>
            <favor :id="result.id" type="1" :total="result.like" :list="result.likes" :active="result.liked" class="border-all">
                <div @click="comment(result.identifier.id)" class="extra-action border-left center light"><i class="icon-comment"></i></div>
            </favor>
        </div>
        <div v-show="!evaluation.results.length" class="center light font-26 margin-top">还没有大师来鉴定</div>
        <div class="evaluation-btn">
            <button class="white bg-red font-30" @click="evaluate">我来鉴定</button>
        </div>
    </div>
    <div class="separator"></div>
    <div class="comments">
        <div class="header border-bottom font-22">
            <div>评论{{comments.total}}</div>
            <div @click="comment" class="red"><i class="icon-comment"></i><span>我要评论</span></div>
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
    <favor :id="evaluation.id" type="1" :total="evaluation.like" :list="evaluation.likes" :active="evaluation.liked" class="border-top social bg-white">
        <div @click="share" class="border-left center light extra-action"><i class="icon-thumb"></i><span>分享</span></div
    </favor>
</div>
</template>
<script>
import config from '../config';
import Favor from './Favor.vue';
export default {
    name: 'EvaluationDetailView',
    data() {
        return {
            evaluation: {
                user: {},
                results: []
            },
            comments: {
                list: [],
                total: 0
            }
        };
    },
    components: {
        Favor
    },
    computed: {
    },
    route: {
        data({to}) {
            const evaluationId = to.params.id;
            const getEvaluation = this.$http.get(`sns/jianbao/${evaluationId}`);
            this.$http.get(`sns/posts/${evaluationId}/comments?offset=0&limit=5`)
                .success(comments => {
                    this.comments.list = comments.data.comments;
                    this.comments.total = comments.data.total;
                    getEvaluation.success(evaluation => {
                        console.debug('evaluation', evaluation.data);
                        evaluation.results = evaluation.results || [];
                        this.evaluation = evaluation.data;
                    });
                });
            return getEvaluation    ;
        }
    },
    methods: {
        play(videoId) {
            this.action('play', 'http://7xo88d.media1.z0.glb.clouddn.com/' + videoId);
        },
        toggleThumb(resultId) {
            const result = this.apply.results.filter(r => r.id === resultId).pop();
            if (result.isLike) {
                this.$http.delete(`sns/posts/${resultId}/like`, (resp) => {
                    if (resp.status === 200) {
                        result.isLike = false;
                        result.like = result.like - 1;
                    } else {
                        this.toast(resp.message);
                    }
                });
            } else {
                this.$http.post(`sns/posts/${resultId}/like`, (resp) => {
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