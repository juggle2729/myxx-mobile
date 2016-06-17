<style lang="sass">
.price-view {
    min-height: 100%;
    .title {
        height: 72px;
        line-height: 72px;
        padding: 0 32px;
    }
    .order {
        height: 146px;
        padding: 30px 32px;
        div:first-child {
            margin-bottom: 28px;
        }
    }
    .merchant {
        height: 160px;
        padding: 0 32px;
        .img {
            height: 110px;
            width: 110px;
        }
        .name {
            width: 556px;
            line-height: 38px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
        }
    }
    .price {
        height: 210px;
        >div {
            width: 50%;
            .button {
                height: 90px;
                width: 240px;
                border-radius: 8px;
                border: 1px solid #dcdcdc;
                margin: 24px auto 0;
                padding-top: 26px;
                &.input {
                    padding-top: 1px;
                  }
            }
        }
    }
    .confirm {
        width: 686px;
        height: 80px;
        line-height: 80px;
        border-radius: 8px;
        margin: 50px auto 0;
    }
    ::-webkit-input-placeholder {
        color: #c6c6c6;
        padding-top: 3px;
    }
}
</style>
<template>
<div class="price-view bg-default" v-if="!$loadingRouteData">
    <div class="title font-26 gray">订单信息</div>
    <div class="order bg-white border-vertical font-30">
        <div>订单编号: {{order.order_no}}</div>
        <div>订单创建时间: {{order.create_at | date}}</div>
    </div>
    <div class="title font-26 gray">商品信息</div>
    <div class="merchant flex border-bottom font-30 bg-white border-vertical">
        <img class="img margin-right" :src="config.img + order.product.first_picture + '?imageView2/2/h/450'">
        <div class="name">{{order.product.title}}</div>
    </div>
    <div class="price bg-white border-bottom font-30 flex">
        <div class="center">
            <p>当前商品价格</p>
            <div class="button center red font-34">{{order.price | price}}</div>
        </div>
        <div class="center">
            <p>修改后价格</p>
            <input class="button center red font-34 input" type="number" placeholder="请输入价格" v-model="price">
        </div>
    </div>
    <div class="confirm bg-gray white center font-30" :class="{'bg-red': complete}" @click="setPrice">确定</div>
</div>
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
            return this.price;
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/order/${to.params.id}`).then((order) => {
                   this.order = order;
                   this.order.price = order.trans_amount;
                });
        }
    },
    methods: {
        setPrice() {
            if(this.complete) {
                this.action('confirm', { text: `确定将订单价格修改为${this.price}元吗?`}).then((result) => {
                    if(result === '1') {
                        this.$put(`mall/order/${this.order.order_no}/change_price`, { trans_amount: this.price * 100}).then((data) => {
                            this.action('back', {step: 1, refresh: true});
                        });
                    }
                }).catch((data) => {
                    this.action('toast', {success: 0, text: data});
                });
            }
        }
    }
}
</script>
