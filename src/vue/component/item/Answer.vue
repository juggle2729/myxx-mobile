<style lang="stylus">
@import '~style/partials/var'
.answer-item
    .follow
        height: 90px
    .medias
        position: relative
        .media
            height: 237px
            width: 237px
            border: 2px solid white
        .more
            position: absolute
            right: 0
            bottom: 1px
            height: 40px
            background-color: rgba(136, 136, 136, 0.9)
            img
                height: 24px
                width: 24px
                display: block
    .question
        .desc
            -webkit-box-align: start
        img.qs
            display: block
            height: 30px
            width: 36px
    .answer
        .identify
            width: 148px
            padding-top: @width
        .play
            width: 108px
            color: #527fb0
            img
                height: 68px
                width: 68px
    .answer-icon
        margin-right: 66px
</style>
<template  lang="pug">
.answer-item.bg-white(v-link="{name:'answer', params: {id: item.entry.id}}")
    .follow.flex.pdl(v-if="collection")
        avatar(:user="item.entry.identifier", :size="50")
        .mgl.fz-26.gray.flex-1 {{item.entry.identifier.nickname}} 添加至专辑

    .pdt.flex.pdh(v-if="!collection")
        .flex.gray
            avatar(:user="item.entry.identifier", :is-self="false", :size="50")
            .dark.mgl.fz-26 {{item.entry.identifier.nickname}} 回答了问题

    .question.bdb.pdr.pdb-24.mgl.mgr-32(:class="{'pdt-28': !collection}")
        .flex.desc
            img.qs.mgt-6(:src="'question.png' | qn")
            .fz-30.user-txt.mgl-10 {{item.entry.jianbao.user.nickname}}: {{{item.entry.jianbao.description | content | input}}}
        .flex.medias.mgt-24(v-if="item.entry.jianbao.pictures.length > 0")
            .media.img(v-for="pic in item.entry.jianbao.pictures.splice(0,3)", v-bg='pic')

    .answer.pdh.pdv-28
        .flex
            .identify.bg(v-bg="item.entry.identifier.portrait")
            .identifier.mgl.flex-1
                .fz-30.bold {{item.entry.identifier.nickname}} 的回答
                .fz-26.gray.pdt {{item.entry.identifier.title}}
                .fz-26.gray.pdt(v-if="item.entry.result") 回答结果为{{config.jdResult[item.entry.result]}}  {{item.entry.value && '估价为' + config.jdPrice[item.entry.value]}}
            .play.center(@click.stop="play(item.entry.video)")
                img(:src="'question/play.png' | qn")
                .fz-22.mgt 播放视频

    .line-height-98.fz-26.flex.bdt.pdh-32
        icon-answer(:count="item.entry.jianbao.status")
        icon-comment(:count="item.entry.comment_count", :id="item.entry.id", type="jd")
</template>
<script>
export default {
    name: 'answer-item',

    props: {
        item: Object
    },

    computed: {
        collection() {
            return _.get(this, 'item.event.action') === 'us_add_cl_obj'
        }
    }
}
</script>
