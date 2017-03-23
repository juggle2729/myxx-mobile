<style lang="stylus">
.help-media-view
    // line-height: 0
    img
        width: 100%
</style>
<template lang="pug">
.help-media-view(:class="{'bg-light': bg}")
    img(:src="help.medias[$route.params.type].media | qn")

    //- template(v-if="$route.params.type === 'instruction'")
    //-     img(v-if="$index>0", v-for="item in 7", :src="'shop/instruction/'+item+'.png' | qn")
</template>
<script>
import help from '../help'
export default {
    name: 'help-media-view',

    data() {
        return {
            help: help
        }
    },

    ready() {
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