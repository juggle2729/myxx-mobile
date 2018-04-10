<style lang="stylus">
.question-append-view
    color #474747
    min-height: 100%
    .append-info
        padding 30px 26px
        & + .append-info
            margin-top 20px
    .pictures
        display flex
        flex-wrap wrap
    .pic
        width 230px
        height 230px
        margin-top 4px
        &:not(:nth-child(3n+1))
            margin-left 4px
    .video::before
        background-size 75px
</style>
<template lang="pug">
.question-append-view.bg.pdb-20
    .append-info.bg-white(v-for="item in append_info", track-by="$index")
        .flex
            avatar(:user='item.user')
            .flex-1.mgl-18.fz-26 {{item.user.nickname}}
            .fz-24.light {{item.create_at | date 'yyyy-mm-dd H:MM'}}
        .mgt-34.fz-30 新增{{item.pictures ? item.pictures.length+'张图片' : ''}}{{item.pictures && item.video ? '，' : ''}}{{item.video ? '1个视频' : ''}}
        .pictures.mgt-22
            .video.pic(v-if="item.video", v-bg.video='item.video', @click.stop="play(item.video)")
            template(v-if="item.pictures && item.pictures.length")
                .pic(v-for="pic in item.pictures", v-bg.sm="pic", @click="coverflow(item.pictures, $index)")
</template>
<script>
export default {
    name: 'QuestionAppendView',

    data() {
        return {
            append_info: []
        }
    },

    route: {
        data({ to }) {
            return this.$fetch(`sns/jianbao/${to.params.id}`).then(({ append_info }) => ({ append_info }))
        }
    }
}
</script>