<style lang="stylus">
.question-append-view
    color #474747
    min-height: 100%
    .append-info
        padding 30px 26px
        & + .append-info
            margin-top 20px
    .pictures
        font-size 0
    .pic
        display inline-block
        width calc(100%/3 - 2px)
        padding-top calc(100%/3 - 2px)
        margin-top 3px
        &:not(:nth-child(3n+1))
            margin-left 3px
    .video::before
        background-size 75px
</style>
<template lang="pug">
.question-append-view.bg
    .append-info.bg-white(v-for="item in jb.append_info", track-by="$index")
        .flex
            avatar(:user='item.user')
            .flex-1.mgl-18.fz-26 {{item.user.nickname}}
            .fz-24 {{item.create_at | date 'yyyy-mm-dd H:MM'}}
        .mgt-34.fz-30 新增{{item.pictures.length}}张图片,{{item.video ? 1 : 0}}个视频
        .pictures.mgt-22(v-if="item.pictures.length || item.video")
            .video.pic(v-if="item.video", v-bg.video='item.video', @click.stop="play(item.video)")
            .pic(v-for="pic in item.pictures", v-bg.sm="pic", @click="coverflow(item.pictures, $index)")
</template>
<script>
export default {
    name: 'QuestionAppendView',

    data() {
        return {
            jb: {
                user: {},
                append_info: []
            }
        }
    },

    route: {
        data({ to }) {
            return this.$fetch(`sns/jianbao/${to.params.id}`).then(jb => this.jb = jb)
        }
    }
}
</script>