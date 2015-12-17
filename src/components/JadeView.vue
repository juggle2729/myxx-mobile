<template>
    <div class="jade-detail">
        <div class="imgs">
            <img :src="imgs[0]" title="{{$route.params.id}}">
        </div>
        <div class="titles">
            <p class="font-34">{{name}}·{{moral.name}}</p>
            <div>
                <span class="font-30  icon-my-site" style="color:#f3ac1c;"> {{product_rewards.name}}</span>
            </div>
            <div>
                <span class="red font-30 icon-review"> {{price}}</span>
                <span class="gray font-22">{{display_count}}人浏览</span>
            </div>
        </div>
        <div class="separator-20"></div>
        <div class="row avatars">
            <div>
                <img :src="user.photo" title="{{user.photo}}" class="avatar-68">
                <span class="font-30" >{{user.nickname}}</span>
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
                <p class="font-26"><span class="gray">编号</span><span>A976578758</span></p>
                <p class="font-26"><span class="gray">类型</span><span>{{category.name}}</span></p>
                <p class="font-26" v-if="category.parent.name"><span class="gray">器型</span><span>{{category.parent.name}}</span></p>
                <p class="font-26"><span class="gray">重量</span><span>{{weight}}</span></p>
                <p class="font-26"><span class="gray">尺寸</span><span>{{size}}</span></p>
                <p class="font-26"><span class="gray">皮色</span><span>{{skin_color}}</span></p>
                <p class="font-26"><span class="gray">肉色</span><span>{{inner_color.name}}</span></p>
                <p class="font-26"><span class="gray">产地</span><span>{{origin_place.name}}</span></p>
                <p class="font-26"><span class="gray">简介</span><span>$route.params.id{{$route.params.id}}</span></p>
            </div>
        </div>
        <div class="separator-20"></div>
        <div class="params">
            <div class="title border-bottom" @click="adddetail">
                <span class="font-22 gray">图文详情</span>
            </div>
            <div class="content" id="detail">
            </div>
        </div>
    </div>
</template>
<script>
import emitter from '../utils/emitter';
    export default {
        name: 'JadeView',
        data() {
            return {
                shop: { // 所属商家
                    id: 1,
                    shop_name: '商家名称'
                },
                user: { // 商家用户信息
                    id: 1,
                    nickname: '商家名字',
                    photo: '/static/images/artist/head.png'
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
                product_rewards: { // 商品奖项
                    id: 2,
                    name: '13年百花奖金奖'
                },
                creator: '创作者',
                creator_reward: { // 创作者奖项
                    id: 1,
                    name: '市级工艺大师'
                },
                imgs: ['/static/images/artist/store.jpg'], // 图片
                like_count: 12, // 关注数
                display_count: 34, // 浏览数，
                is_liked: true, // 如果当前登录状态，是否关注过
                create_at: '2015-01-01 10:10:10',
                details:'<p class="font-34">123</p>',
                detail: [
                    {
                        media_type: 'inner_img', // 图片
                        media_content: '/static/images/artist/store.jpg'
                    },
                    {
                        media_type: 'text',
                        media_content: '你好啊， 这是文本块'
                    },
                    {
                        media_type: 'inner_video', // 视频
                        media_content: '/static/images/artist/store.jpg'
                    }
                ],
                boool: true
            };
        },
        methods: {
            adddetail() {
                this.detail.forEach((item) => {
                    if(item.media_type ==='text'){
                        var text = document.createElement('p');
                        text.innerText = item.media_content;
                        text.className = 'font-30';
                        document.getElementById('detail').appendChild(text);
                    }else {
                        var image = document.createElement('img');
                        image.src = item.media_content;
                        image.className = 'visible';
                        document.getElementById('detail').appendChild(image);
                    }
                });
            }
        },
        route: {},
        created() {
            emitter.on('scroll-to-bottom',(e) => {
                if(this.boool){
                    this.adddetail();
                    this.boool = false;
                }
            });
        }
    }
</script>
<style lang="sass">
.treasure-detail {
    .imgs {
        position: relative;
        width: 100%;
        height: 577px;
        > img {
            width: 100%;
            height: 100%;
        }
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
            padding-top: 32px;
            > p {
                margin-top: 28px;
                > span:nth-child(2) {
                    margin-left: 16px;
                }
            }
            > p:nth-child(1) {
                margin-top: 0;
            }
            > img {
                width: 100%;
            }
        }
    }
}
</style>
