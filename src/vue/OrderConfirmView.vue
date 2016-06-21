 <style lang="sass">
    .order-confirm-view {
        min-height: 100%;
        height: 100%;
        padding: 20px 0;
        .address {
            padding: 0 32px;
            > div {
                height: 200px;
                .icon-enter {
                    padding: 60px 0 0 18px;
                }
                .icon-location {
                    transform: scale(1.2);
                }
                .user {
                    margin: 0 0 26px 40px;
                    width: 600px;
                    span:last-child {
                        float: right;
                    }
                    & + div {
                        width: 618px;
                        -webkit-box-align: start;
                        .icon-location {
                            padding-top: 3px;
                        }

                    }
                }
                .site {
                    margin-left: 10px;
                    line-height: 38px;
                }
                &.first {
                     height: 146px;
                     line-height: 146px;
                }
            }
        .tip {
            padding: 0 0 3px 6px;
        }
    }
    .product {
        margin-top: 20px;
        .seller {
            height: 86px;
            line-height: 86px;
            padding: 0 32px;
        }
        .merchant {
            height: 160px;
            padding: 0 32px;
            .img {
                height: 110px;
                width: 110px;
            }
            .title {
                margin-bottom: 12px;
                width: 556px;
                line-height: 38px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
            }
        }
        .comment {
            height: 320px;
            padding: 24px 32px;
            textarea {
                border: none;
                margin: 16px 0 0 44px;
                height: 220px;
                width: 94%;
                line-height: 36px;
            }
            .icon-comment {
                transform: scale(1.1);
            }
        }
    }
    .operation {
        position: fixed;
        bottom: 0;
        justify-content: flex-end;
        width: 100%;
        height: 98px;
        -webkit-box-align: start;
        .price {
            text-align: right;
            padding: 34px 20px 0 0;
        }
        .button {
            width: 200px;
            height: 100%;
            padding-top: 34px;
            background-clip: padding-box;
        }
    }
}
</style>
<template>
    <div class="order-confirm-view bg-default font-30">
        <div class="address bg-white border-vertical">
            <div v-if="!address" class="flex first" v-link="{name: 'address-update', params: {id: 'none'}, query: {product: this.product.id}}">
                <span class="icon-location gray"></span>
                <div class="flex-1 tip site">请添加收货地址</div>
                <span class="icon-enter red"></span>
            </div>
            <div v-else class="flex" v-link="{name: 'address-list', query: {product: this.product.id}}">
                <div>
                    <div class="user">
                        <span>收货人: {{address.receiver_name}}</span>
                        <span>{{address.receiver_phone}}</span>
                    </div>
                    <div class="flex">
                        <div class="icon-location gray font-30"></div>
                        <div class="font-26 site">收货地址: {{address.receiver_address_flat}}</div>
                    </div>
                </div>
                <div class="icon-enter font-30 red"></div>
            </div>
        </div>
        <div class="product bg-white border-vertical">
            <div class="seller flex border-bottom">
                <avatar :user="product.owner" :size="50"></avatar>
                <span class="margin-left">{{product.owner.name}}</span>
            </div>
            <div class="merchant flex border-bottom">
                <img class="img margin-right" :src="config.img + product.pictures[0] + '?imageView2/2/h/450'">
                <div>
                    <div class="title">{{product.title}}</div>
                    <div class="red font-26">{{product.price | price}}</div>
                </div>
            </div>
            <div class="comment">
                <div>
                    <span class="icon-comment gray"></span>
                    <span>买家留言</span>
                </div>
                <textarea class="font-26" maxlength="140" placeholder="文字控制在140字以内" v-model="note"></textarea>
            </div>
        </div>
        <div class="operation bg-white flex">
            <div class="border-top flex-1 price">订单价格: <span class="red">{{product.price | price}}</span></div>
            <div class="button bg-red white center" @click="createOrder">确认订单</div>
        </div>
    </div>
</template>
<script>
import Q from 'q';
export default {
    name: 'OrderConfirmView',
    data() {
        return {
            note: '',
            product: {
                owner: {},
                pictures: []
            },
            address: {}
        }
    },
    route: {
        data({to}) {
            let requests = Q.all([this.$get(`mall/address/default`), this.$get(`mall/products/${to.params.product}`)])
            requests.done(([address, product]) => {
                        this.address = address;
                        this.product = product;
                        if(this.product.sell_status === 'sold') {
                            this.action('back', {step: 1, refresh: true});
                        }
                    });
            return requests;
        }
    },
    ready() {
        this.$on('restore', () => {
            this.$get('mall/address/default?' + Date.now()) // 加时间戳，去缓存 ！！！
                .then((address) => {
                    this.address = address;
                });

            if(this.frozen) {
                // 回退的时候，跳过订单确认界面，直接回到商品详情
                this.action('back', {step: 1, refresh: true});
            }
        });
    },
    methods: {
        createOrder() {
            if(this.address) {
                this.$post('mall/orders', {
                    product_id: this.product.id,
                    receiver_name: this.address.receiver_name,
                    receiver_phone: this.address.receiver_phone,
                    receiver_address: this.address.receiver_address_flat,
                    buyer_note: this.note
                }).then((data) => {
                    this.frozen = true;
                    this.$router.go({name: 'order', params: {id: data.order_no.toString()}});
                }).catch((data) => {
                    this.action('toast', {success: 0, text: data});
                });
            } else {
                this.action('toast', {success: 0, text: '请选择收货地址!'});
            }
        }
    }
}
</script>
