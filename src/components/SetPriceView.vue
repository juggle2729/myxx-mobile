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
                line-height: 90px;
                border-radius: 8px;
                border: 1px solid #dcdcdc;
                margin: 24px auto 0;
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
}
</style>
<template>
<div class="price-view bg-default">
    <div class="title font-26 gray">订单信息</div>
    <div class="order bg-white border-vertical font-30">
        <div>订单编号: {{order.order_no}}</div>
        <div>订单创建时间: {{order.create_at | moment}}</div>
    </div>
    <div class="title font-26 gray">商品信息</div>
    <div class="merchant flex border-bottom font-30 bg-white border-vertical">
        <img class="img margin-right" :src="config.img + order.product.picture + '?imageView2/2/h/450'">
        <div class="name">{{order.product.title}}</div>
    </div>
    <div class="price bg-white border-bottom font-30 flex">
        <div class="center">
            <p>当前商品价格</p>
            <div class="button center red font-34">{{order.price | price}}</div>
        </div>
        <div class="center">
            <p>修改后价格</p>
            <input class="button center red font-34" type="number" placeholder="请输入价格" v-model="price">
        </div>
    </div>
    <div class="confirm bg-red white center font-30" @click="setPrice">确定</div>
</div>
</template>
<script>
export default {
    name: 'price',
    data() {
        return {
            price: '',
            order: {
                order_no: '2016ACVDGFE',
                receiver_name: '李四',
                receiver_phone: '1338888888',
                receiver_area: '',
                receiver_address: '湖北省武汉市江汉区创业大街599号599号595595995',
                product: {
                    id: 32,
                    picture: '411496be-fb96-40bf-93de-bce3ed638036',
                    title: '最新和田玉籽料 最新和田玉籽料 最新和田玉籽料 最新和田玉籽料 最新和田玉籽料 最新和田玉籽料 最新和田玉籽料'
                },
                price: 1100,
                buyer: {
                    id: 23
                },
                seller: {
                    id: 34,
                    photo: '00c92f85-60b1-4791-9d7f-456e66241c8f',
                    nickname: '韵语堂主'
                },
                note: '请小心包好...',
                create_at: '2138483999',
                status: 'no_price'
            },
        }
    },
    methods: {
        setPrice() {
            this.action('confirm', { text: `确定将订单价格修改为${this.price}元吗?`}).then((result) => {
                if(result === '1') {
//                    this.$put(`mall/order/${this.order.order_no}/change_price`, { price: this.price * 100}).then((data) => {
//                        this.$router.go({ name: 'order', params: { id: this.order.order_no}});
//                    });
                    this.action('toast', { text: '已经改价'});
                    this.$router.go({ name: 'order', params: { id: this.order.order_no}});
                }
            });
        }
    }
}
</script>