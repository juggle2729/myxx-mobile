<style lang="stylus">
.comment-item
    padding: 26px 0 26px 32px
    &.flex
        -webkit-box-align: start
    .pic
        height: 156px
        width: 156px
    .one
        max-height: 322px
        max-width: 322px
    .vip
        display: block
        width: 26px
        height: 26px
    .content
        &[to]::before
            content: '回复' attr(to) '说：'
        img
            height: 44px
            vertical-align: bottom
    .reply
        border: 20px solid #f9f9f9
        &:nth-child(2)
            display: inline
        .blue
            color: #527fb0
        img
            height: 30px
            width: 30px
    .icon-enter
        transform: rotate(90deg)
</style>
<template  lang="pug">
.comment-item.flex
    avatar.mgr(:user='item.reply_from')
    .flex-1.bdb.pdr-32.pdb-16
        section
            .flex.pdb.pdt-6
                .flex-1
                    .flex
                        .fz-26.gray {{item.reply_from.name}}
                        img.mgl-8.vip(v-if="item.reply_from.vip_flag", :src="'profile/'+item.reply_from.role+'.png' | qn")
                    .fz-22.light.mgt-12 {{item.create_at | moment}}
                icon-like(v-if="$route.name === 'comments'", :count='item.like_count', :active='item.liked', zero='')
            .fz-30.content.user-txt {{{content | input}}}
            .flex.mgt-24(v-if="item.pictures.length > 1")
                img.pic.mgr-10(v-for="pic in item.pictures", :src="config.img+pic.media", @click="coverflow(commentPics, $index)")
            img.one(v-if="item.pictures.length === 1", :src="config.img + item.pictures[0].media", @click="coverflow(commentPics)")
        .bg-light.mgt.mgb-12.fz-30(v-if="item.reply_comment")
            .reply
                span.fz-26.gray(v-if="item.reply_comment.delete_flag") 抱歉，此内容已删除
                .user-txt(v-else)
                    span.blue {{item.reply_comment.reply_from.nickname}}
                    |：{{{item.reply_comment.content | input}}}
                    .flex(v-if="item.reply_comment.pictures.length", @click="coverflow(replyPics)")
                        img.mgl-4(:src="'placeholder/comment.png' | qn")
                        .blue 查看图片
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

        replyPics() { // 原评论图片数组
            return _.map(this.item.reply_comment.pictures, 'media')
        },

        commentPics() { // 最新评论图片数组
            return _.map(this.item.pictures, 'media')
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