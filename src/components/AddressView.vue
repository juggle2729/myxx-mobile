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
        padding: 30px 32px 0;
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
    <div class="address bg-white" v-for="(index, address) in items">
        <div class="separator-20"></div>
        <div class="info" @click="back(address.id)">
            <div class="flex">
                <div class="flex-1">{{address.receiver_name}}</div>
                <div class="phone">{{address.receiver_phone}}</div>
            </div>
            <div class="site">{{address.receiver_address_flat}}</div>
        </div>
        <div class="operate border-top">
            <div class="flex gray">
                <div class="flex-1" @click="defaultAddress(address)">
                    <span class="icon-checked red" v-if="address.is_default"></span>
                    <span class="icon-unchecked" v-else></span>
                    <span>{{address.is_default ? '默认地址' : '设为默认'}}</span>
                </div>
                <div v-link="{name: 'address-update', params: { id: address.id}}">
                    <span class="icon-edit"></span>
                    <span>编辑</span>
                </div>
                <div class="delete" @click="deleteAddress(address, index)">
                    <span class="icon-delete"></span>
                    <span>删除</span>
                </div>
            </div>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <div class="add bg-red white center" v-link="{name: 'address-update', params: {id: ($route.params.id !== ':id') ? $route.params.id : '', productId: ($route.params.productId !== 'productId') ? $route.params.productId : ''}}">新增收货地址</div>
</div>
</template>
<script>
import Q from 'q';
import paging from 'paging';
export default {
    name: 'OrderAddressView',
    mixins: [paging],
    computed: {
        paging() {
            return {
                path: 'mall/addresses',
                list: 'addresses',
                params: {
                    limit: 10
                }
            }
        }
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    methods: {
        back(id) {
            const productId = this.$route.params.productId;
            if(productId && productId !== ':productId') {
                this.$put(`mall/address/${id}`, {
                    is_default: true
                }).then(() => {
                    this.action('back', {step: 1, refresh: true});
                });
            }
        },
        defaultAddress(address) {
            if(!address.is_default) {
                _.forEach(this.items, (item) => {
                    item.is_default && (item.is_default = false);
                });
                this.$put(`mall/address/${address.id}`, {
                    is_default: true
                }).then(() => {
                    address.is_default = true;
                });
            }
        },
        deleteAddress(address, index) {
            this.action('confirm', {text: '确定删除该条收货地址?'}).then((result) => {
                return Q.promise((resolve, reject) => {
                    if(result === '1') {
                        this.$delete(`mall/address/${address.id}`).then(() => resolve());
                    }
                });
            }).then(() => {
                this.items.splice(index, 1);
            });
        }
    }
}
</script>