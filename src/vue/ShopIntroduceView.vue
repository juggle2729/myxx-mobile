<style lang="stylus">
.shop-introduce-view
    img
        max-width: 100%
    .video
        padding-top: 100%
</style>
<template  lang="pug">
    .shop-introduce-view.pdh-32.pdb-32
        div.mgt-28(v-for="item in info")
            img(v-if="item.media_type==='picture'", :src="config.img + item.media", @click="coverflow(medias, item.flag)")
            .video(v-if="item.media_type === 'video'", v-bg='item.media', @click='play(item.media)', query='vframe/jpg/offset/7/rotate/auto|imageView2/2/w/750')
            p.fz-30.dark.user-txt(v-if="item.media_type === 'text'") {{{item.media | input}}}
</template>
<script>
export default {
    name: 'shop-introduce',

    data() {
        return {
            info: []
        }
    },

    route: {
        data({to}) {
            return this.$fetch(`mall/shop/${this.$route.params.id}/gallery`).then((info) => {
                this.info = info.medias
                this.medias = []
                var flag = -1
                _.forEach(this.info, (item, index) => {
                    if(item.media_type === 'picture') {
                        this.medias.push(item.media)
                        item.flag = (flag += 1)
                    }
                })
            })
        }
    }
}
</script>
