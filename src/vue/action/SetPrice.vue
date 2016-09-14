<style lang="stylus">
.set-price
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
    input
        border-radius: 8px
        font-size: 30px
        width: 540px
        height: 80px
        border: none
        resize: none
        padding: 1em
        margin: 1em 40px 0
    .warn
        padding: 14px 0 14px 2.5em
        line-height: 30px
        .icon
            border-radius: 50%
            font-weight: bold
            &::before
                padding-left: 1px
    .btns
        > div
            cursor: pointer
            width: 50%
            display: inline-block
            text-align: center
            padding: 1em 0
</style>
<template>
<div class="set-price">
    <div class="container bg">
        <div class="title center">当前竞标价{{params.bid.ceil_price | price}}</div>
        <input class="red" type="number" v-model="price" placeholder="请输入修改后的价格" />
        <div class="warn red fz-24"><i v-show="warn" class="icon icon-warn white bg-red mgr-10"></i><span>{{warn}}</span></div>
        <div class="btns bdt"><div @click="close">取消</div><div @click="submit" class="bdl red">确认</div></div>
    </div>
</div>
</template>
<script>
export default {
    name: 'set-price',
    props: {
        params: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            warn: '',
            price: ''
        }
    },

    methods: {
        submit() {
            const [newPrice, oldPrice] = [this.price*100, this.params.bid.ceil_price]
            if(!/^\d+$/.test(this.price)) {
                this.warn = '请输入数字'
            } else if(oldPrice && newPrice >= oldPrice) {
                this.warn = '请输入低于当前的竞标价'
            } else {
                this.params.cb(this.params.bid, newPrice)
                this.close()
            }
        },
        close() {
            this.params.handler = undefined;
        }
    }
}
</script>
