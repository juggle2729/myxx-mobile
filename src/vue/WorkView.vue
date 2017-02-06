<style lang="stylus">
.work-view
    .user
        height: 160px
        line-height: 160px
        padding: 0 36px 0 50px
    .line
        &:before, &:after
            content: ''
            background-color: #d9d9d9
            height: 1px
            width: 122px
            display: block
            flex: 1
        &:before
            margin: 0 26px 0 36px
        &:after
            margin: 0 36px 0 26px
    .cover
        width: 686px
        height: 686px
        margin: 36px 32px 5px
        &.cover-video
            width: 100%
            height: 0
            padding-bottom: 100%
            margin: 0 auto
            background-size: contain
    .medias
        font-size: 0
        padding: 0 28px
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
    .desc
        margin: 60px 42px
        .prize
            margin-top: 30px
            line-height: 40px
    .footer
        &.fixed
            position: fixed
            bottom: 0
            z-index: 990
        height: 100px
        width: 100%
        > div
            line-height: 60px
            -webkit-box-flex: 1
            text-align: center
</style>
<template lang="jade">
.work-view(v-if='!$loadingRouteData')
    .user.flex
        avatar(:user='work.user', :size='90')
        .fz-30.mgl.flex-1
            p {{work.user.nickname}}
            p.gray.mgt {{work.user.title}}
        icon-follow(:target='work.user.id', :follow='work.user.is_followed', :has-border='true')
    .line.fz-26.flex.mgt 作品展示
    .cover.img(v-bg='cover', @click='coverflow(work.pictures, 0)')
    .medias
        .media(v-for='pic in pictures', v-bg='pic', @click='coverflow(work.pictures, $index+1)')
    .desc
        .fz-36 {{work.title}}
        .fz-30.gray.prize {{work.prize}}
    .hr
    comment-list(type='wk', :id='work.id', :total="work.comment_count")
</template>
<script>
import CommentList from 'component/CommentList.vue'
import shareable from 'shareable'
export default {
    name: 'WorkView',
    mixins: [shareable],
    components: {
        CommentList
    },
    computed: {
        cover() {
            return this.work.pictures[0]
        }
    },
    data() {
        return {
            work: {
                user: {},
                pictures: []
            }
        }
    },
    route: {
        data({to}) {
            return this.$fetch(`sns/works/${to.params.id}`).then((work) => {
                this.work = work
                this.setShareData({name: this.work.user.nickname, title: this.work.title, logo: this.cover})
            })
        }
    }
}
</script>