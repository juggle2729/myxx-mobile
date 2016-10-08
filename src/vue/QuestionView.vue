<style lang="stylus">
.question-view
    background-image: linear-gradient(top, white 500px, #efefef 500px)
    header
        padding: 32px 32px 0 32px
        .desc
            margin: 30px 0 0
            line-height: 1.5em
    .pictures
        .pic
            width: 256px
            padding-top: @width
            &:not(:first-child)
                margin-left: 4px
    footer
        height: 100px
        > div
            line-height: 48px
            -webkit-box-flex: 1
            width: percentage(1/2)
            text-align: center
    .result
        .video
            width: 466px
            padding-top: @width
            margin: 28px 0 32px 32px
        footer
            height: 84px
            line-height: 48px
</style>
<template lang="jade">
.question-view
    header.bg-white
        .user.flex
            avatar(:user="question.user")
            .mgl
                .fz-26 {{question.user.name}}
                .mgt.fz-22.gray {{question.click_count}}人浏览
        .title.fz-34.bold.mgv-32.user-txt {{question.description}}
        .desc.fz-30.gray.mgb-32.user-txt(v-if="question.remark") {{question.remark}}
    .pictures.pdh-32.bg-white.scrollable
        .pic(v-for="pic in question.pictures", v-bg.sm="pic", @click="coverflow(question.pictures, $index)")
    footer.flex.fz-30.light.bdt.mgt-32.bg-white
        .gray
            span.icon-comment
            span {{question.comment_count || '写评论'}}
        .bdl.blue(@click="gotoDownload")
            span.icon-add-answer
            span 添加回答
    .hr
    .results(v-if="question.results.length")
        .fz-26.center.gray.pdv-20 回答{{question.results.length}}
        .result.bg-white(v-for="result in question.results", v-link="{name: 'answer', params: {id: result.id}}")
            header
                .user.flex
                    avatar(:user="result.identifier")
                    .mgl.flex-1
                        .fz-26 {{result.identifier.nickname}}
                        .mgt.fz-22.gray {{result.identifier.title}}
                    follow(:user='result.identifier.id', :follow='result.identifier.is_followed', :has-border='true')
            .video.bg(v-bg='result.video', @click='play(result.video)', query='vframe/jpg/offset/0/rotate/auto|imageView2/1/w/466')
            footer.flex.fz-26.bdt
                .gray
                    span.icon-like
                    span {{result.like_count}}
                .gray.bdl
                    span.icon-comment
                    span {{result.comment_count || '写评论'}}
            .hr
    .center.fz-30.pdt-40.mgt-40(v-else) 暂无回答
</template>
<script>
import shareable from 'shareable'
const Opts = {
    result: {genuine: '真', fake: '假', unsure: '疑'},
    price: { sfour: '小四', mfour: '中四', lfour: '大四', sfive: '小五', mfive: '中五', lfive: '大五', ssix: '小六', msix: '中六', lsix: '大六'}
}
export default {
    name: 'question-view',
    mixins: [shareable],
    data() {
        return {
            question: {
                results: [],
                user: {},
                tags: []
            },
            comment: {
                items: [],
                total: 0
            },
            opts: Opts
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`sns/jianbao/${to.params.id}`)
                    .then(question => {
                        this.setShareData(question)
                        this.question = question
                    })
        }
    }
}
</script>
