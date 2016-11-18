<style lang="stylus">
    .collection-view
        .upside
            position: relative
            z-index: 1
            .blur
                position:absolute;
                height: 282px
                width:100%;
                z-index: -1
                overflow: hidden
                filter: blur(40px)
                background-size: cover
                background-position: center
            .blur-fix
                position: absolute
                width: 100%
                z-index: 1
                padding-top: 282px
                background-color: rgba(0, 0, 0, 0.3)
                border-bottom: 100px solid white
                & + div
                    position: relative
                    z-index: 999
            .logo
                height: 200px
                width: 200px
            .icon-enter
                width: .5em
            .transparent
                color: rgba(255,255,255,0.7)
        .info
            height: 100px
            position: relative
            z-index: 999
            padding-top: 10px
            .follow
                height: 56px
                line-height: 56px
</style>
<template lang="jade">
.collection-view.bg
    .upside(v-if="!self")
        .blur.bd(:style="{backgroundImage: 'url(' + config.img + cc.cover + ')'}")
        .blur-fix
        .pdh-32.flex.pdv-40.white
            .logo(v-bg="cc.cover")
            .mgl-28.flex-1
                .fz-34.mgb-36.bold.line-clamp-2.mgr-32 {{cc.name}}
                .flex.fz-30.transparent
                    avatar(:user="cc.author")
                    .mgl {{cc.author.nickname}}
                    icon.mgl-16(name="enter")
    .upside(v-if="self")
        img.blur.bd(:src="'user/collection.jpg' | qn")
        //- .blur-fix
        .pdh-32.flex.pdv-40.white
            img.logo(:src="'user/collection.jpg' | qn")
            .mgl-28.flex-1
                .fz-34.mgb-36.bold.line-clamp-2.mgr-32 {{profile.nickname}}赞过的内容
                .flex.fz-30.transparent
                    avatar(:user="profile")
                    .mgl {{profile.nickname}}
                    icon.mgl-16(name="enter")
    .info.flex.pdh-32.fz-26(v-if="!self")
        .gray.pdr.bdr 内容 {{cc.content_count}}
        .gray.pdl.flex-1 关注 {{cc.followed_count}}
        .pdl-32.bdl.red.follow(@click="gotoDownload")
            icon(name="plus")
            span 关注专辑
    .hr
    template(v-for="item in items")
        component(:is="config.category[item.type]", keep-alive, :item="item")
        .hr
    empty(v-if="items.isEmpty")
</template>
<script>
import paging from 'paging'
import shareable from 'shareable'
import story from 'component/item/Story.vue'
import post from 'component/item/Post.vue'
import question from 'component/item/Question.vue'
import answer from 'component/item/Answer.vue'
export default {
    name: 'CollectionView',
    mixins: [paging, shareable],
    components: {
        story,
        post,
        question,
        answer
    },
    data() {
        return {
            profile: {},
            cc: {
                author: {}
            }
        }
    },
    computed: {
        self() {
            return this.$route.params.uid
        },
        paging() {
            return {
                path: this.self ? `users/${this.$route.params.uid}/like_list` : `sns/collections/${this.$route.params.id}/contents`,
                list: 'entries'
            }
        }
    },
    route: {
        data({to}) {
            const path = this.self ? `users/${to.params.uid}/profile` : `sns/collections/${to.params.id}`
            return this.$fetch(path).then((data) => {
                this.self ? (this.profile = data) : (this.cc = data)
                this.setShareData({
                    title: data.name,
                    icon: data.cover
                })
            })
        }
    }
}
</script>