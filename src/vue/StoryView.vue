<style lang="stylus">
.story-view
    padding-bottom: 100px
    .story-header
        padding: 32px 32px
    .user
        display: -webkit-box
        -webkit-box-align: center
        .name
            margin-left: 20px
    .cover
        width: 686px
        height: 686px
        margin: 0 32px 5px
        &.cover-video
            width: 100%
            height: 0
            padding-bottom: 100%
            margin: 0 auto
            background-size: contain

    .tag-activity
        position: relative
        margin: 0 0 24px 32px
        height: 68px
        .item
            position: absolute
            padding: .5em .8em
            border-radius: 26px
            background-color: #ffecea
            .icon-activity
                transform: scale(1.2)

    .description
        margin: 0 40px 40px 32px
    .medias
        font-size: 0
        padding: 0 28px 28px
        &.padding-bottom
            padding-bottom: 28px
        .media
            display: inline-block
            border: 5px solid white
            background-size: cover
        .media:first-child:nth-last-child(1)
            width: 100%
            padding-top: 100%
        .media:first-child:nth-last-child(2),
        .media:first-child:nth-last-child(2) ~ .media,
        .media:first-child:nth-last-child(4),
        .media:first-child:nth-last-child(4) ~ .media
            width: 50%
            padding-top: 50%
        .media:first-child:nth-last-child(3),
        .media:first-child:nth-last-child(3) ~ .media,
        .media:first-child:nth-last-child(5),
        .media:first-child:nth-last-child(5) ~ .media,
        .media:first-child:nth-last-child(6),
        .media:first-child:nth-last-child(6) ~ .media
            width: 33.3333%
            padding-top: 33.3333%

        .media:first-child:nth-last-child(5),
        .media:first-child:nth-last-child(5) ~ .media
            &:first-child, &:nth-child(2)
                width: 50%
                padding-top: 50%

    .footer
        height: 100px
        width: 100%
        > div
            line-height: 60px
            -webkit-box-flex: 1
            text-align: center
        .icon-comment-solid
            transform: scale(1.5)

    .placeholder
        height: 100px
</style>
<template lang="jade">
.story-view.bg-white(v-if='!$loadingRouteData')
    .cover.video.cover-video(v-if="type === 'video'", @click.stop='play(cover)', v-bg='cover', query='vframe/jpg/offset/0/rotate/auto|imageView2/1/w/600/h/600/interlace/1')
    .story-header.flex
        .user.flex-1
            avatar(:user='story.user')
            .name
                p.fz-30 {{story.user.name}}
                .mgt-12.fz-22.light
                    span {{story.create_at | moment}}
                    span.pdh-10 |
                    span {{story.click}}人浏览
        follow(:user='story.user.id', :follow='story.user.is_followed', :has-border='true')
    .description.fz-30.user-txt {{story.content}}
    template(v-if="type === 'picture'")
        .cover.img(v-bg='cover', @click='coverflow(this.pictures, 0)')
        .medias(:class="{'padding-bottom': story.tags.length === 0 && story.topic_type.code !== 'hd'}")
            .media(v-for='pic in pictures', v-bg='pic', v-if='$index', @click='coverflow(this.pictures, $index)')
    template(v-if="story.topic_type.code === 'hd'")
        .tag-activity.red.fz-26(v-link="{name: 'activity', params: {id: story.activity.id}}")
            .item
                span.icon-activity
                span {{story.activity.name}}
    template(v-else='')
        div(v-if='story.tags.length')
            .hr-20
            tags(:tags='story.tags')
    .footer.flex.fz-30.gray.bdt.bg-white
        like(:active='story.liked', :count='story.like')
        .comment.bdl(@click='$refs.comment.comment()')
            i.icon-comment-solid
            span 写评论
        share.bdl
    .hr
    comments(:type='30', :id='story.post_id', :display-input='false', v-ref:comment='')
    product-recommend(:id='story.post_id')
    recommend(:data='items', name='相关推荐')
</template>
<script>
import paging from 'paging'
import Comments from './component/Comments.vue'
import Tags from './component/Tags.vue'
import Recommend from './component/Recommend.vue'
import ProductRecommend from './component/ProductRecommend.vue'
import Like from './component/Like.vue'
import Follow from './component/Follow.vue'
import Share from './component/Share.vue'
import shareable from 'shareable'
export default {
    name: 'StoryView',
    mixins: [shareable, paging],
    components: {
        Comments,
        Tags,
        Recommend,
        ProductRecommend,
        Like,
        Follow,
        Share
    },
    data() {
        return {
            story: {
                medias: []
            }
        }
    },
    ready() {
        this.$on('restore', () => {
            this.setShareData(this.story, true)
        })
    },
    computed: {
        pictures() {
            return _.chain(this.story.medias)
                        .filter(media => media.type === 'picture')
                        .map(media => media.id)
                        .value()
        },
        isSelf() {
            if (this.self) {
                return this.self.id === this.story.user.id
            } else {
                return false
            }
        },
        paging() {
            return {
                path: 'dc/rd/list',
                params: {
                    obj_id: this.story.post_id,
                    biz_type: 'tp'
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`sns/topics/${to.params.id}`)
                .then(story => {
                    this.setShareData(story, true)
                    this.followed = story.user.is_followed
                    this.story = story

                    const video = _.find(story.medias, {type: 'video'})
                    _.merge(this, video ? {type: 'video', cover: video.id} : {type: 'picture', cover: story.medias[0].id})
                })
        }
    }
}
</script>
