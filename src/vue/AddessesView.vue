<style lang="stylus">
.addresses-view
    padding-top 88px
    .add-btn
        position fixed
        bottom 0
        width 100%
        line-height 100px
</style>
<template lang="pug">
.addresses-view.bg-gray-f7
    auction-header-menu
    template(v-for="(index, item) in items")
        .hr
        address-item(:item="item", :index="index", @click="selectAddress(item)")
    empty(v-if="items.isEmpty", :title="isShipping ? '暂无收货地址' : '暂无退货地址'")
    .add-btn.bg-red.white.fz-30.center(v-link="{name: 'address-add', params: {id: 0, type: type}}") {{ isShipping ? '新增收货地址' : '新增退货地址' }}
</template>
<script>
import paging from 'paging'
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
import AddressItem from 'component/item/Address.vue'
export default {
    name: 'addresses-view',
    mixins: [ paging ],
    components: [ AuctionHeaderMenu, AddressItem ],

    ready() {
        this.action('updateTitle', { text: this.isShipping ? '收货地址管理': '退货地址管理' })
    },

    computed: {
        paging() {
            return {
                path: 'mall/addresses',
                list: 'addresses',
                params: {
                    address_type: this.type
                }
            }
        },

        type() {
            return this.$route.query.type || 'sd'
        },

        isShipping() { // 是否是收货
            return this.type === 'sd'
        },

        canSelect() {
            return this.$route.query.select === 'true'
        }
    },

    methods: {
        selectAddress(item) {
            if (!this.canSelect) {
                return
            }
            this.$store.set('selectedAddress', {
                name: item.receiver_name,
                phone: item.receiver_phone,
                address: item.receiver_address_flat
            })
            this.action('back', {step: 1})
        }
    },

    events: {
        changeDefault(targetItem) {
            for (let item of this.items) {
                if (item.is_default) {
                    item.is_default = false
                    break
                }
            }
            targetItem.is_default = true
        },
        deleteAddress(targetIndex) {
            this.items.splice(targetIndex, 1)
        }
    }
}
</script>
