<style lang="sass">
.user-jade {
    .margin-right {
        margin-right: 14px;
    }
    .cell {
        width: 352px;
        float: left;
        margin-top: 14px;
        .img {
            height: 434px;
            width: 352px;
        }
        .txt {
            text-align: center;
            padding: 22px 0;
            .title {
                margin-bottom: 16px;
                line-height: 1.2;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
            }
        }
        &:nth-child(odd) {
            margin: 14px 14px 0 16px;
        }
        &:last-child {
             margin-bottom: 14px;
        }
    }
    &::after {
        content: '';
        display: table;
        clear: both;
    }
}
</style>
<template>
<div class="user-jade bg-light">
    <empty v-if="items.isEmpty" title="暂无商品"></empty>
    <div class="cell" v-for="item in items" v-link="{name: 'jade', params:{id: item.id}}" track-by="$index">
        <div class="img" v-bg.lg="item.first_picture"></div>
        <div class="txt font-30 bg-white">
            <p class="title">{{item.title}}</p>
            <p class="red">{{item.price | price}}</p>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import paging from 'paging';
export default {
    name: 'UserJade',
    mixins: [paging],
    activate(done) {
        this.fetch().then(done);
    },
    computed: {
        paging() {
            return {
                id: 'id',
                path: 'mall/products',
                list: 'products',
                params: {
                    limit: 6,
                    user_id: this.$route.params.id
                }
            }
        }
    }
}
</script>
