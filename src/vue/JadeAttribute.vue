 <style lang="stylus">
.jade-attribute
    .params
        padding-left: 32px
        ul > li
            padding: 26px 0
            border-bottom: 1px solid #eee
        .label
            line-height: 1.5
            width: 178px
</style>
<template lang="pug">
.jade-attribute.bg
    .params.bg-white
        ul
            li.flex.fz-26(v-for="attr in attrs", v-if="jade[attr.k]")
                p.label.gray {{attr.l}}
                p.flex-1 {{jade[attr.k].name || jade[attr.k]}}
</template>
<script>
export default {
    name: 'jade-attribute',

    props: {
        jade: Object
    },

    data() {
        return {
            attrs: [
                {k: 'category', l: '分类'},
                {k: 'size', l: '尺寸'},
                {k: 'weight', l: '重量'},
                {k: 'variety', l: '种类'},
                {k: 'place', l: '产地'},
                {k: 'skin', l: '皮色'},
                {k: 'material', l: '产状'},
                {k: 'certificate', l: '证书'},
                {k: 'gift_to', l: '赠送对象'},
                {k: 'gift_when', l: '赠送场合'},
                {k: 'theme', l: '题材'},
                {k: 'moral', l: '寓意'},
                {k: 'genre', l: '流派'}
            ]
        }
    }
}
</script>
</template>
