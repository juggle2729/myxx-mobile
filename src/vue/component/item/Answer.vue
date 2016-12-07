<style lang="stylus">
@import '~style/partials/var'
.answer-item
    .follow
        height: 90px
    .header
        padding: 20px 20px 0
        .name
            color: #666666
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
    .video
        width: 50%
        padding-top: 50%
    .question
        padding: 28px 20px 24px 20px
    .interact
        height: 80px
        line-height: 60px
        > div
            -webkit-box-flex: 1
            text-align: center
</style>
<template lang="jade">
.answer-item.bg-white(v-link="{name:'question', params: {id: item.entry.jianbao.post_id}}")
    .follow.bdb.flex.pdl(v-if="collection")
        avatar(:user="item.entry.identifier", :size="50")
        .mgl.fz-26.gray.flex-1 {{item.entry.identifier.nickname}} 添加至专辑
        .fz-26.gray.pdr(v-if="collection", v-link="{name: 'collection', params: {id: item.event.what.id}}") 前往专辑

    .header.flex.pdh-20(v-if="!collection")
        .flex-1.flex
            avatar(:user="item.entry.identifier", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.entry.identifier.nickname}}
        icon-follow(v-if="!item.entry.identifier.is_followed", :target="item.entry.identifier.id", :follow="item.entry.identifier.is_followed")

    .answer.pdh.pdv-28
        .video(v-bg="item.entry.identifier.portrait")
        .fz-26.gray.flex(:class="{'mgt-28': item.entry.result}")
            span.mgr-8(v-if="item.entry.result") 回答结果为{{config.jdResult[item.entry.result]}}
            span(v-if="item.entry.value") 估价为{{config.jdPrice[item.entry.value]}}

    .question.bg-light
        .desc.fz-30.user-txt {{item.entry.jianbao.user.nickname}}: {{{item.entry.jianbao.description | input}}}
        .flex.medias.mgt-24(v-if="item.entry.jianbao.pictures.length > 0")
            .media.img(v-for="pic in item.entry.jianbao.pictures.splice(0,3)", v-bg='pic')

    .interact.fz-26.flex.bdt
        icon-like.bdr(:target="item.entry.id", type="jd", :active="item.entry.liked", :count="item.entry.like_count")
        icon-comment.bdr(:count="item.entry.comment_count", :id="item.entry.id", type="jd")
        icon-share
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
