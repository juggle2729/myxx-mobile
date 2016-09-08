<style lang="stylus">
.keyboard
    &.pop-transition
        opacity: 1
        transition: opacity .3s ease
        .container
            transition: transform .3s linear
            transform: translate3d(0, 100px, 0)
    &.pop-enter, &.pop-leave
        opacity: 0
        .container
            transform: translate3d(0, -100%, 0)
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 999
    background-color: rgba(0, 0, 0, .3)
    .container
        width: 620px
        margin: 0 auto
        padding-top: 40px
        border-radius: 8px
        font-size: 30px
    .title
        margin: 0 40px
        .count
            float: right
    textarea
        border-radius: 8px
        font-size: 30px
        width: 540px
        height: 200px
        border: none
        resize: none
        padding: 1em
        margin: 1em 40px
    .btns
        > div
            cursor: pointer
            width: 50%
            display: inline-block
            text-align: center
            padding: 1em 0
</style>
<template lang="jade">
.keyboard
    .container.bg
        .title
            | {{params.placeholder || '发表评论'}}
            span.count.gray(:class="{'red': content.length>max}") {{content.length}}/{{max}}
        textarea(v-model='content', maxlength='150')
        .btns.border-top
            div(@click='close') 取消
            .border-left(@click='submit', :class="{'green': content.length>0 && content.length<max}") 发表
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
            max: 150,
            content: ''
        }
    },
    ready() {
        //IMPROVE 输入框autofocus
    },
    methods: {
        submit() {
            const content = this.content.trim()
            if(content.length > 0 && this.content.length <= this.max) {
                this.params.cb(content)
                this.close()
            }
        },
        close() {
            this.params.handler = undefined
        }
    }
}
</script>
