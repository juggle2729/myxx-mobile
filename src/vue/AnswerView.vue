<style lang="stylus">
.answer-view
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
.answer-view(v-if="!$loadingRouteData")
    header.bg-white
        .user.flex
            avatar(:user="question.user")
            .mgl.flex-1
                .fz-30 {{question.user.name}}
                .mgt-14.fz-22.light {{question.click_count}}人浏览
            .flex.red.fz-26.bdl.pdl-32.pdv-12(@click="gotoDownload")
                icon(name="plus")
                span 关注问题
        .title.fz-34.bold.pdv-24.user-txt {{{question.description | input}}}
        .fz-30.gray.pdb-26.user-txt(v-if="question.remark") {{{question.remark | input}}}
    .pictures.pdh-32.bg-white.scrollable(v-if="question.pictures.length")
        .pic(v-for="pic in question.pictures", v-bg.sm="pic", @click="coverflow(question.pictures, $index)")
    template(v-if='question.categories.length')
        topics(:topics="question.categories", :title="false")
    .bg-white.pdv-36
        share-button(txt="下载美玉秀秀，发表你的观点")
    .hr
    
    .result.bg-white
        header
            .user.flex
                avatar(:user="result.identifier")
                .mgl.flex-1
                    .fz-26 {{result.identifier.nickname}}
                    .mgt-14.fz-22.gray {{result.identifier.title}}
                icon-follow(:target='result.identifier.id', :follow='result.identifier.is_followed', :has-border='true')
        .video.bg(v-bg='result.identifier.portrait', @click.stop="play(result.video)")
        .fz-30.pdh-32.pdb-32(v-if="result.result") 回答结果为{{config.jdResult[result.result]}}  {{result.value && '估价为' + config.jdPrice[result.value]}}

        footer.flex.fz-26.bdt
            icon-like(:active='result.liked', :count='result.like_count', :target="result.id", type="jd")
            icon-comment.bdl(:count="result.comment_count", :id="result.id", type="jd")
        .hr
    
    general-suggestion
</template>
<script>
import shareable from 'shareable'
import Shop from 'component/Shop.vue'
import Topics from 'component/Topics.vue'
import CommentList from 'component/CommentList.vue'
import ShareButton from 'component/ShareButton.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
export default {
    name: 'answer-view',

    mixins: [shareable],

    components: {
        Shop,
        Topics,
        CommentList,
        ShareButton,
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
            return this.$fetch(`sns/jianbao/${to.query.qid}`)
                    .then(question => {
                        this.question = question
                        this.result = _.filter(this.question.results, (item) => {
                            return item.id == this.$route.params.id
                        })[0]
                        this.setShareData({title: question.description, master: this.result.identifier.nickname, icon: question.pictures[0]})
                    })
        }
    }
}
</script>
