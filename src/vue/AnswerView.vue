<style lang="stylus">
.answer-view
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
        .user img
            display: block
            height: 26px
            width: 26px
        footer
            height: 84px
            line-height: 48px
</style>
<template  lang="pug">
.answer-view(v-if="!$loadingRouteData")
    header.bg-white
        .user.flex
            .flex-1.title.fz-30.bold.mgv-24.pdr.user-txt.bdr {{{question.description | content | input}}}
            deep-link.has-icon.red.fz-26.pdl-32.pdv-12
                icon(name="plus")
                span.red 关注问题
    .pictures.pdh-32.bg-white.scrollable(v-if="question.pictures.length")
        .pic(v-for="pic in question.pictures", v-bg.sm="pic", @click="coverflow(question.pictures, $index)")
    deep-link 打开美玉秀秀，发表你的观点
    .hr

    .result.bg-white
        header
            .user.flex
                avatar(:user="result.identifier")
                .mgl.flex-1
                    .flex
                        .fz-26 {{result.identifier.nickname}}
                        img.mgl-8(v-if="result.identifier.vip_flag", :src="'profile/'+result.identifier.role+'.png' | qn")
                        img.mgl-8(v-if="result.identifier.jianbao_level", :src="'jb/'+result.identifier.jianbao_level+'.png' | qn")
                    .mgt-14.fz-22.gray {{result.identifier.title}}
                icon-follow(:target='result.identifier.id', :follow='result.identifier.is_followed', :has-border='true')
        .video.bg(v-bg='result.identifier.portrait', @click.stop="play(result.video)")
        .fz-30.pdh-32.pdb-32(v-if="result.jd_tags && result.jd_tags.length") 回答结果：{{ result.jd_tags.join('、') }}

        footer.flex.fz-26.bdt
            icon-like(:active='result.liked', :count='result.like_count', :recognition="true")
            icon-comment.bdl(:count="result.comment_count", :id="result.id", type="jd")
        .hr

    general-suggestion
</template>
<script>
import shareable from 'shareable'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
export default {
    name: 'answer-view',

    mixins: [shareable],

    components: {
        GeneralSuggestion
    },

    data() {
        return {
            question: {},
            result: {}
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`sns/results/${to.params.id}`)
                    .then(result => {
                        this.result = result
                        this.question = result.jianbao
                        this.setShareData({title: this.question.description, master: this.result.identifier.nickname, icon: this.question.pictures[0]})
                    })
        }
    }
}
</script>
