<style lang="stylus">
@import '~style/partials/mixin'
$base = '//o0x80w5li.qnssl.com/icon/'
bg($icon, $size)
    height $size
    background url($base + $icon + '.png') left center no-repeat
    background-size $size $size
.purchase-item
    .item
        padding: 24px 32px 38px
        position: relative
    .mark
        position absolute
        top 0
        right 36px
        width 149px
        height 44px
    header
        .name
            margin: 0 14px 0 20px
        .guarantee
            height: 48px
            line-height: 48px
            border-radius: 6px
            padding: 0 12px
            img
                height: 24px
                margin-right: 5px
                vertical-align: text-bottom
    .medias
        li
            height: 222px
            width: 222px
            &:not(:last-child)
                margin-right: 10px
    .tags
        li
            display: inline-block
            background-color: #f5f5f5
            border-radius: 6px
            padding: 8px 12px
            margin-right: 8px
    .num:first-letter
        color: #cc3f4f
    .operation
        -webkit-box-pack justify
    .delete
        bg(delete_bid, 25px)
        &.disabled
            bg(delete_bid_disabled, 25px)
    .pay_margin
        border(a, #e61717)
        width 160px
        line-height 36px
        border-radius 18px
</style>
<template  lang="pug">
.purchase-item.bg-white(@click="gotoDetail")
    .item
        img.mark(v-if="item.win_count", :src="'bid/winned.png' | qn")
        header.flex.fz-26
            avatar(:user='item.owner', :size='50')
            .name.gray-b3.flex-1 {{item.owner.nickname}}
            template(v-if="isDetail")
                .guarantee.fz-22.gray.bd(v-if="isPaid", v-link="{name: 'help-media', params: {type: 'guarantee'}}")
                    img(:src="'icon/guarantee.png' | qn")
                    span 保证金已付
                .txt-right.flex-1.red(v-else) 未支付保证金
        .desc.mgt-24.fz-30.black-24
            span.red-e6 预算￥{{Math.round(this.item.price_max/100)}}左右
            |   {{item.description}}
        ul.medias.flex(v-if="isDetail", :class="{'mgt-24': item.pictures && item.pictures.length > 0}")
            li.img(v-for="pic in item.pictures", track-by="$index", v-bg="pic", @click="coverflow(item.pictures, $index)")
        ul.medias.flex(v-else, :class="{'mgt-24': item.pictures && item.pictures.length > 0}")
            li.img(v-for="pic in item.pictures", track-by="$index", v-bg="pic")
        .fz-26.flex.operation.mgt-38(v-if="!isDetail")
            .flex.gray-8f(v-if="isPaid")
                span.mgr-8(:class="{'red': item.total_count}") {{item.total_count}}
                | 个竞标
                .mgh-14(v-if="item.win_count") •
                span.red.mgr-8(v-if="item.win_count") {{item.win_count}}
                span(v-if="item.win_count") 个中标
            .fz-24.red-e6.pay_margin.center(v-else, @click.stop="pay()") 支付保证金
            .delete.flex.pdl-42(:class="{'disabled gray-b3': isGoing, 'black-24': !isGoing}", @click.stop="del(item.id)") 删除此求购
</template>
<script>
export default {
    name: 'PurchaseItem',

    props: {
        item: Object,
        index: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            isDetail: false
        }
    },

    computed: {
        isPaid() {
            return this.item.status !=='np'
        },
        isEnd() {
            return this.item.status === 'fn'
        },
        isGoing() {
            return this.item.status === 'in'
        }
    },

    ready() {
        this.isDetail = this.$route.name === 'purchase'
    },

    methods: {
        del(id) {
            if (this.isGoing) return // 竞标中的求购不能删除
            this.action('confirm', {
                text: '确定删除此求购？',
                labels: ['取消', '删除']
            }).then((data) => {
                if(data === '1') {
                    this.$delete(`mall/purchase/${id}`)
                        .then(() => {
                            this.action('toast', {success: 1, text: '删除成功'})
                            this.$dispatch('deletePurchase', this.index)
                        })
                }
            })
        },
        pay() {
            if(this.env.isWechat) {
                this.$router.go({name: 'pay-channels', query: {id: this.item.id, type: 'bid'}})
            } else if(this.env.isApp) {
                this.action('pay', {id: this.item.id, price: this.item.pledge, type: this.item.is_tob ? 'sale' : 'purchase'})
            } else {
                this.gotoDownload()
            }
        },
        gotoDetail() {
            if(!this.isDetail) {
                this.$router.go({name: 'purchase', params: {id: this.item.id}})
            }
        }
    }
}
</script>
