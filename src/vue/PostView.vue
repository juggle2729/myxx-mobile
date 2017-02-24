<style lang="stylus">
.post-view
    > header
        padding: 32px 32px 40px
        img
            display: block
            width: 30px
            height: 30px
    main
        padding: 0 32px 40px
        > img
            max-width: 100%
            margin-top: 32px
        .video
            padding-top: 100%
        .jade
            .img
                height: 200px
                width: 200px
            .content
                height: 200px
                position: relative
                & > div:nth-child(2)
                    position: absolute
                    width: 100%
                    bottom: 28px
                    .btn
                        height: 32px
                        line-height: 32px
                        border-radius: 20px
                        position: absolute
                        bottom: 0
                        right: 0
                .icon-enter
                    font-size: 20px
                    vertical-align: -1px

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
            .flex
                .fz-30 {{post.user.nickname}}
                img.mgl-8(v-if="post.user.vip_flag", :src="'profile/'+post.user.role+'.png' | qn")
            .mgt-12.fz-22.light {{post.create_at | moment}} &nbsp;&#124;&nbsp; {{post.click_count}}人浏览
        icon-follow(:target='post.user.id', :follow='post.user.is_followed', :has-border='true')
    main
        .fz-34.bold.user-txt {{{post.title | content | input}}}
        .fz-30.dark.pdt-32.user-txt {{{post.description | content | input}}}
        template(v-for="item in post.medias")
            img(v-if="item.media_type==='picture'", :src="config.img + item.media", @click="coverflow(medias, item.flag)")
            .video(v-if="item.media_type === 'video'", v-bg='item.media', @click='play(item.media)', query='vframe/jpg/offset/7/rotate/auto|imageView2/2/w/750')
            .jade.flex.mgt-32.bd(v-if="item.media_type==='pd'")
                .img(v-bg="item.media.cover")
                .fz-30.mgh.flex-1.pdv-28.content
                    .line-clamp-2.bold.user-txt {{item.media.title}}
                    .flex
                        .flex-1.red {{item.media.price | price}}
                        .btn.fz-26.gray(v-link="{name: 'jade', params: {id: item.media.id}}") 商品详情
                            icon.mgl-12(name="enter")
            p.fz-30.dark.mgt-32.user-txt(v-if="item.media_type === 'text'") {{{item.media | input}}}
        template(v-if="post.user.shop")
            shop(:shop="post.user.shop")
    .hr
    comment-list(type='rt', :id='post.post_id', :total="post.comment_count")
    .hr
    general-suggestion(:categories="post.categories")
</template>
<script>
import Shop from 'component/Shop.vue'
import CommentList from 'component/CommentList.vue'
import GeneralSuggestion from 'component/GeneralSuggestion.vue'
import shareable from 'shareable'
export default {
    name: 'post-view',
    mixins: [shareable],
    components: {
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
