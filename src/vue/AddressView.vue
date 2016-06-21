<style lang="sass">
.address-list {
    min-height: 100%;
    padding-bottom: 50px;
    .info {
        padding: 0 32px;
        height: 200px;
        .flex {
            height: 100px;
            line-height: 100px;
        }
        .phone {
            padding-right: 10px;
        }
        .site {
            line-height: 38px;
        }
    }
    .operate {
        height: 86px;
        padding: 0 32px;
        .flex-1 {
            padding: 15px 0;
        }
        .delete {
            margin-left: 72px;
        }
    }
    .add {
        width: 686px;
        height: 80px;
        line-height: 80px;
        border-radius: 8px;
        margin: 50px auto 0;
    }
}
</style>
<template>
<div class="address-list font-30 bg-default">
    <div class="address bg-white" v-for="(index, address) in addresses">
        <div class="separator-20"></div>
        <div class="info" @click="back(address.id)">
            <div class="flex">
                <div class="flex-1">{{address.receiver_name}}</div>
                <div class="phone">{{address.receiver_phone}}</div>
            </div>
            <div class="site">{{address.receiver_address_flat}}</div>
        </div>
        <div class="operate flex gray border-top">
            <div class="flex-1" @click="defaultAddress(address)">
                <template v-if="address.is_default">
                    <span class="icon-check-on red"></span>
                    <span class="red">默认地址</span>
                </template>
                <template v-else>
                    <span class="icon-check-off"></span>
                    <span>设为默认</span>
                </template>
            </div>
            <div v-link="{name: 'address-update', params: { id: address.id}, query: {product: $route.query.product}}">
                <span class="icon-edit"></span>
                <span>编辑</span>
            </div>
            <div class="delete" @click="deleteAddress(address, index)">
                <span class="icon-delete"></span>
                <span>删除</span>
            </div>
        </div>
    </div>
    <div class="add bg-red white center"
    v-link="{name: 'address-update', params: {id: 'none'}, query: {product: $route.query.product}}">新增收货地址</div>
</div>
</template>
<script>
import Q from 'q';
export default {
    name: 'OrderAddressView',
    data() {
        return {
            addresses: []
        }
    },
    route: {
        data() {
            return this.$get('mall/addresses').then(({addresses}) => {
                return {addresses};
            });
        }
    },
    methods: {
        back(id) {
            if(this.$route.query.product) {
                this.$put(`mall/address/${id}`, {
                    is_default: true
                }).then(() => {
                    this.action('back', {step: 1, refresh: false});
                });
            }
        },
        defaultAddress(address) {
            if(!address.is_default) {
                _.forEach(this.addresses, (address) => {
                    address.is_default && (address.is_default = false);
                });
                this.$put(`mall/address/${address.id}`, {
                    is_default: true
                }).then(() => {
                    address.is_default = true;
                });
            }
        },
        deleteAddress(address, index) {
            this.action('confirm', {text: '确定删除该条收货地址?'})
                .then((result) => {
                    return Q.promise((resolve) => {
                        if(result === '1') {
                        this.$delete(`mall/address/${address.id}`).then(() => resolve());
                        }
                    });
                }).then(() => {
                    this.addresses.splice(index, 1);
                });
        }
    }
}
</script>
