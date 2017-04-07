<style lang="stylus">
.shop-coupon-view
    height: 100%
    padding: 32px
    header
        -webkit-box-align: start
        .hello
            border-radius: 6px
            padding: 24px
            position: relative
            &::before
                content: ''
                position: absolute
                left: -16px
                top: 16px
                width: 0
                height: 0
                border-top: 14px solid transparent
                border-right: 20px solid white
                border-bottom: 14px solid transparent

</style>
<template lang="pug">
.shop-coupon-view.bg-yellow(v-if='!$loadingRouteData')
    header.flex
        avatar(:user='user')
        .hello.flex-1.bd.mgl.fz-30.yellow.bg-white
            p Hi，我是{{user.nickname}}。
            p.mgt 送你N张优惠券，赶紧领取进店看看吧！
</template>
<script>
export default {
    name: 'shop-coupon-view',

    data() {
        return {
            user: null
        }
    },

    route: {
        data({ to, next }) {
            return this.$fetch(`users/${to.query.user}/profile`)
                .then(resp => {
                    this.user = resp
                })
        }
    }
}
</script>