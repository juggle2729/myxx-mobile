<style lang="sass">
    .recommend-follwer-view {
        width: 100%;
        padding-top: 20px;
        .tips {
            width: 100%;
            text-align: center;
            margin: 60px auto;
            height: 100px;
            line-height: 100px;
            > span {
                border-radius: 48px;
                border: 1px solid #cc3f4f;
                padding: 48px;
            }
        }
        .item {
            position: relative;
            padding: 32px 32px 32px 0;
            margin-left: 32px;
            -webkit-box-align: inherit;
            .main {
                margin-left: 20px;
            }
            .name {
                margin-top: 4px;
                >div {
                    margin-top: 12px;
                }
            }
            .follow-cnt {
                position: absolute;
                top:36px;
                right: 32px;
                width: 122px;
                height: 62px;
                line-height: 60px;
                text-align: center;
                border: 1px solid #cc3f4f;
                border-radius: 12px;
                &.followed {
                     color: #888888;
                     border-color: #eeeeee;
                     background: #eeeeee;
                }
                .cnt-text {
                    color: #696969;
                    .icon {
                        color: #cc3f4f;
                        padding-right: 0;
                    }
                }
            }
            .content {
                margin-top: 16px;
                line-height: 36px;
            }
        }
    }
</style>
<template>
    <div class="recommend-follwer-view bg-default">
        <div class="tips font-30 red bg-default" v-if="!hasLogin" @click="login()">
            <span>登录查看更多关注人的内容</span>
        </div>
        <div class="bg-white">
            <div class="item flex border-bottom clearfix" v-for="item in items">
                <avatar :user="item" :size="108"></avatar>
                <div class="main flex-1">
                    <div class="name">
                        <p class="font-30">{{item.name}}</p>
                        <div class="font-26 light">粉丝{{item.fans_count}}</div>
                    </div>
                    <div class="follow-cnt font-26" @click="follow(item)" :class="{ 'followed': item.is_followed }">
                        <span class="cnt-text">
                            <span class="icon icon-follow-big font-22 red" v-if="!item.is_followed"></span>
                            {{item.is_followed ? '已关注' : '关注'}}
                        </span>
                    </div>
                    <div class="content font-26 gray">
                        {{item.desc}}
                    </div>
                </div>
            </div>
            <partial name="load-more" v-if="items.hasMore"></partial>
            <partial v-if="items.isEmpty" name="empty-page"></partial>
        </div>
    </div>
</template>
<script>
import paging from 'paging';
export default {
    name: 'RecommendFollowerView',
    mixins: [paging],
    computed: {
        paging() {
            return {
                path: 'users/suggest_follows',
                list: 'entries',
                params: {
                    limit: 20
                },
                transform(items) {
                    return _.map(items, item => _.merge(item, {is_followed: false}));
                }
            }
        },
        hasLogin() {
            return !!this.self;
        }
    },
    route: {
        data() {
            return this.fetch();
        }
    },
    methods: {
        follow(item) {
            if (!item.is_followed) {
                this.$post(`users/follow/${item.id}`).then(() => {
                    item.is_followed = true;
                });
            }
        },
        login() {
            this.action('login');
        }
    }
}
</script>
