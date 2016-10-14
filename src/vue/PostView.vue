<style lang="stylus">
.post-view
    > header
        padding: 32px 32px
    main
        padding: 40px 32px
        img
            max-width: 100%
        .video
            padding-top: 100%

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
<template lang="jade">
.post-view.bg-white(v-if='!$loadingRouteData')
    header.flex
        avatar(:user='post.user')
        .flex-1.mgl
            .fz-30 {{post.user.nickname}}
            .mgt-12.fz-22.light {{post.create_at | moment}} &nbsp;&#124;&nbsp; {{post.click_count}}人浏览
        icon-follow(:user='post.user.id', :follow='post.user.is_followed', :has-border='true')
    main
        .fz-34.bold {{post.title}}
        .fz-30.light.pdv-32.user-txt {{post.description}}
        template(v-for="item in post.medias")
            img(v-if="item.media_type==='picture'", :src="config.img + item.media", @click="coverflow(medias, item.flag)")
            .video(v-if="item.media_type === 'video'", v-bg='item.media', @click='play(item.media)', query='vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750')
            p.fz-30.light.pdv-32(v-if="item.media_type === 'text'") {{item.media}}
    .footer.flex.fz-30.light.bdt.bg-white
        icon-like(:active='post.liked', :count='post.like_count')
        .comment.bdl(@click='$refs.comment.comment()')
            icon-comment(:count="comment_count")
        icon-share.bdl
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
                    var flag = -1
                    _.forEach(this.post.medias, (item, index) => {
                        if(item.media_type === 'picture') {
                            this.medias.push(item.media)
                            item.flag = (flag += 1)
                        }
                    })
                    console.log(this.medias)
                })
        }
    }
}
</script>
