<style lang="sass">
.jade-comment {
    padding: 0 0 32px 32px;
    .comment-header {
        -webkit-box-align: center;
        -webkit-box-pack: justify;
        height: 80px;
    }
    .comment {
        padding-bottom: 20px;
        .author {
            display: -webkit-box;
            display: -webkit-inline-box;
            -webkit-box-align: center;
            margin: 20px 0;
            .author-name {
                width: 480px;
            }
        }
        span {
            line-height: 46px;
        }
        .content {
            padding-right: 32px;
            margin-left: 88px;
            line-height: 1.5;
            img {
                height: 46px;
                vertical-align: bottom;
            }
        }
        .more {
            margin: 48px 0 16px 0;
            .button {
                width: 378px;
                height: 72px;
                text-align: center;
                line-height: 72px;
                border: 1px solid;
                border-radius: 8px;
            }
        }
    }
    .nocomment {
        margin-top: 48px;
        margin-bottom: 24px;
    }
}
</style>
<template>
    <div class="jade-comment bg-white">
        <div class="comment-header flex font-22 border-bottom">
            <div class="gray">评论&nbsp;&nbsp;{{total}}</div>
        </div>
            <div v-if="total > 0" class="comment" v-link="{name: 'comments', params: {id: id, type: 40}}">
                <div class="author flex">
                    <div class="avatar margin-right">
                        <avatar :user="c.reply_from"></avatar>
                    </div>
                    <div class="flex">
                        <h3 class="author-name font-26 light flex-1" :class="{'yellow': c.reply_from.is_identifier}">{{c.reply_from.name}}</h3>
                        <p class="font-26 light">{{c.create_at | moment}}</p>
                    </div>
                </div>
                <div class="content font-30">
                    <template v-if="c.reply_to">
                        <span v-if="c.reply_to.is_identifier" class="label"><span class="white bg-yellow">对{{c.reply_to.name}}说</span></span>
                        <span v-else class="label">回复<span class="gray">{{c.reply_to.name}}说</span>：</span>
                    </template>
                    <span>{{{c.content}}}</span>
                </div>
                <div v-if="total > 1" class="more">
                    <div class="button font-32 red border-red center-horizontal" >
                        查看全部评论
                    </div>
                </div>
            </div>
            <div v-else class="center light font-26 nocomment">还没有人评论</div>
    </div>
</template>
<script>
import Avatar from './Avatar.vue';
export default {
    name: 'JadeComment',
    props: {
        id: {
            default: 1
        }
    },
    components: {
        Avatar
    },
    data() {
        return {
            c: {},
            total: 0,
        }
    },
    computed: {
        api() {
            return `users/target/${this.id}/type/40/comments?limit=1|v3`;
        }
    },
    created() {
        this.$watch('id', () => {
            this.$get(`${this.api}`).then((data) => {
                if (data) {
                    this.total = data.total;
                    this.c = this.emojify(data.comments[0]);
                }
            });
        });
        // 监听广播事件
        this.$on('comment', (e) => {
            this.comment(e);
        });
    },
    methods: {
        comment(e) {
            const id = this.uid;
            const placeholder = '';
            const position = 0;
            this.action('keyboard', {id, placeholder, position})
                .then((content) => {
                    if(content) {
                        this.$post(`users/target/${this.id}/type/40/comments|v3`, {content})
                            .then((result) => {
                                this.c = this.emojify(result);
                                this.total += 1;
                                this.action('toast', {success: 1, text: '评论成功'});
                            });
                    }
                });
        },

        emojify(comment) {
            if(/\[.{1,3}?\]/.test(comment.content)) {
                comment.content = comment.content.replace(/\[(.{1,3}?)\]/g, (alt) => {
                    const index = this.config.emoji.indexOf(alt.replace(/\[|\]/g, ''));
                    if(index === -1) {
                        return alt;
                    } else {
                        return `<img src="${this.config.www}/emoji/${index}.png" alt="${alt}" />`;
                    }
                });
            }
            return comment;
        }
    }
}
</script>
