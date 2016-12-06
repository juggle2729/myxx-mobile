<style lang="stylus">
@import '~style/partials/var'
.purchases-view
    .banner
        width: 100%
        display: block
    padding-bottom: 98px
    .purchase-btn
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        line-height: 98px
        text-align: center
</style>
<template lang="jade">
.purchases-view
    img.banner(:src="'purchase/banner.jpg' | qn", v-link="{name: 'bid-help-support'}")
    template(v-for="item in items")
        .hr
        purchase-item(:item="item")
    empty(v-if="items.isEmpty" title="暂无求购")
    .purchase-btn.bg-red.white.fz-34(@click="purchase()") 我要求购
</template>
<script>
import Q from 'q'
import paging from 'paging'
import PurchaseItem from 'component/item/Purchase.vue'
export default {
    name: 'PurchasesView',
    mixins: [paging],
    components: [PurchaseItem],

    data() {
        return {
            firstVisit: false
        }
    },

    computed: {
        paging() {
            return {
                path: 'mall/all_purchases',
                params: {
                    is_tob: false
                }
            }
        }
    },

    ready() {
        this.showAction()
        this.$on('restore', this.showAction)
    },

    methods: {
        purchase() {
            Q.promise(resolve => {
                if(this.self) {
                    if(this.env.isWechat) {
                        // 需要调用此接口判断用户token是否过期，防止购买的时候再登录
                        this.$fetch(`balance/latest`).then(resolve)
                    } else {
                        resolve()
                    }
                } else {
                    this.action('login').then(resolve)
                }
            }).then(() => {
                if(this.env.isWechat) {
                    this.$router.go({name: 'purchase-add'})
                } else {
                    // if(this.self.goodsPublishPermission) {
                    //     this.action('toast', {success: '0', text: '请前往"商户专区"发布需求'})
                    // } else {
                    this.action('newPurchase')
                    // }
                }
            })
        },

        showAction() {
            this.action('action', {icon: 'question-2x.png?'})
                .then(() => {
                    this.$router.go({name: 'purchase-help'})
                })
        }
    }
}
</script>
