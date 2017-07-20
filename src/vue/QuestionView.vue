<style lang="stylus">
@import '~style/partials/mixin'
.question-view
    min-height: 100%
    header
        padding: 32px 32px 0 32px
    .user img
        display: block
        height: 30px
        width: 30px
    .pictures
        padding-bottom 30px
    .append-info
        background-color #fafafa
        .title
            height 84px
            line-height 84px
            padding 0 28px 0 32px
    .pictures, .append-list
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
            .comment-icon
                margin-left: 12px
                -webkit-box-flex: 1
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
    .tags
        font-size 0
        margin-top 16px
    .tag
        border(a, #d9d9d9)
        line-height 26px
        color #474747
        margin 6px 6px 0 0
        padding 0 14px
    .duration
        width 52px
        font-size 14px
        right 4px
        bottom 6px
        line-height 18px
        border-radius 9px
        background rgba(0, 0, 0, 0.3)
    .video::before
        background-size 75px
    .icon-enter
        width 14px
        height 24px
        margin-left 10px
        position absolute
        top 50%
        right 28px
        transform translateY(-50%)
</style>
<template  lang="pug">
.question-view.bg(v-if="!$loadingRouteData")
    header.bg-white
        .user.flex
            avatar(:user="question.user")
            .mgl.flex-1
                .flex
                    .fz-30 {{question.user.name}}
                    img.mgl-8(v-if="question.user.vip_flag", :src="'profile/'+question.user.role+'.png' | qn")
                .mgt-14.fz-22.light {{question.click_count}}人浏览
            deep-link.has-icon.red.fz-26.bdl.pdl-32.pdv-12
                icon(name="plus")
                span.red 关注问题
        .title.fz-34.bold.pdv-24.user-txt {{{question.description | content | input}}}
        .fz-30.gray.pdb-26.user-txt(v-if="question.remark") {{{question.remark | content | input}}}
    .pictures.pdh-32.bg-white.scrollable(v-if="question.pictures.length || question.video")
        .video.pic(v-if="question.video", v-bg.video='question.video', @click.stop="play(question.video)")
        .pic(v-for="pic in question.pictures", v-bg.sm="pic", @click="coverflow(question.pictures, $index)")
    .append-info.pdb-32(v-if="appendList.length")
        .flex.title.relative(v-link="{name: 'question-append', params: {id: question.post_id}}")
            .fz-28.gray 图片视频补充
            .flex-1
            .fz-28.gray.mgr-24 补充记录
            icon.gray(name="enter")
        .append-list.pdh-32.scrollable
            template(v-for="item in appendList")
                .video.pic(v-if="item.type === 'video'", v-bg.video='item.key', @click.stop="play(item.key)")
                .pic(v-if="item.type === 'pic'", v-bg.sm="item.key", @click="coverflowAppendInfo($index)")
    .bg-white.mgb-36
        deep-link 打开美玉秀秀，发表你的观点

    .results.bg-white
        .num.fz-26.gray.bg-white.mgl-32.bdb 视频回答&nbsp;{{question.results > 0 ? question.results.length : ''}}
        template(v-if="question.results.length")
            .result.bg-white(v-for="result in question.results", v-link="{name: 'answer', params: {id: result.id}, query: { qid: $route.params.id }}")
                .pdv-28.pdl-32.pdr.flex
                    .identify.relative.bg(v-bg="result.identifier.portrait")
                        .duration.absolute.white.center {{result.video_duration | duration}}
                    .identifier.mgl.flex-1
                        .fz-30.bold.line-clamp-1 {{result.identifier.nickname}} 的回答
                        .tags(v-if="result.jd_tags.length")
                            span.tag.inline-block.fz-18(v-for="tag in result.jd_tags", track-by="$index") {{tag}}
                    .play.center(@click.stop="play(result.video)")
                        img(:src="'question/play.png' | qn")
                        .fz-22.mgt 播放视频
                footer.flex.fz-26.bdt.pdh-32
                    icon-like(:active='result.liked', :count='result.like_count', :recognition="true")
                    icon-comment(:count="result.comment_count", :id="result.id", type="jd")
                    .light {{result.video_play_count}}次播放
                .hr
        .center.fz-26.pdt-48.pdb-32.light.no-answer(v-if="!question.results.length")
            img(:src="'question/no-answer.png' | qn")
            .mgt-32 暂无视频回答
        .hr(v-if="!question.results.length")

    comment-list(type='jb', :id='question.post_id', :total="question.comment_count")
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
import CommentList from 'component/CommentList.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
export default {
    name: 'question-view',

    mixins: [shareable],

    components: {
        CommentList,
        GeneralSuggestion
    },

    data() {
        return {
            question: {}
        }
    },

    computed: {
        appendList() {
            return this.question.append_info.reduce((res, item) => {
                if(item.video) {
                    res.push({type: 'video', key: item.video})
                }
                if(item.pictures.length) {
                    item.pictures.forEach(pic => res.push({type: 'pic', key: pic}))
                }
                return res
            }, [])
        }
    },

    methods: {
        // 此处预览只针对图片，所以需要过滤掉视频
        coverflowAppendInfo(index) {
            const pictures = []
            let videoCnt = 0
            this.appendList.forEach((item, idx) => {
                if(item.type === 'video' && idx < index) {
                    videoCnt++
                } else if (item.type === 'pic') {
                    pictures.push(item.key)
                }
            })
            this.coverflow(pictures, index - videoCnt)
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
