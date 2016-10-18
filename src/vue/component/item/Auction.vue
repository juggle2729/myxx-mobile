<style lang="stylus">
@import '~style/partials/mixin'
@import '~style/partials/var'
.auction-item
    .photo
        width: 224px
        height: 224px
    .price
        color: #389d00
        margin-left: -6px
    .status
        line-height: 60px
    .list-item
        padding: 24px
        &.preview
            .price
                color: #2170c1
            .status
                border(a, #2170c1)
                color: #2170c1
        &.auctioning
            .price
                color: #389d00
            .status
                border(a, #389d00)
                color: #389d00
        &.successful
            .price
                color: #cc3f4f
            .status
                color: #888
                background: #efefef
    .winned
        width: 118px
        height: 112px
        background: url($qn + "auction/winned.png")
        background-size: cover

        position: absolute
        top: 0
        right: 0
</style>
<template lang="jade">
.auction-item
    .hr
    .list-item.flex.relative(:class="itemClass(item.status)", v-link="{name: 'auction', params: {id: }}")
        .photo(v-bg='item.product.first_picture')
        .info.flex-1.mgl-24
            .title.fz-30.line-clamp {{ item.product.title }}
            .studio.fz-26.light.mgt-20 {{ item.product.shop || "" }}
            .fz-40.flex.mgt-26
                .price.flex-1 ￥{{item.current_price}}
                    span.mg-12.fz-22.light 当前价
                span.fz-26.gray {{ item.bid_count }}人出价
            .status.fz-26.pdl-24.mgt-16
                template(v-if="item.status === 'auctioning'") 拍卖中 - 距结束 {{ endTime(item.end_time) }}
                template(v-if="item.status === 'preview'") 未开始 - 距开始 {{ endTime(item.start_time) }}
                template(v-if="item.status === 'successful'") 已结拍
            .winned(v-if="item.has_winned")
</template>
<script>
import paging from 'paging'
export default {
    name: 'auction-item',

    props: {
        item: [Object]
    },

    methods: {
        endTime(time) {
            const now = Date.now()
            const diff = time - now
            if(diff <=0 ) {
                return '0分0秒'
            }

            const oneMinute = 60 * 1000
            const oneHour = 60 * oneMinute

            if(diff > oneHour) {
                const atHour = Math.floor(diff / oneHour)
                return atHour + '小时' + Math.floor((diff - atHour * oneHour) / oneMinute) + '分'
            } else {
                const atMinute = Math.floor(diff / oneMinute)
                return atMinute + '分' + Math.floor(diff - atMinute * oneMinute) + '秒'
            }
        },
        itemClass(status) {
            return {
                preview: status === 'preview',
                auctioning: status === 'auctioning',
                successful: status === 'successful'
            }
        }
    }
}
</script>