<style lang="stylus">
.post-view
    > header
        padding: 32px 32px
    main
        padding: 40px 32px
        img
            max-width: 100%

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

    .footer
        height: 100px
        width: 100%
        > div
            line-height: 60px
            -webkit-box-flex: 1
            text-align: center
        .icon-comment-solid
            transform: scale(1.5)
    .comments-preview
        header
            line-height: 80px
        .comment-list .list.empty
            display: none
        .no-comment
            line-height: 140px
        .more
            padding: 6px 0 32px
            &::after
                content: '\e934'
                font-family: 'icomoon'
                display: inline-block
                transform: translate3d(10px, 2px, 0)
</style>
<template lang="jade">
.post-view.bg-white(v-if='!$loadingRouteData')
    header.flex
        avatar(:user='post.user')
        .flex-1.mgl
            .fz-30 {{post.user.nickname}}
            .mgt-12.fz-22.light {{post.create_at | moment}} &nbsp;&#124;&nbsp; {{post.click_count}}人浏览
        follow(:user='post.user.id', :follow='post.user.is_followed', :has-border='true')
    main
        .fz-34.bold {{post.title}}
        .fz-30.light.pdv-32.user-txt {{post.description}}
        template(v-for="item in post.medias")
            img(v-if="item.media_type==='picture'", :src="config.img + item.media")
            p.fz-30.light.pdv-32(v-else) {{item.media}}

    .footer.flex.fz-30.light.bdt.bg-white
        like(:active='post.liked', :count='post.like')
        .comment.bdl(@click='$refs.comment.comment()')
            i.icon-comment-solid
            span {{comment_count || '写评论'}}
        share.bdl
    div(v-if='post.tags.length')
        .hr
        tags(:tags='post.tags')
    .hr
    .comments-preview
        header.bdb.fz-26.pdl-32.gray 评论&nbsp;&nbsp;{{post.comment_count}}
        .no-comment.fz-26.light.center(v-if="post.comment_count == 0") 还没有人评论
        comment-list(:type='100', :id='post.post_id', v-ref:comments)
        .fz-26.red.center.more(v-if="post.comment > 5", v-link="{name: 'comments', params: {id: post.post_id, type: 100}}") 查看全部评论
    product-suggestion(:id='post.post_id')
    general-suggestion
</template>
<script>
import Tags from 'component/Tags.vue'
import CommentList from 'component/CommentList.vue'
import ProductSuggestion from 'component/ProductSuggestion.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import Like from 'component/Like.vue'
import Follow from 'component/Follow.vue'
import Share from 'component/Share.vue'
import shareable from 'shareable'
export default {
    name: 'post-view',
    mixins: [shareable],
    components: {
        Like,
        Follow,
        Share,
        Tags,
        CommentList,
        ProductSuggestion,
        GeneralSuggestion,
    },

    route: {
        data({to}) {
            return this.$fetch(`sns/rich_texts/${to.params.id}`)
                .then(resp => {
                    this.post = resp
                })
        }
    }
}
</script>
