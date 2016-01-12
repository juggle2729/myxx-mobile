<style lang="sass">
    .mall-store-view {
        .store {
            padding-top: 72px;
            .logo {
                width: 180px;
                height: 180px;
                margin: 0 auto 32px auto;
                background-size: cover;
                background-position: center;
            }
            .content {
                text-align: left;
                line-height: 38px;
                text-indent: 54px;
                margin: 32px;
            }
            .arrow {
                margin-right: 0;
            }
            .contact {
                margin-top: 32px;
                padding: 32px 44px;
                > div:first-child {
                    margin-bottom: 40px;
                }
                .red span {
                    margin-left: 12px;
                }
            }
        }
        .products {
           padding-bottom: 100px;

           ul {
               margin: 0 24px;
           }

           li {
               display: inline-block;
               position: relative;
               width: 342px;
               height: 380px;
               padding: 8px;
               border-radius: 8px;
               margin-bottom: 16px;

               .image {
                   height: 268px;
                   width: 326px;
                   background-size: cover;
                   background-position: center;
               }

               .profile {
                   margin: 16px;
                   .red {
                       margin-top: 16px;
                   }
               }

               &:nth-child(2n+1) {
                   margin-right: 18px;
               }
           }
        }
        [class^="icon-"]:before {
            margin-right: 18px;
        }
    }
</style>
<template>
    <div class="mall-store-view bg-default">
        <div class="store bg-white">
            <div class="logo" v-bg.md="shop.logo"></div>
            <p class="font-30 center">{{shop.shop_name}}</p>
            <div class="content font-26 gray" v-text="shopDesc"></div>
            <div class="expand font-22 gray center" @click="expandTitle" v-show="shop.shop_about && shop.shop_about.length > aboutLimit">
                <span class="arrow" :class="[isExpand ? 'arrow-up' : '']"></span>
                <span class="text">{{isExpand ? '收起' : '展开'}}</span>
            </div>
            <div class="contact border-vertical">
                <div class="gray font-26 flex"><span class="icon-site">{{masterBaseData.address}}</span></div>
                <div class="gray font-26 flex">
                    <p class="icon-phone flex-1">{{masterBaseData.phone}}</p>
                    <p class="font-26 red">藏品数<span>{{shop.products_count}}</span></p>
                </div>
            </div>
        </div>
        <div class="products bg-default">
            <div class="line-title font-22 gray">
                <div class="line"></div>
                <span class="text gray">全部商品</span>
                <div class="line"></div>
            </div>
            <ul class="bg-default">
                <li v-for="product in products" class="bg-white" v-link="{name: 'jade', params: {id: product.id}}">
                    <div class="image" v-bg.md="product.imgs[0]"></div>
                    <div class="font-26 profile">
                        <p>{{product.name}}</p>
                        <p class="red">{{product.price | currency '￥'}}</p>
                    </div>
                </li>
            </ul>
            <div class="line-title font-22 light" v-show="!hasMore">
                <span class="text gray">没有更多了</span>
            </div>
            <div v-show="hasMore" class="loadmore center font-22 gray padding-vertical">
                <img src="http://7xp1h7.com2.z0.glb.qiniucdn.com/loading.gif" alt="loading">
            </div>
        </div>
    </div>
</template>
<script>
    import masterMixin from '../mixins/MasterMixin.vue';
    export default {
        name: 'MallStoreView',
        mixins: [masterMixin],
        data() {
           return {
              shop: {},
              isExpand: false,
              aboutLimit: 70,
              products: [],
              hasMore: true
           };
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
            setShare() {
                const [title, desc, icon] = ['打开 [美玉秀秀] 开启美玉之旅！', this.shop.shop_name, this.shop.logo];

                let curUrl = location.href;
                this.action('shareable', {title, desc, icon, url: curUrl});
            },
            preventDefaultShare() {
                return true;
            },
            expandTitle() {
              this.isExpand = !this.isExpand;
            },
            loadMasterOtherData() {
              return this.fetchMallStoreInfo();
            },
            fetchMallStoreInfo: (function() {
               let loading = false;
               return function() {
                  if(loading) {
                      return console.debug('store info!!!!!!!!');
                  }
                  loading = true;
                  console.debug('fetch store info', 'mall ' + this.id);

                  return this.$get(`mall/shops/${this.id}`).then((data) => {
                      this.shop = data;
                      this.setShare();

                      loading = false;
                      this.fetchStoreProducts();
                  });
               }
            })(),
            fetchStoreProducts: (function() {
               const limit = 6;
               let loading = false;
               return function() {
                  if(loading) {
                      return console.debug('store products skip!!!!!');
                  }

                  loading = true;
                  let offset = this.products.length;
                  let shop_id = this.shop.id;
                  const params = {offset, limit, shop_id};

                  return this.$get(`mall/products`, params).then((data) => {
                      this.products.splice(this.products.length, 0, ...data.products);
                      loading = false;
                      if (data.products.length < limit) {
                          this.hasMore = false;
                      }
                  });
              }
          })()
        },
        events: {
            scrollToBottom(e) {
                this.fetchStoreProducts();
            }
        }
    };
</script>
