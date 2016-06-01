<style lang="sass">
.delete-action {
    &.pop-transition {
        opacity: 1;
        transition: opacity .2s ease;
        .container {
            transition: transform .2s ease;
            transform: translate3d(-50%, 0, 0);
        }
    }
    &.pop-enter , &.pop-leave {
        opacity: 0;
        .container {
            transform: translate3d(-50%, 100%, 0);
        }
    }
    width: 100%;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .6);
    .container {
        bottom: 0;
        width: 100%;
        background-color: white;
    }
    .delete, .cancel {
        display: block;
        text-align: center;
        font-size: 36px;
        line-height: 56px;
        padding: 20px 0;
    }
}
</style>
<template>
<div class="delete-action fixed" @click="close">
    <div class="container fixed">
        <div class="delete red" @click="delete">删除</div>
        <div class="separator"></div>
        <div class="cancel" @click="cancel">取消</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'Delete',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    methods: {
        delete() {
            this.params.cb('1');
            this.close();
        },
        cancel() {
            this.params.cb('0');
            this.close();
        },
        close() {
            this.params.handler = undefined;
        }
    }
}
</script>
