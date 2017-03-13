<style lang="stylus">
.shop-guide-view
    .item
        border-radius: 8px
        img
            width: 100%
        .icon-enter
            width: 26px
            height: 26px
</style>
<template lang="pug">
.shop-guide-view.bg.pdv
    .item.bg-white.mgh-24.mgb(v-for="guide in guides")
        img(:src="guide.cover | qn")
        .flex.pdh.line-height-100.fz-30(v-for="item in guide.items", :class="{'bdt': $index > 0}", v-link="{name: 'guide-detail', params: {id: item.id}}")
            .flex-1 {{item.title}}
            icon.gray(name="enter")
</template>
<script>
import shareable from 'shareable'
export default {
    name: 'shop-guide',

    mixins: [shareable],

    ready() {
        this.setShareData({})
    },

    data() {
        return {
            guides: [
                {
                    cover: '/shop/guide/cover_1.png',
                    items: [
                        { title: '这样发布商品可以获得大量曝光！', id: '1' },
                        { title: '想要更多关注和订单？教你几招', id: '2' }
                    ]
                }, {
                    cover: '/shop/guide/cover_2.png',
                    items: [
                        { title: '评价是店铺的“最强代言人”', id: '3' },
                        { title: '店铺积分对我来说有何用？', id: '4' },
                        { title: '如何打造个性化店铺？', id: '5' }
                    ]
                }, {
                    cover: '/shop/guide/cover_3.png',
                    items: [
                        { title: '买家付的钱去哪里了？如何提现？', id: '6' },
                        { title: '平台交易规则是怎样的？', id: '7' },
                        { title: '平台退货规则是怎样的？', id: '8'}
                    ]
                }
            ]
        }
    }
}
</script>