<style lang="sass">
.studio-view {
    padding-bottom: 98px;
    .banner {
        height: 330px;
    }
    .shop {
        height: 168px;
        padding: 0 32px;
        .img {
            height: 100px;
            width: 100px;
            border-radius: 6px;
            margin-right: 20px;
        }
        img {
            width: 110px;
            height: 36px;
            margin-left: 16px;
        }
    }
    .master {
        padding: 0 32px;
        height: 114px;
        .icon-enter {
            position: relative;
            bottom: 10px;
        }
    }
    .header {
        padding: 0 32px;
        height: 84px;
        line-height: 84px;
        span {
            border-left: 6px solid #cc3f4f;
            padding-left: 12px;
        }
    }
    .medias {
        display: inline-block;
        &:nth-child(odd) {
            margin-left: 4px;
        };
        .media {
            height: 373px;
            width: 373px;
        }
        .detail {
            height: 110px;
            width: 373px;
            padding: 18px 24px;
        }
    }
    .footer {
        height: 98px;
        line-height: 48px;
        width: 100%;
        position: fixed;
        bottom: 0;
    }
}
</style>
<template>
<div class="studio-view bg-white">
    <div class="banner img" v-bg="shop.image_bg"></div>
    <div class="shop flex">
        <div class="img" v-bg="shop.logo"></div>
        <div class="flex-1">
            <div class="font-30 flex margin-bottom">
                <div>{{shop.shop_name}}</div><img :src="label() | qn" />
            </div>
            <div class="font-26 gray"><span class="icon-location"></span><span>{{shop.locale_name}}</span></div>
        </div>
    </div>
    <div class="master border-top flex" v-link="{name: 'user', params: {id: shop.owner.id}}">
        <avatar :user="shop.owner"></avatar>
        <div class="font-26 margin-left flex-1">
            <p>{{shop.owner.nickname}}</p><p class="margin-top gray">{{shop.owner.title}}</p>
        </div>
        <div class="icon-enter font-30 gray"></div>
    </div>
    <div class="separator-20-no"></div>
    <div class="header font-26 gray"><span>新品发布</span></div>
    <div class="medias" v-for="item in items" v-link="{name: 'jade', params: {id: item.id}}">
        <div class="media img" v-bg="item.first_picture"></div>
        <div class="detail font-30">
            <p class="margin-bottom omit">{{item.title}}</p><p class="font-26 red">{{item.price | price}}</p>
        </div>
    </div>
    <div class="footer flex border-top font-30 bg-white gray" v-if="!env.isShare">
        <chat class="flex-1 center border-right" :id="shop.owner.id" :name="shop.owner.nickname"></chat>
        <share class="flex-1 center"></share>
    </div>
</div>
</template>
<script>
import paging from 'paging';
import share from 'component/Share.vue';
import chat from 'component/Chat.vue';
import shareable from 'shareable';
export default {
    name: 'ShopView',
    mixins: [paging, shareable],
    components: {
        share,
        chat
    },
    data() {
        return {
            shop: {
                owner: {}
            }
        }
    },
    computed: {
        paging() {
            return {
                path: 'mall/homepage/searches',
                list: 'products',
                params: {
                    shop_id: this.shop.id,
                    order_by: 'new',
                    limit: 10
                }
            }
        }
    },
    route: {
        data({to}) {
            return this.$get(`mall/shop/${to.params.id}/profile`).then((data) => {
                this.shop = data;
                this.action('updateTitle', {text: this.shop.shop_name});
                this.setShareData({name: this.shop.shop_name, logo: this.shop.logo}, true);
                this.fetch();
            });
        }
    },
    methods: {
        label() {
            return `user/${this.shop.shop_type}.png`;
        }
    }
}
</script>