<style lang="stylus">
.card-component
    width: 100%
    .media
        width: 226px
        height: 174px
        position: relative
        &.img
            background-size: cover
            background-color: #F1F1F1
        img
            width: 54px
            height: 40px
            position: absolute
            bottom: 0
            left: 0
    .dock
        height: 66px
        line-height: 66px
    .dock, .desc
        [class^='icon-'], [class*=' icon-']
            height: 1.3em
            width: @height
            color: #c6c6c6
            & + span
                color: #c6c6c6
    .deep-link.comment-icon
        padding-left: 28px
        -webkit-box-flex: 1
    .deep-link.img
        display: block
        height: 30px
        width: 130px
        padding: 0
        background: transparent url('//o0x80w5li.qnssl.com/open-in-app.png') no-repeat
        background-size: contain
        .btn
            padding: 0
            height: initial
            line-height: initial
            border-radius: initial
            opacity: 0
</style>
<template  lang="pug">
.card-component.bg-white.pdr-32(v-link="{name: config.category[item.type], params: {id: item.entry.post_id || item.entry.id}}")
    div.pdt-28.mgl-32.bdt(v-if="morePics")
        .fz-30.user-txt.line-clamp-2.mgb-24 {{{item.entry.title || item.entry.description || item.entry.content | content | input}}}
        div.flex
            .media.img(v-else, v-for="pic in pics", v-bg="pic", :class="{'mgl-4': $index > 0}")
        .dock.flex.fz-26.light
            icon-answer.mgr-40(v-if="jb", :count="item.entry.status", :identifiable="item.entry.identifiable")
            icon-like(v-else, :active="false", :count="item.entry.like_count || item.entry.like")
            icon-comment(:count="item.entry.comment_count", readonly=true)
            deep-link.img x
    div.pdv-28.mgl-32.bdt.flex(v-else)
        .media.img(v-if="item.entry.cover_type === 'video'", v-bg="item.entry.cover", query="vframe/jpg/offset/7/rotate/auto|imageView2/2/w/320")
            img(:src="'recommend/video.png' | qn")
        .media.img(v-else, v-bg="item.entry.picture || item.entry.medias[0].media")
        .desc.mgl.flex-1
            .fz-30.user-txt.line-clamp-3 {{{item.entry.content || item.entry.description || item.entry.title | content | input}}}
            .flex.mgt-12.fz-26
                icon-answer.mgr-40(v-if="jb", :count="item.entry.status", :identifiable="item.entry.identifiable")
                icon-like(v-else, :count="item.entry.like_count || item.entry.like")
                icon-comment(:count="item.entry.comment_count", readonly=true)
                deep-link.img x
</template>
<script>
export default {
    name: 'card',

    computed: {
        post() {
            return this.item.type == 'rt'
        },
        jb() {
            return this.item.type == 'jb'
        },
        pics() {
            let items = []
            _.forEach(_.chain(this.item.entry.medias).filter(['media_type', 'picture']).value(), (item) => {
                items.push(item.media)
            })
            return this.item.entry.pictures ? (_.take(this.item.entry.pictures, 3)) : (_.take(items, 3))
        },
        morePics() {
            return _.get(this, 'item.entry.pictures.length') > 2 || _.get(this, 'item.entry.medias.length') > 2
        }
    },

    props: {
        item: Object
    }
}
</script>
