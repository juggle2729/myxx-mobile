<style lang="sass">
.jade-view {
    padding-bottom: 80px;
    .titles {
        display: -webkit-box-;
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
            /*.text{
                margin-top: 32px;
                line-height: 46px;
            }
            .picture {
                margin-top: 32px;
                background-size: cover;
            }
            .picture:after {
                content: '';
                display: block;
                padding-bottom: 100%;
            }*/
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
        <p class="font-34">{{info.name}}{{info.moral? '·'+info.moral.name: ''}}</p>
        <div class="flex" v-if="info.product_rewards.length >0">
            <span class="font-30 icon-trophy flex" style="color:#f3ac1c;">{{productReward}}</span>
        </div>
        <div class="flex">
            <p class="red font-30 icon-price flex-1">{{info.price | percent}}</p>
            <p class="light font-22 flex">{{info.display_count}}人浏览</p>
        </div>
    </div>
<!--     <div class="separator-20"></div>
    <div class="avatars flex">
        <div class="flex flex-1">
            <div class="avatar-68 margin-right" v-bg.sm="info.user.photo"></div>
            <span class="font-30 flex">{{info.user? (info.user.nickname? info.user.nickname: info.user.name): ''}}</span>
        </div>
        <div class="font-26 red flex" v-link="info.user | profile">
            <p class="flex">进入{{info.user? (info.user.website_status? '官网': '主页'): '主页'}}</p>
            <p class="icon-enter gray"></p>
        </div>
    </div> -->
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
    <div class="separator-20"></div>
    <div class="params">
        <div class="title border-bottom flex">
            <span class="font-22 gray flex">图文详情</span>
        </div>
        <div class="medias font-30">
            {{{info.detail}}}
            <!-- <template v-for="media in info.detail.medias">
                <div class="media text" v-if="media.media_type==='text'">{{media.media_content}}</div>
                <div class="media picture" v-if="media.media_type==='inner_img'" v-bg.md="media.media_content"></div>
                <div class="media play" @click="play(media.media_content)" v-if="media.media_type==='video'" v-bg.video="media.media_content"></div>
            </template> -->
        </div>
    </div>
    <social-bar :id="info.id" type="40" :active="info.is_liked" :total="info.like_count" :list="likes" class="border-top social bg-white">
        <div @click="share" class="border-left center gray extra-action"><i class="icon-share"></i><span>分享</span></div>
    </social-bar>
</div>
</template>
<script>
import SocialBar from './SocialBar.vue';
import Slider from './Slider.vue';
export default {
    name: 'JadeView',
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
                imgs: ['img.png'], // 占位图，误删
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
                    this.setShareData('product', data, false);
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
        },
        play(id) {
            this.action('play', {id});
            if(!this.isApp) { // 分享页面，视频自动播放
                var timer = setInterval(() => {
                    var v = document.querySelector('video');
                    if(v) {
                        clearInterval(timer);
                        v.play();
                    }
                }, 10);
            }
        }
    }
}
</script>
