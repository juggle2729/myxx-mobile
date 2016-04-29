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
                    width: 520px;
                }
            }
            span {
                line-height: 46px;
            }
            .content {
                padding-right: 32px;
                margin-left: 88px;
                line-height: 1.5;
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
            <div v-if="!!total" class="comment" @click="gotoComments(this.id, 30)">
                <div class="author">
                    <div class="avatar margin-right"  v-bg.sm="c.reply_from.photo" alt="{{c.reply_from.name}}"></div>
                    <div class="flex">
                        <h3 class="author-name font-26 light" :class="{'yellow': c.reply_from.is_identifier}">{{c.reply_from.name}}</h3>
                        <p class="font-26 light">{{c.create_at | moment}}</p>
                    </div>
                </div>
                <div class="content font-30">
                    <template v-if="c.reply_to">
                        <span v-if="c.reply_to.is_identifier" class="label"><span class="white bg-yellow">对{{c.reply_to.name}}说</span></span>
                        <span v-else class="label">回复<span class="gray">{{c.reply_to.name}}说</span>：</span>
                    </template>
                    <span>{{c.content}}</span>
                </div>
                <div class="more">
                    <div class="button font-32 red border-red center-horizontal" >
                        查看全部评论
                    </div>
                </div>
            </div>
            <div v-else class="center light font-26 nocomment">还没有人评论</div>
    </div>
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
            return `users/target/${this.id}/type/30/comments?limit=1`;
        }
    },
    created() {
        this.$watch('id', () => {
            this.$get(`${this.api}`).then((data) => {
                if (data) {
                    this.total = data.total;
                    this.c = data.comments[0];
                }
            });
        });
        this.uid = ('' + Date.now()).substr(-5);
        // 监听广播事件
        this.$on('comment', (e) => {
            this.comment(e);
        });
    },
    methods: {
        clicked(comment, e, index) {
            const currUserId = _.get(this, 'self.id');
            if(!currUserId) {
                this.action('login');
            } else if(currUserId == comment.reply_from.id) {
                this.action('delete', '')
                    .then((confirm) => {
                        if(confirm === '1') {
                            return this.$delete(`${this.api}/${comment.id}`);
                        }
                    }).then((result) => {
                        if(result) {
                            this.action('toast', {success: 1, text: '删除成功'});
                            this.items.splice(index, 1);
                            this.items.total -= 1;
                        }
                    });
            } else {
                const id = this.uid + _.get(this, 'self.id', '');
                const placeholder = '回复' + comment.reply_from.name;
                const position = this._getPosition(e);
                this.action('keyboard', {id, placeholder, position})
                    .then((content) => {
                        if(content) {
                            let reply_to = comment.reply_from;
                            this.$post(this.api, {content, reply_to: reply_to.id})
                                .then((result) => {
                                    _.merge(result, {
                                        content,
                                        create_at: Date.now(),
                                        reply_to,
                                        reply_from: {
                                            id: this.self.id,
                                            photo: this.self.avatarId,
                                            name: this.self.nickname
                                        }
                                    });
                                    this.items.splice(0, 0, result);
                                    this.items.total += 1;
                                    this.action('toast', {success: 1, text: '回复成功'});
                                });
                        }
                    });
            }
        },
        comment(e) {
            const id = this.uid;
            const placeholder = '';
            const position = this._getPosition(e);
            this.action('keyboard', {id, placeholder, position})
                .then((content) => {
                    if(content) {
                        this.$post(`users/target/${this.id}/type/${this.type}/comments`, {content})
                            .then((result) => {
                                _.merge(result, {
                                    content,
                                    create_at: Date.now(),
                                    reply_from: {
                                        id: this.self.id,
                                        photo: this.self.avatarId,
                                        name: this.self.nickname
                                    }
                                });
                                this.items.splice(0, 0, result);
                                this.items.total += 1;
                                this.action('toast', {success: 1, text: '回复成功'});
                            });
                    }
                });
        },
        gotoProfile(user) {
            const [id, tab] = [user.id, user.shop_status ? 'jade' : 'story'];
            this.$route.router.go({name: 'user', params: {id, tab}});
        },
        gotoComments(id, type) {
            this.$route.router.go({name: 'comments', params: {id, type}});
        },
        _getPosition(e) {
            const rect = e.target.getBoundingClientRect();
            return rect.top + rect.height + window.scrollY;
        }
    }

}
</script>
