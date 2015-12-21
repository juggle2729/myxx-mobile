<template>
    <div class="font-32 gray center">消息</div>
    <div class="font-32 gray center" @click="comment">评论</div>
</template>

<script>
export default {
    name: 'MessageView',
    methods: {
        comment(user) {
            let comment = {
                content: '123'
            };
            if(user) {
                comment.reply_to = user.id;
            }
            this.$post(`users/target/31/type/10/comments`, comment, (resp) => {
                    debugger;
                });
        }
    }
}
</script>
