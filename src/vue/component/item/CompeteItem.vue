<style lang="stylus">
$base = '//o0x80w5li.qnssl.com/auction/'
bg($icon, $size)
    height $size
    background url($base + $icon + '.png') left center no-repeat
    background-size $size $size
.compete-item
    width 100%
    .pic
        width 148px
        height @width
        background yellow
        .line-height-30
            width 64px
    .desc
        width 518px
        height 148px
        .title
            width 100%
        .status
            width 100%
            height 60px
            left 0
            bottom 0
            -webkit-box-pack justify
            -webkit-box-align end
            .delete
                bg(delete, 26px)
                background-position left 33px
            .no-remind
                .fz-30
                    transform  translateY(3px)
            .delete, .no-remind
                height 100%
                -webkit-box-align end
</style>
<template lang="pug">
.compete-item.pd-32.bg-white.bdb.flex(v-link="{name: 'auction', params: {id: item.id}}")
    .pic.fz-22.white(v-bg.sm="item.product.cover")
        template(v-if="tab !== 'remind' && item.my_bid")
            .line-height-30.center(:class="bgColor") {{ item.my_bid.status_desc }}
    .desc.mgl-20.pdv-4.flex-1.relative
        .title.line-clamp.fz-26.black {{ item.product.title }}
        .price.fz-26.gray.mgt-20
            .inline-block(v-if="(tab !== 'remind' && item.status !== 'success') || (tab === 'remind' && item.status === 'going')")
                span 当前价
                span.mgl-10.red {{ item.current_price || item.upset_price | price }}
            .mgl-20.inline-block(v-if="tab !== 'remind' && item.status !== 'success' && item.my_bid")
                span 我的出价
                span.mgl-10.black {{ item.my_bid.bid_price | price }}
            .inline-block(v-if="item.status === 'preview' || (item.status === 'fail' && !item.my_bid)")
                span 起拍价
                span.mgl-10.red {{ item.upset_price | price }}
            .inline-block(v-if="item.status === 'success'")
                span 成交价
                span.mgl-10.black {{ item.current_price | price }}
        .status.fz-26.gray.absolute.flex
            template(v-if="item.status === 'going'")
                .flex-1 距结束 {{ item.real_end_time | diffNowTime }}
            template(v-if="item.status === 'preview'")
                .flex-1 距开始 {{ item.start_time | diffNowTime }}
            template(v-if="item.status === 'success' || item.status === 'fail'")
                .flex-1 {{ auctionStatus }}
            .no-remind.gray.flex(v-if="tab === 'remind'",  @click.stop="cancelRemind(item.id)")
                icon.fz-30(name="alarm")
                .pdl-8.fz-26 取消提醒
            .delete.pdl-38.gray.flex(v-if="tab === 'success' || tab === 'fail'", @click.stop="deleteAuction(item.id)") 删除
</template>
<script>
export default {
    name: 'compete-item',

    props: {
        item: Object,
        index: Number
    },

    data() {
        return {
            tab: this.$route.query.tab || 'going'
        }
    },

    computed: {
        auctionStatus() {
            switch (this.item.status) {
                case 'success':
                    return '已结拍'
                case 'fail':
                    return this.item.my_bid ? '已结拍' : '已流拍'
            }
        },
        bgColor() {
            switch (this.item.my_bid.status) {
                case 'ahead':
                    return 'bg-red'
                case 'out':
                    return 'bg-black'
                case 'win':
                    return 'bg-green-2e'
                case 'defeat':
                    return 'bg-black'
            }
        }
    },

    methods: {
        cancelRemind(auctionId) {
            this.action('confirm', {
                text: '确定要取消该拍卖提醒？',
                labels: ['取消', '确定']
            }).then((choice) => {
                if(choice === '1') {
                    this.$delete(`mall/auctions/myb/${auctionId}/remind`)
                        .then(() => {
                            this.action('toast', {success: 1, text: '设置成功'})
                            this.$dispatch('deleteAuction', this.index)
                        })
                }
            })
        },
        deleteAuction(auctionId) {
            this.action('confirm', {
                text: '确定要删除该拍卖？',
                labels: ['取消', '确定']
            }).then((choice) => {
                if(choice === '1') {
                    this.$delete(`mall/auctions/myb/${auctionId}`)
                        .then(() => {
                            this.action('toast', {success: 1, text: '删除成功'})
                            this.$dispatch('deleteAuction', this.index)
                        })
                }
            })
        }
    }
}
</script>