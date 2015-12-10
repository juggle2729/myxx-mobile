<style lang="sass">
.story-detail {
    padding-bottom: 95px;
    > div:not(.social-actions) {
        padding: 24px 32px;
    }
    .header {
        .user {
            display: -webkit-box;
            -webkit-box-align: center;
            .name {
                margin-left: 20px;
                .moment {
                    margin-top: 12px;
                }
            }
        }
        .desc {
            margin: 30px 0 24px;
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
</style>
<template>
<div class="story-detail">
    <div class="header">
        <div class="user">
            <div class="avatar" v-bg.sm="apply.applier.photo"></div>
            <div class="name">
                <p class="font-26">{{apply.applier.name}}</p>
                <p class="moment font-22 light"><span>{{apply.create_at | moment}}</span><span class="gutter">|</span><span>{{apply.click}}人浏览</span></p>
            </div>
        </div>
        <div class="desc font-30">{{apply.description}}</div>
    </div>
    <div class="media">
        <div class="video" @click="play(apply.video)" v-bg.video="apply.video"></div>
        <ul class="images"><li v-for="picture in apply.pictures" track-by="$index" class="img" v-bg.md="picture"></li></ul>
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
    <div class="social-actions bg-white border-top font-26 gray">
        <span class="center border-right" @click="toggleFollow"><i class="{{apply.isFollowed ? 'icon-favor-active txt-red' : 'icon-favor'}}"></i>关注({{apply.follow}})</span><span @click="share" class="center"><i class="icon-thumb"></i>分享</span>
    </div>
</div>
</template>
<script>
export default {
    name: 'StoryDetailView',
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
