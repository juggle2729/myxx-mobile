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

    .footer
        height: 100px
        width: 100%
        > div
            line-height: 60px
            -webkit-box-flex: 1
            text-align: center
</style>
<template lang="pug">
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
            img(v-if="item.media_type==='picture'", :src="config.img + item.media", @click="coverflow(medias, $index/2)")
            p.fz-30.light.pdv-32(v-else) {{item.media}}
    .footer.flex.fz-30.light.bdt.bg-white
        like(:active='post.liked', :count='post.like')
        .comment.bdl(@click='$refs.comment.comment()')
            i.icon-comment
            span {{comment_count || '写评论'}}
        share.bdl
    div(v-if='post.tags.length')
        .hr
        tags(:tags='post.tags')
    .hr
    comment-list(:type='100', :id='post.post_id', v-ref:comments)
    product-suggestion(:id='post.post_id')
    general-suggestion
</template>
<script>
import Tags from 'component/Tags.vue'
import CommentList from 'component/CommentList.vue'
import ProductSuggestion from 'component/ProductSuggestion.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import shareable from 'shareable'
export default {
    name: 'post-view',
    mixins: [shareable],
    components: {
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
                    this.medias = []
                    _.forEach(this.post.medias, (item) => {
                        (item.media_type === 'picture') && this.medias.push(item.media)
                    })
                })
        }
    }
}
</script>
