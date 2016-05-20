<style lang="sass">
.address-list {
    min-height: 100%;
    .info {
        padding: 0 32px;
        height: 200px;
        .flex {
            height: 100px;
            line-height: 100px;
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
    <div class="address bg-white" v-for="address in addresses">
        <div class="separator-20"></div>
        <div class="info" @click="back(address.id)">
            <div class="flex">
                <div class="flex-1">{{address.receiver_name}}</div>
                <div>{{address.receiver_phone}}</div>
            </div>
            <div class="site">{{address.receiver_address_flat}}</div>
        </div>
        <div class="operate border-top">
            <div class="flex">
                <div class="flex-1" @click="default(address.id)">
                    <span class="icon-followed" v-if="address.is_default"></span>
                    <span class="icon-comment" v-else></span>
                    <span>默认地址</span>
                </div>
                <div v-link="{name: 'address-update', params: { id: address.id}}">
                    <span class="icon-comment"></span>
                    <span>编辑</span>
                </div>
                <div class="delete" @click="delete(address.id)">
                    <span class="icon-comment"></span>
                    <span>删除</span>
                </div>
            </div>
        </div>
    </div>
    <div class="add bg-red white center" v-link="{name: 'address-add', params: {productId: this.$route.params.productId}}">新增收货地址</div>
</div>
</template>
<script>
export default {
    name: 'OrderAddressView',
    data() {
        return {
            addresses: []
        }
    },
    route: {
        data() {
            return this.$get('mall/addresses').then((data) => {
                    this.addresses = data.addresses;
                });
        }
    },
    methods: {
        back(id) {
            const productId = this.$route.params.productId;
            if(productId && productId !== '0') {
                this.$put(`mall/address/${id}`, {
                    is_default: true
                }).then(() => {
                    this.action('back', {step: 1, refresh: true});
                });
            }
        },
        default(id) {
            this.$put(`mall/address/${id}`, {
                is_default: true
            }).then(() => {
                location.reload(true);
            });
        },
        delete(id) {
            this.action('confirm', {text: '确定删除该条收货地址?'}).then((result) => {
                if(result === '1') {
                    this.$delete(`mall/address/${id}`).then(() => {
                        location.reload(true);
                    });
                }
            });
        }
    }
}
</script>