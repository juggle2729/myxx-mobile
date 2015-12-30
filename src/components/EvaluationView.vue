<style lang="sass">
.evaluation-detail {
    padding-bottom: 80px;
    .header, .images, .results {
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
        margin: 0 -5px -5px;
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
<div class="evaluation-detail bg-default">
    <div class="header bg-white">
        <div class="user">
            <div class="avatar" v-link="evaluation.user | profile" v-bg.sm="evaluation.user.photo"></div>
            <div class="margin-left">
                <div class="font-26">{{evaluation.user.name}}</div>
                <div class="padding-top font-22 gray">
                    <span>{{evaluation.create_at | moment}}</span><span class="padding-horizontal">|</span><span>{{evaluation.click}}人浏览</span>
                </div>
            </div>
        </div>
        <div class="desc font-30">{{evaluation.description}}</div>
    </div>
    <ul class="images bg-white"><li class="img" v-for="picture in evaluation.pictures" @click="coverflow($index)" v-bg.md="picture"></li><li class="play" @click="play(evaluation.video)" v-bg.video="evaluation.video"></li></ul>
    <div class="separator"></div>
    <div class="results bg-white">
        <div class="font-30 light border-bottom padding-vertical">大师鉴定 {{evaluation.results.length}}</div>
        <div class="result" v-for="result in evaluation.results">
            <div class="result-header">
                <div class="avatar" v-link="result.identifier | profile" v-bg.sm="result.identifier.photo"></div>
                <div class="master padding-left">
                    <h3 class="font-26">{{result.identifier.name}}<span v-if="result.identifier.has_website" class="site-mark font-22 bg-yellow white">个人官网</span></h3>
                    <p class="font-22 gray margin-top">{{result.identifier.title}}</p>
                </div>
                <div class="font-22 light">{{result.create_at | moment}}</div>
            </div>
            <div class="flex bg-light border-all font-30">
                <div class="play w-50" @click="play(result.video)" v-bg.video="result.video"></div>
                <div class="center w-50">
                    鉴宝结果：<span :class="{'red': result.result=='真货' }">{{result.result}}</span>
                    <span v-if="result.value_min"><br><br><span>估价：{{result.value_min | money}}~{{result.value_max | money}}</span></span>
                </div>
            </div>
            <social-bar :id="result.id" type="20" :total="result.like" :list="result.likes" :active="result.liked" class="border-all bg-light">
                <div @click="$broadcast('reply', $event, result.identifier)" class="extra-action border-left center light"><i class="icon-comment"></i></div>
            </social-bar>
        </div>
        <div v-show="!evaluation.results.length" class="center light font-26 margin-top">还没有大师来鉴定</div>
        <div class="evaluation-btn">
            <button class="white font-30" :class="{'bg-red': jb.action, 'bg-disable': !jb.action}" @click="evaluate(jb.action)">{{jb.label}}</button>
        </div>
    </div>
    <div class="separator"></div>
    <comment type="10" :id="evaluation.post_id"></comment>
    <social-bar :id="evaluation.post_id" type="10" :total="evaluation.like" :list="evaluation.likes" :active="evaluation.liked" class="border-top social bg-white">
        <div @click="share" class="border-left center gray extra-action"><i class="icon-share"></i><span>分享</span></div>
    </social-bar>
</div>
</template>
<script>
import config from '../config';
import SocialBar from './SocialBar.vue';
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
        SocialBar,
        Comment
    },
    computed: {
        jb() {
            let label = '我来鉴定';
            let action;
            if(!this.evaluation.unidentified) {
                label = '您已鉴定过';
            } else if(!this.evaluation.has_seat) {
                label = '鉴定已完成';
            } else if(this.evaluation.master) {
                action = 'evaluate';
            } else if(this.self){
                action = 'request';
            } else {
                action = 'login';
            }
            return {label, action};
        }
    },
    route: {
        data({to}) {
            const evaluationId = to.params.id;
            return this.$get(`sns/jianbao/${evaluationId}`)
                    .then((evaluation) => {
                        this.evaluation = evaluation;
                    });
        }
    },
    methods: {
        coverflow(index) {
            this.action('coverflow', {ids: this.evaluation.pictures, index});
        },
        play(id) {
            this.action('play', {id});
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
        share() {
            let title = '快来帮我鉴定一下，看看这个宝贝怎么样！';
            let desc = this.evaluation.description.substr(0, 20);
            let icon = this.evaluation.pictures[0];
            this.action('share', {title, desc, icon, url: location.href});
        }
    }
}
</script>
