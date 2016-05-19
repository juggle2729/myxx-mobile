<style lang="sass">
    .affirm-order-view {
        min-height: 100%;
        height: 100%;
        padding: 20px 0;
        .address {
            padding: 0 32px;
            >div {
                height: 200px;
                .icon-enter {
                    padding: 74px 0 0 55px;
                }
                .user {
                    margin:0 2px 36px 48px;
                    span:last-child {
                        float: right;
                        padding-right: 22px;
                    }
                    & + div {
                        width: 610px;
                        -webkit-box-align: start;
                        .icon-comment {
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
                height: 220px;
                width: 100%;
                padding: 0 16px 16px 16px;
                line-height: 36px;
            }
        }
    }
    .operation {
        position: fixed;
        bottom: 0;
        justify-content: flex-end;
        width: 100%;
        height: 98px;
        line-height: 98px;
        .button {
            width: 200px;
            height: 100%;
            padding-top: 34px;
        }
    }
}
</style>
<template>
    <div class="affirm-order-view bg-default font-30">
        <div class="address bg-white border-vertical">
            <div v-if="!address" class="flex first">
                <span class="icon-comment gray"></span>
                <div class="flex-1 tip site">请添加收货地址</div>
                <span class="icon-enter red"></span>
            </div>
            <div v-else class="flex">
                <div>
                    <div class="user">
                        <span>收货人: {{address.name}}</span>
                        <span>{{address.phone}}</span>
                    </div>
                    <div class="flex">
                        <div class="icon-comment gray font-30"></div>
                        <div class="font-26 site">收货地址: {{address.site}}</div>
                    </div>
                </div>
                <div class="icon-enter font-30 red"></div>
            </div>
        </div>
        <div class="product bg-white margin-top border-vertical">
            <div class="seller flex border-bottom">
                <avatar :user="seller" :size="50"></avatar>
                <span class="margin-left">{{product.owner.name}}</span>
            </div>
            <div class="merchant flex border-bottom">
                <img class="img margin-right" :src="config.img + product.pictures + '?imageView2/2/h/450'">
                <div>
                    <div class="title">{{product.title}}</div>
                    <div class="red font-26">{{product.price | price}}</div>
                </div>
            </div>
            <div class="comment">
                <div class="margin-bottom">
                    <span class="icon-comment gray"></span>
                    <span>买家留言</span>
                </div>
                <textarea class="font-26" maxlength="140" placeholder="文字控制在140字以内"></textarea>
            </div>
        </div>
        <div class="operation bg-white right flex border-top">
            <div>订单价格: <span class="red">{{product.price | price}}</span></div>
            <div class="button bg-red white center margin-left" @click="createOrder">确认订单</div>
        </div>
    </div>
</template>
<script>
    import Avatar from './Avatar.vue';
    export default {
        name: 'OrderAffirmView',
        components: {
            Avatar
        },
        data() {
            return {
                product: {
                    owner: {}
                },
                address: {
                    name: '江湖小龙',
                    phone: '13989898989',
                    areaId: 2,
                    site: '江夏区江夏区江夏区88号'
                }
            }
        },
        route: {
            data({to}) {
                return this.$get(`mall/products/${to.params.id}`).then((product) => {
                        return {product};
                    });
            }
        },
        methods: {
            createOrder() {
//                this.$post('mall/orders', {
//                    product_id: this.product.id,
//                    receiver_name: this.address.name,
//                    receiver_phone: this.address.phone,
//                    receiver_area_id: this.address.areaId,
//                    receiver_address: this.address.site
//                }).then((data) => {
//                    this.$router.go({name: 'order', params: {id: data.id}})
//                });
                if(!this.address) {
                    this.action('toast', {success: 0, text: '请选择收货地址!'});
                } else {
                    this.$router.go({name: 'order', params: {id: 2}})
                }
            }
        }
    }
</script>