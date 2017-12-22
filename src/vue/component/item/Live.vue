<style lang="stylus">
bg($key)
    background-image url('//o0x80w5li.qnssl.com/live/' + $key + '.png')
.live-item
    .header
        padding 20px
        .name
            color #666666
    .title
        line-height 1.4
    .pic
        width calc(100% - 50px)
        padding-top 44%
        margin 26px 25px 0
        > .white
            justify-content space-between
            padding 0 17px
            height 60px
            background-color rgba(0, 0, 0, 0.3)
            .fz-24
                bg(play)
                background-position left center
                background-size 26px
                padding-left 32px
    .absolute
        top 20px
        left 20px
        > div
            padding 0 10px
            line-height 26px
        .white
            &.going
                background #e61717
            &.published
                background #f5740a
            &.end
                background #242424
        .black-24
            background-color rgba(255, 255, 255, 0.5)
            background-size 26px
            &.going
                bg(going)
                background-position 3px center
                padding-left 30px
            &.published,&.end
                bg(preview)
                background-position left center
                padding-left 26px
</style>
<template  lang="pug">
.live-item.bg-white.pdb-26(v-link="{name: 'live', params: { id: data.id }}")
    .header.flex(v-if="!collection")
        .flex-1.flex
            avatar(:user="data.user", :is-self="false", :size="50")
            .name.mgl.fz-26 {{data.user.nickname}}
    .mgt-15.fz-30.black-333.pdh-30.title {{ data.title }}
    .pic.relative(v-bg="data.picture")
        .flex.fz-20.absolute
            .white(:class="data.status") {{ status }}
            .black-24.fz-16(:class="data.status") {{ time }}
        .flex.white
            .fz-30 {{ data.title }}
            .fz-24(v-if="data.status === 'end' && !!data.playback") {{ duration(data.playback.duration) }}
</template>
<script>
import dateformat from 'dateformat'
export default {
    name: 'live-item',

    props: {
        item: Object
    },

    computed: {
        collection() {
            return _.get(this, 'item.event.action') === 'us_add_cl_obj'
        },

        data() {
            const entry = this.item.entry || this.item
            return _.isEmpty(entry) ? { medias: [], user: {} } : entry
        },

        status() {
            switch (this.data.status) {
                case 'going':
                    return '直播中'
                case 'published':
                    return '直播预告'
                case 'end':
                    return '回放'
            }
        },

        time() {
            switch (this.data.status) {
                case 'going':
                    return this.data.join_count
                case 'published':
                    return dateformat(new Date(this.data.start_time), 'm/dd H:MM')
                case 'end':
                    return dateformat(new Date(this.data.real_end_time), 'm/dd H:MM')
            }
        }
    }
}
</script>