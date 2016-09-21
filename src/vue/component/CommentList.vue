<style lang="stylus">
.comment-list
    .comment-item:last-child
        padding-bottom: 0
</style>
<template lang="jade">
.comment-list
    comments(:path="path", :params="params", transform="comments", v-ref:list)
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

        params() {
            return this.$route.name === 'comments' ? {} : {limit: 5, freeze: true}
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
                })
                .then(comment => {
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
