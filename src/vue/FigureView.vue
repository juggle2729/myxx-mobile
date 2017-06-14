<style lang="stylus">
.figure-view
    .article
        color #666666
        line-height 1.7
        img
            width 100%
            &:first-child
                padding 0
        video
            width 100%
        & *
            padding 0 32px
            line-height inherit
    .us-tile
        margin 32px 32px 20px
    .sh-tile
        margin 0 32px 60px
</style>
<template lang="pug">
.figure-view
    .article.fz-30 {{{article}}}
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
            article: '',
            profile: undefined,
            shop:undefined
        }
    },

    route: {
        data({to}) {
            this.$fetch(`users/${to.params.userId}/profile`).then(x => console.log(x))
            return this.$fetch(`sites/${to.params.userId}/articles/${to.params.articleId}`).then(article => {
                    this.article = article.text
                    return this.$fetch(`users/${to.params.userId}/profile`)
                    // this.setShareData({title: this.post.title, icon: this.medias[0]})
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

