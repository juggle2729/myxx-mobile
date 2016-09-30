<style lang="stylus" scoped>
.comment-list
    header
        line-height: 80px
    .no-comment
        line-height: 140px
    .list.empty
        display: none
    .more
        padding: 32px 0
        &::after
            content: '\e904'
            font-family: 'icomoon'
            display: inline-block
            padding-left: 8px
            font-size: .8em
    .comment-item:last-child
        padding-bottom: 0
</style>
<template lang="pug">
.comment-list
    header.bdb.fz-26.pdl-32.gray 评论&nbsp;&nbsp;{{$refs.list.total}}
    .no-comment.fz-26.light.center(v-if="$refs.list && $refs.list.total === 0") 还没有人评论
    comments(:path="path", :params="params", transform="comments", v-ref:list)
    .fz-26.red.center.more(v-if="isPreview && $refs.list && $refs.list.total > 5", v-link="{name: 'comments', params: {id: id, type: type}}") 查看全部评论
</template>
<script>
import List from 'component/List.vue'
export default {
    name: 'comment-list',

    components: {
        comments: new List('Comment')
    },

    props: {
        id: Number,
        type: Number
    },

    computed: {
        path() {
            const id = this.id || this.$route.params.id
            const type = this.type || this.$route.params.type || _.find(this.config.types, {route: this.$route.name}).id
            return `users/target/${id}/type/${type}/comments`
        },

        isPreview() {
            return this.$route.name !== 'comments'
        },

        params() {
            return this.isPreview ? {limit: 5, freeze: true} : {}
        },

        items() {
            return this.$refs.list.items
        }
    },

    methods: {
        addComment(to) {
            let [placeholder, reply_to] = to ? [ `回复${to.name}`, to.id] : ['', '']
            this.action('keyboard', {placeholder})
                .then(content => {
                    let c = reply_to ? {content, reply_to} : {content}
                    return this.$post(this.path, c).then(resp => resp)
                }).then(comment => {
                    this.items.splice(0, 0, comment)
                    this.action('toast', {success: 1, text: comment.reply_to ? '回复成功' : '评论成功'})
                })
        }
    },

    events: {
        delComment(comment) {
            this.action('delete')
                .then(confirm => confirm === '1' ? this.$delete(`${this.path}/${comment.id}`).then(resp => resp) : false)
                .then(resp => {
                    if(resp) {
                        this.items.splice(_.findIndex(this.items, {id: comment.id}), 1)
                        this.action('toast', {success: 1, text: '删除成功'})
                    }
                })
        },

        reply(comment) {
            this.addComment(comment.reply_from)
        }
    }
}
</script>
