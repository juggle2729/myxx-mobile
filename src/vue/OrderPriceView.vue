<style lang="stylus">
.price-view
    min-height: 100%
    .title
        height: 72px
        line-height: 72px
        padding: 0 32px
    .order
        height: 146px
        padding: 30px 32px
        div:first-child
            margin-bottom: 28px
    .merchant
        height: 160px
        padding: 0 32px
        .img
            height: 110px
            width: 110px
        .name
            -webkit-box-flex: 1
            line-height: 38px
    .price
        height: 210px
        > div
            width: 50%
            .button
                height: 90px
                width: 240px
                border-radius: 8px
                border: 1px solid #dcdcdc
                margin: 24px auto 0
                padding-top: 26px
                &.input
                    padding-top: 1px
    .confirm
        width: 686px
        height: 80px
        line-height: 80px
        border-radius: 8px
        margin: 50px auto 0
</style>
<template lang="jade">
.price-view.bg(v-if='!$loadingRouteData')
    .title.fz-26.gray 订单信息
    .order.bg-white.bdv.fz-30
        div 订单编号: {{order.order_no}}
        div 订单创建时间: {{order.create_at | date}}
    .title.fz-26.gray 商品信息
    .merchant.flex.bdb.fz-30.bg-white.bdv
        img.img.mgr(:src="config.img + order.product.first_picture + '?imageView2/2/h/450'")
        .name.line-clamp-2 {{order.product.title}}
    .price.bg-white.bdb.fz-30.flex
        .center
            p 当前商品价格
            .button.center.red.fz-34 {{order.price | price}}
        .center
            p 修改后价格
            input.button.center.red.fz-34.input(type='number', placeholder='请输入价格', v-model='price')
    .confirm.bg-gray.white.center.fz-30(:class="{'bg-red': complete}", @click='setPrice') 确定
</template>
<script>
export default {
    name: 'OrderPriceView',
    data() {
        return {
            price: '',
            order: {
                product: {}
            }
        }
    },
    computed: {
        complete() {
            return this.price
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/order/${to.params.id}`).then((order) => {
                   this.order = order
                   this.order.price = order.trans_amount
                })
        }
    },
    methods: {
        setPrice() {
            if(this.complete) {
                this.action('confirm', { text: `确定将订单价格修改为${this.price}元吗?`}).then((result) => {
                    if(result === '1') {
                        this.$put(`mall/order/${this.order.order_no}/change_price`, { trans_amount: this.price * 100}).then((data) => {
                            this.action('back', {step: 1, refresh: true})
                        })
                    }
                }).catch((data) => {
                    this.action('toast', {success: 0, text: data})
                })
            }
        }
    }
}
</script>
