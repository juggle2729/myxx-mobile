<template>
<div class="jade-detail">
    <div class="imgs" v-bg="info.imgs[0]"></div>
    <div class="titles">
        <p class="font-34">{{info.name}}·{{info.moral.name}}</p>
        <div>
            <span class="font-30 icon-trophy" style="color:#f3ac1c;"> {{info.product_rewards[0].reward.name}}</span>
        </div>
        <div>
            <span class="red font-30 icon-price"> {{info.price}}</span>
            <span class="gray font-22">{{info.display_count}}人浏览</span>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="row avatars">
        <div>
            <div class="avatar-68" v-bg="info.user.photo"></div>
            <span class="font-30" >{{info.user.nickname}}</span>
        </div>
        <div>
            <span class="font-26 red">进入官网</span>
            <span class="icon-enter font-26 red"></span>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="params">
        <div class="title border-bottom">
            <span class="font-22 gray">宝贝参数</span>
        </div>
        <div class="content">
            <p class="font-26">
                <span class="gray">编号</span>
                <span>A976578758</span>
            </p>
            <p class="font-26">
                <span class="gray">类型</span>
                <span>{{info.category.name}}</span>
            </p>
            <p class="font-26" v-if="info.category.parent">
                <span class="gray">器型</span>
                <span>{{info.category.parent.name}}</span>
            </p>
            <p class="font-26">
                <span class="gray">重量</span>
                <span>{{info.weight}}</span>
            </p>
            <p class="font-26">
                <span class="gray">尺寸</span>
                <span>{{info.size}}</span>
            </p>
            <p class="font-26">
                <span class="gray">皮色</span>
                <span>{{info.skin_color}}</span>
            </p>
            <p class="font-26">
                <span class="gray">肉色</span>
                <span>{{info.inner_color.name}}</span>
            </p>
            <p class="font-26">
                <span class="gray">产地</span>
                <span>{{info.origin_place.name}}</span>
            </p>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="params">
        <div class="title border-bottom">
            <span class="font-22 gray">图文详情</span>
        </div>
        <div class="content font-30" id="detail">
        </div>
    </div>
    <social-bar :id="info.id" type="40" :active="info.is_liked" :total="info.like_count" :list="likes" class="border-top social bg-white">
        <div class="center border-left light extra-action">
            <i class="icon-share"></i><span v-link="{name: 'evaluation', params: {id: 1}}">分享</span>
        </div>
    </social-bar>
</div>
</template>
<script>
import SocialBar from './SocialBar.vue';
import emitter from '../utils/emitter';
export default {
    name: 'JadeView',
    data() {
        return {
            info: {
                shop: { // 所属商家
                    id: 1,
                    shop_name: '商家名称'
                },
                user: { // 商家用户信息
                    id: 1,
                    nickname: '商家名字',
                    photo: ''
                },
                name: '和田玉器茶壶',
                category: { // 分类信息
                    id: 1,
                    name: '摆件',
                    parent: {
                        id: 5,
                        name: '壶'
                    }
                },
                theme: { // 题材
                    id: 3,
                    name: '动物'
                },
                skin_color: '皮色',
                inner_color: { // 肉色
                    id: 1,
                    name: '红色'
                },
                moral: { // 寓意
                    id: 1,
                    name: '吉祥如意'
                },
                price: 2940500,
                weight: 59,
                size: '40cm*12cm',
                origin_place: { // 原产地
                    id: 1,
                    name: '深圳'
                },
                stock: 23, // 库存
                defect: '瑕疵',
                package: '包装',
                product_rewards: [ // 商品奖项
                    {
                        reward:{
                            id: 0,
                            name: '13年百花奖金奖'
                        }
                    }
                ],
                creator: '创作者',
                creator_reward: { // 创作者奖项
                    id: 1,
                    name: '市级工艺大师'
                },
                imgs: [], // 图片
                like_count: 12, // 关注数
                display_count: 34, // 浏览数，
                is_liked: true, // 如果当前登录状态，是否关注过
                create_at: '2015-01-01 10:10:10',
                details: '<p class="font-34">123</p>',
                detail: []
            },
            likes: [

            ]
        };
    },
    methods: {
        addDetail() {
            this.info.detail.medias.forEach((item) => {
                if (item.media_type === 'text') {
                    var text = document.createElement('p');
                    text.innerText = item.media_content;
                    document.getElementById('detail').appendChild(text);
                } else {
                    var image = document.createElement('img');
                    image.src = 'http://7xo8aj.com2.z0.glb.qiniucdn.com/'+ item.media_content +'?imageView2/1/w/600/h/350/interlace/1';
                    image.className = 'visible';
                    document.getElementById('detail').appendChild(image);
                }
            });
        }
    },
    route: {
        data() {
            return this.$get('mall/products/'+ this.$route.params.id)
                .then((data) => {
                    this.info = data;
                    this.$get('users/target/'+ this.info.id +'/type/40/likers')
                        .then((data) => {
                            this.likes = data.users;
                        });
                    this.addDetail();
                });
        }
    },
    components: {
        SocialBar
    }
}
</script>
<style lang="sass">
.jade-detail {
    .imgs {
        position: relative;
        width: 100%;
        height: 577px;
        background-size: cover;
    }
    .titles {
        display: -webkit-box-;
        height: 238px;
        padding: 32px 32px 36px 32px;
        position: relative;
        > div {
            display: flex;
            align-items: center;
            width: 75%;
            margin-top: 32px;
            height: 36px;
            > span:nth-of-type(2) {
                position: absolute;
                right: 32px;
            }
        }
    }
    .avatars {
        height: 132px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        > div {
            display: flex;
            align-items: center;
            > span:nth-of-type(1) {
                margin-left: 20px;
                margin-right: 56px;
            }
            .icon-enter {
                transform: rotate(-90deg);
            }
        }
    }
    .params {
        padding: 0 32px 32px 32px;
        .title {
            display: flex;
            align-items: center;
            height: 80px;
        }
        .content {
            > p {
                margin-top: 32px;
            }
            > img {
                margin-top: 32px;
                width: 100%;
            }
        }
    }
}
</style>
