<style lang="stylus">
.card-component
    width: 100%
    .media
        width: 226px
        height: 174px
        position: relative
        img
            width: 54px
            height: 40px
            position: absolute
            bottom: 0
            left: 0
    .dock
        height: 66px
        line-height: 66px
    .post
        display: block
        height: 30px
        width: 78px
    [class^='icon-'], [class*=' icon-']
        height: 1.6em
        width: @height
        color: #c6c6c6
        & + span
            color: #c6c6c6
</style>
<template lang="jade">
.card-component.bg-white.pdr-32(v-link="{name: config.category[item.type], params: {id: item.entry.post_id || item.entry.id}}")
    div.pdt-28.mgl-32.bdt(v-if="morePics")
        .fz-30.user-txt.line-clamp-2.mgb-24.pdr-32 {{item.entry.title || item.entry.description || item.entry.content | content | input}}
        div.flex
            .media.img(v-else, v-for="pic in pics", v-bg="pic", :class="{'mgl-4': $index > 0}")
        .dock.flex.fz-26.light
            icon-answer.mgr-40(v-if="jb", :count="item.entry.status", :identifiable="item.entry.identifiable") 
            icon-like.pdr-28(v-else, :active="false", type="rt", :count="item.entry.like_count || item.entry.like", readonly=true)
            icon-comment.flex-1(:count="item.entry.comment_count", readonly=true)
            img.post(v-if="post", :src="'recommend/post.png' | qn")
    div.pdv-28.mgl-32.bdt.flex(v-else)
        .media.img(v-if="item.entry.cover_type === 'video'", v-bg="item.entry.cover", query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/320")
            img(:src="'recommend/video.png' | qn")
        .media.img(v-else, v-bg="item.entry.picture || item.entry.medias[0].media")
        .desc.mgh.flex-1
            .fz-30.user-txt.line-clamp-3 {{item.entry.content || item.entry.description || item.entry.title | content}}
            .flex.mgt.fz-26
                icon-answer.mgr-40(v-if="jb", :count="item.entry.status", :identifiable="item.entry.identifiable")
                icon-like.pdr-28(v-else, :active="false", type="tp", :count="item.entry.like_count || item.entry.like", readonly=true)
                icon-comment.flex-1(:count="item.entry.comment_count", readonly=true)
                img.post(v-if="post", :src="'recommend/post.png' | qn")
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
