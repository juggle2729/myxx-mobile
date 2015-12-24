<style lang="sass">
.comment-component {
    padding: 24px 32px;
    .header {
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
    }
}
</style>
<template>
<div class="comment-component">
    <div class="header border-bottom font-22">
        <div>评论{{total}}</div>
        <div @click="comment($event)" class="red"><i class="icon-comment"></i><span>我要评论</span></div>
    </div>
    <ul>
        <li class="margin-bottom" v-for="c in comments">
            <div class="author">
                <div class="avatar margin-right" v-bg.sm="c.reply_from.photo" alt="{{c.reply_from.name}}"></div>
                <div>
                    <h3 class="font-26 blue" @click="comment($event, c.reply_from)">{{c.reply_from.name}}</h3>
                    <p class="font-22 light margin-top">{{c.create_at | moment}}</p>
                </div>
            </div>
            <div class="font-30 light">
                <span v-if="c.reply_to" class="label">回复<span @click="comment($event, c.reply_to)" class="blue">{{c.reply_to.name}}</span>:</span>
                <span>{{c.content}}</span>
            </div>
        </li>
        <li v-show="!total" class="center light font-26 margin-top">还没有人评论</li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'Comment',
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
            total: 0,
            comments: []
        }
    },
    created() {
        this.$watch('id', () => {
            this.fetch();
        });
        // 监听广播事件
        this.$on('reply', (e, user) => {
            debugger;
        });
    },
    events: {
        scrollToBottom(e) {
            console.debug('xxx');
        }
    },
    methods: {
        comment(e, user) {
            debugger;
            const id = user ? user.id : '-1';
            const rect = e.target.getBoundingClientRect();
            const position = rect.top + rect.height + window.scrollY;
            const placeholder = user ? '回复' + user.name : '';
            this.action('keyboard', {id, placeholder, position})
                .then((resp) => {
                    let comment = {
                        content: resp
                    };
                    if(user) {
                        comment.reply_to = user.id;
                    }
                    this.$post(`users/target/${this.id}/type/${this.type}/comments`, comment)
                        .then(() => {
                            this.fetch();
                        });
                });
        },
        fetch() {
            this.$get(`users/target/${this.id}/type/${this.type}/comments`)
                .then((comments) => {
                    this.comments = comments.comments;
                    this.total = comments.total;
                });
        }
    }
}
</script>
