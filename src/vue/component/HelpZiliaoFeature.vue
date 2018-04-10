<style lang="stylus">
.help-ziliao-feature-component
    .flex
        -webkit-box-align start
    .dot
        height 10px
        width 10px
        display block
        transform translateY(16px)
    .title
        font-size 30px
        font-weight bold
        word-break break-all
        line-height 1.5
        display block
    .example
        padding 0 54px
        width 100%
        height @width
    p
        padding 0 32px 0 54px
        word-break break-all
        line-height 1.8
        font-size 26px
        color #888888
        &.red
            color #e61717
</style>
<template lang="pug">
.help-ziliao-feature-component.bg-white
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 籽料特征图须知
        p 籽料特征图指的是能够证明实物为籽料的图片，它包括：
        p 1. 皮色细节图
        p 2. 毛孔细节图
        p 3. 透光结构图
        p 4. 原料以及制作过程图
        p.red * 注意：籽料特征图是通过图片【直观地】对籽料特征进行展示，降低消费者判断成本，因此皮色、毛孔必须为【局部特写】，细节清晰。拍摄全局图片间接展示皮色、毛孔并不能算作籽料特征图。
        img.example.mgt-20(:src="'shop/promise/ziliao-example.png' | qn")
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 说明
        p 在商品发布过程中，允许给符合籽料特征要求的商品增加［籽料特征图］标记，一个商品必须包含2张或2张以上籽料特征图。
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 优势
        p 标记为［籽料特征图］的商品会获得优先曝光，同时在商城中会有特殊标记展示。
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 审核
        p 审核人员会对您之前发布的商品进行审核，要求
        p 1. 总商品数量超过20
        p 2. 包含籽料特征图的商品数量需占总商品数量的50%以上
        p 您可以在商品管理中对之前发布的商品进行编辑修改，补充上传籽料特征图片。
</template>
<script>
export default {
    name: 'help-ziliao-feature-component',

    ready() {
        this.action('updateTitle', { text: '籽料特征图' })
    }
}
</script>