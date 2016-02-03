<style lang="sass">
.evaluation-detail {
    padding-bottom: 130px;
    .results {
        padding: 24px 32px;
    }
    .header {
        padding: 32px 32px 0 32px;
        .user {
            display: -webkit-box;
            -webkit-box-align: center;
        }
        .desc {
            margin: 30px 0 0;
            line-height: 1.5em;
        }
    }
    .images {
        font-size: 0;
        padding: 24px 27px 19px;
        > li {
            display: inline-block;
            position: relative;
            width: 338px;
            padding: percentage(1/2.6) 0 0;
            margin: 5px;
        }
    }
    .results {
        .padding-bottom {
            padding-bottom: 24px;
        }
    }
    .result {
        .result-header {
            display: -webkit-box;
            -webkit-box-align: center;
            height: 120px;
            .master {
                margin-left: 20px;
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
        .social {
            margin-top: 20px;
            > div {
                width: calc(50% - 10px);
                padding: 20px 0;
                border: 1px solid #b2b2b2;
                border-radius: 8px;
            }
            .like {
                margin-right: 10px;
            }
            .comment {
                margin-left: 10px;
            }
        }
    }
    .evaluation-btn {
        margin: 16px 0 8px 0;
        button {
            height: 80px;
            width: 100%;
            border-radius: 10px;
            border: 0;
            cursor: pointer;
        }
    }
    .w-50 {
        width: 50%;
    }
    .nocontent {
        margin-top: 48px;
        margin-bottom: 32px;
    }
    .fake-input {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #f9f9f9;
        color: red;
        height: 98px;
        padding: 16px;
        .input {
            background-color: white;
            color: #c6c6c6;
            padding: 0 20px;
            height: 72px;
            line-height: 72px;
            border-radius: 8px;
        }
        .submit {
            line-height: 72px;
            margin-left: 16px;
            width: 140px;
            height: 72px;
            color: white;
            background-color: #b2b2b2;
            border-radius: 8px;
        }
    }
}
</style>
<template>
<div class="evaluation-detail bg-default">
    <div class="header bg-white">
        <div class="user">
            <div class="avatar" v-link="evaluation.user | profile" v-bg.sm="evaluation.user.photo"></div>
            <div class="margin-left">
                <div class="font-26">{{evaluation.user.name}}</div>
                <div class="margin-top font-22 gray">
                    <span>{{evaluation.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{evaluation.click}}人浏览</span>
                </div>
            </div>
        </div>
        <div class="desc font-30 user-input">{{evaluation.description}}</div>
    </div>
    <ul class="images bg-white"><li class="img" v-for="picture in evaluation.pictures" @click="coverflow($index)" v-bg.md="picture" qid="{{picture}}" track-by="$index"></li><li class="play" @click="play(evaluation.video)" v-bg.video="evaluation.video" qid="{{evaluation.video}}"></li></ul>
    <div class="separator-20"></div>
    <div class="results bg-white">
        <div class="font-22 light border-bottom padding-bottom">大师鉴定 {{evaluation.results.length}}</div>
        <div class="result" v-for="result in evaluation.results">
            <div class="result-header">
                <div class="avatar" v-link="result.identifier | profile" v-bg.sm="result.identifier.photo"></div>
                <div class="master">
                    <h3 class="font-26">{{result.identifier.name}}<span v-if="result.identifier.website_status" class="site-mark font-22 bg-yellow white">个人官网</span></h3>
                    <p v-if="result.identifier.title" class="font-22 gray margin-top">{{result.identifier.title}}</p>
                </div>
                <div class="font-22 light">{{result.create_at | moment}}</div>
            </div>
            <div class="flex bg-light border-all font-30">
                <div class="play w-50" @click="play(result.video)" v-bg.video="result.video"></div>
                <div class="center w-50">
                    鉴宝结果：<span class="red">{{result.result}}</span>
                    <p v-if="result.result === '真'" class="font-26 margin-top"><span>估价：{{prices[$index]}}</span></p>
                </div>
            </div>
            <div class="social flex gray font-26">
                <div @click="like(result)" class="like center" :class="{'red': result.liked}"><i class="{{result.liked ? 'icon-like-active' : 'icon-like'}}"></i><span>{{result.like}}</span></div>
                <div v-link="{name: 'result-comment', params: {id: result.id}}" class="comment center"><i class="icon-comment"></i><span>{{result.comment}}</span></div>
            </div>
        </div>
        <div v-show="!evaluation.results.length" class="center light font-26 nocontent">还没有大师来鉴定</div>
        <div class="evaluation-btn">
            <button class="white font-30" :class="{'bg-red': jb.action, 'bg-disable': !jb.action}" @click="evaluate(jb.action)">{{jb.label}}</button>
        </div>
    </div>
    <div class="separator-20"></div>
    <comment type="10" :id="evaluation.post_id" has-input="true"></comment>
    <div class="fake-input font-30 flex" @click="$broadcast('comment', $event)" >
        <div class="input flex-1">点击此处发表评论...</div>
        <div class="submit center">发送</div>
    </div>
</div>
</template>
<script>
import Comment from './Comment.vue';
export default {
    name: 'EvaluationView',
    data() {
        return {
            evaluation: {
                user: {},
                results: []
            },
            comment: {
                items: [],
                total: 0
            }
        };
    },
    components: {
        Comment
    },
    computed: {
        prices() {
            return this.evaluation.results.map((result) => {
                if(result.result === '真') {
                    if(result.value_min && result.value_max) {
                        return `${Math.round(result.value_min/1000)/10} ~ ${Math.round(result.value_max/1000)/10}万`;
                    } else if(result.value_min) {
                        return `${Math.round(result.value_min/1000)/10}万以上`;
                    } else if(result.value_max) {
                        return `${Math.round(result.value_max/1000)/10}万以下`;
                    }
                } else {
                    return '';
                }
            });
        },
        jb() {
            let label = '我来鉴定';
            let action;
            if(this.self && this.self.id == this.evaluation.user.id) {
                label = '不能鉴定自己的宝贝';
            } else if(!this.evaluation.unidentified) {
                label = '您已鉴定过';
            } else if(!this.evaluation.has_seat) {
                label = '鉴定已完成';
            } else if(this.evaluation.jianbao_permission) {
                action = 'evaluate';
            } else if(this.self){
                action = 'request';
            } else {
                action = 'login';
            }
            return {label, action};
        }
    },
    ready() {
        let title = '快帮我鉴定一下这个宝贝！';
        if(!this.evaluation.unidentified) {
            title = '快来看看我的鉴定吧！';
        }
        let desc = this.evaluation.description;
        let icon = this.evaluation.pictures[0];
        let url = location.origin + location.pathname;
        let query = _.merge({}, this.$route.query, {
            id: this.evaluation.post_id,
            type: 'jianbao'
        });
        url += ('?' + Object.keys(query).map((k) => `${k}=${query[k]}`).join('&'));
        this.action('shareable', {title, desc, icon, url});
    },
    route: {
        data({to}) {
            const evaluationId = to.params.id;
            return this.$get(`sns/jianbao/${evaluationId}`)
                    .then((evaluation) => ({evaluation}));
        }
    },
    methods: {
        like(result) {
            const api = `users/target/${result.id}/type/20/like`;
            if (result.liked) {
                this.$delete(api).then(() => {
                    result.liked = false;
                    result.like -= 1;
                });
            } else {
                this.$post(api).then(() => {
                    result.liked = true;
                    result.like += 1;
                });
            }
        },
        evaluate(action) {
            if(action === 'login') {
                this.action('login');
            } else if(action === 'request'){
                this.action('confirm', {text: '抱歉，只有大师才可鉴定。您可以联系我们进行大师身份认证'})
                    .then((confirm) => {
                        if(confirm === '1') {
                            this.$route.router.go({name: 'master-request', params: {id: this.self.id}});
                        }
                    });
            } else if(action === 'evaluate'){
                this.action('evaluate', {id: this.evaluation.id, imgId: this.evaluation.pictures[0]});
            }
        },
        coverflow(index) {
            this.action('coverflow', {ids: this.evaluation.pictures, index});
        },
        play(id) {
            this.action('play', {id});
        }
    }
}
</script>
