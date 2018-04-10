<style lang="stylus">
.comment-list
    .list.empty
        display: none
    .comment-item:last-child
        padding-bottom: 0
    .no-comment img
        height: 78px
        width: 92px
    .all .btn
        background-color: white
        color: #e61717
        text-align: center
        .icon-enter
            width: 30px
            height: 30px
</style>
<template  lang="pug">
.comment-list.bg-white
    .line-height-80.bdb.fz-26.pdl-32.gray 评论 {{total}}

    comments(:path="path", :params="{limit: 5, freeze: true, order_by: 'score'}", transform="comments", v-ref:hot)

    .no-comment.fz-26.light.center.none.pdt-48.pdb-32
        img(:src="'no-comment.png' | qn")
        .mgt-32 暂无评论

    deep-link(v-if="total <= 5") 打开美玉秀秀，参与评论互动
    deep-link.all(v-else)
        span 打开美玉秀秀，查看全部{{total}}条评论
        icon(name="enter")
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
        total: Number
    },

    ready() {
        _.delay(() => {
            const hot = this.$el.querySelectorAll('.list')[0]
            const noComment = this.$el.querySelector('.no-comment')
            // 待优化
            hot.classList.contains('empty') && noComment.classList.remove('none') && noComment.classList.add('block')
        }, 900)
    },

    computed: {
        path() {
            const id = this.id || this.$route.params.id
            const type = this.type || this.$route.params.type || _.find(this.config.types, {route: this.$route.name}).id
            return `users/target/${id}/type/${type}/comments`
        },

        tip() {
            return (this.total <= 5) ? '打开美玉秀秀，参与评论互动' : '打开美玉秀秀，查看全部'+this.total+'条评论'
        }
    }
}
</script>
