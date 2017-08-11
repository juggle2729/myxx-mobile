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
        address-item(:item="item", :index="index")
    empty(v-if="items.isEmpty" title="暂无收货地址")
    .add-btn.bg-red.white.fz-30.center(v-link="{name: 'address-add', params: {id: 0}}") 新增收货地址
</template>
<script>
import paging from 'paging'
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
import AddressItem from 'component/item/Address.vue'
export default {
    name: 'addresses-view',
    mixins: [ paging ],
    components: [ AuctionHeaderMenu, AddressItem ],

    computed: {
        paging() {
            return {
                path: 'mall/addresses',
                list: 'addresses',
                params: {
                    address_type: 'sd'
                }
            }
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
