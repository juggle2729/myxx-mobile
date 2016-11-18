<style lang="stylus">
@import '~style/partials/var'
.question-item
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
</style>
<template lang="pug">
.question-item.bg-white(v-link="{name: 'question', params: {id: item.entry.post_id}}")
    .follow.bdb.flex.pdl(v-if="follow || collection")
        avatar(:user="user", :size="50")
        .mgl.fz-26.gray.flex-1 {{user.nickname}} {{follow ? '关注了问题' : '添加至专辑'}}
        .fz-26.gray.pdr(v-if="collection", v-link="{name: 'collection', params: {id: item.event.what.id}}") 前往专辑
    
    .header.flex.pd-20(v-if="!follow && !collection")
        .flex-1.flex
            avatar(:user="item.entry.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.entry.user.nickname}}
    
    .pd
        .fz-30.line-clamp-2 {{{item.entry.description | input}}}
        .flex.medias.mgt-24(v-if="item.entry.pictures.length > 0")
            template(v-for="pic in item.entry.pictures")
                .media.img(v-bg='pic', v-if='$index < 3')
            .more.white.fz-30.flex.pdh-12(v-if="item.entry.pictures.length > 3")
                img.mgr-8(:src="'pic.png' | qn")
                div {{item.entry.pictures.length}}
        .flex.fz-26.mgt-24
            .blue.mgr-28(v-if="item.entry.status")
                span {{item.entry.status}}
                span.gray 个回答
            .blue(@click.stop="gotoDownload")
                icon.mgb-6(name="add-answer")
                span 添加回答
</template>
<script>
export default {
    name: 'question-item',

    props: {
        item: Object
    },

    computed: {
        user() {
            return this.$parent.$parent.profile
        },
        follow() {
            return _.get(this, 'item.event.action') === 'us_fw_jb'
        },
        collection() {
            return _.get(this, 'item.event.action') === 'us_add_cl_obj'
        }
    }
}
</script>
