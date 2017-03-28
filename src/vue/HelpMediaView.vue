<style lang="stylus">
.help-media-view
    // line-height: 0
    img
        width: 100%
</style>
<template lang="pug">
.help-media-view(:class="{'bg-light': bg}")
    img(:src="help.medias[$route.params.type].media | qn")
</template>
<script>
import help from '../help'
import shareable from 'shareable'
export default {
    name: 'help-media-view',

    mixins: [shareable],

    data() {
        return {
            help: help
        }
    },

    ready() {
        this.setShareData({title: help.medias[this.$route.params.type].title})
        this.action('updateTitle', { text: help.medias[this.$route.params.type].title })
    },

    computed: {
        // 需要显示背景色的场景
        bg() {
            return _.includes(['guarantee', 'purchase'], this.$route.params.type)
        }
    }
}
</script>