<style lang="stylus">
    @import '~style/partials/mixin'
    .auction-rule-view
        padding-top 118px
        .tabs
            top 0
            left 0
            z-index 999
            width 100%
            height 118px
            border-color #ccc
            .flex-1
                width 50%
            .flex-1:first-child
                border(r, #cccccc)
        img
            width 100%
</style>

<template lang="pug">
    .auction-rule-view
        .tabs.fz-36.flex.bdb.bg-white.gray-cc.fixed
            .flex-1.line-height-80.center(@click="tab = 'buyer'", :class="{ black: tab === 'buyer' }") 买家版
            .flex-1.line-height-80.center(@click="tab = 'seller'", :class="{ black: tab === 'seller' }") 卖家版
        img(v-show="tab === 'buyer'", src="https://o0x80w5li.qnssl.com/auction-rules-buyer-2.png")
        img(v-show="tab === 'seller'", src="https://o0x80w5li.qnssl.com/auction-rules-seller.png")
</template>
<script>
    export default {
        name: 'auction-rule-view',

        data() {
            return {
                tab: 'buyer'
            }
        },

        route: {
            data() {
                return this.tab = this.$route.params.type
            }
        }
    }
</script>
