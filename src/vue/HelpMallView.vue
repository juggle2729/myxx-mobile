<style lang="stylus">
.mall-help-view
    .icon-enter
        height: 22px
        width: 22px
        transform translateY(-3px)
</style>
<template lang="pug">
.mall-help-view.bg.pdv
    .bg-white.mgb.bdb.bdt(v-for="pro in pros")
        .line-height-98.fz-30.bold.mgl-32.pdr-32 {{pro.title}}
        .line-height-90.flex.fz-26.bdt.mgl-32.pdr-32(v-for='item in pro.items', v-link="{path: '/help/desc/' + pro.type + '#' + item.id, params: {type: pro.type}}")
            .flex-1 {{item.title}}
            icon.gray(name="enter")
</template>
<script>
import help from '../help'
export default {
    name: 'HelpView',

    data() {
        return {
            help: help,
            pros: []
        }
    },

    ready() {
        _.forIn(help.desc, (value, key) => {
            if(/^mall_/.test(key)) {
                this.pros.push(value)
            }
        })
    }
}
</script>
