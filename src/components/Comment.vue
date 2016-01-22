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
        .author {
            display: -webkit-box;
            -webkit-box-align: center;
            height: 108px;
        }
        span {
            line-height: 46px;
        }
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
        <div class="gray">评论&nbsp;&nbsp;{{total}}</div>
        <div @click="comment($event)" class="red"><i class="icon-comment"></i><span>我要评论</span></div>
    </div>
    <ul>
        <li class="margin-bottom" v-for="c in items">
            <div class="author">
                <div class="avatar margin-right" v-bg.sm="c.reply_from.photo" alt="{{c.reply_from.name}}" v-link="c.reply_from | profile"></div>
                <div>
                    <h3 class="font-26 blue" v-link="c.reply_from | profile">{{c.reply_from.name}}</h3>
                    <p class="font-22 light margin-top">{{c.create_at | moment}}</p>
                </div>
            </div>
            <div class="font-30" @click="clickContent(c, $index, $event)">
                <span v-if="c.reply_to" class="label">回复<span @click.stop="userProfile(c.reply_to)" class="blue">{{c.reply_to.name}}</span>:</span>
                <span class="user-input">{{c.content}}</span>
            </div>
        </li>
        <li v-show="!items.length" class="center light font-26 nocomment">还没有人评论</li>
    </ul>
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
        }
    },
    data() {
        return {
            uid: 0
        }
    },
    computed: {
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
        this.$on('reply', (e, user) => {
            this.reply(e, user);
        });
        this.$on('fetch', () => {
            this.fetch();
        });
    },
    methods: {
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
        reply(e, user) {
            const id = this.uid + (this.self ? this.self.id : '');
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
        clickContent(comment, index, e) {
            if(this.self && this.self.id == comment.reply_from.id) {
                this.remove(comment, index);
            } else {
                this.reply(e, comment.reply_from);
            }
        },
        userProfile(user){
            let name = 'user-profile';
            if(user.website_status === true) {
                name = 'master';
            }
            this.$route.router.go({'name': name, 'params': {'id': user.id}})
        }
    }
}
</script>
