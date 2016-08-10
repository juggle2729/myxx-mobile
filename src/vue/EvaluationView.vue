<style lang="sass">
@import '~style/partials/var';
.evaluation-detail {
    padding-bottom: 100px;
    .results {
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
        margin: 32px;
        > li {
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
}
</style>
<template lang="jade">
.evaluation-detail
    .header
        .user
            avatar(:user="evaluation.user")
            .margin-left
                .font-26 {{evaluation.user.name}}
                .margin-top.font-22.gray
                    span {{evaluation.create_at | moment}}
                    span.padding-horizontal |
                    span {{evaluation.click}}人浏览
        .desc.font-30.user-input {{evaluation.description}}
    ul.images.scrollable
        li.img(v-for="picture in evaluation.pictures", @click="coverflow(evaluation.pictures, $index)")
            img(:src="config.img+picture+'?imageView2/2/h/450'")
        li.video(v-if="evaluation.video", @click="play(evaluation.video)")
            img(:src="config.video+evaluation.video+'?vframe/jpg/offset/0/rotate/auto|imageView2/2/h/450'")
    .results.scrollable(v-if="evaluation.results.length")
        div(v-for="result in evaluation.results")
            .result-head.flex
                avatar(:user="result.identifier")
                .flex-1.margin-left
                    .font-30.white {{result.identifier.name}}
                    .title.font-26.white.margin-top {{result.identifier.title}}
            img.portrait(@click="play({id: result.video, ads: [result.identifier.portrait, result.ad_video]})", :src="config.img+result.identifier.portrait+'?imageView2/1/w/600/h/600'", alt="{{result.identifier.name}}")
            .price.font-30.white.center
                span 鉴定结果为{{opts.result[result.result]}}
                span(v-if="result.value") &nbsp;估价为{{opts.price[result.value]}}
            a.action.white.bg-blue.font-30(v-if="result.ad_product_id", v-link="{name: 'jade', params: {id: result.ad_product_id}}")
                i.icon-new-product
                span 进入新品发布
            a.action.white.bg-green.font-30(v-else, v-link="result.identifier | profile")
                i.icon-user
                span 进入个人主页
    tags(:tags="evaluation.tags")
    .footer.flex.border-top.font-30.gray(v-if="env.isShare")
        .comment.border-left(@click="$refs.comment.comment()")
            i.icon-comment-solid
            span 写评论
        share.border-left
    .separator-20
    comments(:type="10", :display-input="false", v-ref:comment)
    product-recommend(:id="evaluation.post_id")
    recommend(:data="items", name="相关推荐")
    .footer.flex.border-top.font-30.gray(v-if="!env.isShare")
        .comment.border-left(@click="$refs.comment.comment()")
            i.icon-comment-solid
            span 写评论
        share.border-left
</template>
<script>
import Tags from './component/Tags.vue';
import Recommend from './component/Recommend.vue';
import ProductRecommend from './component/ProductRecommend.vue';
import Comments from 'component/Comments.vue';
import Share from './component/Share.vue';
import shareable from 'shareable';
const Opts = {
    result: {genuine: '真', fake: '假', unsure: '疑'},
    price: { sfour: '小四', mfour: '中四', lfour: '大四', sfive: '小五', mfive: '中五', lfive: '大五', ssix: '小六', msix: '中六', lsix: '大六'}
}
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
                results: [],
                user: {},
                tags: []
            },
            comment: {
                items: [],
                total: 0
            },
            opts: Opts
        };
    },
    computed: {
        paging() {
            return {
                path: 'dc/rd/list',
                params: {
                    obj_id: this.$route.params.id,
                    biz_type: 'jb'
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`sns/jianbao/${to.params.id}`)
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
