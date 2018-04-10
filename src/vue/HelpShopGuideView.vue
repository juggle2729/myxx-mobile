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
        .flex.pdh.line-height-100.fz-30(v-for="item in guide.items", :class="{'bdt': $index > 0}", v-link="{name: 'help-media', params: {type: item.id}}")
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
                    cover: '/shop/guide/cover_4.png?v4',
                    items: [
                        { title: '自然光标记是什么？有什么好处？', id: 'guide_9'},
                        { title: '烟标图标记是什么？有什么好处？', id: 'guide_10'}
                    ]
                }, {
                    cover: '/shop/guide/cover_1.png?v4',
                    items: [
                        { title: '这样发布商品可以获得大量曝光！', id: 'guide_1' },
                        { title: '想要更多关注和订单？教你几招', id: 'guide_2' }
                    ]
                }, {
                    cover: '/shop/guide/cover_2.png?v4',
                    items: [
                        { title: '评价是店铺的“最强代言人”', id: 'guide_3' },
                        { title: '店铺积分对我来说有何用？', id: 'guide_4' },
                        { title: '如何打造个性化店铺？', id: 'guide_5' }
                    ]
                }, {
                    cover: '/shop/guide/cover_3.png?v4',
                    items: [
                        { title: '买家付的钱去哪里了？如何提现？', id: 'guide_6' },
                        { title: '平台交易规则是怎样的？', id: 'guide_7' },
                        { title: '平台退货规则是怎样的？', id: 'guide_8'}
                    ]
                }
            ]
        }
    }
}
</script>