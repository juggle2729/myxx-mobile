<style lang="sass">
@import '../styles/partials/var';
.evaluation-detail {
    padding-bottom: 80px;
    .results {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        height: 926px;
        padding: 52px 78px;
        background: #202020 url('#{$qn}/evaluation/result-bg.png') no-repeat;
        background-size: cover;
        .portrait {
            width: 594px;
            height: 594px;
            margin-top: 22px;
            position: relative;
            background-color: black;
        }
        > div {
            display: inline-block;
            position: relative;
            &:not(:last-of-type) {
                margin-right: 39px;
            }
            &::after {
                content: '';
                position: absolute;
                left: 15px;
                bottom: 172px;
                width: 1rem;
                height: 1rem;
                background: transparent url('#{$qn}/icon/play.png') no-repeat center;
                background-size: 1rem;
                pointer-events: none;
            }
        }
        .title {
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 435px;
            overflow: hidden;
        }
        .price {
            height: 76px;
            line-height: 76px;
        }
        .action {
            border-radius: 10px;
            margin: 0 auto;
            width: 464px;
            height: 72px;
            line-height: 72px;
            text-align: center;
            i {
                margin-right: 28px;
            }
        }
    }
    .results-empty {
        margin: 0 32px;
        padding: 32px;
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
        margin: 32px;
        overflow-x: auto;
        white-space: nowrap;
        > li {
            display: inline-block;
            margin-right: 6px;
            img {
                height: 450px;
            }
        }
    }
    .evaluation-btn {
        margin: 0 32px;
        padding-bottom: 60px;
        button {
            height: 80px;
            width: 100%;
            border-radius: 10px;
            border: 0;
            cursor: pointer;
        }
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
<div class="evaluation-detail">
    <div v-if="evaluation.results.length" class="results scrollable">
        <div v-for="result in evaluation.results">
            <div class="result-head flex">
                <div class="avatar" v-link="result.identifier | profile" v-bg.sm="result.identifier.photo"></div>
                <div class="flex-1 margin-left">
                    <div class="font-30 white">{{result.identifier.name}}</div>
                    <div class="title font-26 white margin-top">{{result.identifier.title}}</div>
                </div>
                <div v-if="!env.isShare" @click="like(result)" class="font-30" :class="{red: result.liked, gray: !result.liked}"><i class="icon-like-active"></i><span>{{result.like}}</span></div>
            </div>
            <img class="portrait" @click="play(result.video, 'result')" :src="config.img+result.identifier.portrait+'?imageView2/1/w/600/h/600'" alt="{{result.identifier.name}}">
            <div class="price font-30 white center">
                <span>鉴定结果为{{result.result == 'genuine' ? '真' : (result.result == 'fake' ? '假' : '疑')}}</span>
                <span v-if="result.result==='genuine'">&nbsp;估价为{{prices[$index]}}</span>
            </div>
            <div v-if="result.promote_type==='auction'" class="action white bg-yellow font-30">
                <i class="icon-like-active"></i><span>进入拍卖预展</span>
            </div>
            <div v-if="result.promote_type==='newproduct'" class="action white bg-blue font-30">
                <i class="icon-like-active"></i><span>进入新品发布</span>
            </div>
            <div class="action white bg-green font-30"  v-link="result.identifier | profile">
                <i class="icon-like-active"></i><span>进入个人主页</span>
            </div>
        </div>
    </div>
    <div class="header">
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
    <ul class="images scrollable">
        <li class="img" v-for="picture in evaluation.pictures" @click="coverflow($index)">
            <img :src="config.img+picture+'?imageView2/2/h/450'" />
        </li>
        <li v-if="evaluation.video" class="play" @click="play(evaluation.video)">
            <img :src="config.video+evaluation.video+'?vframe/jpg/offset/0/rotate/auto|imageView2/2/h/450'" />
        </li>
    </ul>
    <div v-if="jb.label" class="evaluation-btn border-bottom">
        <button class="white font-30" :class="{'bg-red': jb.action, 'bg-disable': !jb.action}" @click="evaluate(jb.action)">{{jb.label}}</button>
    </div>
    <comment type="10" :id="evaluation.post_id" has-input="true"></comment>
    <div v-if="!env.isShare" class="fake-input font-30 flex" @click="$broadcast('comment', $event)">
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
                if(result.result === 'genuine') {
                    if(result.value_min && result.value_max) {
                        return `${Math.round(result.value_min/1000)/10}-${Math.round(result.value_max/1000)/10}万`;
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
            let label, action;
            if(this.evaluation.identifiable && this.self.id != this.evaluation.user.id) {
                label = '我要鉴定';
                if(this.evaluation.jianbao_permission) {
                    action = 'evaluate';
                } else if(this.self.id){
                    action = 'request';
                } else {
                    action = 'login';
                }
            }
            return {label, action};
        }
    },
    route: {
        data({to}) {
            const evaluationId = to.params.id;
            return this.$get(`sns/jianbao/${evaluationId}|v2`)
                    .then((evaluation) => {
                        this.setShareData('jianbao', evaluation, true);
                        return {evaluation};
                    });
        }
    },
    methods: {
        coverflow(index) {
            this.action('coverflow', {ids: this.evaluation.pictures, index});
        },
        // play(id, targetType='jianbaoresult', targetId=this.evaluation.post_id) {
        //     this.action('play', {id, targetType, targetId});
        //     if(!this.isApp) { // 分享页面，视频自动播放
        //         var timer = setInterval(() => {
        //             var v = document.querySelector('video');
        //             if(v) {
        //                 clearInterval(timer);
        //                 v.play();
        //             }
        //         }, 10);
        //     }
        // },
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
                            this.$route.router.go({name: 'apply-master', params: {id: this.self.id}});
                        }
                    });
            } else if(action === 'evaluate'){
                this.action('evaluate', {id: this.evaluation.id, imgId: this.evaluation.pictures[0]});
            }
        }
    }
}
</script>
