<style lang="sass">
.toast {
    &.pop-transition {
        transition: opacity .3s ease;
        opacity: 1;
    }
    &.pop-enter, &.pop-leave {
        opacity: 0;
    }
    position: fixed;
    z-index: 9999;
    width: 225px;
    min-height: 225px;
    top: 380px;
    left: 50%;
    background: rgba(40,40,40,.75);
    text-align: center;
    border-radius: 8px;
    color: white;
    padding: 24px;
    .status {
        font-size: 110px;
        color: #f76260;
        &.success {
            color: #04be02;
        }
    }
    .text {
        margin-top: 24px; 
        font-size: 34px;
    }
}
</style>
<template>
<div class="toast">
    <div class="status" :class="{'success': params.success === '1'}">{{params.success === '1' ? '&#10004;': '&#10007;'}}</div>
    <div class="text">{{params.text}}</div>
</div>
</template>
<script>
import _ from 'lodash';
export default {
    name: 'Toast',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    ready() {
        _.delay(() => this.params.handler = undefined, 2000);
    }
}
</script>
