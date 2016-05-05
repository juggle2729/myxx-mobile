<style lang="sass">
.jade-view {
    padding-bottom: 80px;
    .jade-video {
        height: 577px;
        img {
            width: 750px;
            height: 577px;
        }
    }
    .titles {
        /*height: 238px;*/
        padding: 36px 32px 32px 32px;
        position: relative;
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

    }
    .master {
        height: 144px;
        padding: 32px;
        .avatar-90 {
            margin-right: 20px;
        }
        .icon-enter {
            position: relative;
            bottom: -2px;
            margin-left: 14px;
            margin-right: -12px;
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

        }
        img {
            max-width: 100%
        }
    }
    .fake-input {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: #f9f9f9;
        color: red;
        height: 98px;
        padding: 16px;
        .input {
            background-color: white;
            color: #c6c6c6;
            padding: 0 20px;
            height: 72px;
            line-height: 72px;
            border-radius: 8px;
        }
        .submit {
            line-height: 72px;
            margin-left: 16px;
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
    <div class="jade-video play" v-bg="info.video" @click="play(info.video)" query="vframe/jpg/offset/0/rotate/auto|imageView2">
    </div>
    <div class="titles">
        <div class="title font-32">{{info.title}}</div>
        <div class="flex margin-top">
            <p class="red font-32 icon-price flex-1">{{info.price | price ''}}</p>
            <div class="button bg-gray flex font-32 white"><span class="center-horizontal">购买(开发中)</span></div>
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
                进入主页<span class="icon-enter gray"></span>
            </div>
    </div>
    <div class="separator-20"></div>
    <div class="params">
        <template v-if="tags.length">
            <div class="tags">
                <ul >
                    <li v-for="tag in tags" class="tag font-26"><a v-link="{name: 'tags', params: {type: tag.type, tag: tag.id}}">{{tag.name}}</a></li>
                </ul>
            </div>
        </template>
        <div class="others">
            <ul>
                <li class="flex font-26">
                    <p class="label gray">分类</p>
                    <p class="flex-1">{{info.category | tree}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">重量</p>
                    <p class="flex-1">{{info.weight}}g</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">尺寸</p>
                    <p class="flex-1">{{info.size}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">原料产地</p>
                    <p class="flex-1">{{info.place | tree}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">产状</p>
                    <p class="flex-1">{{info.material | tree}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">品种</p>
                    <p class="flex-1">{{info.variety | tree}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">皮色</p>
                    <p class="flex-1">{{info.skin | tree}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">题材</p>
                    <p class="flex-1">{{themes}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">礼物说</p>
                    <p class="flex-1">{{gifts}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">寓意</p>
                    <p class="flex-1">{{morals}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">获奖</p>
                    <p class="flex-1">{{prizes}}</p>
                </li>
                <li class="flex font-26">
                    <p class="label gray">流派</p>
                    <p class="flex-1">{{genre}}</p>
                </li>
            </ul>
        </div>
    </div>
    <template v-if="recommend.length">
        <div class="separator-20"></div>
        <div class="recommend">
            <div class="titleflex">
              <span class="font-22 gray flex title">相关推荐</span>
              <ul>
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
                                  {{rec.item.price | price ''}}
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
          {{{info.detail}}}
        </div>
        <div v-for="img in info.pictures" >
          <img :src="config.img + img + '?imageView2'" @click="coverflow(info.pictures, $index)"/>
        </div>
    </div>
    <div class="separator-20"></div>
    <div class="fake-input font-30 flex" @click="$broadcast('comment', $event)" >
        <div class="input flex-1">点击此处发表评论...</div>
        <div class="submit center">发送</div>
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
                owner: {}
            },
            recommend: {}
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
    route: {
        data() {
            this.$get('mall/products/'+ this.$route.params.id)
                .then((data) => {
                    this.info = data;
                    this.setShareData(data, true);
                });
            this.$get('dc/rd', {obj_id: this.$route.params.id, biz_type: 'pd'})
                .then((data) => {
                    this.recommend = data.recommend_data;
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
