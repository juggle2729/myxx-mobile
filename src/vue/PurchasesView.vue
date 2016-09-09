<style lang="stylus">
.purchases-view
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
    template(v-for="item in items")
        .hr
        purchase-item(:item="item")
    empty(v-if="items.isEmpty" title="暂无求购")
    .purchase-btn.bg-red.white.fz-34(@click="purchase()") 我要求购
</template>
<script>
import Q from 'q'
import paging from 'paging'
import PurchaseItem from 'component/PurchaseItem.vue'
export default {
    name: 'PurchasesView',
    mixins: [paging],
    components: [PurchaseItem],
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
        this.action('action', {icon: 'question-2x.png'})
            .then(() => {
                this.$router.go({name: 'purchase-help'})
            })
        this.$on('restore', () => {
            this.action('action', {icon: 'question-2x.png'})
                .then(() => {
                    this.$router.go({name: 'purchase-help'})
                })
        })
    },

    methods: {
        purchase() {
            Q.promise(resolve => {
                if(this.self) {
                    resolve()
                } else {
                    this.action('login').then(resolve)
                }
            }).then(() => {
                if(this.self.goodsPublishPermission) {
                    this.action('toast', {success: '0', text: '请前往"商户专区"发布需求'})
                } else {
                    this.action('newPurchase')
                }
            })
        }
    }
}
</script>
