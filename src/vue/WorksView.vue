<style lang="stylus">
.works-view
    padding-bottom: 112px
    .works
        padding: 20px 20px 0
        .media
            height: 468px
        .desc
            line-height: 90px
            height: 90px
            padding: 0 24px
            .comment-component, .like-component
                color: #d8d8d8
                margin-left: 50px
                &.active
                    color: #cc3f4f
        &:not(:first-child)
            margin-top: 12px
</style>
<template lang="jade">
.works-view.bg
    .works.bg-white(v-for='item in items', v-link="{name: 'work', params: {id: item.id}}")
        .media.img(v-bg='item.picture')
        .desc.flex
            .fz-26.gray.flex-1.line-clamp {{item.title}}
            .flex
                like(:target='item.id', :type='90', :active='item.is_liked', :count='item.like_count')
                comment(:count='item.comment_count')
    .hr
</template>
<script>
import paging from 'paging'
import shareable from 'shareable'
import like from 'component/Like.vue'
import comment from 'component/Comment.vue'
export default {
    name: 'WorksView',
    mixins: [paging, shareable],
    components: {
        like,
        comment
    },
    computed: {
        paging() {
            return {
                path: 'sns/works',
                list: 'works',
                params: {
                    user_id: this.$route.params.id
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`users/${to.params.id}/profile`).then((user) => {
                this.setShareData({name: user.nickname, photo: user.photo}, true)
            })
        }
    }
}
</script>