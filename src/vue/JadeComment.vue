<style lang="stylus">
.jade-comment {
    padding: 0 0 32px 32px
    .comment-header {
        -webkit-box-align: center
        -webkit-box-pack: justify
        height: 80px
    }
    .comment {
        padding-bottom: 20px
        .author {
            display: -webkit-box
            display: -webkit-inline-box
            -webkit-box-align: center
            margin: 20px 0
            .author-name {
                width: 480px
            }
        }
        span {
            line-height: 46px
        }
        .content {
            padding-right: 32px
            margin-left: 88px
            line-height: 1.5
            img {
                height: 46px
                vertical-align: bottom
            }
        }
        .more {
            margin: 48px 0 16px 0
            .button {
                width: 378px
                height: 72px
                text-align: center
                line-height: 72px
                border: 1px solid
                border-radius: 8px
            }
        }
    }
    .nocomment {
        margin-top: 48px
        margin-bottom: 24px
    }
}
</style>
<template lang="pug">
.jade-comment.bg-white
    .comment-header.flex.fz-22.bdb
        .gray 评论&nbsp&nbsp{{total}}
    .comment(v-if='total > 0', v-link="{name: 'comments', params: {id: id, type: 40}}")
        .author.flex
            .avatar.mgr
                avatar(:user='c.reply_from')
            .flex
                h3.author-name.fz-26.light.flex-1(:class="{'yellow': c.reply_from.is_identifier}") {{c.reply_from.name}}
                p.fz-26.light {{c.create_at | moment}}
        .content.fz-30
            template(v-if='c.reply_to')
                span.label(v-if='c.reply_to.is_identifier')
                    span.white.bg-yellow 对{{c.reply_to.name}}说
                span.label(v-else='')
                    | 回复
                    span.gray {{c.reply_to.name}}说
                    | ：
            span {{{c.content}}}
        .more(v-if='total > 1')
            .button.fz-32.red.bd-red.center-horizontal
                | 查看全部评论
    .center.light.fz-26.nocomment(v-else='') 还没有人评论
</template>
<script>
export default {
    name: 'JadeComment',
    props: {
        id: {
            default: 1
        }
    },
    data() {
        return {
            c: {},
            total: 0,
        }
    },
    computed: {
        api() {
            return `users/target/${this.id}/type/40/comments?limit=1`
        }
    },
    created() {
        this.$watch('id', () => {
            this.$fetch(`${this.api}`).then((data) => {
                if (data) {
                    this.total = data.total
                    this.c = this.emojify(data.comments[0])
                }
            })
        })
        // 监听广播事件
        this.$on('comment', (e) => {
            this.comment(e)
        })
    },
    methods: {
        comment(e) {
            const placeholder = ''
            this.action('keyboard', {placeholder})
                .then((content) => {
                    if(content) {
                        this.$post(`users/target/${this.id}/type/40/comments`, {content})
                            .then((result) => {
                                this.c = this.emojify(result)
                                this.total += 1
                                this.action('toast', {success: 1, text: '评论成功'})
                            })
                    }
                })
        },

        emojify(comment) {
            if(/\[.{1,3}?\]/.test(comment.content)) {
                comment.content = comment.content.replace(/\[(.{1,3}?)\]/g, (alt) => {
                    const index = this.config.emoji.indexOf(alt.replace(/\[|\]/g, ''))
                    if(index === -1) {
                        return alt
                    } else {
                        return `<img src="${this.config.www}/emoji/${index}.png" alt="${alt}" />`
                    }
                })
            }
            return comment
        }
    }
}
</script>
