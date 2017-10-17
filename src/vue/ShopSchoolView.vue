<style lang="stylus">
.shop-school-view
    .tabs
        width 100%
        padding 36px 32px 15px
        overflow hidden
        .option
            float left
            width 164px
            border-radius 30px
            margin-bottom 20px
            &:not(:nth-child(4n))
                margin-right 10px
    .card
        -webkit-box-pack justify
        .desc
            width 410px
        .pic
            width 180px
            height @width
</style>
<template  lang="pug">
.shop-school-view.bg
    .tabs
        .option.center.fz-26.bg-white.line-height-60(v-for="tab in tabs", @click="changeCurrent(tab)", :class="tab.id===current ? 'red-e5': 'dark-6b'") {{ tab.name }}
    .pdh-20
        .card.bg-white.mgb.flex.pd-40.bd
            .desc
                .fz-34.black-24.line-clamp-3 一张图搞懂如何发布拍品一张图搞懂如何发布拍品一张图搞懂如何发布拍品一张图搞懂如何发布拍品
                .mgt-22.fz-22.gray-b3 阅读21344
            .pic.bg
        .card.bg-white.mgb.flex.pd-40.bd
            .desc
                .fz-34.black-24.line-clamp-3 一张图搞懂如何发布拍品一张图搞懂如何发布拍品一张图搞懂如何发布拍品一张图搞懂如何发布拍品
                .mgt-22.fz-22.gray-b3 阅读21344
            .pic.bg
</template>
<script>
import paging from 'paging'
export default {
    name: 'shop-school-view',

    data() {
        return {
            current: '1',
            tabs: [
                { id: '1', name: '最新发布'},
                { id: '2', name: '新手入门'},
                { id: '3', name: '规则解读'},
                { id: '4', name: '经验分享'},
                { id: '5', name: '官方公告'}
            ],
        }
    },

    methods: {
        changeCurrent(tab) {
            this.current = tab.id
        }
    }
}
</script>