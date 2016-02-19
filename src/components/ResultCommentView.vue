<style lang="sass">
.result-comment-view {
    height: 100%;
    ul {
        padding: 0 32px 130px 32px;
    }
    li {
        padding-bottom: 20px;
        .author {
            display: -webkit-box;
            display: -webkit-inline-box;
            -webkit-box-align: center;
            /*height: 108px;*/
            margin: 20px 0;
        }
        span {
            line-height: 46px;
        }
        .content {
            margin-left: 88px;
            line-height: 1.5;
        }
    }
    li:last-of-type {
        padding-bottom: 0;
        background-image: none;
    }
    .no-comment {
        padding: 48px 0 24px;
    }
    .load-more {
        padding-bottom: 130px;
    }
    .fake-input {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #f9f9f9;
        color: red;
        height: 98px;
        padding: 16px;
        .input {
            background-color: white;
            color: #c6c6c6;
            padding: 0 20px;
            height: 72px;
            line-height: 72px;
            border-radius: 8px;
        }
        .submit {
            line-height: 72px;
            margin-left: 16px;
            width: 140px;
            height: 72px;
            color: white;
            background-color: #b2b2b2;
            border-radius: 8px;
        }
    }
}
</style>
<template>
<div class="result-comment-view">
    <ul v-if="items.length" class="border-bottom bg-white">
        <li class="border-bottom" v-for="c in items" @click="clicked(c, $event, $index)">
            <div class="author">
                <div class="avatar margin-right" @click.stop="gotoProfile(c.reply_from)" v-bg.sm="c.reply_from.photo" alt="{{c.reply_from.name}}"></div>
                <div>
                    <h3 class="font-26">{{c.reply_from.name}}</h3>
                    <p class="font-22 light margin-top">{{c.create_at | moment}}</p>
                </div>
            </div>
            <div class="font-30 content">
                <span v-if="c.reply_to" class="label">回复<span @click.stop="gotoProfile(c.reply_to)" >{{c.reply_to.name}}</span>:</span><span>{{c.content}}</span>
            </div>
        </li>
    </ul>
    <partial v-else name="empty-page"></partial>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <div class="fake-input font-30 flex" @click="comment($event)" >
        <div class="input flex-1">点击此处发表评论...</div>
        <div class="submit center">发送</div>
    </div>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'ResultCommentView',
    mixins: [PagingMixin],
    data() {
        return {
            uid: 0,
            emptyTitle: '还没有人评论'
        }
    },
    computed: {
        api() {
            return 'users/target/' + this.$route.params.id + '/type/20/comments';
        },
        paging() {
            return {
                path: this.api,
                list: 'comments',
                params: {
                    limit: 10
                }
            }
        }
    },
    ready() {
        this.uid = ('' + Date.now()).substr(-5);
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    methods: {
        comment(e) {
            const id = this.uid;
            const placeholder = '';
            const position = this._getPosition(e);
            this.action('keyboard', {id, placeholder, position})
                .then((content) => {
                    if(content) {
                        this.$post(this.api, {content})
                            .then((result) => {
                                _.merge(result, {
                                    content,
                                    create_at: Date.now(),
                                    reply_from: {
                                        id: this.self.id,
                                        photo: this.self.photo,
                                        name: this.self.nickname
                                    }
                                });
                                this.items.splice(0, 0, result);
                                this.action('toast', {success: 1, text: '回复成功'});
                            });
                    }
                });
        },
        clicked(comment, e, index) {
            const currUserId = _.get(this, 'self.id');
            if(!currUserId) {
                this.action('login');
            } else if(currUserId == comment.reply_from.id) { // do NOT use ===
                this.action('delete', '')
                    .then((confirm) => {
                        if(confirm === '1') {
                            return this.$delete(`${this.api}/${comment.id}`);
                        }
                    }).then((result) => {
                        if(result) {
                            this.action('toast', {success: 1, text: '删除成功'});
                            this.items.splice(index, 1);
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
                                            photo: this.self.photo,
                                            name: this.self.nickname
                                        }
                                    });
                                    this.items.splice(0, 0, result);
                                    this.action('toast', {success: 1, text: '回复成功'});
                                });
                        }
                    });
            }
        },
        gotoProfile(user) {
            let id = user.id || user.user_id;
            let name = user.website_status === true ? 'master' : 'user-profile';
            this.$route.router.go({name, params: {id}});
        },
        _getPosition(e) {
            const rect = e.target.getBoundingClientRect();
            return rect.top + rect.height + window.scrollY;
        }
    }
}
</script>