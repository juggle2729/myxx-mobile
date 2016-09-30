<style lang="stylus">
.purchase-view
    background-color: #f4f4f4
    img
        width: 100%
</style>
<template lang="pug">
.purchase-view
    img(:src="src | qn")
</template>
<script>
export default {
    name: 'PurchaseHelpView',

    computed: {
        src() {
            return this.$route.query.subject==='guarantee' ? 'purchase/purchase-guarantee.png' : 'purchase/purchase.png'
        }
    },

    ready() {
        this.action('updateTitle', {
            text: this.$route.query.subject==='guarantee' ? '什么是保证金' : '求购竞标'
        })
    }
}
</script>