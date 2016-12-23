<style lang="stylus">
.comment-item
    padding: 26px 0 26px 32px
    &.flex
        -webkit-box-align: start
    .content
        &[to]::before
            content: '回复' attr(to) '说：'
        img
            height: 44px
            vertical-align: bottom
    .reply
        border: 20px solid #f9f9f9
        .blue
            color: #527fb0
    .icon-enter
        transform: rotate(90deg)
</style>
<template lang="jade">
.comment-item.flex
    avatar.mgr(:user='item.reply_from')
    .flex-1.bdb.pdr-32.pdb-16
        section(@click="$dispatch(((self && self.id==item.reply_from.id) || isAuthor) ? 'delComment' : 'reply', item, isHot)")
            .flex.pdb.pdt-6
                .flex-1
                    .fz-26.gray {{item.reply_from.name}}
                    .fz-22.light.mgt-12 {{item.create_at | moment}}
                icon-like(v-if="$route.name === 'comments'", :target='item.id', type='cm', :count='item.like_count', :active='item.liked', zero='')
            .fz-30.content.user-txt {{{content | input}}}
        .bg-light.mgt.mgb-12.fz-30(v-if="item.reply_comment", @click.stop="$dispatch(((self && self.id==item.reply_comment.reply_from.id) || isAuthor) ? 'delComment' : 'reply', item.reply_comment)")
            .reply.user-txt
                span.fz-26.gray(v-if="item.reply_comment.delete_flag") 抱歉，此内容已删除
                template(v-else)
                    span.blue {{item.reply_comment.reply_from.nickname}}
                    |：{{{item.reply_comment.content | input}}}
            .fz-26.txt-right.pdr.pdb(v-if="more", @click.stop="deploy")
                span 显示全部
                icon(name="enter")
</template>
<script>

export default {
    name: 'comment',

    props: {
        item: Object,
        target: Object
    },

    data() {
        return {
            more: false
        }
    },

    ready() {
        this.reply = this.$el.querySelector('.reply')
        if(this.reply && _.replace(window.getComputedStyle(this.reply).height, 'px', '') > 105) {
            this.more = true
            this.reply.classList.add('reply', 'line-clamp-4')
        }
    },

    computed: {
        content() {
            let content = this.item.content.replace(/</g, '&lt').replace(/>/g, '&gt')
            if(/\[.{1,3}?\]/.test(content)) {
                content = content.replace(/\[(.{1,3}?)\]/g, alt => {
                    const i = this.config.emoji.indexOf(alt.replace(/\[|\]/g, ''))
                    return i === -1 ? alt : `<img src="${this.config.www}/emoji/${i}.png" alt="${alt}" />`
                })
            }
            return content
        },

        isAuthor() {
            return this.$parent.$parent.$parent.isSelf || (this.self && (this.self.id == this.$route.query.uid))
        },

        isHot() {
            return (this.$parent.params.order_by === 'hot') || (this.$parent.params.order_by === 'score')
        }
    },

    methods: {
        deploy() {
            this.more = false
            this.reply.classList.remove('line-clamp-4')
        }
    }
}
</script>