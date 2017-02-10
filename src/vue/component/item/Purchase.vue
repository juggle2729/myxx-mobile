<style lang="stylus">
.purchase-item
    .item
        padding: 24px 32px 32px
        position: relative

        .mark
            position: absolute
            top: 0
            right: 0
            width: 184px
            height: 144px

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

    .btns
        >div
            border-radius: 8px
            display: inline-block
            text-align: center
        .line-height-90
            width: 333px
        .line-height-68
            padding: 0 20px
</style>
<template lang="jade">
.purchase-item.bg-white(v-link="{name: 'purchase', params: {id: item.id}}")
    .item
        img.mark(v-if="item.win_count", :src="'purchase/winned.png' | qn")
        header.flex.fz-26
            avatar(:user='item.owner', :size='50')
            .name.gray.flex-1 {{item.owner.nickname}}
            .guarantee.fz-22.gray.bd(v-if="paid", v-link="{name: 'purchase-help', query: {subject: 'guarantee'}}")
                img(:src="'icon/guarantee.png' | qn")
                span 保证金已付
            .txt-right.flex-1.red(v-else) 未支付保证金
        .desc.mgt-24.fz-30.user-txt
            span.red 预算￥{{Math.round(this.item.price_max/100)}}左右
            |   {{item.description}}
        ul.medias.flex(:class="{'mgt-24': item.pictures && item.pictures.length > 0}")
            li.img(v-for="pic in item.pictures", track-by="$index", v-bg="pic")
        ul.tags.fz-22.gray(:class="{'mgt-24': item.attributes && item.attributes.length > 0}")
            li(v-for='attr in item.attributes') {{attr}}
        .fz-26.flex.light(v-if="!isDetail", :class="{'mgt-32': !isDetail}")
            .flex.gray
                span.mgr-8(:class="{'red': item.total_count}") {{item.total_count}}
                | 个竞标
                .mgh-14(v-if="item.win_count") •
                span.red.mgr-8(v-if="item.win_count") {{item.win_count}}
                span(v-if="item.win_count") 个中标
    .pdh-32(v-if="!paid")
        .btns.fz-30.bdt.txt-right(v-if="!isDetail", :class="{'line-height-98': !isDetail}")
            .line-height-68.mgr.bd-gray(@click.stop="del(item.id)") 删除此求购
            .line-height-68.white.bg-red(@click.stop="pay()") 立即支付保证金
        .btns.fz-30(v-else)
            .line-height-90.mgr.bd-gray(@click.stop="del(item.id)") 删除此求购
            .line-height-90.white.bg-red(@click.stop="pay()") 立即支付保证金
</template>
<script>
export default {
    name: 'PurchaseItem',
    
    props: {
        item: Object
    },

    computed: {
        paid() {
            return this.item.status !=='np'
        },
        
        isDetail() {
            return this.$route.name === 'purchase'
        }
    },
    
    methods: {
        del(id) {
            this.action('confirm', {
                text: '确定删除此求购？',
                labels: ['取消', '删除']
            }).then((data) => {
                if(data === '1') {
                    this.$delete(`mall/purchase/${id}`)
                        .then(() => {
                            this.action('toast', {success: 1, text: '删除成功'})
                            this.env.isIOS ? location.reload(true) : this.action('reloadUrl')
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
        }
    }
}
</script>
