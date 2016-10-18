<style lang="stylus">
.user-purchase-view
    .purchase-item.won
        background-image: none
</style>
<template lang="jade">
.user-purchase-view(:class="{'bg': !items.isEmpty}")
    template(v-for='item in items')
        .hr
        purchase-item(:item='item')
    empty(v-if='items.isEmpty', title='暂无求购竞标')
</template>
<script>
import paging from 'paging'
import PurchaseItem from 'component/item/Purchase.vue'
export default {
    name: 'UserPurchaseView',
    mixins: [paging],
    components: [PurchaseItem],
    route: {
        data({to, next}) {
            // 如果id为0且用户已经登录，需要调用此接口判断用户token是否过期，防止用户重复登录
            if(!+to.params.id && this.self && this.env.isWechat) {
                return this.$fetch(`balance/latest`)
            } else {
                next()
            }
        }
    },
    computed: {
        paging() {
            return {
                path: 'mall/purchases'
            }
        }
    }
}
</script>
