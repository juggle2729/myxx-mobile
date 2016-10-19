<style lang="stylus">
.question-view
    background-image: linear-gradient(top, white 600px, #efefef 0)
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
    .value
        padding: 0 32px 32px 32px
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
.question-view(v-if="!$loadingRouteData")
    header.bg-white
        .user.flex
            avatar(:user="question.user")
            .mgl
                .fz-30 {{question.user.name}}
                .mgt-14.fz-22.light {{question.click_count}}人浏览
        .title.fz-34.bold.mgv-32.user-txt {{question.description}}
        .desc.fz-30.gray.mgb-32.user-txt(v-if="question.remark") {{question.remark}}
    .pictures.pdh-32.mgb-32.bg-white.scrollable
        .pic(v-for="pic in question.pictures", v-bg.sm="pic", @click="coverflow(question.pictures, $index)")
    footer.flex.fz-26.bg-white.bdt
        .gray(v-link="{name: 'comments', params: {id:question.post_id, type: 10}}")
            icon-comment(:count="question.comment_count")
        .bdl.blue(@click="gotoDownload")
            icon(name="add-answer")
            span 添加回答
    .hr
    .results(v-if="question.results.length")
        .fz-26.center.gray.bg.pdv-20 回答&nbsp;{{question.results.length}}
        .result.bg-white(v-for="result in question.results", v-link="{name: 'answer', params: {id: result.id}}")
            header
                .user.flex
                    avatar(:user="result.identifier")
                    .mgl.flex-1
                        .fz-26 {{result.identifier.nickname}}
                        .mgt-14.fz-22.gray {{result.identifier.title}}
                    icon-follow(:user='result.identifier.id', :follow='result.identifier.is_followed', :has-border='true')
            .video.bg(v-bg='result.video', @click.stop="play(result.video)")
            .fz-30.pdh-32.pdb-32(v-if="result.value") 回答结果为真 估价为{{config.jdPrice[result.value]}}
            footer.flex.fz-26.bdt
                icon-like(:active='result.liked', :count='result.like_count', :target="result.id", type="20")
                icon-comment.bdl(:count="result.comment_count", v-link="{name: 'comments', params: {id:result.id, type: 20}}")
            .hr(v-if="$index!==question.results.length-1")
    .center.fz-30.pdt-40.mgt-40.light(v-else) 暂无回答
</template>
<script>
import shareable from 'shareable'
export default {
    name: 'question-view',
    mixins: [shareable],
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
