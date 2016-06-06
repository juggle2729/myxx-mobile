<style lang="sass">
.jade-view {
    padding-bottom: 80px;
    .jade-video {
        height: 577px;
    }
    .titles {
        .header {
            min-height: 190px;
            padding: 32px;
        }
        .title {
            margin-bottom: 32px;
            line-height: 1.5;
        }
        .icon-price::before {
            position: relative;
            bottom: -3px;
            font-size: 36px;
            margin-right: 16px;
        }
        .button {
            padding: 0 20px 0 20px;
            height: 72px;
            border-width: 0;
            border-radius: 10px;
            text-align: center;
            line-height: 56px;
        }
        .footer {
            height: 80px;
            padding: 0 60px;
            -webkit-box-pack: justify;
        }
    }
    .master {
        height: 144px;
        padding: 32px;
        .avatar-90 {
            position: relative;
            bottom: 4px;
            margin-right: 20px;
        }
        .icon-enter-slim {
            position: relative;
            top: 2px;
            margin-left: 16px;
        }
        .master-name {
            margin-bottom: 14px;
        }
    }
    .params {
        .others {
            padding-left: 32px;
            ul > li {
                padding: 26px 0;
                line-height: 1.5;
                border-bottom: 1px solid #eee;
            }
            ul > li > p:nth-child(2) {
                line-height: 1.5;
                padding-right: 32px;
            }
            .label {
                width: 218px;
            }
        }
    }
    .detail {
        padding: 0 0 32px 0;
        .title {
            padding-left: 32px;
            height: 80px;
        }
        .text {
            padding: 32px;
            line-height: 1.5;
        }
        img {
            width: 100%
        }
    }
/*    .float-box {
        bottom: 0;
        height: 98px;
        -webkit-box-align: stretch;
        width: 100%;
        .contact-btn,.comment-btn {
             -webkit-box-orient: vertical;
            -webkit-box-pack: center;
            div[class^=icon] {
                margin-bottom: 14px;
                padding: 0;
            }
        }
        .buy-btn {
            text-align: center;
            line-height: 98px;
        }
    }*/
    .fake-input {
        bottom: 0;
        width: 100%;
        background-color: #f9f9f9;
        color: red;
        height: 98px;
        padding: 16px;
        .emoji {
            border-radius: 50%;
            box-shadow: 0 0 0 1px #999999;
            margin-top: 4px;
            width: 64px;
            height: 64px;
        }
        .input {
            background-color: white;
            color: #c6c6c6;
            padding: 0 20px;
            height: 72px;
            line-height: 72px;
            border-radius: 8px;
            margin:0 16px 0 20px;
        }
        .submit {
            line-height: 72px;
            width: 140px;
            height: 72px;
            color: white;
            background-color: #b2b2b2;
            border-radius: 8px;
        }
    }
}
</style>
<template>
<div class="jade-view bg-white">
    <div class="jade-video play" v-bg="jade.video" @click="play(jade.video)" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750">
    </div>
    <div class="titles">
        <div class="header">
            <div class="title font-32">{{jade.title}}</div>
            <div class="flex">
                <p class="red font-32 flex-1">{{jade.price | price}}</p>
                <template v-if="isSelf">
                    <div v-link="{name: 'addAuction'}" class="button bg-red flex font-32 white"><span class="center-horizontal">微信拍卖</span></div>
                </template>
            </div>
        </div>
<!--         <div class="footer flex font-26 gray border-top">
            <div class="flex">
                <span class="icon-pay-guarantee"></span>
                <span>付款担保</span>
            </div>
            <div class="flex">
                <span class="icon-seven-day"></span>
                <span>七天退货</span>
            </div>
            <div class="flex">
                <span class="icon-sf"></span>
                <span>顺丰包邮</span>
            </div>
        </div> -->
    </div>
    <div class="separator-20"></div>
    <div class="master flex" v-link="{name: 'user', params: {id: jade.owner.id, tab: 'story'}}">
            <avatar :user="jade.owner" :size="90"></avatar>
            <div class="flex-1">
                <p class="font-32 master-name">{{jade.owner.name}}</p>
                <p class="font-26 gray">{{jade.owner.title}}</p>
            </div>
            <div class="red font-26">更多商品<span class="icon-enter-slim gray"></span></div>
    </div>
    <div class="separator-20"></div>
    <div class="params">
        <tags :tags="jade.tags"></tags>
        <div class="others">
            <ul>
                <li v-if="jade.category" class="flex font-26">
                    <p class="label gray">分类</p>
                    <p class="flex-1">{{jade.category | tree}}</p>
                </li>
                <li v-if="jade.size" class="flex font-26">
                    <p class="label gray">尺寸</p>
                    <p class="flex-1">{{jade.size}}</p>
                </li>
                <li v-if="jade.weight" class="flex font-26">
                    <p class="label gray">重量</p>
                    <p class="flex-1">{{jade.weight}}g</p>
                </li>
                <li v-if="jade.variety" class="flex font-26">
                    <p class="label gray">种类</p>
                    <p class="flex-1">{{jade.variety | tree}}</p>
                </li>
                <li v-if="jade.place" class="flex font-26">
                    <p class="label gray">产地</p>
                    <p class="flex-1">{{jade.place | tree}}</p>
                </li>
                <li v-if="jade.skin" class="flex font-26">
                    <p class="label gray">皮色</p>
                    <p class="flex-1">{{jade.skin | tree}}</p>
                </li>
                <li v-if="jade.material" class="flex font-26">
                    <p class="label gray">产状</p>
                    <p class="flex-1">{{jade.material | tree}}</p>
                </li>
                <li v-if="jade.certificate" class="flex font-26">
                    <p class="label gray">证书</p>
                    <p class="flex-1">{{jade.certificate | tree}}</p>
                </li>
                <li v-if="jade.gifts.length" class="flex font-26">
                    <p class="label gray">礼物说</p>
                    <p class="flex-1">{{gifts}}</p>
                </li>
                <li v-if="jade.themes.length" class="flex font-26">
                    <p class="label gray">题材</p>
                    <p class="flex-1">{{themes}}</p>
                </li>
                <li v-if="jade.morals.length" class="flex font-26">
                    <p class="label gray">寓意</p>
                    <p class="flex-1">{{morals}}</p>
                </li>
                <li v-if="jade.creator" class="flex font-26">
                    <p class="label gray">作者</p>
                    <p class="flex-1">{{jade.creator}}</p>
                </li>
                <li v-if="jade.prizes.length" class="flex font-26">
                    <p class="label gray">获奖</p>
                    <p class="flex-1">{{prizes}}</p>
                </li>
                <li v-if="jade.genre" class="flex font-26">
                    <p class="label gray">流派</p>
                    <p class="flex-1">{{jade.genre | tree}}</p>
                </li>
            </ul>
        </div>
    </div>
    <div class="separator-20"></div>
    <recommend></recommend>
    <comment type="40" :id="jade.id"></comment>
    <div class="separator-20"></div>
    <div class="detail">
        <div class="title border-bottom flex">
            <span class="font-22 gray flex">图文详情</span>
        </div>
        <div class="text font-30">
          {{jade.detail}}
        </div>
        <div v-for="img in jade.pictures" >
          <img :src="config.img + img + '?imageView2'" @click="coverflow(jade.pictures, $index)"/>
        </div>
    </div>
    <div class="separator-20"></div>
    <!-- <comment type="30" :id="story.post_id"></comment> -->
<!--     <div class="float-box flex fixed font-30 bg-white border-top">
        <div class="font-22 flex flex-1 gray contact-btn border-right">
            <div class="icon-contact"></div>
            <div>联系商家</div>
        </div>
        <div class="font-22 flex flex-1 gray comment-btn" @click="$broadcast('comment', $event)">
            <div class="icon-comment"></div>
            <div>评论</div>
        </div>
        <div class="font-30 flex-2 buy-btn bg-gray white" @click="buy">
            立即购买
        </div>
    </div> -->
    <div v-if="!env.isShare" class="fake-input font-30 flex fixed" @click="$broadcast('comment', $event)">
        <img class="emoji" :src="'emoji.svg' | qn" alt="表情">
        <div class="input flex-1">点击此处发表评论...</div>
        <div class="submit center">发送</div>
    </div>
</div>
</template>
<script>
import Q from 'q';
import shareable from 'shareable';
import Comment from './JadeComment.vue';
import Avatar from './Avatar.vue';
import Tags from './Tags.vue';
import Recommend from './Recommend.vue';
export default {
    name: 'JadeView',
    mixins: [shareable],
    components: {
        Comment,
        Avatar,
        Tags,
        Recommend
    },
    data() {
        return {
            jade: {
                tags: [],
                gifts: [],
                themes: [],
                morals: [],
                prizes: [],
                owner: {}
            },
            recommend: {},
            isSelf: false
        };
    },
    computed: {
        themes() {
            return this._treeArrayConcat(this.jade.themes);
        },
        gifts() {
            return this._treeArrayConcat(this.jade.gifts);
        },
        morals() {
            return this._treeArrayConcat(this.jade.morals);
        },
        prizes() {
            return this._treeArrayConcat(this.jade.prizes);
        },
        genre() {
            return this._treeArrayConcat(this.jade.genre);
        }
    },
    ready() {
        this.$on('restore', () => {
            this.setShareData(this.jade, true);
        });
    },
    route: {
        data() {
            return this.$get('mall/products/'+ this.$route.params.id)
                .then((jade) => {
                    this.setShareData(jade, true);
                    this.action('user').then((user) => {
                        if (user && +user.id === +jade.owner.id) {
                            this.isSelf = true;
                        }
                    });
                    return {jade};
                });
        }
    },
    methods: {
        _treeArrayConcat(treeArray) {
            if (treeArray && treeArray.length !== 0) {
                let a = [];
                for (let tree of treeArray) {
                    a.push(tree ? (tree.parent ? `${tree.parent.name}—${tree.name}` : `${tree.name}`) : '无');
                }
                return a.join('、');
            } else {
                return '无';
            }
        },

         buy() {
            return;
            Q.promise((resolve) => {
                if(this.self) {
                    resolve();
                } else {
                    this.action('login').then(resolve);
                }
            }).then(() => {
                this.$router.go({name: 'order-affirm', params: {productId: this.jade.id}});
            });
         }
    }
}
</script>
