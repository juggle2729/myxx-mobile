<style lang="sass">
.master-comment-view {
    ul {
        padding: 0 32px 24px 32px;
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
    .no-comment {
        padding: 48px 0 24px;
    }
    .comment-form {
        position: fixed;
        display: -webkit-box;
        -webkit-box-align: end;
        -webkit-box-pack: justify;
        bottom: 0;
        width: 100%;
        min-height: 98px;
        padding: 16px;
        background-color: #f9f9f9;
        textarea {
            -webkit-box-flex: 1;
            padding: 12px;
            border: none;
            min-height: 72px;
            line-height: 1.5;
            border-radius: 8px;
            display: block;
            resize: none;
            color: #393939;
            &::-webkit-input-placeholder {
                color: #c6c6c6;
            }
        }
        .submit {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-box-align: center;
            -webkit-box-pack: justify;
        }
        [type='submit'] {
            border: none;
            height: 72px;
            border-radius: 8px;
            display: block;
            width: 140px;
            margin-left: 16px;
            background-color: #cc3f4f;
            &:disabled {
                background-color: #b2b2b2;
            }
        }
    }
}
</style>
<template>
<div class="master-comment-view bg-white">
    <ul class="border-bottom">
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
        <li v-if="!items.length" class="center light font-26 no-comment">还没有人评论</li>
    </ul>
    <div class="comment-form border-top">
        <textarea id="comment-input" class="font-30" v-model="text" rows="1" type="text" placeholder="点此处发表评论..."></textarea>
        <div class="submit">
            <div v-if="!valid && text.length" class="font-26 margin-bottom"><span class="red">{{text.length}}</span>/20</div>
            <input @click="submit" class="font-30 white" :disabled="!valid" type="submit" value="发送">
        </div>
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
            text: '',
            valid: false,
            lastChange: Date.now()
        }
    },
    computed: {
        paging() {
            return {
                path: `users/target/${this.$route.params.id}/type/20/comments`,
                list: 'comments',
                params: {
                    limit: 10
                }
            }
        }
    },
    ready() {
        this.$watch('text', (text) => {
            this.lastChange = Date.now();
            const textarea = document.getElementById('comment-input');
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
            this.valid = text.replace(' ', '').length > 0 && text.length <= 20;
        });
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    events: {
        scroll(e) {
            if((Date.now()-this.lastChange) > 200) {//  过滤键盘选字造成的屏幕滚动
                document.getElementById('comment-input').blur();
            }
        }
    },
    methods: {
        submit() {
            this.$post(`users/target/${this.$route.params.id}/type/20/comments`, {content: this.text})
                .then(() => {
                    this.text = '';
                    this.fetch(true);
                });
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