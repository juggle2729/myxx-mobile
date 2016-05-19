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
        .tags {
            padding: 8px 32px 32px 32px;
            border-bottom: 1px solid #eee;
            .tag {
                display: inline-block;
                margin-right: 14px;
                margin-top: 24px;
                padding: 20px 30px;
                background-color: #ffecea;
                border-radius: 20px;

            }
        }
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
    .recommend {
        padding: 0 0 22px 32px;
        .title {
            height: 80px;
        }
        ul {
            padding-bottom: 10px;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
        }
        ul > li {
            display: inline-block;
            width: 300px;
            height: 404px;
            margin-right: 20px;
            white-space: normal;
            vertical-align: top;
        }
        a {
            display: block;
        }
        .recommend-img {
            position: relative;
            width: 300px;
            height: 300px;
            .label {
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100px;
                height: 44px;
                text-align: center;
                line-height: 44px;
                background-color: rgba(0,0,0,0.5);
            }
            .img {
                width: 100%;
                height: 100%;
            }
        }
        .recommend-title {
            padding: 20px 16px 16px 16px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .title-center {
            text-align: center;
        }
        .title-left {
            text-align: left;
        }
        .author {
            margin-top: 16px;
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
    .float-box {
        position: fixed;
        bottom: 0;
        height: 98px;
        width: 100%;
        & > div {
            height: 100%;
            -webkit-box-orient: vertical;
            -webkit-box-pack: center;
            div[class^=icon] {
                margin-bottom: 14px;
                padding: 0;
            }
        }
        .contact-btn,.comment-btn {
            width: 185px;
            border-top: 1px solid #d9d9d9;
        }
        .contact-btn {
            border-right: 1px solid #d9d9d9;
        }
        .buy-btn {
            width: 380px;
        }
    }
}
</style>
<template>
<div class="jade-view bg-white">
    <div class="jade-video play" v-bg="info.video" @click="play(info.video)" query="vframe/jpg/offset/0/rotate/auto|imageView2/2/w/750">
    </div>
    <div class="titles">
        <div class="header">
            <div class="title font-32">{{info.title}}</div>
            <div class="flex">
                <p class="red font-32 flex-1">{{info.price | price}}</p>
                <template v-if="isSelf">
                    <div v-link="{name: 'addAuction'}" class="button bg-red flex font-32 white"><span class="center-horizontal">微信拍卖</span></div>
                </template>
            </div>
        </div>
        <div class="footer flex font-26 gray border-top">
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
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="master flex" v-link="{name: 'user', params: {id: info.owner.id, tab: 'story'}}">
            <avatar :user="info.owner" :size="90"></avatar>
            <div class="flex-1">
                <p class="font-32 master-name">{{info.owner.name}}</p>
                <p class="font-26 gray">{{info.owner.title}}</p>
            </div>
            <div class="red font-26">
                更多商品<span class="icon-enter-slim gray"></span>
            </div>
    </div>
    <div class="separator-20"></div>
    <div class="params">
        <template v-if="tags.length">
            <div class="tags">
                <ul >
                    <li v-for="tag in tags" class="tag font-26"><a v-link="{name: 'tags', params: {type: tag.type, tag: tag.id, name: tag.name}}">{{tag.name}}</a></li>
                </ul>
            </div>
        </template>
        <div class="others">
            <ul>
                <li v-if="info.category" class="flex font-26">
                    <p class="label gray">分类</p>
                    <p class="flex-1">{{info.category | tree}}</p>
                </li>
                <li v-if="info.size" class="flex font-26">
                    <p class="label gray">尺寸</p>
                    <p class="flex-1">{{info.size}}</p>
                </li>
                <li v-if="info.weight" class="flex font-26">
                    <p class="label gray">重量</p>
                    <p class="flex-1">{{info.weight}}g</p>
                </li>
                <li v-if="info.variety" class="flex font-26">
                    <p class="label gray">种类</p>
                    <p class="flex-1">{{info.variety | tree}}</p>
                </li>
                <li v-if="info.place" class="flex font-26">
                    <p class="label gray">产地</p>
                    <p class="flex-1">{{info.place | tree}}</p>
                </li>
                <li v-if="info.skin" class="flex font-26">
                    <p class="label gray">皮色</p>
                    <p class="flex-1">{{info.skin | tree}}</p>
                </li>
                <li v-if="info.material" class="flex font-26">
                    <p class="label gray">产状</p>
                    <p class="flex-1">{{info.material | tree}}</p>
                </li>
                <li v-if="info.certificate" class="flex font-26">
                    <p class="label gray">证书</p>
                    <p class="flex-1">{{info.certificate | tree}}</p>
                </li>
                <li v-if="info.gifts.length" class="flex font-26">
                    <p class="label gray">礼物说</p>
                    <p class="flex-1">{{gifts}}</p>
                </li>
                <li v-if="info.themes.length" class="flex font-26">
                    <p class="label gray">题材</p>
                    <p class="flex-1">{{themes}}</p>
                </li>
                <li v-if="info.morals.length" class="flex font-26">
                    <p class="label gray">寓意</p>
                    <p class="flex-1">{{morals}}</p>
                </li>
                <li v-if="info.creator" class="flex font-26">
                    <p class="label gray">作者</p>
                    <p class="flex-1">{{info.creator}}</p>
                </li>
                <li v-if="info.prizes.length" class="flex font-26">
                    <p class="label gray">获奖</p>
                    <p class="flex-1">{{prizes}}</p>
                </li>
                <li v-if="info.genre" class="flex font-26">
                    <p class="label gray">流派</p>
                    <p class="flex-1">{{info.genre | tree}}</p>
                </li>
            </ul>
        </div>
    </div>
    <template v-if="recommend.length">
        <div class="separator-20"></div>
        <div class="recommend">
            <div class="titleflex">
              <span class="font-22 gray flex title">相关推荐</span>
              <ul class="scrollable">
                  <li class="border-default" v-for="rec in recommend">
                      <a v-if="rec.biz_type === 'pd'" v-link="{name: 'jade', params: {id: rec.item.id}}">
                          <div class="recommend-img">
                              <span class="label font-26 white">商品</span>
                              <div class="media img" v-bg="rec.item.first_picture"></div>
                          </div>
                          <div class="font-26">
                              <p class="recommend-title title-center">
                                  {{rec.item.title}}
                              </p>
                              <p class="red recommend-price title-center">
                                  {{rec.item.price | price}}
                              </p>
                          </div>
                      </a>
                      <a v-if="rec.biz_type === 'jb'" v-link="{name: 'evaluation', params: {id: rec.item.id}}">
                          <div class="recommend-img">
                              <span class="label font-26 white">求鉴宝</span>
                              <div class="media img" v-bg="rec.item.picture"></div>
                          </div>
                          <div class="font-26">
                              <p class="recommend-title title-left">
                                  {{rec.item.description}}
                              </p>
                          </div>
                      </a>
                      <a v-if="rec.biz_type === 'oc'" v-link="{name: 'lesson', params: {id: rec.item.id}}">
                          <div class="recommend-img">
                              <span class="label font-26 white">公开课</span>
                              <div class="media img" v-bg="rec.item.author.portrait"></div>
                          </div>
                          <div class="font-26">
                              <div class="recommend-title title-left">
                                  <p>{{rec.item.title}}</p>
                                  <p class="gray author">{{rec.item.author.name}}</p>
                             </div>
                          </div>
                      </a>
                  </li>
              </ul>
            </div>
        </div>
    </template>
    <div class="separator-20"></div>
    <comment type="40" :id="info.id"></comment>
    <div class="separator-20"></div>
    <div class="detail">
        <div class="title border-bottom flex">
            <span class="font-22 gray flex">图文详情</span>
        </div>
        <div class="text font-30">
          {{info.detail}}
        </div>
        <div v-for="img in info.pictures" >
          <img :src="config.img + img + '?imageView2'" @click="coverflow(info.pictures, $index)"/>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="float-box font-30 flex bg-white">
        <div class="font-22 flex gray contact-btn">
            <div class="icon-contact"></div>
            <div>联系商家</div>
        </div>
        <div class="font-22 flex gray comment-btn" @click="$broadcast('comment', $event)">
            <div class="icon-comment"></div>
            <div>评论</div>
        </div>
        <div class="font-30 flex buy-btn bg-red white" v-link="{name: 'order-affirm', params: {id: info.id}}">
            立即购买
        </div>
    </div>
</div>
</template>
<script>
import shareable from 'shareable';
import Comment from './JadeComment.vue';
import Avatar from './Avatar.vue';
export default {
    name: 'JadeView',
    mixins: [shareable],
    components: {
        Comment,
        Avatar
    },
    data() {
        return {
            info: {
                id: 0,
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
        themes: function() {
            return this._treeArrayConcat(this.info.themes);
        },
        gifts: function() {
            return this._treeArrayConcat(this.info.gifts);
        },
        morals: function() {
            return this._treeArrayConcat(this.info.morals);
        },
        prizes: function() {
            return this._treeArrayConcat(this.info.prizes);
        },
        genre: function() {
            return this._treeArrayConcat(this.info.genre);
        },
        tags: function() {
            let a = [];
            _(this.info.tags).forEach(function(tag){
                if (typeof tag.tag === 'string') {
                    a.push({type: tag.type, name: tag.tag, id: tag.tag});
                } else {
                    a.push({type: tag.type, name: tag.tag.name, id: tag.tag.id});
                }
            });
            return a;
        }
    },
    ready() {
        this.$on('restore', () => {
            this.setShareData(this.info, true);
        });
    },
    route: {
        data() {
            return this.$get('mall/products/'+ this.$route.params.id)
                .then((data) => {
                    this.info = data;
                    this.setShareData(data, true);
                    this.$get('dc/rd', {obj_id: this.$route.params.id, biz_type: 'pd'})
                        .then((data) => {
                            this.recommend = data.recommend_data;
                        });
                    this.action('user').then((user) => {
                        if (user && +user.id === +data.owner.id) {
                            this.isSelf = true;
                        }
                    });
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
        }
    }
}
</script>
