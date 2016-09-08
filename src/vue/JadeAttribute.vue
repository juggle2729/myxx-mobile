 <style lang="stylus">
.jade-attribute
    .params
        padding-left: 32px
        ul > li
            padding: 26px 0
            line-height: 1.5
            border-bottom: 1px solid #eee
        ul > li > p:nth-child(2)
            line-height: 1.5
            padding-right: 32px
        .label
            width: 178px
</style>
<template lang="jade">
.jade-attribute.bg
    .params.bg-white
        ul
            li.flex.fz-26(v-if='jade.category')
                p.label.gray 分类
                p.flex-1 {{jade.category | tree}}
            li.flex.fz-26(v-if='jade.size')
                p.label.gray 尺寸
                p.flex-1 {{jade.size}}
            li.flex.fz-26(v-if='jade.weight')
                p.label.gray 重量
                p.flex-1 {{jade.weight}}g
            li.flex.fz-26(v-if='jade.variety')
                p.label.gray 种类
                p.flex-1 {{jade.variety | tree}}
            li.flex.fz-26(v-if='jade.place')
                p.label.gray 产地
                p.flex-1 {{jade.place | tree}}
            li.flex.fz-26(v-if='jade.skin')
                p.label.gray 皮色
                p.flex-1 {{jade.skin | tree}}
            li.flex.fz-26(v-if='jade.material')
                p.label.gray 产状
                p.flex-1 {{jade.material | tree}}
            li.flex.fz-26(v-if='jade.certificate')
                p.label.gray 证书
                p.flex-1 {{jade.certificate | tree}}
            li.flex.fz-26(v-if='jade.gift_to')
                p.label.gray 赠送对象
                p.flex-1 {{jade.gift_to | tree}}
            li.flex.fz-26(v-if='jade.gift_when')
                p.label.gray 赠送场合
                p.flex-1 {{jade.gift_when | tree}}
            li.flex.fz-26(v-if='jade.theme')
                p.label.gray 题材
                p.flex-1 {{jade.theme | tree}}
            li.flex.fz-26(v-if='jade.moral')
                p.label.gray 寓意
                p.flex-1 {{jade.moral | tree}}
            li.flex.fz-26(v-if='jade.genre')
                p.label.gray 流派
                p.flex-1 {{jade.genre | tree}}
</template>
<script>
export default {
    name: 'JadeAttribute',
    props: {
        jade: {
            type: Object
        }
    }
}
</script>
</template>
