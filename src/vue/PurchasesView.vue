<style lang="stylus">
.purchases-view {
    padding-bottom: 98px
    .purchase-btn {
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        line-height: 98px
        text-align: center
    }
}
</style>
<template>
<div class="purchases-view">
    <template v-for="item in items">
        <div class="hr"></div>
        <purchase-item :item="item"></purchase-item>
    </template>
    <empty v-if="items.isEmpty" title="暂无求购"></empty>
    <div @click="purchase()" class="purchase-btn bg-red white fz-34">我要求购</div>
</div>
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
                this.action('newPurchase')
            })
        }
    }
}
</script>
