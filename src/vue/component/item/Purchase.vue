<style lang="stylus">
@import '~style/partials/var'
.purchase-item {
    padding: 24px 0 32px
    position: relative
    .mark {
        position: absolute
        top: 0
        right: 0
        width: 184px
        height: 144px
    }
    header, .desc, ul, footer {
        margin-left: 32px
        margin-right: 32px
    }
    header {
        .name {
            margin: 0 14px 0 20px
        }
        .guarantee {
            height: 48px
            line-height: 48px
            border-radius: 6px
            padding: 0 12px
            img {
                height: 24px
                margin-right: 5px
                vertical-align: text-bottom
            }
        }
        .red {
            text-align: right
        }
    }
    .desc {
        margin-top: 24px
        line-height: 1.3
        margin-bottom: 24px
        word-break: break-all
    }
    .medias {
        li {
            height: 222px
            width: 222px
            &:not(:last-child) {
                margin-right: 10px
            }
        }
    }
    .tags {
        margin-top: 24px
        margin-bottom: 32px
        li {
            display: inline-block
            background-color: #f5f5f5
            border-radius: 6px
            padding: 8px 12px
            margin-right: 8px
        }
    }
    footer {
        .flex-1::before {
            content: '•'
            margin: 0 14px
        }
    }
    .btns {
        margin-top: 32px
        margin-bottom: -12px
        padding: 20px 32px 0
        text-align: right
        .operation {
            display: inline-block
            padding: 0 1em
            height: 68px
            line-height: 68px
            border-radius: 8px
            text-align: center
        }
    }
}
</style>
<template lang="pug">
.purchase-item.bg-white(v-link="{name: 'purchase', params: {id: item.id}}")
    img.mark(v-if="item.win_count", :src="'purchase/winned.png' | qn")
    header.flex.fz-26
        avatar(:user='item.owner', :size='50')
        .name.gray.flex-1 {{item.owner.nickname}}
        .guarantee.fz-22.gray.bd(v-if="paid", v-link="{name: 'purchase-help', query: {subject: 'guarantee'}}")
            img(:src="'icon/guarantee.png' | qn")
            span 保证金已付
        .red.flex-1(v-else) 未支付保证金
    .desc.fz-30
        span.red 预算￥{{Math.round(this.item.price_max/100)}}左右
        |   {{item.description}}
    ul.medias.flex
        li.img(v-for="pic in item.pictures", track-by="$index", v-bg="pic")
    ul.tags.fz-22.gray
        li(v-for='attr in item.attributes') {{attr}}
    footer.fz-26.flex.light
        div
            span(:class="{'red': item.total_count, 'gray': !item.total_count}") {{item.total_count}}
            span.gray  个竞标
    .btns.bdt.fz-30(v-if="!paid")
        .operation.mgr.bd-gray(@click.stop="del(item.id)") 删除此求购
        .operation.white.bg-red(@click.stop="pay()") 立即支付保证金
</template>
<script>
const pingpp = require('pingpp-js');
export default {
    name: 'PurchaseItem',
    props: {
        item: Object
    },
    computed: {
        paid() {
            return this.item.status !=='np'
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
                this.$put(`mall/purchase/${this.item.id}/pay_purchase`, {
                    channel_type: 'wx_pub'
                }).then(data => {
                    pingpp.createPayment(data.charge, (result, err) => {
                        if (result !== "success") {
                            this.action('toast', {success: 0, text: result + " " + err.msg + " " + err.extra})
                        }
                        this.$router.go({name: 'purchases'})
                    })
                })
            } else if(this.env.isApp) {
                this.action('pay', {id: this.item.id, price: this.item.pledge, type: this.item.is_tob ? 'sale' : 'purchase'})
            } else {
                this.gotoDownload()
            }
        }
    }
}
</script>
