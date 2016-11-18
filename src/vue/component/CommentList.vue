<style lang="stylus">
.comment-list
    header
        line-height: 80px
    .title
        height: 84px
        line-height: 84px
        span
            border-left: 6px solid #cc3f4f
    .no-comment
        line-height: 140px
    .list.empty
        display: none
    .comment-item:last-child
        padding-bottom: 0
        > .flex-1
            background-image: none
    .enter
        padding-bottom: 3px
</style>
<template lang="jade">
.comment-list
    header.bdb.fz-26.pdl-32.gray(v-if="isPreview") 评论&nbsp;&nbsp;{{$refs.hot && $refs.hot.total}}

    section.hot.none(v-if="!isPreview")
        .title.fz-26.gray.pdl-32.bdb.bg-white
            span.pdl-12 热门评论
    comments(:path="path", :params="params", transform="comments", v-ref:hot)
    .fz-26.red.center.pdv-32(v-if="hasMore", v-link="{name: 'comments', params: {id: id, type: type}, query: {uid: uid}}")
        span 查看全部{{$refs.hot && $refs.hot.total}}条评论
        icon.enter.fz-22(name="enter")

    section.lately.none(v-if="!isPreview")
        .hr(v-if="hotItems && hotItems.length")
        .title.fz-26.gray.pdl-32.bdb.bg-white
            span.pdl-12 最新评论
    comments(v-if="!isPreview", :path="path", :params="{'order_by': 'new'}", transform="comments", v-ref:lately)

    .no-comment.fz-26.light.center(v-if="hotItems && !hotItems.length && newItems && !newItems.length") 还没有人评论
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
        type: String,
        uid: [Number, String]
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
            return this.isPreview ? {limit: 5, freeze: true, order_by: 'score'} : {
                order_by: 'hot'
            }
        },

        hotItems() {
            return _.get(this, '$refs.hot.items', [])
        },

        newItems() {
            return _.get(this, '$refs.lately.items', [])
        },

        // 是否显示查看更多评论
        hasMore() {
            return this.isPreview && (_.get(this, '$refs.hot.total') > 5)
        }
    },

    ready() {
        _.delay(() => {
            const [hot, lately] = [this.$el.querySelectorAll('.list')[0], this.$el.querySelectorAll('.list')[1]]
            const [hotTitle, latelyTitle] = [this.$el.querySelector('.hot'), this.$el.querySelector('.lately')]
            // 待优化~
            if(!this.isPreview) {
                !hot.classList.contains('empty') && hotTitle.classList.remove('none') && hotTitle.classList.add('block')
                !lately.classList.contains('empty') && latelyTitle.classList.remove('none') && latelyTitle.classList.add('block')
            }
        }, 500)
    },

    methods: {
        addComment(to) {
            let [placeholder, reply_comment_id] = to ? [ `回复${to.reply_from.nickname}`, to.id] : ['', '']
            this.action('keyboard', {placeholder})
                .then(content => {
                    let c = reply_comment_id ? {content, reply_comment_id} : {content}
                    return this.$post(this.path, c).then(resp => resp)
                }).then(comment => {
                    this.newItems && this.newItems.splice(0, 0, comment)
                    this.action('toast', {success: 1, text: comment.reply_comment ? '回复成功' : '评论成功'})
                })
        }
    },

    events: {
        delComment(comment, isHot) {
            this.action('delete', {isReply: comment.reply_from.id != this.self.id})
                .then(confirm => (confirm === '1') ? this.$delete(`${this.path}/${comment.id}`).then(resp => resp) : 
                    ((confirm === '2') ? this.addComment(comment) : false))
                .then(resp => {
                    if(resp) {
                        isHot ? this.hotItems && this.hotItems.splice(_.findIndex(this.hotItems, {id: comment.id}), 1) : 
                            this.newItems && this.newItems.splice(_.findIndex(this.newItems, {id: comment.id}), 1)
                        this.action('toast', {success: 1, text: '删除成功'})
                    }
                })
        },

        reply(comment) {
            this.addComment(comment)
        }
    }
}
</script>
