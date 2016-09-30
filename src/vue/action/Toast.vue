<style lang="stylus">
.toast
    &.pop-transition
        transition: opacity .3s ease
        opacity: 1
    &.pop-enter, &.pop-leave
        opacity: 0
    position: fixed
    z-index: 9999
    min-width: 200px
    min-height: 80px
    top: 380px
    left: 50%
    background: rgba(40,40,40,.75)
    text-align: center
    border-radius: 8px
    color: white
    padding: 24px
    [class^='icon-']
        font-size: 60px
        line-height: 80px
        color: #f76260
        margin-bottom: 24px
        padding-right: 0
        &.icon-success
            color: #04be02
    .text
        font-size: 34px
</style>
<template lang="pug">
.toast
    i(:class="{'icon-success': params.success==='1', 'icon-warn': params.success==='0'}")
    .text {{params.text}}
</template>
<script>
export default {
    name: 'Toast',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    ready() {
        _.delay(() => this.params.handler = undefined, 2000)
    }
}
</script>
