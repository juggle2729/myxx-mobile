<style lang="sass">
.user-jade {
    padding: 0 16px;
    .margin-right {
        margin-right: 14px;
    }
    .cell {
        height: 554px;
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
            p + p {
                margin-top: 16px;
            }
        }
    }
    .empty-page {
        height: 700px;
    }
}
</style>
<template>
<div class="user-jade">
    <partial v-if="items.isEmpty" name="empty-page"></partial>
    <div class="cell" v-for="item in items" v-link="{name: 'jade', params:{id: item.id}}" track-by="$index" :class="{'margin-right': ($index % 2 === 0)}">
        <div class="img" v-bg.lg="item.imgs[0]"></div>
        <div class="txt font-30 bg-white">
            <p>{{item.name}}</p>
            <p class="red">￥{{item.price | percent}}</p>
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
