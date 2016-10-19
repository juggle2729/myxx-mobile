<style lang="stylus">
@import '~style/partials/var'
.answer-item
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
.answer-item.bg-white(v-link="{name:'question', params: {id: item.jianbao.post_id}}")
    .header.flex.pdh-20
        .flex-1.flex
            avatar(:user="item.identifier", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.identifier.nickname}}
        icon-follow(v-if="!item.identifier.is_followed", :user="item.identifier.id", :follow="item.identifier.is_followed")
    .answer.pdh.pdv-28
        .video(v-bg.video="item.video")
        .fz-26.gray.flex(:class="{'mgt-28': item.result}")
            span.mgr-8(v-if="item.result") 回答结果为{{config.jdResult[item.result]}}
            span(v-if="item.value") 估价为{{config.jdPrice[item.value]}}
    .question.bg-light
        .desc.fz-30 {{item.jianbao.user.nickname}}: {{item.jianbao.description}}
        .flex.medias.mgt-24(v-if="item.jianbao.pictures.length > 0")
            .media.img(v-for="pic in item.jianbao.pictures.splice(0,3)", v-bg='pic')
    .interact.fz-26.flex.bdt
        icon-comment.bdr(:count="item.comment_count")
        icon-like.bdr(:target="item.id", type="20", :active="item.liked", :count="item.like_count")
        icon-share
</template>
<script>
export default {
    name: 'answer-item',
    props: {
        item: Object
    }
}
</script>
