<style lang="sass">
.keyboard {
    &.pop-transition .container {
        transition: transform .3s ease, opacity .3s linear;
        transform: translate3d(0, 100px, 0);
        opacity: 1;
    }
    &.pop-enter .container, &.pop-leave .container {
        transform: translate3d(0, -100%, 0);
        opacity: 0;
    }
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .3);
    .container {
        width: 620px;
        margin: 0 auto;
        padding-top: 50px;
        border-radius: 8px;
        font-size: 34px;
    }
    .title {
        margin: 0 50px;
    }
    textarea {
        border-radius: 8px;
        font-size: 34px;
        width: 520px;
        height: 200px;
        border: none;
        resize: none;
        padding: 1em;
        margin: 1em 50px;
    }
    .btns {
        > div {
            cursor: pointer;
            width: 50%;
            display: inline-block;
            text-align: center;
            padding: 1em 0;
        }
    }
}
</style>
<template>
<div class="keyboard">
    <div class="container bg-default">
        <div class="title">{{params.placeholder || '发表评论'}}</div>
        <textarea v-model="content"></textarea>
        <div class="btns border-top"><div @click="close">取消</div><div @click="submit" class="border-left green">发表</div></div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Keyboard',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            content: ''
        };
    },
    // ready() { // 会导致微信卡住...
    //     setTimeout(() => document.querySelector('textarea').focus(), 500);
    // },
    methods: {
        submit() {
            const content = this.content.trim();
            if(content.length > 0 && content.length <= 150) {
                this.params.cb(content);
                this.close();
            } else {
                this.action('toast', {success: false, text: '评论内容为1~150字！'});
            }
        },
        close() {
            this.params.handler = undefined;
        }
    }
}
</script>
