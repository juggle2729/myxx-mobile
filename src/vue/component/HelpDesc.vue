<style lang="stylus">
.help-desc-component
    .dot
        height: 10px
        width: 10px
        display: block
    a
        display: block
    .content
        padding: 0 32px 0 54px
</style>
<template lang="pug">
.help-desc-component.bg-white.pdb-36
    .mgt-36(v-for="item in help.desc[type].items")
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            a.fz-30.bold.user-txt(:id="item.id") {{item.title}}
        .content.fz-26.gray.user-txt {{{item.content | input}}}
</template>
<script>
import help from '../../help'
export default {
    name: 'help-desc-component',

    props: {
        type: String,
        title: Boolean
    },

    ready() {
        this.title && this.action('updateTitle', { text: this.help.desc[this.type].title })
    },

    data() {
        return {
            help: help
        }
    }
}
</script>