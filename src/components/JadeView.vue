<style lang="sass">
.jade-view {
    padding-bottom: 80px;
    .titles {
        /*height: 238px;*/
        padding: 32px 32px 36px 32px;
        position: relative;
        > div {
            margin-top: 32px;
            height: 36px;
        }
        .icon-price:before {
            margin-right: 16px;
        }
        .icon-trophy:before {
            margin-right: 16px;
        }
    }
    .avatars {
        padding: 0 32px;
        height: 132px;
        p {
            margin-left: 16px;
        }
    }
    .params {
        padding: 0 32px 32px 32px;
        .title {
            height: 80px;
        }
        .content {
            > p {
                margin-top: 32px;
                > span {
                    margin-right: 16px;
                }
            }
        }
        .medias {
            padding: 32px 0;
        }
    }
    .social {
        position: fixed;
        z-index: 9;
        bottom: 0;
        width: 100%;
    }
}
</style>
<template>
<div class="jade-view bg-white">
    <slider :ids="info.imgs"></slider>
    <div class="titles">
        <div class="font-34">{{info.name}}{{info.moral? '·'+info.moral.name: ''}}</div>
        <div v-if="info.product_rewards.length >0">
            <span class="font-30 icon-trophy flex" style="color:#f3ac1c;">{{productReward}}</span>
        </div>
        <div class="flex">
            <p class="red font-30 icon-price flex-1">{{info.price | percent}}</p>
            <p class="light font-22 flex">{{info.display_count}}人浏览</p>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="params">
        <div class="title border-bottom flex">
            <span class="font-22 gray flex">宝贝参数</span>
        </div>
        <div class="content">
            <p class="font-26">
                <span class="light">类型</span>
                <span>{{info.category? info.category.name: ''}}</span>
            </p>
            <p class="font-26" v-if="info.category.parent">
                <span class="light">器型</span>
                <span>{{info.category? (info.category.parent? info.category.parent.name:''): ''}}</span>
            </p>
            <p class="font-26">
                <span class="light">重量</span>
                <span>{{info.weight | percent}}&nbsp;(g)</span>
            </p>
            <p class="font-26">
                <span class="light">尺寸</span>
                <span>{{info.size? info.size: 0}}&nbsp;(cm)</span>
            </p>
            <p class="font-26">
                <span class="light">皮色</span>
                <span>{{info.skin_color}}</span>
            </p>
            <p class="font-26">
                <span class="light">肉色</span>
                <span>{{info.inner_color? info.inner_color.name: ''}}</span>
            </p>
            <p class="font-26">
                <span class="light">产地</span>
                <span>{{info.origin_place? info.origin_place.name: ''}}</span>
            </p>
        </div>
    </div>
    <template v-if="info.detail">
      <div class="separator-20"></div>
      <div class="params">
        <div class="title border-bottom flex">
          <span class="font-22 gray flex">图文详情</span>
        </div>
        <div class="medias font-30">
          {{{info.detail}}}
        </div>
      </div>
    </template>
    <social-bar :id="info.id" type="40" :active="info.is_liked" :total="info.like_count" :list="likes" class="border-top social bg-white">
        <div @click="share" class="border-left center gray extra-action"><i class="icon-share"></i><span>分享</span></div>
    </social-bar>
</div>
</template>
<script>
import SocialBar from './SocialBar.vue';
import Slider from './Slider.vue';
import shareable from 'shareable';
export default {
    name: 'JadeView',
    mixins: [shareable],
    components: {
        SocialBar,
        Slider
    },
    data() {
        return {
            info: {
                shop: {},
                user: {},
                category: {
                    parent: {}
                },
                theme: {},
                inner_color: {},
                moral: {},
                origin_place: {},
                product_rewards: [{reward: {}}],
                creator_reward: {},
                imgs: [],
                detail: {
                    medias: [{}]
                }
            },
            likes: []
        };
    },
    computed: {
        productReward() {
            let reward = this.info.product_rewards[0];
            return reward? reward.reward.name : '';
        }
    },
    route: {
        data() {
            return this.$get('mall/products/'+ this.$route.params.id)
                .then((data) => {
                    this.info = data;
                    this.setShareData(data, true);
                    this.$get('users/target/'+ this.info.id +'/type/40/likers')
                        .then((data) => {
                            this.likes = data.users;
                        });
                });
        }
    },
    methods: {
        coverflow(index) {
            let ids = this.info.detail.medias
                        .filter(media => media.media_type==='picture')
                        .map(media => media.media_content);
            this.action('coverflow', {ids, index});
        }
    }
}
</script>
