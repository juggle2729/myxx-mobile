<style lang="stylus">
.help-auction-special-view
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
    p
        padding 0 32px 0 54px
        word-break break-all
        line-height 1.5
        font-size 26px
        color #888888
</style>
<template lang="pug">
.help-auction-special-view.bg-white.pdb-36
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 专场主题明确
        p - 我们希望通过专场能展示您店铺独特的品质，因此在您申请时请慎重思考和决定专场主题。
        p - 平台建议主题方向，由题材、分类、种类、产地、重量等商品信息自由组合，例如 苏工观音玉牌专场、青花山水挂件专场等。
        p - 特点鲜明的主题更容易通过审核，也更易获得平台推广资源，例如10克以内标本级白玉籽料专场、青玉阴刻专场。
        p - 高级工艺师、省级玉雕大师以上可申请特定的工作室作品专场。
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 拍品和主题具有关联性
        p 主题确定后，专场下拍品必须和主题具有一致性，禁止出现非主题相关的拍品，例如在原石专场下出现了青花摆件、白玉玉牌等和主题不符的拍品。
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 拍品信息准确，所见即所得
        p
            span 管理员会按照
            span.blue(v-link="{name: 'help-explanation', params: {type: 'about_violation_product'}}") 《美玉秀秀违规商品定义和处罚规则》
            span 中的定义，对专场拍品进行审核，主要审核点：
        p - 商品属性信息齐全，如实描述商品信息，不弄虚作假。
        p - 拍摄图片、视频清晰、能准确反映拍品实物，所见即所得。
        p - 至少包含两张自然光图片，白玉必须标配烟标图。
        p - 籽料必须包含能展示籽料特征的图片。
    .mgt-36
        .flex.mgh-32.mgb
            img.dot.mgr-12(:src="'red_dot.png' | qn")
            .title 品质要求
        p 原石类：
        p - 型质完整。
        p - 肉眼无明显结构，无明显绺裂、水线等瑕疵。
        p - 无任何人为处理，包括修形、上色等。
        p - 不支持边角料。
    .mgt-36
        p 成品类：
        p - 玉质细腻，工艺流畅。
        p - 寓意明确，具有艺术价值。
        p - 工作室必须提供相应证书图片。
        p - 不支持机器雕刻。
</template>