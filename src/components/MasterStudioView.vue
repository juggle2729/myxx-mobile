<style lang="sass">
    .master-studio-view {
        padding-bottom: 120px;
        .qrcode {
            padding: 72px 0 50px 0;
            .code-img {
                display: inline-block;
                width: 180px;
                height: 180px;
                margin-bottom: 32px;
                background-size: cover;
            }
        }
        .studio {
            padding: 72px 0 32px 0;
            .content {
                padding: 0 32px;
                text-align: left;
                text-indent: 54px;
                line-height: 38px;
                margin: 32px 0;
            }
            [type='button'] {
                width: 200px;
                height: 60px;
                border: 0;
                border-radius: 4px;
            }
            .logo {
                width: 180px;
                height: 180px;
                margin: 0 auto 32px auto;
                background-size: cover;
                background-position: center;
            }
            .expand .arrow {
                margin-right: -12px;
            }
        }

        .contact {
            .title {
                height: 80px;
                line-height: 80px;
            }
            .content {
                padding: 40px 72px;
                >div {
                   display: -webkit-box;
                   .right-120{
                       margin-right: 120px;
                   }
                   &:not(:last-child) {
                      margin-bottom: 40px;
                   }
                   img {
                      width: 32px;
                      height: 32px;
                      border-radius: 50%;
                      margin-right: 18px;
                   }
                   i {
                      margin-right: 12px;
                   }
                   & > div {
                      width: 243px;
                   }
                }

                .wrap-row {
                    word-break: break-all;
                    word-wrap:break-word;
                }

                .email img {
                    width: 28px;
                    height: 28px;
                    border-radius: 0;
                }
                .icon-location {
                    font-size: 32px;
                }
            }
        }
        .message {
            .title {
                height: 80px;
            }
            .content {
                padding: 0 32px;
                textarea {
                   width: 686px;
                   height: 240px;
                   border: 0;
                   border-radius: 8px;
                   resize: none;
                   padding: 5px;
                   line-height: 26px;
                }
                [type="button"] {
                   width: 686px;
                   height: 80px;
                   border: 0;
                   border-radius: 8px;
                }
                .line-title {
                   margin: 17px 0;
                }
            }
            .comment-component {
                padding: 0 0 24px 0;
                .comment-header .red {
                    display: none;
                }
            }
            .margin-bottom:not(:first-child) {
                margin-top: 32px;
            }
        }

        .border-all {
            box-shadow: 0 0 1px 0 #aaa;
        }
    }
</style>
<template>
    <div class="master-studio-view bg-white">
        <div class="separator-20"></div>
        <div class="qrcode center">
            <span class="code-img" v-bg="masterBaseData.website_2d_img" @click.stop="coverflow(masterBaseData.website_2d_img, 0)" query="imageView2/1/w/180/h/180/interlace/1"></span>
            <p class="font-30">官网二维码</p>
        </div>
        <template v-if="shop.shop_type !== 'inner'">
            <div class="separator-20"></div>
            <div class="studio center">
                <div class="img logo" v-bg.md="shop.logo"></div>
                <p class="font-30">{{shop.shop_name}}</p>
                <div class="content font-26 gray" v-text="shopDesc"></div>
                <div class="expand font-22 gray center" @click="expandTitle" v-show="shop.shop_about && shop.shop_about.length > aboutLimit">
                    <span class="arrow" :class="[isExpand ? 'arrow-up' : '']"></span>
                    <span class="text">{{isExpand ? '收起' : '展开'}}</span>
                </div>
                <input type="button" class="white font-26 bg-green" value="进入店铺" v-link="{name: 'mall-store', params: {id: masterBaseData.id}}"/>
            </div>
        </template>
        <template v-if="masterBaseData.phone || masterBaseData.weixin || masterBaseData.qq || masterBaseData.email || masterBaseData.address">
            <div class="separator-20"></div>
            <div class="contact">
                <div class="block-title font-22 gray border-bottom">
                    <span class="line-yellow"></span>
                    <span class="title">联系方式</span>
                </div>
                <div class="content">
                    <div class="gray font-26" v-show="masterBaseData.phone || masterBaseData.weixin">
                        <div class="right-120" v-show="masterBaseData.phone"><i class="icon-phone"></i><span>{{masterBaseData.phone}}</span></div>
                        <div class="flex" v-show="masterBaseData.weixin"><img src="//7xp1h7.com2.z0.glb.qiniucdn.com/icon/wechat.svg" class="flex"/><span class="flex">{{masterBaseData.weixin}}</span></div>
                    </div>
                    <div class="gray font-26" v-show="masterBaseData.qq || masterBaseData.email">
                        <div class="right-120 flex" v-show="masterBaseData.qq"><img src="//7xp1h7.com2.z0.glb.qiniucdn.com/icon/qq.svg" class="flex"/><span class="flex">{{masterBaseData.qq}}</span></div>
                        <div class="flex email" v-show="masterBaseData.email" :class="{'wrap-row': masterBaseData.qq}"><img src="//7xp1h7.com2.z0.glb.qiniucdn.com/icon/email.svg" class="flex"/><span class="flex">{{masterBaseData.email}}</span></div>
                    </div>
                    <div class="gray font-26" v-show="masterBaseData.address">
                        <span class="icon-location gray"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                        <span>{{masterBaseData.address}}</span>
                    </div>
                </div>
            </div>
        </template>
        <div class="separator-20"></div>
        <div class="message">
            <div class="block-title font-22 gray">
                <span class="line-yellow"></span>
                <span class="title">欢迎给我留言</span>
            </div>
            <div class="content">
                <textarea v-model="content" class="border-all font-22"></textarea>
                <input type="button" value="提交" class="white font-30 bg-yellow" @click="commitMessage()"/>
                <div class="line-title font-22 gray">
                    <div class="line"></div>
                    <span class="text gray">历史留言</span>
                    <div class="line"></div>
                </div>
                <comment :id="masterBaseData.id" type="50"></comment>
            </div>
        </div>
        <master-tab :master-info="masterBaseData" :current-tab="'master-studio'"></master-tab>
    </div>
</template>
<script>
    import masterMixin from '../mixins/MasterMixin.vue';
    import Comment from './Comment.vue';
    export default {
        name: 'MasterStudioView',
        mixins: [masterMixin],
        data() {
           return {
               content: '',
               shop: {},
               isExpand: false,
               aboutLimit: 300
           };
        },
        components: {
            Comment
        },
        computed: {
            shopDesc() {
                if (this.isExpand) {
                    return this.shop.shop_about;
                } else {
                    const shopDesc = this.shop && this.shop.shop_about ? this.shop.shop_about : '';
                    if (shopDesc) {
                        return shopDesc.length > this.aboutLimit ? shopDesc.substr(0, this.aboutLimit) + '...' : shopDesc;
                    }
                    return '';
                }
            }
        },
        methods: {
            coverflow(ids, index) {
                this.action('coverflow', {ids, index});
            },
            expandTitle() {
                this.isExpand = !this.isExpand;
            },
            loadMasterOtherData() {
              return this.fetchMasterShopInfo();
            },
            fetchMasterShopInfo: (function() {
               let loading = false;
               return function() {
                  if(loading) {
                      return console.debug('master studio!!!!!!!!');
                  }
                  loading = true;
                  console.debug('fetch shop info', 'master ' + this.id);

                  return this.$get(`mall/shops/${this.id}`).then((data) => {
                      this.shop = data;
                      loading = false;
                  });
               }
            })(),
            commitMessage() {
               const content = this.content;
               if(content && typeof content === 'string') {
                   this.$post(`users/target/${this.id}/type/50/comments`, {content})
                       .then(() => {
                           this.content = '';
                           this.$broadcast('fetch');
                       });
               } else {
                   this.toast('说点什么吧');
               }
            }
        }
    };
</script>
