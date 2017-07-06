<style lang="stylus">
.figure-view
    padding-bottom 12px
    .title
        padding 60px 32px 20px
        line-height 1.5
    img.cover
        width 100%
    .media
        padding 32px 32px 0
        p
            font-size 30px
            color #666666
            line-height 1.7
        img
            width 100%
            max-width 100%
        .video
            width 100%
            padding-top percentage(9/16)
            // background-size cover
    .us-tile
        margin 32px 32px 20px
    .sh-tile
        margin 0 32px 20px
</style>
<template lang="pug">
.figure-view
    img.cover(v-if="cover", :src="config.img + cover + '_750'")
    .title.fz-40.bold {{title}}
    .media(v-for="m in medias")
        img(v-if="m.media_type === 'picture'", :src="config.img + m.media + '_750'")
        .video.bg(v-if="m.media_type === 'video'", v-bg.video='m.media', @click.stop="play(m.media)")
        p(v-if="m.media_type === 'text'") {{m.media}}
    us(v-if="profile", :entry="profile")
    sh(v-if="shop", :entry="shop")
</template>
<script>
import sh from 'component/tile/sh.vue'
import us from 'component/tile/us.vue'
export default {
    name: 'figure-view',

    components: {
        us,
        sh
    },

    data() {
        return {
            title: '',
            cover: '',
            medias: [],
            profile: undefined,
            shop:undefined
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`sites/${to.params.userId}/articles/${to.params.articleId}`).then(article => {
                    this.title = article.title
                    this.cover = article.image
                    this.medias = article.medias
                    return this.$fetch(`users/${to.params.userId}/profile`)
                }).then(profile => {
                    this.profile = profile
                    if(profile.shop_id) {
                        return this.$fetch(`mall/shop/${profile.shop_id}/profile`)
                    } else {
                        return false
                    }
                }).then(shop => {
                    this.shop = shop
                })
        }
    }
}
</script>

