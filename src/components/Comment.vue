<style lang="sass">
.comment-component {
    padding: 0 32px;
    label {
        margin-top: 50px;
    }
    .comment-header {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: justify;
        height: 80px;
    }
    li {
        -webkit-box-align: start;
        padding-bottom: 20px;
        .avatar-68 {
            margin: 20px 20px 0 0;
        }
        .author {
            padding: 20px 0;
        }
        span {
            line-height: 46px;
        }
        .content {
            line-height: 1.5;
            img {
                height: 46px;
                vertical-align: bottom;
            }
        }
    }
    li:nth-last-child(2) {
        background-image: none;
    }
    .nocomment {
        margin-top: 48px;
        margin-bottom: 24px;
    }
    .label .bg-yellow {
        padding: 0 5px;
        border-radius: 5px;
    }
    .comment-btn {
        height: 80px;
        line-height: 80px;
        width: 100%;
        border-radius: 10px;
        border: 0;
        cursor: pointer;
        display: block;
    }
    .fake-input {
        bottom: 0;
        width: 100%;
        background-color: #f9f9f9;
        color: red;
        height: 98px;
        padding: 16px;
        .emoji {
            border-radius: 50%;
            box-shadow: 0 0 0 1px #999999;
            margin-top: 4px; 
            width: 60px;
            height: 60px;
        }
        .input {
            background-color: white;
            color: #c6c6c6;
            padding: 0 20px;
            height: 72px;
            line-height: 72px;
            border-radius: 8px;
            margin:0 16px 0 20px;
        }
        .submit {
            line-height: 72px;
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
<div class="comment-component bg-white">
    <label v-if="env.isShare" for="comment-textarea" @click="comment()" class="comment-btn white font-30 bg-red center">我要评论</label>
    <div class="comment-header border-bottom font-22">
        <div class="gray">评论&nbsp;&nbsp;{{items.total}}</div>
    </div>
    <ul>
        <li class="border-bottom flex" v-for="c in items" @click="clicked(c, $index)">
            <avatar :user="c.reply_from"></avatar>
            <div class="flex-1">
                <div class="author flex">
                    <div class="font-26 flex-1 gray" :class="{'yellow': c.reply_from.is_identifier}">{{c.reply_from.name}}</div>
                    <div class="font-22 light margin-top">{{c.create_at | moment}}</div>
                </div>
                <div class="font-30 content">
                    <template v-if="c.reply_to">
                        <span v-if="c.reply_to.is_identifier" class="label"><span class="white bg-yellow" @click.stop="gotoProfile(c.reply_to)" >对{{c.reply_to.name}}说</span></span>
                        <span v-else class="label">回复<span class="gray" @click.stop="gotoProfile(c.reply_to)" >{{c.reply_to.name}}说</span>：</span>
                    </template>
                    <span>{{{c.content}}}</span>
                </div>
            </div>
        </li>
        <li v-show="!items.length" class="center light font-26 nocomment">还没有人评论</li>
    </ul>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <div v-if="!env.isShare" class="fake-input font-30 flex fixed" @click="comment()">
        <img class="emoji" :src="'emoji.svg' | qn" alt="表情">
        <div class="input flex-1">点击此处发表评论...</div>
        <div class="submit center">发送</div>
    </div>
</div>
</template>
<script>
import Q from 'q';
import paging from 'paging';
import Avatar from './Avatar.vue';
export default {
    name: 'Comment',
    mixins: [paging],
    components: {
        Avatar
    },
    props: {
        id: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    computed: {
        paging() {
            return {
                path: `users/target/${this.id}/type/${this.type}/comments|v3`,
                list: 'comments',
                id: 'id',
                params: {
                    limit: 10
                },
                transform(items) {
                    return items.map(this.emojify);
                }
            }
        }
    },
    created() {
        Q.Promise((resolve, reject) => {
            if(this.id) {
                resolve(this.id);
            } else {
                this.$watch('id', (id) => {
                    if(id) {
                        resolve(this.id);
                    }
                })
            }
        }).then(id => {
            if(localStorage.getItem(this.uid)) {
                const {url, method, data} = JSON.parse(localStorage.getItem(this.uid));
                localStorage.removeItem(this.uid); //立刻去掉缓存数据，防止重复提交
                return this.$req(url, method, data);          
            }
        }).then(resp => {
            resp && this.action('toast', {success: 1, text: '评论成功'});
            this.fetch();
        });
    },
    methods: {
        clicked(comment, index) {
            if(!this.self) {
                this.action('login');
            } else if(this.self.id == comment.reply_from.id) {
                this.action('delete')
                    .then((confirm) => {
                        return Q.Promise((resolve, reject) => {
                            if(confirm === '1') {
                                this.$delete(`users/target/${this.id}/type/${this.type}/comments/${comment.id}|v3`)
                                    .then(() => resolve());
                            } else {
                                reject();
                            }
                        });
                    }).then(() => {
                        this.action('toast', {success: 1, text: '删除成功'});
                        this.items.splice(index, 1);
                        this.items.total -= 1;
                    });
            } else {
                this.comment(comment.reply_from);
            }
        },
        comment(to) {
            // 鉴于客户端没有实现接口定义的细节， id, position 为废弃的参数
            let [id, placeholder, position, reply_to] = [1, '', 0, ''];
            if(to) {
                [placeholder, reply_to] = [`回复${to.name}`, to.id];
            }
            this.action('keyboard', {id, placeholder, position})
                .then((content) => {
                    return Q.Promise((resolve, reject) => {
                        if(content) {
                            let comment = {content};
                            to && _.merge(comment, {reply_to: to.id});
                            this.$post(`users/target/${this.id}/type/${this.type}/comments|v3`, comment)
                                .then((resp) => {
                                    resolve(_.merge(resp, {
                                        content,
                                        reply_to: to,
                                        create_at: Date.now(),
                                        reply_from: {
                                            id: this.self.id,
                                            photo: this.self.photo || this.self.avatarId,
                                            name: this.self.nickname
                                        }
                                    }));
                                });
                        } else {
                            reject();
                        }
                    });
                }).then((comment) => {
                    this.items.splice(0, 0, this.emojify(comment));
                    this.items.total += 1;
                    this.action('toast', {success: 1, text: comment.reply_to ? '回复成功' : '评论成功'});
                });
        },

        gotoProfile(user) {
            const [id, tab] = [user.id, user.shop_status ? 'jade' : 'story'];
            this.$route.router.go({name: 'user', params: {id, tab}});
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
