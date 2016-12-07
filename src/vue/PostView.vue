<style lang="stylus">
.post-view
    > header
        padding: 32px 32px 40px
    main
        padding: 0 32px 40px
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
        icon-follow(:target='post.user.id', :follow='post.user.is_followed', :has-border='true')
    main
        .fz-34.bold.user-txt {{{post.title | input}}}
        .fz-30.dark.pdv-32.user-txt {{{post.description | input}}}
        template(v-for="item in post.medias")
            img(v-if="item.media_type==='picture'", :src="config.img + item.media", @click="coverflow(medias, item.flag)")
            .video(v-if="item.media_type === 'video'", v-bg='item.media', @click='play(item.media)', query='vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750')
            p.fz-30.dark.pdv-32.user-txt(v-if="item.media_type === 'text'") {{{item.media | input}}}
    template(v-if="post.user.shop")
        shop(:shop="post.user.shop")
    .hr
    comment-list(type='rt', :id='post.post_id', :uid="post.user.id", v-ref:comments)
    .hr
    template(v-if='post.categories.length')
        topics(:topics='post.categories')
    general-suggestion
</template>
<script>
import Topics from 'component/Topics.vue'
import Shop from 'component/Shop.vue'
import CommentList from 'component/CommentList.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import shareable from 'shareable'
export default {
    name: 'post-view',
    mixins: [shareable],
    components: {
        Topics,
        Shop,
        CommentList,
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
                    this.setShareData({title: this.post.title, icon: this.medias[0]})
                })
        }
    }
}
</script>
