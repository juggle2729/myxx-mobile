<style lang="stylus">
@import '~style/partials/mixin'
$b = '//o0x80w5li.qnssl.com/'
$mgl = 62px
icon($name)
    width 100%
    height 30px
    background url($b + 'order/' + $name + '.png') no-repeat
    background-size 30px 30px
    padding-left 60px
.order-confirm-view
    overflow hidden
    .address
        padding 30px 56px 45px 36px
    .no-address
        padding-left 36px
        height 120px
    .full-address
        line-height 1.5
    .desc
        margin-left $mgl
    .icon-enter
        position absolute
        top 50%
        right 36px
        transform translateY(-50%)
    .icon-location
        icon(address)
    .icon-shop
        icon(shop)
    .product
        padding 30px 32px 0 36px
        flex-direction column
        align-items flex-start
    .order-item-item
        margin 36px 0 24px $mgl
    .separator
        width -webkit-calc(100% - 124px)
        height 1px
        background-color transparent
        margin-left $mgl + 32px
    .shop-coupon, .platform-coupon
        padding 38px 75px 38px 98px
    textarea
        border(a, #ededed)
        margin 20px 40px 0 98px
        width -webkit-calc(100% - 128px)
        padding 21px 22px
        height 180px
        border none
        resize none
        border-radius 0
        line-height 1.2
        &::-webkit-input-placeholder
            color #b3b3b3
            font-size 30px
        &.has-coupon
            margin-top 40px
    .bottom
        position fixed
        left 0
        bottom 0
        height 100px
        width 100%
    .price-info
        justify-content flex-end
        align-items flex-end
        padding-right 24px
    .price
        margin-right 11px
        &:first-letter
            font-size 20px
    .confirm
        width 222px
        line-height 101px
</style>
<template lang="pug">
.order-confirm-view(v-if="!$loadingRouteData && product.sell_status && product.sell_status !== 'sold'", @touchstart="touchStart($event)")
    .address.relative.bdb(v-if="!lodash.isEmpty(address)", @click="selectAddress")
        .flex.icon-location.fz-30.black-24 收货地址
        .desc.black-47.fz-26.mgt-28 {{ address.name }} {{ address.phone }}
        .desc.gray-b3.fz-24.mgt-14.full-address {{ address.address }}
        icon.icon-enter.gray-b3.fz-22(name="enter")
    .no-address.flex.relative.bdb(v-else, @click="selectAddress")
        .icon-location.flex-1.fz-30.red-e6 请添加收货地址
        icon.icon-enter.gray-b3.fz-22(name="enter")
    .product.flex
        .flex.icon-shop.fz-30.black-24 {{ product.shop.shop_name }}
        order-item-item(:item="product", :price-color="'red-e6'")
    .separator.bdb(v-if="coupon.shop.length || coupon.platform.length")
    .shop-coupon.flex.relative(v-if="coupon.shop.length", @click="selectShopCoupon")
        .black-24.fz-26 店铺优惠券
        .red-e6.fz-24.flex-1.txt-right {{ selectedShopCoupon.title || '不使用优惠券' }}
        icon.icon-enter.gray-b3.fz-22(name="enter")
    .separator.bdb(v-if="coupon.shop.length")
    .platform-coupon.flex.relative(v-if="coupon.platform.length", @click="selectPlatformCoupon")
        .black-24.fz-26 平台优惠券
        .red-e6.fz-24.flex-1.txt-right {{ selectedPlatformCoupon.title || '不使用优惠券' }}
        icon.icon-enter.gray-b3.fz-22(name="enter")
    .separator.bdb(v-if="coupon.platform.length")
    textarea.note.fz-30.black-24.bg-gray-f7(placeholder="给商家留言，140字以内", v-model='note',
        :class="{'has-coupon': coupon.shop.length || coupon.platform.length}")
    .bottom.flex.bdt.bg-white
        .flex-1.price-info.flex
            .change-price.gray-b3.fz-24(v-if="!product.price") 部分商品待改价
            template(v-else)
                .fz-20.black-24 合计:
                .price.fz-32.red-e6 {{ orderPrice | price }}
                .gray-b3.fz-20(v-if="discount > 0") (已优惠{{ discount | price }})
        .fz-36.white.confirm.center(:class="lodash.isEmpty(address) ? 'bg-gray-e8' : 'bg-red-e5'", @click="confirmOrder") 确认订单
    coupon-select(:list="couponList", :selected="selectedCoupon", :type="couponType", :show.sync="showCouponSelect", transition="pop")
</template>
<script>
import OrderItem from './component/item/OrderItem.vue'
import CouponSelect from './component/CouponSelect.vue'
export default {
    name: 'order-confirm-view',
    components: [ OrderItem, CouponSelect ],

    data() {
        return {
            id: 0, // product id
            product: {
                shop: {}
            },
            address: {},
            coupon: {
                platform: [],
                shop: []
            },
            selectedShopCoupon: {},
            selectedPlatformCoupon: {},
            note: '',

            // about coupon
            couponList: [],
            selectedCoupon: {},
            couponType: 'shop',
            showCouponSelect: false
        }
    },

    computed: {
        orderPrice() {
            return this.product.price - this.discount
        },
        discount() {
            let total = 0
            if (!_.isEmpty(this.selectedShopCoupon)) {
                total += this.selectedShopCoupon.discount_amount
            }
            if (!_.isEmpty(this.selectedPlatformCoupon)) {
                total += this.selectedPlatformCoupon.discount_amount
            }
            return total
        }
    },

    methods: {
        selectAddress() {
            this.$router.go({
                name: 'addresses',
                query: {
                    type: 'sd',
                    select: true
                }
            })
        },

        selectShopCoupon() {
            this.couponList = this.coupon.shop
            this.selectedCoupon = this.selectedShopCoupon
            this.couponType = 'shop'
            this.showCouponSelect = true
        },

        selectPlatformCoupon() {
            this.couponList = this.coupon.platform
            this.selectedCoupon = this.selectedPlatformCoupon
            this.couponType = 'platform'
            this.showCouponSelect = true
        },

        confirmOrder() {
            if (_.isEmpty(this.address)) {
                return
            }
            this.$post('mall/orders', {
                product_ids: [this.id || this.product.id],
                shop_coupon_id: this.selectedShopCoupon.id || null,
                platform_coupon_id: this.selectedPlatformCoupon.id || null,
                receiver_name: this.address.name,
                receiver_phone: this.address.phone,
                receiver_address: this.address.address,
                buyer_note: this.note
            }).then(({ order_no }) => {
                if (this.product.price) { // 当商品价格不存在时，跳转到订单详情，不进行支付
                    this.$router.replace({
                        name: 'pay',
                        query: {
                            id: order_no,
                            t: this.config.payBizType.order
                        }
                    })
                } else {
                    this.$router.replace({
                        name: 'order',
                        params: {
                            id: order_no
                        }
                    })
                }
            })
        }
    },

    ready() {
        // load available coupon list
        this.$fetch(`coupon/choices`, { product_ids: [this.id || this.product.id] }).then(({platform_coupons, shop_coupons}) => {
            this.coupon = {
                platform: platform_coupons,
                shop: shop_coupons
            }

            this.selectedShopCoupon = shop_coupons[0] || {}
            this.selectedPlatformCoupon = platform_coupons[0] || {}
        })
    },

    route: {
        data({ to }) {
            this.id = to.params.id
            return this.$fetch(`mall/products/${to.params.id}`).then(product => {
                if (product.sell_status === 'sold') { // 如果是已售出，直接返回上一个页面
                    this.action('back', {step: 1})
                    return
                }
                this.product = product
                const cacheAddress = this.$store.get('selectedAddress')
                if (cacheAddress) {
                    this.address = cacheAddress
                    this.$store.remove('selectedAddress')
                } else {
                    return this.$fetch(`mall/address/default`).then(({receiver_name, receiver_phone, receiver_address_flat}) => {
                        this.address = {
                            name: receiver_name,
                            phone: receiver_phone,
                            address: receiver_address_flat
                        }
                    })
                }
            }).catch(error => console.error(error.message || '数据异常'))
        }
    },

    events: {
        selectCoupon(selected, couponType) {
            if (couponType === 'shop') {
                this.selectedShopCoupon = selected
            } else if (couponType === 'platform') {
                this.selectedPlatformCoupon = selected
            } else {
                // do nothing
            }
        }
    }
}
</script>