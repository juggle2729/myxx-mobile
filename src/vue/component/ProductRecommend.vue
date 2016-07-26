<style lang="sass">
.product-recommend {
    .title {
        margin-left: 32px;
        line-height: 80px;
    }
    .list {
        padding:0 32px;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        display: -webkit-box;

        .item {
            width: 208px;
            -wekit-box-flex: 1;
            margin-bottom: 28px;

            &:not(:first-child) {
                margin-left: 20px;
            }
            &:last-child {
                width: 1px;
            }
        }

        .item-img {
            width: 100%;
            height: 208px;
            background-size: cover;
        }
        .item-title {
            line-height: 1.2;
            width: 208px;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 24px 0 18px;
        }
    }
}
</style>
<template>
    <div class="product-recommend bg-white border-bottom" v-if="items.length">
        <div class="separator-20"></div>
        <div class="title font-26 gray">商品推荐</div>
        <div class="list">
            <div class="item font-26" v-for="data in items" v-link="{name: 'jade', params: {id: data.item.id, tab: 'detail'}}">
                <div class="item-img" v-bg.sm="data.item.first_picture"></div>
                <div class="item-title">{{data.item.title}}</div>
                <div class="price red">{{data.item.price | price}}</div>
            </div>
            <div class="item"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductRecommend',
    props: {
        id: {
            type: Number
        }
    },
    data() {
        return {
            items: []
        }
    },
    computed: {
        biz_type() {
            let type = '';
            switch (this.$route.name) {
                case 'jade':
                    type = 'pd';
                    break;
                case 'story':
                    type = 'tp';
                    break;
                case 'evaluation':
                    type = 'jb';
                    break;
            }
            return type;
        }
    },
    ready() {
        this.loadData(this.id || this.$route.params.id);
    },
    methods: {
        loadData(id) {
            const params = {
                obj_id: id,
                biz_type: this.biz_type
            };
            return this.$get('dc/rd', params).then((data) => {
                this.items = data.recommend_data;
            });
        }
    }
}
</script>