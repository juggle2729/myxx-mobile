<style lang="sass">
@import '~style/partials/var';
.evaluation-detail {
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
            display: block;
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

    .nocontent {
        margin-top: 48px;
        margin-bottom: 32px;
    }
    .footer {
        height: 98px;
        > div {
            line-height: 60px;
            -webkit-box-flex: 1;
            text-align: center;
            .icon-comment-solid {
                transform: scale(1.5);
            }
        }
    }
    .placeholder {
        height: 100px;
    }
}
</style>
<template>
<div class="evaluation-detail">
    <div class="header">
        <div class="user">
            <avatar :user="evaluation.user"></avatar>
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
        <li class="img" v-for="picture in evaluation.pictures" @click="coverflow(evaluation.pictures, $index)">
            <img :src="config.img+picture+'?imageView2/2/h/450'" />
        </li>
        <li v-if="evaluation.video" class="video" @click="play(evaluation.video)">
            <img :src="config.video+evaluation.video+'?vframe/jpg/offset/0/rotate/auto|imageView2/2/h/450'" />
        </li>
    </ul>
    <div v-if="evaluation.results.length" class="results scrollable">
        <div v-for="result in evaluation.results">
            <div class="result-head flex">
                <avatar :user="result.identifier"></avatar>
                <div class="flex-1 margin-left">
                    <div class="font-30 white">{{result.identifier.name}}</div>
                    <div class="title font-26 white margin-top">{{result.identifier.title}}</div>
                </div>
            </div>
            <img class="portrait" @click="play({id: result.video, ads: [result.identifier.portrait, result.ad_video]})" :src="config.img+result.identifier.portrait+'?imageView2/1/w/600/h/600'" alt="{{result.identifier.name}}">
            <div class="price font-30 white center">
                <span>鉴定结果为{{result.result == 'genuine' ? '真' : (result.result == 'fake' ? '假' : '疑')}}</span>
                <span v-if="result.result==='genuine'">&nbsp;估价为{{prices[$index]}}</span>
            </div>
            <a v-if="result.ad_product_id" class="action white bg-blue font-30" v-link="{name: 'jade', params: {id: result.ad_product_id}}">
                <i class="icon-new-product"></i><span>进入新品发布</span>
            </a>
            <a v-else class="action white bg-green font-30" v-link="result.identifier | profile">
                <i class="icon-user"></i><span>进入个人主页</span>
            </a>
        </div>
    </div>
    <tags :tags="evaluation.tags"></tags>
    <div class="footer flex border-top font-30 gray" v-if="env.isShare">
        <div class="comment border-left" @click="$refs.comment.comment()">
            <i class="icon-comment-solid"></i><span>写评论</span>
        </div>
        <share class="border-left"></share>
    </div>
    <div class="separator-20"></div>
    <comments type="10" :id="evaluation.post_id" :display-input="false" v-ref:comment></comments>
    <product-recommend :id="evaluation.post_id"></product-recommend>
    <recommend :data="items" name="相关推荐"></recommend>
    <div class="footer flex border-top font-30 gray" v-if="!env.isShare">
        <div class="comment border-left" @click="$refs.comment.comment()">
            <i class="icon-comment-solid"></i><span>写评论</span>
        </div>
        <share class="border-left"></share>
    </div>
</div>
</template>
<script>
import Tags from './component/Tags.vue';
import Recommend from './component/Recommend.vue';
import ProductRecommend from './component/ProductRecommend.vue';
import Comments from 'component/Comments.vue';
import Share from './component/Share.vue';
import shareable from 'shareable';
export default {
    name: 'EvaluationView',
    mixins: [shareable],
    components: {
        Comments,
        Recommend,
        ProductRecommend,
        Share,
        Tags
    },
    data() {
        return {
            evaluation: {
                post_id: 0,
                results: [],
                user: {},
                tags: []
            },
            comment: {
                items: [],
                total: 0
            }
        };
    },
    computed: {
        prices() {
            return this.evaluation.results.map((result) => {
                if(result.result === 'genuine') {
                    if(result.value_min && result.value_max) {
                        return `${Math.round(result.value_min/10000)}-${Math.round(result.value_max/10000)}万`;
                    } else if(result.value_min) {
                        return `${Math.round(result.value_min/10000)}万以上`;
                    } else if(result.value_max) {
                        return `${Math.round(result.value_max/10000)}万以下`;
                    }
                } else {
                    return '';
                }
            });
        },
        paging() {
            return {
                path: 'dc/rd/list|v7',
                list: 'entries',
                params: {
                    obj_id: this.evaluation.id,
                    biz_type: 'jb',
                    limit: 10
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`sns/jianbao/${to.params.id}|v3`)
                    .then(evaluation => {
                        if(to.params.result !== 'none' && evaluation.results.length) {
                            evaluation.results = [].concat(_.find(evaluation.results, {id: +to.params.result}) || evaluation.results);
                        }
                        this.setShareData(evaluation, true);
                        this.evaluation = evaluation;
                    });
        }
    }
}
</script>
