<style lang="sass">
.confirm-action {
    &.pop-transition {
        opacity: 1;
        transition: opacity .3s ease;
        // .container {
        //     transition: transform .3s linear;
        //     transform: translate3d(0, 400px, 0);
        // }
    }
    &.pop-enter, &.pop-leave {
        opacity: 0;
        // .container {
        //     transform: translate3d(0, -100%, 0);
        // }
    }
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .3);
    .container {
        width: 620px;
        margin: 0 auto;
        padding-top: 40px;
        border-radius: 8px;
        font-size: 30px;
        transform: translate3d(0, 400px, 0);
    }
    .btns {
        margin-top: 40px;
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
<div class="confirm-action fixed">
    <div class="container bg-default">
        <div class="center">{{params.text}}</div>
        <div class="btns border-top"><div @click="close('0')">取消</div><div @click="close('1')" class="border-left red">确定</div></div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Confirm',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    methods: {
        close(decision) {
            this.params.cb(decision);
            this.params.handler = undefined;
        }
    }
}
</script>
