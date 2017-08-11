<style lang="stylus">
.order-reject-view
    .cause
        line-height 1.3
    .btn
        justify-content center
        border-radius 8px
        height 90px
</style>
<template lang="pug">
.order-reject-view.bg(v-if="!$loadingRouteData")
    .hr
    .content.pdv-34.pdh-32.black.bg-white
        .fz-36 退货原因
        .fz-30.cause.mgt-28 {{ rejection }}
    .mg-32.bg-red.white.fz-30.flex.btn(@click="onKnow") 我知道了
</template>
<script>
export default {
    name: 'order-reject-view',

    data() {
        return {
            rejection: ''
        }
    },

    route: {
        data({ to }) {
            return this.$fetch(`mall/order/${to.params.id}`).then(({ rejection }) => ({ rejection }))
        }
    },

    methods: {
        onKnow() {
            this.action('back', {step: 1, refresh: false})
        }
    }
}
</script>
