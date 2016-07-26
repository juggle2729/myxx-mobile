<style lang="sass">
.recommend-follwer-view {
    width: 100%;
    .tips {
        width: 100%;
        text-align: center;
        margin: 40px auto 60px;
        height: 100px;
        line-height: 100px;
        > span {
            border-radius: 50px;
            border: 1px solid #cc3f4f;
            padding: 30px 50px;
        }
    }
    .item {
        padding: 32px;
        &:last-child {
            background-size: 0;
        }
        .flex-1 {
            margin-left: 20px;
        }
        .name {
            margin: 2px 0 12px;
        }
        .content {
            margin-top: 20px;
            line-height: 36px;
        }
    }
    .empty-component {
        color: #888888;
    }
}
</style>
<template>
<div class="recommend-follwer-view">
    <div class="separator"></div>
    <div class="tips font-30 red bg-default" v-if="!self" @click="action('login')">
        <span>登录查看更多关注人的内容</span>
    </div>
    <div class="item flex border-bottom bg-white" v-for="item in items">
        <avatar :user="item" :size="108"></avatar>
        <div class="flex-1">
            <div>
                <div class="name font-30">{{item.name}}</div>
                <div class="font-26 light">粉丝数&nbsp;&nbsp;{{item.fans_count}}</div>
            </div>
            <div class="content font-26 gray">
                {{item.desc}}
            </div>
        </div>
        <follow :user="item.id" :follow="item.is_followed" oneway=true has-border=true></follow>
    </div>
    <partial name="load-more" v-if="items.hasMore"></partial>
    <empty v-if="items.isEmpty"></empty>
</div>
</template>
<script>
import paging from 'paging';
import Follow from './component/Follow.vue';
export default {
    name: 'RecommendFollowerView',
    mixins: [paging],
    components: {
        Follow
    },
    computed: {
        paging() {
            return {
                path: 'users/suggest_follows',
                params: {
                    limit: 20
                },
                transform(items) {
                    return _.map(items, item => _.merge(item, {is_followed: false}));
                }
            }
        }
    }
}
</script>
