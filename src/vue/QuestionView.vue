<style lang="stylus">
.question-view
    // background-image: linear-gradient(top, white 600px, #efefef 0)
    min-height: 100%
    header
        padding: 32px 32px 0 32px
    .pictures
        .pic
            width: 256px
            padding-top: @width
            &:not(:first-child)
                margin-left: 4px
    .value
        padding: 0 32px 32px 32px
    .num
        height: 80px
        line-height: 80px
    .result
        .identify
            width: 148px
            padding-top: @width
        .play
            width: 108px
            color: #527fb0
            img
                height: 68px
                width: 68px
        footer
            height: 98px
            line-height: 98px
            .like-icon
                margin-right: 56px
    .no-answer img
        height: 78px
        width: 92px
    .collection
        height: 120px
        line-height: 120px
        .name
            &::before
                content: '进入专辑：'
            &::after
                content: ' 查看更多内容'
        img
            display: block
            width: 32px
            height: 28px
    *::before, *::after
        color: #333333
</style>
<template lang="jade">
.question-view.bg(v-if="!$loadingRouteData")
    header.bg-white
        .user.flex
            avatar(:user="question.user")
            .mgl.flex-1
                .fz-30 {{question.user.name}}
                .mgt-14.fz-22.light {{question.click_count}}人浏览
            .flex.red.fz-26.bdl.pdl-32.pdv-12(@click="gotoDownload")
                icon(name="plus")
                span 关注问题
        .title.fz-34.bold.pdv-24.user-txt {{{question.description | content | input}}}
        .fz-30.gray.pdb-26.user-txt(v-if="question.remark") {{{question.remark | content | input}}}
    .pictures.pdh-32.bg-white.scrollable(v-if="question.pictures.length")
        .pic(v-for="pic in question.pictures", v-bg.sm="pic", @click="coverflow(question.pictures, $index)")
    .bg-white.mgb-36
        deep-link(label="打开美玉秀秀，发表你的观点")

    .results.bg-white
        .num.fz-26.gray.bg-white.mgl-32.bdb 视频回答&nbsp;{{question.results > 0 ? question.results.length : ''}}
        .result.bg-white(v-if="question.results.length", v-for="result in question.results", v-link="{name: 'answer', params: {id: result.id}, query: { qid: $route.params.id }}")
            .pdv-28.pdl-32.pdr.flex
                .identify.bg(v-bg="result.identifier.portrait")
                .identifier.mgl.flex-1
                    .fz-30.bold.line-clamp-1 {{result.identifier.nickname}} 的回答
                    .fz-26.gray.pdt {{result.identifier.title}}
                    .fz-26.gray.pdt(v-if="result.result") 回答结果为{{config.jdResult[result.result]}}  {{result.value && '估价为' + config.jdPrice[result.value]}}
                .play.center(@click.stop="play(result.video)")
                    img(:src="'question/play.png' | qn")
                    .fz-22.mgt 播放视频
            footer.flex.fz-26.bdt.pdh-32
                icon-like(:active='result.liked', :count='result.like_count', :target="result.id", type="jd")
                icon-comment.flex-1(:count="result.comment_count", :id="result.id", type="jd")
                .light {{result.click_count}}次播放
            .hr
        .center.fz-26.pdt-48.pdb-32.light.no-answer(v-if="!question.results.length")
            img(:src="'question/no-answer.png' | qn")
            .mgt-32 暂无视频回答
        .hr(v-if="!question.results.length")

    comment-list(type='jb', :id='question.post_id', :uid="question.user.id", v-ref:comments)
    .hr

    .collection.pdh-32.fz-26.bg-white.flex(v-if="question.recommend_collection", v-link="{name: 'collection', params:{id: question.recommend_collection.id}}")
        img(:src="'recommend/collection.png' | qn")
        .pdl.flex-1.name.red {{question.recommend_collection.name}}
        icon.gray(name="enter")
    .hr

    general-suggestion(:categories="question.categories")
</template>
<script>
import shareable from 'shareable'
import Topics from 'component/Topics.vue'
import CommentList from 'component/CommentList.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
export default {
    name: 'question-view',

    mixins: [shareable],

    components: {
        Topics,
        CommentList,
        GeneralSuggestion
    },

    data() {
        return {
            question: {}
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`sns/jianbao/${to.params.id}`)
                    .then(question => {
                        this.question = question
                        this.setShareData({title: question.description, icon: question.pictures[0]})
                    })
        }
    }
}
</script>
