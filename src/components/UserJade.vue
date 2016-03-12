<style lang="sass">
.user-jade {
    height: 100%;
    .cell {
        height: 590px;
        width: 365px;
        float: left;
        margin-left: 7px;
        margin-top: 5px;
        .img {
            height: 450px;
            width: 365px;
        }
        .txt {
            text-align: center;
            padding: 20px;
            p + p {
                margin-top: 24px;
            }
        }
    }
}
</style>
<template>
<div class="user-jade bg-white">
    <partial v-if="items.isEmpty" name="empty-page"></partial>
    <div class="cell" v-for="item in items" v-link="{name: 'jade', params:{id: item.id}}" track-by="$index">
        <div class="img" v-bg.lg="item.imgs[0]"></div>
        <div class="txt font-30">
            <p>{{item.name}}</p>
            <p class="red">￥{{item.price | percent}}</p>
        </div>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
</div>
</template>
<script>
import PagingMixin from './mixin/Paging.vue';
export default {
    name: 'UserJade',
    mixins: [PagingMixin],
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
