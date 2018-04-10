<style lang="stylus">
.about-view
    padding-bottom 60px
    .imgs
        padding-top 120px
        > img
            width 216px
            height 244px
        .text
            p:nth-child(1)
                margin-top 56px
    .help
        margin-top 60px
        .icon-enter
            height 22px
            width 22px
</style>
<template  lang="pug">
.about-view.bg-light-gray
    .imgs.center
        img(:src="'profile/logo.png' | qn")
        p.fz-26.gray.mgt-28 V{{ version }}
    .help.bg-white.mgl-32.mgr-32
        .line-height-100.fz-30.bold.mgl-32.pdr-32.gray 帮助中心
        .line-height-100.flex.fz-26.bdt.mgl-32.pdr-32(v-link="{path: '/help/mall'}")
            .flex-1 商城交易常见问题
            icon.gray(name="enter")
        .line-height-100.flex.fz-26.bdt.mgl-32.pdr-32(v-for='item in problems', v-link="{path: '/help/desc/' + item.type, params: {type: item.type}}")
            .flex-1 {{ item.title }}
            icon.gray(name="enter")
        .line-height-100.flex.fz-26.bdt.mgl-32.pdr-32(v-for="explanation in explanations", v-link="{name: 'help-explanation',params: {type: explanation.type}}")
            .flex-1 {{ explanation.title }}
            icon.gray(name="enter")
    p.fz-30.center.mgt-40 客服电话：
        a.red(href="tel:4000587266") 400-0587-266
</template>
<script>
import help from '../help'
export default {
    name: 'about-view',

    data() {
        return {
            version: '1.0',
            problems: [],
            explanations: []
        }
    },

    ready() {
        this.action('version')
            .then(v => this.version = v)

        _.forIn(help.desc, (value, key) => {
            if(/^about_/.test(key)) {
                this.problems.push(value)
            }
        })

        _.forIn(help.medias, (value, key) => {
            if(/^about_/.test(key)) {
                this.explanations.push(value)
            }
        })
    }
}
</script>