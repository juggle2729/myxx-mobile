<style lang="sass">
.homepage-jade {
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
<div class="homepage-jade bg-white">
    <partial v-if="items.isEmpty" name="empty-page"></partial>
    <div class="cell" v-for="item in items" v-link="{name: 'jade', params:{id: item.id}}">
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
    name: 'HomePageJade',
    mixins: [PagingMixin],
    props: {
        id: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            required: true
        }
    },
    created() {
        this.fetch();
    },
    computed: {
        paging() {
            return {
                path: 'mall/products',
                list: 'products',
                params: {
                    user_id: this.id,
                    limit: 6
                }
            }
        }
    },
    events: {
        scrollToBottom(e) {
            this.fetch();
        }
    }
}
</script>
