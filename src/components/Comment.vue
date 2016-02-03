<style lang="sass">
.comment-component {
    padding: 0 32px 24px 32px;
    .comment-header {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: justify;
        height: 80px;
    }
    li {
        padding-bottom: 20px;
        .author {
            display: -webkit-box;
            display: -webkit-inline-box;
            -webkit-box-align: center;
            height: 108px;
        }
        span {
            line-height: 46px;
        }
        .content {
            margin-left: 88px;
            line-height: 1.5;
        }
    }
    li:nth-last-child(2) {
        background-image: none;
    }
    .nocomment {
        margin-top: 48px;
        margin-bottom: 24px;
    }
}
</style>
<template>
<div class="comment-component bg-white border-bottom">
    <div class="comment-header border-bottom font-22">
        <div class="gray">评论&nbsp;&nbsp;{{items.total}}</div>
        <div v-if="!hasInput" @click="comment($event)" class="red"><i class="icon-comment"></i><span>我要评论</span></div>
    </div>
    <ul>
        <li class="border-bottom" v-for="c in items" @click="clicked(c, $event)">
            <div class="author" v-link="c.reply_from | profile">
                <div class="avatar margin-right" v-bg.sm="c.reply_from.photo" alt="{{c.reply_from.name}}"></div>
                <div>
                    <h3 class="font-26" v-link="c.reply_from | profile">{{c.reply_from.name}}</h3>
                    <p class="font-22 light margin-top">{{c.create_at | moment}}</p>
                </div>
            </div>
            <div class="font-30 content">
                <span v-if="c.reply_to" class="label">回复<span v-link="c.reply_to | profile">{{c.reply_to.name}}</span>:</span><span>{{c.content}}</span>
            </div>
        </li>
        <li v-show="!items.length" class="center light font-26 nocomment">还没有人评论</li>
    </ul>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'Comment',
    mixins: [PagingMixin],
    props: {
        id: {
            default: -1
        },
        type: {
            default: 10
        },
        hasInput: {
            default: false
        }
    },
    data() {
        return {
            uid: 0,
            to: undefined
        }
    },
    computed: {
        api() {
            return `users/target/${this.id}/type/${this.type}/comments`;
        },
        paging() {
            return {
                path: `users/target/${this.id}/type/${this.type}/comments`,
                list: 'comments',
                params: {
                    limit: 10
                }
            }
        }
    },
    created() {
        this.uid = ('' + Date.now()).substr(-5);
        this.$watch('id', () => {
            this.fetch();
            if(this.$route.query.comment) {
                this.$el.scrollIntoView();
            }
        });
        // 监听广播事件
        this.$on('comment', (e) => {
            this.comment(e);
        });
        this.$on('reply', (e, user) => {
            this.reply(e, user);
        });
        this.$on('fetch', () => {
            this.fetch();
        });
    },
    methods: {
        clicked(comment, e) {
            const currUserId = _.get(this, 'self.id');
            if(!currUserId) {
                this.action('login');
            } else if(+currUserId === comment.reply_from.id) {
                this.action('delete', '')
                    .then((confirm) => {
                        if(confirm === '1') {
                            this.$delete(`${this.api}/${comment.id}`)
                                .then(() => {
                                    this.action('toast', {success: 1, text: '评论删除成功'});
                                    this.fetch(true);
                                });
                        }
                    });
            } else {
                console.log('reply');
            }
        },
        comment(e) {
            const id = this.uid;
            const placeholder = '';
            const rect = e.target.getBoundingClientRect();
            const position = rect.top + rect.height + window.scrollY;
            this.action('keyboard', {id, placeholder, position})
                .then((content) => {
                    if(content && typeof content === 'string') {
                        this.$post(`users/target/${this.id}/type/${this.type}/comments`, {content})
                            .then(() => {
                                this.fetch(true);
                            });
                    }
                });
        },
        reply(user, e) {
            this.to = user;
            const id = this.uid + _.get(this, 'self.id', '');
            const placeholder = '回复' + user.name;
            const rect = e.target.getBoundingClientRect();
            const position = rect.top + rect.height + window.scrollY;
            this.action('keyboard', {id, placeholder, position})
                .then((content) => {
                    if(content && typeof content === 'string') {
                        let reply_to = user.id;
                        this.$post(`users/target/${this.id}/type/${this.type}/comments`, {content, reply_to})
                            .then(() => {
                                this.fetch(true);
                            });
                    }
                });
        },
        remove(comment, index) {
            if(this.self && this.self.id == comment.reply_from.id) {
                this.action('delete', '')
                    .then((confirm) => {
                        if(confirm === '1') {
                            this.$delete(`users/target/${this.id}/type/${this.type}/comments/${comment.id}`)
                                .then(() => {
                                    this.action('toast', {success: 1, text: '评论删除成功'});
                                    this.fetch(true);
                                });
                        }
                    });
            }
        },
        // clickContent(comment, index, e) {
        //     if(this.self && this.self.id == comment.reply_from.id) {
        //         this.remove(comment, index);
        //     } else {
        //         this.reply(e, comment.reply_from);
        //     }
        // }
    }
}
</script>
