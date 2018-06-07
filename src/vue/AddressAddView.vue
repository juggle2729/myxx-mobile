<style lang="stylus">
.address-add-view
    padding-top 100px
    .confirm
        line-height 90px
        border-radius 8px
    input, textarea
        width 100%
        border 0
        &::-webkit-input-placeholder
            color #d6d6d6
    input
        height 100px
    textarea
        padding 34px 32px
        &::-webkit-resizer
            display none
    .icon-enter
        width 14px
        height 24px
        top 50%
        right 32px
        transform translateY(-50%)
</style>
<template lang="pug">
.address-add-view.bg-gray-f7
    //- auction-header-menu(v-bind:number="goodsNumber")
    input.bdb.flex.pdh-32.fz-30.black-24(placeholder="收货人", v-model="address.name", maxlength="12")
    input.bdb.flex.pdh-32.fz-30.black-24(placeholder="手机号码", type="tel", v-model="address.phone", maxlength="11")
    .flex.relative.bg-white
        icon.fz-22.absolute.gray-99(name="enter")
        input.bdb.flex.pdh-32.fz-30.black-24(placeholder="所在地", readonly="true", v-model="address.areaName", @click="onSelectArea")
    textarea.bdb.flex.fz-30.black-24(placeholder="详细地址", rows="4", resize="none",v-model="address.address")
    .confirm.mg-32.white.center.fz-30(:class="[isValid ? 'bg-red' : 'bg-gray']", @click="onConfirm") 确定
</template>
<script>
import AuctionHeaderMenu from 'component/AuctionHeaderMenu.vue'
export default {
    name: 'address-add-view',
    components: [ AuctionHeaderMenu ],

    ready() {
        this.action('updateTitle', { text: this.addressType === 'sd' ? '收货地址管理': '退货地址管理' })
    },

    data() {
        return {
            address: {
                name: '',
                phone: '',
                areaId: '',
                areaName: '',
                address: ''
            }
        }
    },

    computed: {
        isValid() {
            return this.address.name && this.address.phone &&
                this.address.areaId && this.address.address
        },

        addressId() {
            return +this.$route.params.id
        },

        addressType() {
            return this.$route.params.type
        },

        addInfo() {
            return {
                receiver_name: this.address.name,
                receiver_phone: this.address.phone,
                receiver_area_id: this.address.areaId,
                receiver_address: this.address.address,
                address_type: this.addressType
            }
        }
    },

    methods: {
        onSelectArea() {
            this.$store.set('select-address', true)
            this.$store.set('address', this.address)

            this.$router.go({name: 'area-list'})
        },
        onConfirm() {
            if (!this.isValid) {
                return
            }
            if (!this.addressId) {
                this.$post(`mall/addresses`, this.addInfo)
                    .then(this._successCallback, this._errorCallback)
            } else {
                this.$put(`mall/address/${this.addressId}`, this.addInfo)
                    .then(this._successCallback, this._errorCallback)
            }
        },

        _successCallback() {
            this.$store.remove('address')
            this.action('back', {step: 1})
        },

        _errorCallback(err) {
            this.action('toast', {success: 0, text: err.message})
            _.delay(() => {
                this.action('back', {step: 1})
            }, 1000)
        }
    },

    route: {
        data() {
            if (!this.addressId || this.$store.get('select-address')) {
                this.$store.remove('select-address')
                return { address: this.$store.get('address') || this.address }
            } else {
                return this.$fetch(`mall/address/${this.$route.params.id}`)
                    .then(({ receiver_name, receiver_phone, receiver_area_id, receiver_address, receiver_area_name}) => {
                    return {
                        address: {
                            name: receiver_name,
                            phone: receiver_phone,
                            areaId: receiver_area_id,
                            areaName: receiver_area_name,
                            address: receiver_address }
                    }
                })
            }
        }
    }
}
</script>