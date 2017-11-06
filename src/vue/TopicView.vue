<style lang="stylus">
.topic-view
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
<template  lang="pug">
.topic-view.bg-white(v-if='!$loadingRouteData')
    .pd-32
        .cover.video(v-if="cover.media_type=== 'video'", @click.stop='play(cover.media)', v-bg='cover.media', query='vframe/jpg/offset/5/rotate/auto|imageView2/1/w/600/h/600/interlace/1')
        .flex.mgt-32
            avatar(:user='topic.user')
            .name.mgl
                .flex
                    .fz-30 {{topic.user.name}}
                    img.mgl-8(v-if="topic.user.vip_flag", :src="'profile/' + topic.user.role + '.png' | qn")
                .mgt-12.fz-22.light {{topic.create_at | moment}} &nbsp;|&nbsp; {{topic.click}}人浏览
        .fz-30.mgt-32.user-txt {{{topic.content | content | input}}}

        .pictures.pdt-28(v-if="cover.media_type==='picture'")
            img.mgb-10(v-for='pic in pictures', :src="config.img+pic", @click='coverflow(this.pictures, $index)')

        .tag-activity.red.fz-26.mgr-32(v-if="topic.activity", v-link="{name: 'activity', params: {id: topic.activity.id}}")
            icon(name="fire")
            span {{topic.activity.name}}
        template(v-if="topic.user.shop")
            shop(:shop="topic.user.shop", :type="'community'")
    .hr

    comment-list(type='tp', :id='topic.post_id', :total="topic.comment_count")
    .hr
    general-suggestion
</template>
<script>
import CommentList from 'component/CommentList.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import Shop from 'component/Shop.vue'
import shareable from 'shareable'
export default {
    name: 'topic-view',

    mixins: [shareable],

    components: {
        Shop,
        CommentList,
        GeneralSuggestion
    },

    data() {
        return {
            topic: {
                user: {},
                medias: []
            }
        }
    },

    computed: {
        cover() {
            return this.topic.medias[0] || {}
        },

        pictures() {
            return _.chain(this.topic.medias)
                    .filter(item => item.media_type === 'picture')
                    .map(item => item.media)
                    .value()
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`sns/topics/${to.params.id}`)
                .then(topic => {
                    this.setShareData(topic)
                    this.topic = topic
                })
        }
    }
}
</script>
