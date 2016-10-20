<style lang="stylus">
.user-like-view
    height: 100%
    position: relative
    .empty-component
        position: absolute
        width: 100%
        top: 45%
        left: 50%
        transform: translate(-50%, -50%)
    .item
        padding-left: 32px
        padding-right: 32px
        height: 270px
        .title
            height: 82px
            line-height: 82px
        .card
            height: 168px
            background-color: #efeff4
            padding: 0 24px
            .avatar-50
                margin-right: 16px
            .content
                display: -webkit-box
                -webkit-box-orient: vertical
                overflow: hidden
                line-height: 1.2
                -webkit-line-clamp: 1
                text-overflow: ellipsis
            .preview
                height: 125px
                width: 125px
                background-size: cover
                background-position: center
</style>
<template lang="jade">
.user-like-view.bg(:class="{'bg-white': items.isEmpty}")
    div(v-for='item in items')
        .hr-20
        .item.bg-white
            .title.fz-30.gray 赞了一个{{item.type && item.type.name || '内容'}}
            .card.flex.fz-30(v-if='item.isEmpty') 该内容已被删除
            .card.flex(v-else, v-link='{name: item.type.route, params: item.params}')
                .flex-1
                    .user.flex.mgb
                        avatar(:user='item.user', :size='50')
                        p.fz-26.gray.mgl-16 {{item.user.name}}
                    p.content.fz-30.mgr {{{item.description}}}
                template.preview(v-if='item.preview')
                    .preview(v-if='item.preview.img', v-bg.sm='item.preview.img')
                    .preview.play(v-else='', v-bg.video='item.preview.video')
    partial(name='load-more', v-if='items.hasMore')
    empty(v-if='items.isEmpty', title='你还没有赞')
</template>
<script>
import paging from 'paging'
export default {
    name: 'UserLikeView',
    mixins: [paging],
    computed: {
        paging() {
            return {
                path: `users/${this.$route.params.id}/like_list`,
                transform(items) {
                    return items.map(({entry, type}) => {
                        let card = {
                                ...entry,
                                isEmpty: _.isEmpty(entry),
                                type: _.clone(_.find(this.config.types, {'id': type}))
                            }
                        card.isEmpty = !card.type || card.isEmpty
                        if(!card.isEmpty) {
                            card.params = {id: card.post_id || card.id || card.target.id}
                            switch(type) {
                                case 10:
                                    card.params.result = 'none'
                                    card.preview = {img: entry.picture}
                                    break
                                case 20:
                                    card.params.result = card.id
                                    card.type.route = 'question' //鉴定结果，跳转到鉴宝页面
                                    card.preview = {video: entry.video}
                                    card.user = entry.identifier
                                    card.description = '鉴定了 ' + _.get(entry, 'applier.name', '路人') + ' 的宝贝'
                                    break
                                case 30:
                                    card.description = entry.content || '发布的话题'
                                    card.preview = {[entry.cover_type === 'picture' ? 'img' : 'video']: entry.cover}
                                    break
                                case 40:
                                    card.description = entry.name + ' ' + _.get(entry, 'moral.name', '')
                                    card.preview = {img: entry.imgs[0]}
                                    break
                                case 70:
                                    card.type.route = _.find(this.config.types, {id: entry.target.type}).route
                                    card.description = entry.content
                                    card.preview = {[entry.media.type === 'picture' ? 'img' : 'video']: entry.media.id}
                                    break
                                case 90:
                                    card.description = entry.title
                                    card.preview = {img: entry.picture}
                                    break
                            }
                        }
                        return card
                    })
                }
            }
        }
    }
}
</script>
