<style lang="stylus">
@import '~style/partials/var'
.question-item
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
.question-item.bg-white(v-link="{name: 'question', params: {id: item.post_id}}")
    .header.flex.pd-20
        .flex-1.flex
            avatar(:user="item.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.user.nickname}}
    .pd
        .fz-30.line-clamp-2 {{item.description}}
        .flex.medias.mgt-24(v-if="item.pictures.length > 0")
            template(v-for="pic in item.pictures")
                .media.img(v-bg='pic', v-if='$index < 3')
            .more.white.fz-30.flex.pdh-12(v-if="item.pictures.length > 3") 
                img.mgr-8(:src="'pic.png' | qn")
                div {{item.pictures.length}}
        .flex.fz-26.mgt-24
            .blue.mgr-28(v-if="item.status") 
                span {{item.status}}
                span.gray 个回答
            .blue
                icon(name="invite")
                span 邀请回答
</template>
<script>
export default {
    name: 'question-item',
    props: {
        item: Object
    }
}
</script>
