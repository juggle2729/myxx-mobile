<style lang="sass">
    .master-studio-view {
        padding-bottom: 120px;
        .qrcode {
            padding: 72px 0 50px 0;
            img {
                width: 180px;
                height: 180px;
                margin-bottom: 32px;
            }
        }
        .studio {
            padding: 72px 0 32px 0;
            .gray {
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
            }
        }
        .img::before {
            background: none;
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
                .header {
                    display: none;
                }
            }
        }
    }
</style>
<template>
    <div class="master-studio-view bg-white">
        <div class="separator separator-20"></div>
        <div class="qrcode center">
            <img src="/static/images/avatar--defaut.jpg" alt="qrcode"/>
            <p class="font-30">官网二维码</p>
        </div>
        <div class="separator separator-20"></div>
        <div class="studio center">
            <div class="img logo" v-bg.md="shop.logo"></div>
            <p class="font-30">{{shop.shop_name}}</p>
            <p class="font-26 gray">{{shop.shop_about}}</p>
            <input type="button" class="white font-26 bg-green" value="进入店铺"/>
        </div>
        <div class="separator separator-20"></div>
        <div class="contact">
            <div class="title flex border-bottom">
                <img src="/static/images/icon/icon_line.svg" class="flex"/>
                <span class="font-22 gray flex">联系方式</span>
            </div>
            <div class="content">
                <div class="gray font-26">
                    <div class="right-120"><i class="icon-phone"></i><span>{{masterBaseData.phone}}</span></div>
                    <div class="flex"><img src="/static/images/icon/icon_wechat.png" class="flex"/><span class="flex">{{masterBaseData.weixin}}</span></div>
                </div>
                <div class="gray font-26">
                    <div class="right-120 flex"><img src="/static/images/icon/icon_qq.png" class="flex"/><span class="flex">{{masterBaseData.qq}}</span></div>
                    <div class="flex"><img src="/static/images/icon/icon_email.svg" class="flex"/><span class="flex">{{masterBaseData.email}}</span></div>
                </div>
                <div class="gray font-26"><i class="icon-site"></i><span>{{masterBaseData.address}}</span></div>
            </div>
        </div>
        <div class="separator separator-20"></div>
        <div class="message">
            <div class="title flex">
                <img src="/static/images/icon/icon_line.svg" class="flex"/>
                <span class="font-22 gray flex">欢迎给我留言</span>
            </div>
            <div class="content">
                <textarea v-model="content" class="border-all"></textarea>
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
              shop: {},
           };
        },
        components: {
            Comment
        },
        methods: {
           loadMasterOtherData: () => {
              this.fetchMasterShopInfo();
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
                           this.fetch();
                       });
               } else {
                   this.toast('说点什么吧');
               }
           }
        }
    };
</script>
