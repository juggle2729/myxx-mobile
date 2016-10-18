<style lang="stylus">
.answer-view
    background-image: linear-gradient(top, white 1000px, #efefef 1000px)
    .pictures
        padding-bottom: 32px
        .pic
            width: 256px
            padding-top: @width
            &:not(:first-child)
                margin-left: 4px
    .answer
        padding: 28px 32px 0
        .video
            width: 100%
            padding-top: @width
            margin: 28px 0 32px 0
        footer
            height: 100px
            margin: 0 -32px
            > div
                line-height: 60px
                -webkit-box-flex: 1
                text-align: center
</style>
<template lang="jade">
.answer-view.pdb-10(v-if="!$loadingRouteData")
    header.flex.pd-32
        .title.flex-1.fz-34.bold.bdr.pdr-32.user-txt {{answer.jianbao.description}}
        .blue.fz-26.pdl-32.pdv-10(v-link="{name: 'question', params: {id: answer.jianbao.post_id}}")
            span.inline-block {{answer.jianbao.status}}个回答
            icon.fz-22.pdl-8(name="enter")
    .pictures.pdh-32.bg-white.scrollable
        .pic(v-for="pic in answer.jianbao.pictures", v-bg.sm="pic")
    .hr
    .answer.bg-white
        header
            .user.flex
                avatar(:user="answer.identifier")
                .mgl.flex-1
                    .fz-26 {{answer.identifier.nickname}}
                    .mgt-14.fz-22.gray {{answer.identifier.title}}
                icon-follow(:user='answer.identifier.id', :follow='answer.identifier.is_followed', :has-border='true')
        .video.bg(v-bg='answer.video', @click='play(answer.video)', query='vframe/jpg/offset/0/rotate/auto|imageView2/1/w/466')
        .fz-30.pdh-32.pdb-32(v-if="answer.value") 回答结果为真 估价为{{config.jdPrice[answer.value]}}
        footer.flex.fz-30.light.bdt
            .gray
                icon-like(:active="answer.liked", :count="answer.like_count", :target="answer.id", type="20")
            .gray.bdl(@click="$refs.comments.addComment()")
                icon-comment(:count="answer.comment_count")
            .gray.bdl
                icon-share
    .hr
    comment-list.bg-white(:type='20', :id='answer.id', v-ref:comments)
    .hr
    general-suggestion
</template>
<script>
import CommentList from 'component/CommentList.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import shareable from 'shareable'
export default {
    name: 'answer-view',

    mixins: [shareable],

    components: {
        CommentList,
        GeneralSuggestion
    },

    data() {
        return {
            answer: {}
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`sns/results/${to.params.id}`)
                    .then(answer => {
                        this.answer = answer
                        this.setShareData({title: answer.jianbao.description, master: answer.identifier.nickname, icon: answer.jianbao.pictures[0]})
                    })
        }
    }
}
</script>
