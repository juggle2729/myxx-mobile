<style lang="stylus">
@import '~style/partials/mixin'
.coupon-select
    flex-direction column
    position fixed
    width 100%
    top 0
    bottom 0
    z-index 999
    &.pop-transition
        opacity: 1
        transition: opacity .3s ease
    &.pop-enter, &.pop-leave
        opacity: 0
    .mask
        width 100%
    .container
        position absolute
        left 0
        bottom 0
        width 100%
    .title
        line-height 80px
    .item
        height 120px
    .icon
        width 46px
        height 46px
    .close
        height 100px
        justify-content center
</style>
<template lang="pug">
.coupon-select.flex(v-show="show")
    .mask.flex-1.bg-opacity-7(@click="close")
    .container.bg-white
        .title.pdl-32.fz-26.gray-8f.bdb {{ type === 'shop' ? '店铺优惠券' : '平台优惠券' }}
        .flex.item.mgh-32.bdb(v-for="coupon in list", @click="select(coupon)")
            .fz-30.black-24.flex-1 {{ coupon.title }}
            icon(:name="+coupon.id === +selected.id ? 'checked' : 'uncheck'")
        .flex.item.pdh-32(@click="select()")
            .fz-30.black-24.flex-1 不使用优惠券
            icon(:name="lodash.isEmpty(selected) ? 'checked' : 'uncheck'")
        .close.fz-36.red-e5.flex.bdt(@click="close") 关闭
</template>
<script>
export default {
    name: 'coupon-select',

    props: {
        list: {
            type: Array,
            required: true
        },
        selected: Object,
        type: {
            type: String,
            default: 'shop'
        },
        show: {
            type: Boolean,
            required: false
        }
    },

    methods: {
        close() {
            this.show = false
        },
        select(coupon) {
            this.$dispatch('selectCoupon', coupon || {}, this.type)
            this.close()
        }
    }
}
</script>