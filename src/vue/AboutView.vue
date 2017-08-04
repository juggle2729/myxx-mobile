<style lang="stylus">
.about-view
    .imgs
        padding-top 120px
        > img
            width 216px
            height 244px
        .text
            p:nth-child(1)
                margin-top 56px
            p:nth-child(3)
                margin-top 72px
    .help
        margin: 60px 32px
        .icon-enter
            height: 22px
            width: 22px
</style>
<template  lang="pug">
.about-view.bg-light-gray
    .imgs.center
        img(:src="'profile/logo.png' | qn")
        p.fz-26.gray.mgt-36 v{{version}}
        .text
            p.fz-40 最大的和田玉爱好者平台
            p.mgt-20.fz-30 玩玉最专业 买玉最放心
            p.fz-30 客服电话：
                a.red(href="tel:4000587266") 400-0587-266
    .help.bg-white
        .line-height-100.fz-30.bold.mgl-32.pdr-32.gray 帮助中心
        .line-height-100.flex.fz-26.bdt.mgl-32.pdr-32(v-link="{path: '/help/mall'}")
            .flex-1 商城交易常见问题
            icon.gray(name="enter")
        .line-height-100.flex.fz-26.bdt.mgl-32.pdr-32(v-for='item in problems', v-link="{path: '/help/desc/' + item.type, params: {type: item.type}}")
            .flex-1 {{item.title}}
            icon.gray(name="enter")
</template>
<script>
import help from '../help'
export default {
    name: 'about-view',

    data() {
        return {
            version: '1.0',
            problems: []
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
    }
}
</script>