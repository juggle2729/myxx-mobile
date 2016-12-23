<style lang="stylus">
@import '~style/partials/var'
.question-item
    .follow
        height: 90px
    .header
        padding: 20px 20px 0
        .name
            color: #666666
    .question
        &.flex
            -webkit-box-align: start
        img.qs
            display: block
            height: 30px
            width: 36px
            margin-top: 5px
    .pic
        width: 100%
        padding-top: 66%
        border: 2px solid white
        position: relative
        background-size: cover
        background-position: center
        background-image: url($qn + 'placeholder/img.png')
    .pic-more
        padding-top: 66%
        background-size: 65.8% 100%, 34% 49.5%, 34% 50%
        background-position: left top, right top, right bottom
    .activity
        display: inline-block
        padding: 10px 20px
        border-radius: 26px
        position: absolute
        left: 32px
        bottom: 32px
    .more
        position: absolute
        right: 0
        bottom: 0
        height: 40px
        background-color: rgba(136, 136, 136, 0.9)
        img
            height: 24px
            width: 24px
            display: block
    .dock
        height: 98px
        line-height: 98px
        .answer-icon
            margin-right: 66px
</style>
<template lang="pug">
.question-item.bg-white(v-link="{name: 'question', params: {id: item.entry.post_id}}")
    .follow.flex.pdl(v-if="follow || collection")
        avatar(:user="user", :size="50")
        .mgl.fz-26.gray.flex-1 {{user.nickname}} {{follow ? '关注了问题' : '添加至专辑'}}

    .header.flex.pd-20(v-if="!follow && !collection")
        .flex-1.flex
            avatar(:user="item.entry.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{item.entry.user.nickname}}
    
    .pdh
        .question.pdb.flex(:class="{'pdt': !follow && !collection}")
            img.qs(:src="'question.png' | qn")
            .flex-1.fz-30.line-clamp-2.mgl-10.user-txt {{{item.entry.description | content | input}}}
        .pic.mgb-24(v-if="item.entry.pictures.length > 0", :style="{backgroundImage: imgSrc}", :class="{'pic-more': item.entry.pictures.length >= 3}")
            .more.white.fz-30.flex.pdh-12(v-if="item.entry.pictures.length > 1 && item.entry.pictures.length !== 3")
                img.mgr-8(:src="'pic.png' | qn")
                div {{item.entry.pictures.length}}
    
    .dock.flex.fz-26.bdt.pdh-32.gray
        icon-answer(:count="item.entry.status", :identifiable="item.entry.identifiable")
        icon-comment(:count="item.entry.comment_count", :id="item.entry.post_id", type="jb")
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
        },

        imgSrc() {
            let src = _.chain(this.item.entry.pictures).slice(0,3).reduce((pre, item) => {
                return pre + `url(${this.config.img + item}_320), `
            }, '').trimEnd(', ')
            return _.trimEnd(src, ', ')
        },

    }
}
</script>
