<style lang="stylus">
.story-view
    .cover.video
        padding-bottom: 100%
    .pictures
        font-size: 0
        .pic
            display: inline-block
            border: 5px solid white
        .pic:first-child,
        .pic:first-child:nth-last-child(2) + .pic
        .pic:first-child:nth-last-child(4) + .pic
            width: 100%
            padding-top: @width
        .pic:nth-child(n + 2)
            width: 50%
            padding-top: @width
        .pic:first-child:nth-last-child(6) ~ .pic:nth-child(n + 4)
            width: percentage(1/3)
            padding-top: @width
    .tag-activity
        display: inline-block
        margin: 0 0 32px 32px
        padding: 10px 20px
        border-radius: 26px
        background-color: #ffecea
    .footer
        height: 100px
        width: 100%
        > div
            line-height: 60px
            -webkit-box-flex: 1
            text-align: center
</style>
<template lang="jade">
.story-view.bg-white(v-if='!$loadingRouteData')
    .cover.video(v-if="cover.media_type=== 'video'", @click.stop='play(cover.media)', v-bg='cover.media', query='vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/600/interlace/1')
    .flex.pd-32
        .flex.flex-1
            avatar(:user='story.user')
            .name.mgl
                p.fz-30 {{story.user.name}}
                .mgt-12.fz-22.light {{story.create_at | moment}} &nbsp;|&nbsp; {{story.click}}人浏览
        icon-follow(:user='story.user.id', :follow='story.user.is_followed', :has-border='true')
    .fz-30.mgh-32.user-txt {{story.content}}

    .pictures.pd-28(v-if="cover.media_type==='picture'")
        .pic(v-for='pic in pictures', v-bg='pic', @click='coverflow(this.pictures, $index)')

    .tag-activity.red.fz-26(v-if="story.activity", v-link="{name: 'activity', params: {id: story.activity.id}}")
        icon(name="fire")
        span {{story.activity.name}}

    .footer.flex.fz-30.light.bdt.bg-white
        icon-like(:active='story.liked', :count='story.like')
        icon-comment.bdl(:count="story.comment", @click='$refs.comments.addComment()')
        icon-share.bdl

    div(v-if='story.tags.length')
        .hr
        tags(:tags='story.tags')

    .hr
    comment-list(:type='30', :id='story.post_id', v-ref:comments)
    product-suggestion(:id='story.post_id')
    general-suggestion
</template>
<script>
import CommentList from 'component/CommentList.vue'
import Tags from 'component/Tags.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import ProductSuggestion from 'component/ProductSuggestion.vue'
import shareable from 'shareable'
export default {
    name: 'StoryView',
    mixins: [shareable],
    components: {
        Tags,
        CommentList,
        GeneralSuggestion,
        ProductSuggestion
    },

    data() {
        return {
            story: {
                medias: []
            }
        }
    },

    computed: {
        cover() {
            return this.story.medias[0] || {}
        },

        pictures() {
            return _.chain(this.story.medias)
                        .filter(item => item.media_type === 'picture')
                        .map(item => item.media)
                        .value()
        },

        isSelf() {
            return _.get(this, 'self.id') === this.story.user.id
        }
    },
    route: {
        data({to}) {
            return this.$fetch(`sns/topics/${to.params.id}`)
                .then(story => {
                    this.setShareData(story)
                    this.story = story
                })
        }
    }
}
</script>
