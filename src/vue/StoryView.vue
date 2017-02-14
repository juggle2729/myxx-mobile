<style lang="stylus">
.story-view
    .cover.video
        padding-bottom: 100%
    .name img
        display: block
        height: 30px
        width: 30px
    .pictures img
        width: 100%
    .tag-activity
        display: inline-block
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
    .topics-component
        padding-top: 24px
</style>
<template lang="jade">
.story-view.bg-white(v-if='!$loadingRouteData')
    .pd-32
        .cover.video(v-if="cover.media_type=== 'video'", @click.stop='play(cover.media)', v-bg='cover.media', query='vframe/jpg/offset/7/rotate/auto|imageView2/1/w/600/h/600/interlace/1')
        .flex.mgt-32
            avatar(:user='story.user')
            .name.mgl
                .flex
                    .fz-30 {{story.user.name}}
                    img.mgl-8(v-if="story.user.vip_flag", :src="'profile/' + story.user.role + '.png' | qn")
                .mgt-12.fz-22.light {{story.create_at | moment}} &nbsp;|&nbsp; {{story.click}}人浏览
        .fz-30.mgt-32.user-txt {{{story.content | content | input}}}

        .pictures.pdt-28(v-if="cover.media_type==='picture'")
            img.mgb-10(v-for='pic in pictures', :src="config.img+pic", @click='coverflow(this.pictures, $index)')

        .tag-activity.red.fz-26.mgr-32(v-if="story.activity", v-link="{name: 'activity', params: {id: story.activity.id}}")
            icon(name="fire")
            span {{story.activity.name}}
        template(v-if="story.user.shop")
            shop(:shop="story.user.shop")
    .hr

    comment-list(type='tp', :id='story.post_id', :total="story.comment_count")
    .hr
    topics(v-if='story.categories', :topics='story.categories')
    general-suggestion
</template>
<script>
import CommentList from 'component/CommentList.vue'
import Topics from 'component/Topics.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import ProductSuggestion from 'component/ProductSuggestion.vue'
import Shop from 'component/Shop.vue'
import shareable from 'shareable'
export default {
    name: 'StoryView',
    mixins: [shareable],
    components: {
        Topics,
        Shop,
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
