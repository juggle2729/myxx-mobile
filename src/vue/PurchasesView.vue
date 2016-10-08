<style lang="stylus">
@import '~style/partials/var'
.purchases-view
    padding-bottom: 98px
    .placeholder-notice
        height: 90px
    .notice
        position: fixed
        top: 0
        width: 100%
        padding: 0 30px
        background-color: #fcf1e0
        z-index: 9
        .flex
            height: 90px
            line-height: 90px
        .txt
            color: #eaa123
        .close
            height: 90px
            width: 60px
            background-image: url($qn + "bzone/close-yellow.png")
            background-position: right center
            background-size: 28px 28px
    .purchase-btn
        position: fixed
        bottom: 0
        height: 98px
        width: 100%
        line-height: 98px
        text-align: center
</style>
<template lang="pug">
.purchases-view
    .placeholder-notice(v-if="firstVisit")
    .notice(v-if="firstVisit")
        .flex
            .txt.fz-26.flex-1 即日起至9月30日,发布求购并成功交易返现3%！
            .close(@click="closeNotice")
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

        this.action('cache', {k: 'purchases-visited'})
            .then(v => {
                if(!v) {
                    this.firstVisit = true
                }
            })
    },

    methods: {
        purchase() {
            if(this.env.isWechat) {
                this.$router.go({name: 'purchase-add'})
            } else {
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
        },

        closeNotice() {
            this.firstVisit = false
            this.action('cache', {k: 'purchases-visited', v: 1})
        },
    }
}
</script>
