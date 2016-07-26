<style lang="sass">
.user-home {
    .header {
        height: 84px;
        line-height: 84px;
        span {
            border-left: 6px solid #cc3f4f;
            padding-left: 12px;
        }
    }
    .title {
        line-height: 40px;
    }
    .shop {
        padding: 0 32px 30px;
        .img {
            height: 100px;
            width: 100px;
            border-radius: 6px;
            margin-right: 20px;
        }
        .icon-enter {
            position: relative;
            bottom: 8px;
        }
        .detail {
            .name {
                width: 500px;
                &.auth {
                    width: 400px;
                }
            }
            img {
                width: 110px;
                height: 36px;
                margin: 0 16px;
            }
        }
    }
    .works {
        padding: 0 32px 30px;
        .medias {
            position: relative;
            .media {
                height: 170px;
                width: 170px;
                &:not(:last-child) {
                    margin-right: 2px;
                };
            }
            .more {
                position: absolute;
                right: 0;
                padding-top: 70px;
                background-color: rgba(0, 0, 0, 0.5);
                .icon-enter {
                    position: relative;
                    top: 3px;
                }
            }
        }
    }
    .interview {
        padding: 0 32px 30px;
        .img {
            height: 100px;
            width: 100px;
            margin-right: 20px;
        }
    }
    .website {
        padding: 0 32px 30px;
        .cover {
            height: 200px;
        }
        .title {
            margin-top: 30px;
        }
    }
    .engraver {
        padding-left: 32px;
        .master {
            padding: 10px 0 40px 0;
            > div {
                padding: 28px 0;
                &:first-child {
                    padding-top: 0;
                };
                &:last-child {
                    background-image: none;
                    border-bottom: 0;
                    padding-bottom: 0;
                };
            }
        }
    }
}
</style>
<template>
<div class="user-home bg-light">
    <div class="shop bg-white" v-if="shop" v-link="{name: 'shop', params: {id: shop.id}}">
        <div class="header font-26 gray"><span>{{config.shop[shop.shop_type]}}</span></div>
        <div class="flex detail">
            <div class="img" v-bg="shop.logo"></div>
            <div class="flex-1">
                <div class="font-30 flex margin-bottom name" :class="{'auth': shop.auth_flag}">
                    <div class="omit">{{shop.shop_name}}</div>
                    <img :src="label() | qn" v-if="shop.auth_flag" />
                </div>
                <div class="font-26 gray"><span class="icon-location"></span><span>{{shop.locale_name}}</span></div>
            </div>
            <div class="icon-enter font-30 gray"></div>
        </div>
    </div>
    <div class="separator-20-no" v-if="works"></div>
    <div class="works bg-white" v-if="works">
        <div class="header font-26 gray"><span>作品展示</span></div>
        <div class="flex medias">
            <div class="media img" v-for="entry in works.entries" v-bg="entry.picture" v-if="$index < 4"
                v-link="{name: 'work', params: {id: entry.id}}"></div>
            <div class="media more font-30 center white" v-if="works.total > 4" v-link="{name: 'works', params: {id: $route.params.id}}">更多<span class="icon-enter"></span></div>
        </div>
    </div>
    <div class="separator-20-no" v-if="interview"></div>
    <div class="interview bg-white" v-if="interview" v-link="{name: 'story', params: {id: interview.iv_post_id}}">
        <div class="header font-26 gray"><span>专访</span></div>
        <div class="flex">
            <div class="img" v-bg="interview.iv_img"></div>
            <div class="font-30 flex-1 title omit-2">{{interview.iv_title}}</div>
        </div>
    </div>
    <div class="separator-20-no" v-if="website"></div>
    <div class="website bg-white" v-if="website" v-link="{name: 'master', params:{id: website.user_id}}">
        <div class="header font-26 gray"><span>人物志</span></div>
        <div class="cover img" v-bg="website.logo"></div>
        <div class="title font-30 flex-1 omit-2">{{website.title}}</div>
    </div>
    <div class="separator-20-no" v-if="engravers && engravers.length > 0"></div>
    <div class="engraver bg-white" v-if="engravers && engravers.length > 0">
        <div class="header font-26 gray"><span>玉雕师</span></div>
        <div class="master">
            <div class="flex border-bottom" v-for="master in engravers" v-link="{name: 'user', params: {id: master.id}}">
                <avatar :user="master" :size="108"></avatar>
                <div class="font-30 margin-left">
                    <p>{{master.nickname}}</p>
                    <p class="gray margin-top">{{master.title}}</p>
                </div>
            </div>
        </div>
    </div>
    <recommend :data="items" name="热门帖子"></recommend>
</div>
</template>
<script>
import paging from 'paging';
import recommend from 'component/Recommend.vue';
export default {
    name: 'UserHome',
    mixins: [paging],
    components: {
        recommend
    },
    data() {
        return {
            type: '',
            shop: {},
            works: {},
            interview: {},
            website: {},
            engravers: []
        }
    },
    computed: {
        paging() {
            return {
                path: 'dc/sns/search',
                list: 'entries',
                params: {
                    owner_id: this.$route.params.id,
                    limit: 10
                }
            }
        }
    },
    activate(done) {
        return this.$get(`users/${this.$route.params.id}/homepage`).then((data) => {
            this.shop = data.shop;
            this.works = data.works;
            this.interview = data.interview;
            this.website = data.website;
            this.engravers = data.engravers;
            this.fetch();
        }).then(done);
    },
    methods: {
        label() {
            return `user/${this.shop.shop_type}.png`;
        }
    }
}
</script>
